// api/generate/route.js

import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY, // Ensure this is set in .env.local
});

export async function POST(req) {
  try {
    const { topic } = await req.json();

    // Make a request to the OpenAI API to generate flashcards
    const completion = await openai.chat.completions.create({
      model: 'openchat/openchat-7b:free',
      messages: [{
        role: 'user',
        content: `Generate a list of 5 flashcards for the topic: ${topic}. Each flashcard should include:
1. A question
2. Four multiple-choice options (labeled A, B, C, D)
3. The correct answer

Please format each flashcard clearly, separating them by double newlines.`
      }],
    });

    // Extract and format the generated flashcards
    const flashcards = completion.choices[0].message.content.trim();
    
    // Send the formatted flashcards as the response
    return new Response(JSON.stringify({ flashcards }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


