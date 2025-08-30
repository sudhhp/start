import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      //   "mongodb+srv://soodihp:Yvgfxnit79OBzWgw@cluster0.nwz2pnr.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0"
      process.env.MONGO_URL
    );
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Can't connect to the database:", error);
    process.exit(1);
  }
};

export default connectDB;
