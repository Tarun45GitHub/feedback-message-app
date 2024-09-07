import { z } from "zod";

export const MessageSchema=z.object({
    content:z.string().min(10,{message:"contente must be at least 10 character"}).max(100,{message:"content must be at most 100 character"})
})