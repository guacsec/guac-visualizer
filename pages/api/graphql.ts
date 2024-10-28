import type {NextApiRequest, NextApiResponse} from 'next'
import got from 'got'
import * as console from "node:console";
import {GUACGQL_SERVER_QUERY_URL} from "@/src/config";
import packageJson from "@/package.json";

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
    bodyParser: false,
  },
}

export default async function requestGuacGraphql(req: NextApiRequest, res: NextApiResponse) {
  const options = {
    body: req.read(),
    timeout: {
      connect: 5 // assuming the backend should be able to establish connection in 5 seconds
    },
    responseType: "buffer",
    headers: {
      "User-Agent": "guac-visualizer-v" + packageJson.version,
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  };
  try {
    const guacgqlResponse = await got.post(GUACGQL_SERVER_QUERY_URL, options);
    return res.status(guacgqlResponse.statusCode).send(guacgqlResponse.body);
  } catch (error) {
    console.log("requestGuacGraphql() -> guacgql server error: " + error + ", url: " + GUACGQL_SERVER_QUERY_URL + ", code: " + error.code + ", message:" + error.response?.body);
    return res.status(500).send(error.name == "HTTPError" ? error.response.body : "internal server error");
  }
}

