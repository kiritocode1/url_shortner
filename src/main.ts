import { createHelpers } from 'jsr:@deno/kv-oauth';//? [...auth] 
import { createGitHubOAuthConfig } from 'jsr:@deno/kv-oauth';
import { Router } from "./router.ts";
import { serveDir } from "jsr:@std/http@1.0.9/file-server";
import { render } from "npm:preact-render-to-string";
import { AboutPage, CreateShortLinkPage, ErrorPage, HomePage, UnauthorizedPage } from "./ui.tsx";
import { LoadEnv } from "./env.ts";
import { storeShortLink, storeUser } from "./db.ts";
import { createShortUrl } from "./engine.ts";
// import { handleGithubCallback } from "./auth.ts";

import { getShortLink } from "./db.ts"; //? yes this is a bad practice . yes im a bad man
import { getGithubProfile } from "./auth.ts";
import { pick } from "jsr:@std/collections/pick";



LoadEnv();



const router = new Router();



const OauthConfig = createGitHubOAuthConfig({ 
	redirectUri: Deno.env.REDIRECT_URI??Deno.env.get("REDIRECT_URI"), 
	
});


const { 
	signIn, 
	signOut, 
	handleCallback
} = createHelpers(OauthConfig)


async function handleGithubCallback(req: Request) {
  const { response, tokens, sessionId } = await handleCallback(req);

  const UserData = await getGithubProfile(tokens?.accessToken);
  const filteredUserData = pick(UserData, ["login", "avatar_url", "html_url"]);
  await storeUser(sessionId, filteredUserData);
  return response;
}



router.get("/", (_req) => {
	return new Response(render(HomePage({user:router.currentUser})) , {status:200 , headers:{"content-type":"text/html"}});
});
router.get("/about", (_req) => {
	return new Response(render(AboutPage({user:router.currentUser})) , {status:200 , headers:{"content-type":"text/html"}});
});
router.get("/users/:id", (_req, _info, params) => {
	return new Response(params?.pathname.groups.id);
});

router.get("/static/*", (req) => serveDir(req));

router.get("/oauth/signin/", async (req: Request) => {
	return await signIn(req);
//   return new Response("await signIn(req)");
});
router.get("/oauth/signout", signOut);
router.get("/oauth/callback", handleGithubCallback);

//~ just to make things simpler to send this response
const unAuthorizedResponse = new Response(
  render(UnauthorizedPage({ user: router.currentUser })),
  { status: 401, headers: { "content-type": "text/html" } }
);

//~ to make error Res simpler to handle 
const ErrorResponse = new Response(
	render(ErrorPage({ user: router.currentUser })),
	{ status: 500, headers: { "content-type": "text/html" } }
);

// TODO add EFFECTS.ts later for better readability , you fucking moron :p 
router.get("/links/:id", async (_req, _info, params) => {
	const shortCode = params?.pathname.groups.id;
	if (!shortCode) {
		return new Response("Invalid short code", { status: 404  });
	}
	try {
		const link = await getShortLink(shortCode);
		if (!link) {
			return ErrorResponse;
		}
		return new Response(JSON.stringify(link), { status: 201  , headers: { "content-type": "application/json" }  as HeadersInit });
	} catch (e) {
		console.error(e);
		return new Response("Internal server error", { status: 500  });
	}
});

router.post("/links/", async (req) => {
	if (!router.currentUser) return unAuthorizedResponse;

	const data = await req.formData();
	const longUrl = data.get("longUrl") as string;
	if (!longUrl) {
		return new Response("MISSING long url or possibly LongUrl is of a different type", { status: 400 });
	}
  const shortCode = await createShortUrl(longUrl);
	const res = await storeShortLink({ longUrl, shortCode, userId: "test User" });
	if (!res.ok) {
		return new Response("Internal server error , unable to store short link", { status: 500 });
	}
  return new Response(shortCode, {
    status: 201,
  });
}); 





router.get("/link/new",  (_req) => {
	
	if (!router.currentUser) return unAuthorizedResponse;

	return new Response(render(CreateShortLinkPage({user:router.currentUser})) , {status:200 , headers:{"content-type":"text/html"}});
});

router.get("/ERROR", (_req) => {
	return ErrorResponse;
});	

export default {
	fetch(req) {
		return router.handler(req);
	},
} as Deno.ServeDefaultExport;
