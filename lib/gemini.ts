import { GoogleGenerativeAI } from '@google/generative-ai';
import  {SUMMARY_SYSTEM_PROMPT}   from '../utils/prompt';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generatesummaryfromGEMINI =async (pdfText: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-002' , generationConfig :{
        temperature: 0.7,
        maxOutputTokens: 1500,
    }});

    const prompt = `${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    if(!response.text()){
        throw new Error('Gemini API response is empty');
    }
    return response.text();
     
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};
