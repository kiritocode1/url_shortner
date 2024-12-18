import { createGitHubOAuthConfig, createHelpers } from "jsr:@deno/kv-oauth";
import { pick } from "jsr:@std/collections";
import { type GithubUser, storeUser, getUser } from "./db.ts";

const oauthConfig = createGitHubOAuthConfig();

const { handleCallback, getSessionId } = createHelpers(oauthConfig);

export async function getCurrentUser(req: Request) {
  const sessionId = await getSessionId(req);
  // console.log("sessionId auth.ts:11:13", sessionId);
  return sessionId ? await getUser(sessionId) : null;
}

export async function getGithubProfile(accessToken: string) {
  const res = await fetch("https://api.github.com/user", {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    res.body?.cancel();
    throw new Error("Failed to fetch GitHub user");
  }

  return res.json() as Promise<GithubUser>;
}

// ! this is where im getting the error .
export async function handleGithubCallback(req: Request) {
  try {
    const { response, tokens, sessionId } = await handleCallback(req);

    console.log("Callback tokens:", tokens);
    console.log("Callback sessionId:", sessionId);

    if (!tokens?.accessToken) {
      throw new Error("No access token received");
    }

    const UserData = await getGithubProfile(tokens.accessToken);
    const filteredUserData = pick(UserData, [
      "login",
      "avatar_url",
      "html_url",
    ]);

    await storeUser(sessionId, filteredUserData);
    return response;
  } catch (error) {
    console.error("GitHub callback error:", error);
    return new Response("Authentication failed", { status: 500 });
  }
}