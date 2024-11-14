
import { Router } from "./router.ts";
import { serveDir } from "jsr:@std/http@1.0.9/file-server";

const router = new Router();

router.get("/", (_req) => {
	return new Response("Hello deno");
});
router.get("/about", (_req) => {
	return new Response("About page");
});
router.get("/users/:id", (_req, _info, params) => {
	return new Response(params?.pathname.groups.id);
});

router.get("/static/*", (req) => serveDir(req));

import { getShortLink } from "./db.ts"; //! yes this is a bad practice . yes im a bad man
// TODO add EFFECTS.ts later for better readability , you fucking moron :p 
router.get("/links/:id", async (_req, _info, params) => {
	const shortCode = params?.pathname.groups.id;
	if (!shortCode) {
		return new Response("Invalid short code", { status: 404 });
	}
	try {
		const link = await getShortLink(shortCode);
		if (!link) {
			return new Response("Short link not found", { status: 404 });
		}
		return new Response(JSON.stringify(link), { status: 201  , headers: { "content-type": "application/json" }  as HeadersInit });
	} catch (e) {
		console.error(e);
		return new Response("Internal server error", { status: 500  });
	}
});

import { storeShortLink } from "./db.ts";
import { createShortUrl } from "./engine.ts";
router.post("/links/", async (req) => {

	const { longUrl }= await req.json();
  const shortCode = await createShortUrl(longUrl);
	const res = await storeShortLink({ longUrl, shortCode, userId: "test User" });
	if (!res.ok) {
		return new Response("Internal server error , unable to store short link", { status: 500 });
	}
  return new Response(shortCode, {
    status: 201,
  });
}); 




 



export default {
	fetch(req) {
		return router.handler(req);
	},
} as Deno.ServeDefaultExport;

