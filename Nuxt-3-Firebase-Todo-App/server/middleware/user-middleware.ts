import type { IncomingMessage, ServerResponse } from "http";
export default async (req: IncomingMessage, res: ServerResponse) => {
    // @ts-ignore
    const userCookie = useCookie(req, "userCookie");
    // @ts-ignore
    req.user = userCookie;
}