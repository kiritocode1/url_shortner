import { encodeBase64Url, encodeHex as _encodeHex } from "jsr:@std/encoding";
import { crypto } from "jsr:@std/crypto/crypto";


/**
 * * validates the url (extend later for more use)
 * @param url string
 * 
 * @returns string
 * 
 * 
 */
function validateUrl(url: string) {
	if (url.length > 200) {
		throw new Error("Url is too long");
	}
	if (url.length < 3) {
		throw new Error("Url is too short");
	}
	new URL(url);
}


/**
 * ? creates a short code for the given url after validation.
 * @param url string
 * @returns encodedHashCode string
 */
export async function createShortUrl(url: string) {
	try {
		validateUrl(url);
	} catch (e) {
		console.log(e);
		throw new Error("Invalid url");
	}

	const encoder = new TextEncoder();
	const urlData = encoder.encode(url + Date.now());
	//? create a hash as in to generate a short code
	const hash = await crypto.subtle.digest("SHA-256", urlData);
	//? the short code 
	const encodedHashCode = encodeBase64Url(hash.slice(0, 8));

	return encodedHashCode;
};