import type { IncomingMessage, ServerResponse } from "http";
export default async (req: IncomingMessage, res: ServerResponse) => {
    // @ts-ignore
    if (req.method !== "POST") return "Must be a post request";

    // @ts-ignore
    const { user } = await useBody(req);

    // @ts-ignore
    req.user = user;
    return { updated : true }
}