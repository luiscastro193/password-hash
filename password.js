"use strict";
const encoder = new TextEncoder();

export async function passwordHash(password, salt) {
	let baseKey = await crypto.subtle.importKey(
		"raw",
		encoder.encode(password),
		"PBKDF2",
		false,
		["deriveKey"]
	);
	let key = await crypto.subtle.deriveKey(
		{name: "PBKDF2", hash: "SHA-256", salt: encoder.encode(salt), iterations: 600000},
		baseKey,
		{name: "HMAC", hash: "SHA-256"},
		true,
		["sign"]
	);
	key = await crypto.subtle.exportKey("jwk", key);
	return key.k;
}
