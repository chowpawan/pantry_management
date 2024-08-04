'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { addItem, updateItem } from '../../lib/firestoreService';

export default function PantryForm({ currentItem, onItemAddedOrUpdated }) {
  const [name, setName] = useState(currentItem ? currentItem.name : '');
  const [quantity, setQuantity] = useState(currentItem ? currentItem.quantity : 1);

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name);
      setQuantity(currentItem.quantity);
    } else {
      setName('');
      setQuantity(1);
    }
  }, [currentItem]);

  const handleQuantityChange = (increment) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + increment));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentItem) {
      // Update existing item
      await updateItem(currentItem.id, { name, quantity });
    } else {
      // Add new item
      await addItem({ name, quantity });
    }
    setName('');
    setQuantity(1);
    onItemAddedOrUpdated();
  };

  return (
    <Box sx={{ mb: 3, p: 2, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Item Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button onClick={() => handleQuantityChange(-1)} aria-label="decrease" sx={{ mr: 1 }}>
            <Remove />
          </Button>
          <Typography variant="h6" sx={{ minWidth: 50, textAlign: 'center' }}>
            {quantity}
          </Typography>
          <Button onClick={() => handleQuantityChange(1)} aria-label="increase" sx={{ ml: 1 }}>
            <Add />
          </Button>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          {currentItem ? 'Update Item' : 'Add Item'}
        </Button>
      </form>
    </Box>
  );
}
