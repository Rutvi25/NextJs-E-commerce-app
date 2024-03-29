import mongoose from "mongoose";

const connectDB = () => {
  if(mongoose.connections[0].readyState) {
    console.log('Already connected!');
    return;
  }
  mongoose.connect(process.env.MONGODB_URL, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, error => {
    if(error) throw error;
    console.log('Connected to database')
  })
}

export default connectDB;