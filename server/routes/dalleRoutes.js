import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

// configuring the openapi
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// creating the instance of openai
const openai = new OpenAIApi(config);

router.route("/").get((req, res) => {
  res.send("Hello from DallE");
});

// we are posting the prompt
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
});

export default router;
