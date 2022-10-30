import type { IncomingMessage, ServerResponse } from "http";
export default async (req: IncomingMessage, res: ServerResponse) => {

    // @ts-ignore;
    const { user } = await useBody(req);
    // @ts-ignore
    req.user = user;

    return { updated: true }
}