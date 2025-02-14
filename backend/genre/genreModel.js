import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLenght: 32,
    unique: true,
  },
});

export default mongoose.model("Genre", genreSchema);
