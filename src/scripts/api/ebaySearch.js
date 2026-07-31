// ebaySearch.js
import { Buffer } from "node:buffer";
import dotenv from "dotenv";
dotenv.config();

const sandbox = true;

const identityURL = sandbox
  ? "https://api.sandbox.ebay.com/identity/v1/oauth2/token"
  : "https://api.ebay.com/identity/v1/oauth2/token";

const browseURLBase = sandbox
  ? "https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search"
  : "https://api.ebay.com/buy/browse/v1/item_summary/search";

async function getEbayToken() {
  const clientId = sandbox
    ? process.env.SBX_EBAY_CLIENT_ID
    : process.env.EBAY_CLIENT_ID;

  const clientSecret = sandbox
    ? process.env.SBX_EBAY_CLIENT_SECRET
    : process.env.EBAY_CLIENT_SECRET;

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(identityURL, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "https://api.ebay.com/oauth/api_scope"
    })
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  return data.access_token;
}

export async function searchEbay(queryString) {
  const token = await getEbayToken();

  const url = `${browseURLBase}?${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-EBAY-C-MARKETPLACE-ID": "EBAY_US"
    }
  });

  console.log(url);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();
  console.log(json);
  // Return the raw response so partsButton.js can keep using `response`
  return json;
}
