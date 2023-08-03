import mongoose from 'mongoose';

let isConnected = false;
export const connectToDataBase = async () => {
    mongoose.set('strictQuery' , true)

    if(isConnected){
        console.log('Mongodb already connected')
        return
    }

    try{
      await  mongoose.connect(process.env.MONGODB)
        isConnected = true;
        console.log('Mongodb connected')
    }catch(error){
        console.log(error)
    
    }
}