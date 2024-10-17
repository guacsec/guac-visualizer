import console from "node:console";

function getGuacQlServerUrl() {
    let url = process.env.GUACGQL_SERVER_URL;
    url = url.trim();
    while (url.length > 0 && url.endsWith("/")) {
        url = url.substring(0, url.length - 1);
    }
    url += "/query";
    console.log("Using GUACGQL_SERVER_URL=" + url);
    return new URL(url);
}

export const GUACGQL_SERVER_URL = getGuacQlServerUrl();
