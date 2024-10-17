import type {NextApiRequest, NextApiResponse} from 'next'
import got from 'got'
import * as console from "node:console";
import {GUACGQL_SERVER_URL} from "@/src/config";

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
            "User-Agent": "guac-visualizer", // TODO: add version
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    try {
        const guacgqlResponse = await got.post(GUACGQL_SERVER_URL, options);
        return res.status(guacgqlResponse.statusCode).send(guacgqlResponse.body);
    } catch (error) {
        console.log("guacgql server error: " + error + ", code: " + error.code);
        let responseBody = "internal server error";
        if (error.name == "HTTPError") {
            responseBody = error.response.body;
            console.log("gguacgql server response, " +
                "code: " + error.response.statusCode + ", " +
                "message: " + responseBody);
        }
        return res.status(500).send(responseBody);
    }
}

