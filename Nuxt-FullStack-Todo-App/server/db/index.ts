import mongoose from "mongoose";
import { Nitro } from "nitropack";
export default async (_nitroApp: Nitro) => {
    const config = useRuntimeConfig();
    try {
        const conn = await mongoose.connect(config.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}