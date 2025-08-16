import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB=async()=>{
    try{
      const conntionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      console.log('✅ - MONGODB is connected  connected!');
      console.log(`🛢️ 🛢️ 🛢️ DB Host ${conntionInstance.connection.host}`)
      console.log(`🔋🔋🔋  !! DB Name ${conntionInstance.connection.name}`)
    }catch(error){
        console.log(`MongoDb connection Error`,error);
        process.exit(1);
    }
}
export default connectDB;