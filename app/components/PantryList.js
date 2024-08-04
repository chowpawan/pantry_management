'use client';

import { useState, useEffect } from 'react';
import { TextField, Card, CardContent, Typography, Button, Stack, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getItems, deleteItem } from '../../lib/firestoreService';

export default function PantryList({ onEditItem }) {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = getItems(searchTerm, (updatedItems) => {
        setItems(updatedItems);
      });
      // Cleanup the listener on component unmount
      return () => unsubscribe();
    };
    fetchData();
  }, [searchTerm]);

  const handleDelete = async (id) => {
    await deleteItem(id);
  };

  return (
    <Box sx={{ mt: 3, p: 2, backgroundColor: '#e0e0e0', borderRadius: 2 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ backgroundColor: '#fff', borderRadius: 1 }}
        />
      </Box>
      <Box>
        {items.map(item => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Card sx={{ 
              backgroundColor: '#ffffff',
              boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
              borderRadius: 2,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                boxShadow: '0px 8px 16px rgba(0,0,0,0.3)',
                transform: 'scale(1.02)',
              },
            }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" component="div" sx={{ color: '#333' }}>
                    {item.name}
                  </Typography>
                  <Typography color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => onEditItem(item)} // Pass the item to the edit function
                    sx={{ color: '#4caf50', borderColor: '#4caf50' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(item.id)}
                    sx={{ color: '#d32f2f', borderColor: '#d32f2f' }}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
