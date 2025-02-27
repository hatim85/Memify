import mongoose from "mongoose";

const MemeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    template: { type: String, required: true },
    templateName: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isNFT: { type: Boolean, default: false },
    nftMetadata: {
      tokenId: String,
      blockchainAddress: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Meme", MemeSchema);
