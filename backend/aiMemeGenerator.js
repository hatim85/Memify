// import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();


export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

export const generateMemeWithAI = async (prompt, originalMemeUrl) => {
  try {
    const response = await openai.images.generate({
      model:"dall-e-3",
      prompt: `Modify this meme image: ${originalMemeUrl} to match this description: ${prompt} (Note: keep the background as it is of the original meme and make something that matches the original meme)`,
      n: 1,
      size: "512x512",
    });

    console.log("Response from openai: ",response)
    return response.data;
  } catch (error) {
    console.error("AI Meme Generation Error:", error);
    throw new Error("Failed to generate meme");
  }
};
