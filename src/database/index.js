import mongoose from "mongoose";
async function connectToDB() {
  const MONGO_URI = process.env.MONGO_URI;
  if (MONGO_URI) {
    try {
      mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("No MONGO_URI found");
  }
}
export default connectToDB;
