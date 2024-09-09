import dbConnect from "@/lib/db.connect";
import UserModel from "@/model/user.model";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerifictionEmail";


export async function POST(request:Request){
    await dbConnect()
    try {
        const {username,email,password}= await request.json()
        const exitingUserVerifiedByUsername=await UserModel.findOne({
            username,isVerified:true
        })
        if(exitingUserVerifiedByUsername) {
            return Response.json({
                success:false,
                message:"username is already taken"
            },{status:400})
        }
        const exitiingUserVerifiedByEmail=await UserModel.findOne({email})
        const verifyCode=Math.floor(100000+Math.random()*900000).toString()
        if(exitiingUserVerifiedByEmail){
            if(exitiingUserVerifiedByEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"username is already exit with this email"
                },{status:400})
            }else{
                const hasePassword=await bcrypt.hash(password,10);
                exitiingUserVerifiedByEmail.password=hasePassword 
                exitiingUserVerifiedByEmail.verifyCode=verifyCode
                const expiryDate=new Date() 
                expiryDate.setHours(expiryDate.getHours()+1)
                exitiingUserVerifiedByEmail.verifyCodeExpiry=expiryDate

                await exitiingUserVerifiedByEmail.save()
            }
        }else{
            const hasePassword=await bcrypt.hash(password,10);
            const expiryDate=new Date() 
            expiryDate.setHours(expiryDate.getHours()+1)
            const newUser= new UserModel({
                username,
                email,
                password:hasePassword,
                verifyCode,
                expiryDate,
                isVerified:false,
                isAcceptingMessage:true,
                message:[]
            })

            await newUser.save()
        }
       const emailResponse=await sendVerificationEmail(email,username,verifyCode);
       if(!emailResponse.success){
        return Response.json({
            success:false,
            message:"username is already taken"
        },{status:500})
       }
       return Response.json({
        success:false,
        message:"user registered successfully"
        },{status:400})
    } catch (error) {
       console.log("error while registering user",error);
        return Response.json(
            {
                success:false,
                message:"user registered failed"
            },{status:500})
    }
}