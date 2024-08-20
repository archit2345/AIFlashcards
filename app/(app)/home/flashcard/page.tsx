import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

const FlashcardPage = () => {
  const [content, setContent] = useState<string>('');
  const [flashcards, setFlashcards] = useState<string[]>([]);
  
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);

  const generateFlashcards = async () => {
    if (content.trim() === '') return;
    
    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Generate flashcards based on the following content:\n\n${content}\n\nFlashcards:`,
        max_tokens: 150,
        n: 5,
        stop: ['\n\n'],
      });

      const generatedFlashcards = response.data.choices.map(choice => choice.text.trim());
      setFlashcards(generatedFlashcards);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your content here"
        rows={10}
        cols={50}
      />
      <button onClick={generateFlashcards}>Generate Flashcards</button>
      <div>
        {flashcards.map((card, index) => (
          <div key={index} className="flashcard">
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardPage;
