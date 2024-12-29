import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

export async function POST(req) {
  const data = await req.json();
  console.log("Data:", data);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content: [
          {
            type: "text",
            text: "You are a poet. You write poems on Nature. Do not write poems on any other topic. If its on any other topic, just reply back saying its not your interest.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: data["chatMessage"],
          },
        ],
      },
    ],
  });

  console.log("response:", response.choices[0].message.content);
  
  return NextResponse.json({
    message: response.choices[0].message.content
  });
}
