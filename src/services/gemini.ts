import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askCyberAssistant(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const model = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: "user", parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "You are 'cipher1', a world-class cybersecurity mentor. Your goal is to help beginners learn hacking, offensive security, and defensive security in an ethical and responsible manner. Provide clear explanations, code snippets where relevant, and always emphasize ethical hacking principles. If a user asks for something illegal, explain why it's harmful and redirect them to a legal, educational alternative (like CTFs or labs).",
      }
    });

    const response = await model;
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my neural network. Please try again later.";
  }
}
