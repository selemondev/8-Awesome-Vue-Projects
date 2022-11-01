import type { IncomingMessage, ServerResponse } from "http";
export default async (req: IncomingMessage, res: ServerResponse) => {
    // @ts-ignore
    const user = req.user;
    return user ? user : "User is signed out";
}