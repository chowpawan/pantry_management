'use client';

import { useState } from 'react';
import PantryForm from './components/PantryForm';
import PantryList from './components/PantryList';
import { Box } from '@mui/material';

export default function Home() {
  const [currentItem, setCurrentItem] = useState(null);

  const handleItemAddedOrUpdated = () => {
    setCurrentItem(null);
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, transparent, rgb(var(--background-end-rgb))) rgb(var(--background-start-rgb))',
        minHeight: '100vh', // Full viewport height
        padding: '20px', // Padding around the content
        boxSizing: 'border-box', // Ensure padding is included in the height calculation
        margin: 0, // Ensure no default margins are applied
        fontFamily: 'Arial, sans-serif' // Optional: Set a default font family
      }}
    >
      <PantryForm currentItem={currentItem} onItemAddedOrUpdated={handleItemAddedOrUpdated} />
      <PantryList onEditItem={setCurrentItem} />
    </Box>
  );
}
