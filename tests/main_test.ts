import {assertEquals , assertNotEquals, assertRejects} from "@std/assert"
import { createShortUrl } from "../src/engine.ts";


// TODO update the tests to use the new router
Deno.test("url ~ /", async () => {
    const res = await fetch("http://localhost:8000/");
    assertEquals(res.status, 200);
    assertEquals(res.type, "text/html");
    assertNotEquals(await res.text(), "");
    
}); 


Deno.test("url ~ /users/1", async () => {
    const res = await fetch("http://localhost:8000/users/1");
    assertEquals(res.status, 200);
    assertEquals(await res.text(), "1");
}); 



Deno.test("url ~ /static/index.html", async () => {
    const res = await fetch("http://localhost:8000/static/index.html");
    assertEquals(res.status, 200);
    assertEquals(await res.text(), "<h1>Hello World</h1>");
});


Deno.test("URL SHORTENER",  async (t) => {
    await t.step("Should Generate Short Url", async () => {
        const url = "https://www.google.com";
        const shortUrl = await createShortUrl(url);
        assertEquals(typeof shortUrl, "string");
        assertEquals(shortUrl.length, 11)

    });

    await t.step("Generate on Timestamp", async () => {
        const url = "https://www.google.com";
        const shortUrl = await createShortUrl(url);
        const id = await setTimeout(() => { },5000);
        const shortUrl2 = await createShortUrl(url);
        clearTimeout(id);
        assertNotEquals(shortUrl, shortUrl2);
    });

    await t.step("Should Reject Invalid Url",  () => {
        const url = "not a url";
        assertRejects(async () => { 
            await createShortUrl(url);
        })
            

    });

});

import { storeShortLink, getShortLink } from "../src/db.ts";
Deno.test("DB TEST", async (t) => {
         const url = "https://aryank.online/";
		const shortCode = await createShortUrl(url);
    await t.step("Should Store Short Link", async () => {

        const userId = `aryan k`;
        await storeShortLink({ longUrl: url, shortCode, userId });

    });


    await t.step("Should Get Short Link", async () => {
        const link = await getShortLink(shortCode);
        assertEquals(link?.shortCode, shortCode);
        assertEquals(link?.longUrl, url);
        
     });
 });



Deno.test("POST SHORT URL", async (t) => {
	 const url = "https://aryank.online/"; // ^ shameless plug :P
	//  const shortCode = await createShortUrl(url);
	 await t.step("Should Create Short Url", async () => {
		 const res = await fetch("http://localhost:8000/links", {
			 method: "POST",
			 body: JSON.stringify({ longUrl: url }),
			 headers: { "Content-Type": "application/json" },
		 });
		 assertEquals(res.status, 200);
		 //~ equal later ... there is some problem
	 });
});
 

Deno.test("Auth Test", async (t) => { 

});


Deno.test("logging test", async (t) => {
    
 }); 