import mongoose, { Mongoose } from "mongoose";


type ConnectionObject={
    isConnected?:number
}

const connection :ConnectionObject={}

async function dbConnect():Promise<void> {
    if(connection.isConnected) {
        console.log("Already db Connect");
        return;
    }
    try {
       const db= await mongoose.connect(process.env.MONGODB_URI||"",{})

       connection.isConnected=db.connections[0].readyState
       console.log("db connected Successfully");
       
    } catch (error) {
        console.log("Db connection failed",error);
        process.exit(1);
    }
}

export default dbConnect;