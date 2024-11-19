const kv = await  Deno.openKv();

export type ShortLink = {
	shortCode: string;
	longUrl: string;
	createdAt: number;
	userId: string;
	clickCount: number;
	lastClickEvent?: string;
};
//? Use Pick to create a type with only the fields you need for storeShortLink
type StoreShortLinkParams = Pick<ShortLink, "longUrl" | "shortCode" | "userId">;

export async function storeShortLink({ longUrl, shortCode, userId }: StoreShortLinkParams) {
    const shortLinkKey = ["shortLinks", shortCode]; 
    const data: ShortLink = { 
        shortCode, 
        longUrl, 
        createdAt: Date.now(), 
        userId, 
        clickCount: 0 
    };
    const res = await kv.set(shortLinkKey, data);

    if (!res.ok) {
        throw new Error("Failed to store short link");
    }
    return res;
}


export async function getShortLink(shortCode:StoreShortLinkParams["shortCode"]) {
    const shortLinkKey = ["shortLinks", shortCode]; 
    const link = await kv.get<ShortLink>(shortLinkKey);
    return link.value;
}

export type GithubUser = {

    login: string;
    avatar_url: string;
    html_url: string;
};


export async function storeUser(sessionId: string, userId: GithubUser) { 
    const userKey = ["sessions", sessionId];
    const res = await kv.set(userKey, userId);
    return res;
};


export async function getUser(sessionId: string) { 
    const userKey = ["sessions", sessionId];
    const user = await kv.get<GithubUser>(userKey);
    return user.value;
}



// import { createShortUrl } from "./engine.ts";

// const link = "https://aryank.online/";
// const shortCode = await createShortUrl(link);

// console.log(shortCode);
// const userId = "aryan k";

// await storeShortLink({ longUrl: link, shortCode, userId });

// const link2 = await getShortLink(shortCode);

// console.log(link2);
