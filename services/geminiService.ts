
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedStory, StoryTone } from "../types";

export const generateStory = async (prompt: string): Promise<GeneratedStory> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write an immersive, atmospheric short story based on this prompt: "${prompt}". 
    The story should be roughly 150-300 words. 
    Analyze the emotional core of the story and categorize its tone as one of: HAPPY, SAD, INTENSE, MYSTERIOUS, CALM, or HOPEFUL.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: 'The title of the story.' },
          content: { type: Type.STRING, description: 'The body text of the story.' },
          tone: { 
            type: Type.STRING, 
            enum: Object.values(StoryTone),
            description: 'The emotional tone of the story.' 
          },
        },
        required: ['title', 'content', 'tone'],
      },
    },
  });

  const jsonStr = response.text.trim();
  try {
    return JSON.parse(jsonStr) as GeneratedStory;
  } catch (err) {
    console.error("Failed to parse AI response:", err);
    throw new Error("Invalid response format from AI");
  }
};
