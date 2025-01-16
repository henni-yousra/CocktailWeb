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
    ref: "User",
  },
});

const Cocktail = mongoose.model("Cocktail", CocktailSchema);
export default Cocktail;
