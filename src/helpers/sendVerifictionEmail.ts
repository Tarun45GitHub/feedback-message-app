import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationemail";
import { apiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<apiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'verification code',
            react: VerificationEmail({username,otp:verifyCode}),
        });
        return {success:true,message:"verification email send successfully"}
    } catch (error) {
        console.log("error sending verification email",error);
        return {success:false,message:"faild to send verification email"}
    }
}