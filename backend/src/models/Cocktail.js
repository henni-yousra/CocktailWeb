// import mongoose from "mongoose";

// const CocktailSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   ingredients: [String],
//   instructions: String,
//   creator: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

// const Cocktail = mongoose.model("Cocktail", CocktailSchema);
// export default Cocktail;

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
  image: {
    type: Buffer, // Stocker l'image sous forme de données binaires
    required: false,
  },
  imageType: {
    type: String, // Type MIME de l'image (par ex. "image/jpeg")
    required: false,
  },
});

const Cocktail = mongoose.model("Cocktail", CocktailSchema);
export default Cocktail;
