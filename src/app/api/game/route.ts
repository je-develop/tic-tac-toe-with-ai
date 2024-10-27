import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const GOOGLEAI_API_KEY = process.env.GOOGLEAI_API_KEY;
  const genAI = new GoogleGenerativeAI(GOOGLEAI_API_KEY ?? "");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });
  // const openai = new OpenAI({ apiKey: GOOGLEAI_API_KEY });
  // const model = "gpt-4o-mini";

  const url = new URL(request.url);
  const gameBorad: string | null = url.searchParams.get("borad");

  if (gameBorad?.length) {
    const prompt = [];
    prompt.push(
      "You are an expert tic tac toe player, foucus on tic tac toe rule"
    );
    prompt.push("You play as O. focus on wining, play extermely well.");
    prompt.push(
      "For the json content I provide as input, please give me json output in this format"
    );
    prompt.push(`{board: [[""], [""], [""]]}`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contents: any = [
      {
        role: "model",
        parts: [
          {
            text: prompt.join(" "),
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: gameBorad,
          },
        ],
      },
    ];

    const result = await model.generateContent({ contents });
    return Response.json(result.response.text());
  } else {
    return Response.json({ message: "Internal server error" });
  }
}
