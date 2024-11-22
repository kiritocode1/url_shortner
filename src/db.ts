const kv = await Deno.openKv(); 


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
    const userIndex = [userId, shortCode];
    const data: ShortLink = {
        shortCode,
        longUrl,
        createdAt: Date.now(),
        userId,
        clickCount: 0
    };
    

  
  const res = await kv
    .atomic()
    .set(shortLinkKey, data)
    .set(userIndex, shortCode)
    .commit();

 
    if (!res.ok) {
        throw new Error("Failed to store short link");
    }
    Deno.inspect({ value: "FILE DB.TS : Stored short link", res }, {
        colors: true,
        depth: Infinity,
        trailingComma: true,
    });
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

export async function getAllLinks() { 
    const links = await kv.list<ShortLink>({ prefix: ["shortLinks"] });
    const res =await  Array.fromAsync(links);
    const longLinks = (await res).map((link)=> link.value)
    return longLinks;
}



export async function getUserLinks(userId: string) {
  const list = kv.list<string>({ prefix: [userId] });
    const res = await Array.fromAsync(list);
    console.dir(res, { depth: Infinity, colors: true });
    const userShortLinkKeys = res.map((v) => ["shortLinks", v.key[1]]);
  console.log("userShortLinkKeys", userShortLinkKeys);
  const Top10Keys = userShortLinkKeys.slice(0, 10);
  console.log("Top10Keys", Top10Keys);
    const userRes = await kv.getMany<ShortLink[]>(Top10Keys);//! 10 
  const userShortLinks = await Array.fromAsync(userRes);
  console.dir( {userShortLinks} , { depth: Infinity, colors: true });
  return userShortLinks;
}

async function _DeleteAllLinks() {
  const links = await kv.list<ShortLink>({ prefix: ["shortLinks"] });
  const res = await Array.fromAsync(links);
  const longLinks = (await res).map((link) => link.value);
  for (const link of longLinks) {
    await kv.delete([link.shortCode]);
  }
}

async function _DeleteAllUsers() {
  const users = await kv.list<GithubUser>({ prefix: ["sessions"] });
  const res = await Array.fromAsync(users);
  const userIds = (await res).map((user) => user.key[0]);
  for (const userId of userIds) {
    await kv.delete([userId]);
  }
}
