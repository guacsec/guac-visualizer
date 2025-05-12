import type {NextApiRequest, NextApiResponse} from 'next'
import got from 'got'
import * as console from "node:console";
import {GUACGQL_SERVER_VERSION_URL} from "@/src/config";
import packageJson from "@/package.json";

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
    bodyParser: false,
  },
}

export default async function provideVersionInformation(req: NextApiRequest, res: NextApiResponse) {
  const options = {
    timeout: {
      connect: 5 // assuming the backend should be able to establish connection in 5 seconds
    },
    responseType: "buffer",
    headers: {
      "User-Agent": "guac-visualizer-v" + packageJson.version,
      "Accept": "application/json",
    }
  };
  let guacgqlVersion: string = "n/a"
  let guacVisualizerVersion: string = "n/a";
  try {
    const guacgqlResponse = await got.get(GUACGQL_SERVER_VERSION_URL, options);
    guacgqlVersion = guacgqlResponse.body.toString();
  } catch (error) {
    console.log("provideVersionInformation() -> guacgql server error: " + error + ", url: " + GUACGQL_SERVER_VERSION_URL + ", code: " + error.code + ", message:" + error.response?.body);
  }
  return res.status(200).json({
    "guacVisualizer": guacVisualizerVersion,
    "guacgql": guacgqlVersion,
  });
}

