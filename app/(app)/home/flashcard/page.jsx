"use client";
import { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';

export default function FlashcardGenerator() {
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState('');

  const generateFlashcards = async () => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const flashcards = data.flashcards;
  
      // Split the flashcards based on double newlines
      const flashcardList = flashcards.split('\n\n').map((card, index) => ({
        id: index,
        content: card,
      }));
  
      setFlashcards(flashcardList);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    }
  };
  
  

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Flashcard Generator
      </Typography>
      <TextField
        label="Enter a topic"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={generateFlashcards}
        sx={{ marginBottom: 2 }}
      >
        Generate Flashcards
      </Button>

      {flashcards.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" gutterBottom>
            Generated Flashcards:
          </Typography>
          {flashcards.map((flashcard) => (
            <Paper key={flashcard.id} sx={{ padding: 2, marginBottom: 2, textAlign: 'left' }}>
              <Typography variant="body1">{flashcard.content}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
