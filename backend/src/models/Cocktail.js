import mongoose from "mongoose";

const CocktailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [String],
  instructions: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Referring to the User model
  },
  image: {
    type: Buffer, // Storing image as binary data
    required: false,
  },
  imageType: {
    type: String, // MIME type of the image (e.g., "image/jpeg")
    required: false,
  },
 
  source: {
    type: String,  // 'community' for community recipes
    required: true,
  },
});

const Cocktail = mongoose.model("Cocktail", CocktailSchema);
export default Cocktail;
