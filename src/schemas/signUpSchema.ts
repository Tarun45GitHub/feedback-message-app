import {z} from 'zod'

export const usernameValidaton=z
.string()
.min(2,"username must be atleast 2 characters")
.max(20,"username must be atmost 20 characters")
.regex(/^[a-zA-Z0-9_]+$/,"username must not contain special char")

export const signupSchema=z.object({
    username:usernameValidaton,
    email:z.string().email({message:"invalid email address"}),
    password:z.string().min(6,{message:"password must be atleast 6 characters"}),
    
})