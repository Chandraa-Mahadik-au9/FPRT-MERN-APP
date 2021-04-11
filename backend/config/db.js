import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectn = await mongoose.connect(process.env.MongoAddress, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log(`MongoDB Connected : ${connectn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error : ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}

export default connectDB;