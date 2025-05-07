'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Item } from '@/types/item';

interface InventoryItemProps {
  item: Item;
  quantity: number;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({
  item,
  quantity,
  onRemove,
  onQuantityChange,
}) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      if (item.isConsumable) {
        onQuantityChange(Math.min(newQuantity, 5));
      } else {
        onQuantityChange(1);
      }
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" component="div">
            {item.name}
          </Typography>
          <IconButton onClick={onRemove} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {item.description}
        </Typography>

        <Box mt={1}>
          {item.baseHealth > 0 && (
            <Typography variant="body2">Health: +{item.baseHealth}</Typography>
          )}
          {item.baseMana > 0 && (
            <Typography variant="body2">Mana: +{item.baseMana}</Typography>
          )}
          {item.baseArmor > 0 && (
            <Typography variant="body2">Armor: +{item.baseArmor}</Typography>
          )}
          {item.baseMagicResistance > 0 && (
            <Typography variant="body2">Magic Resistance: +{item.baseMagicResistance}</Typography>
          )}
          {item.baseAccuracy > 0 && (
            <Typography variant="body2">Accuracy: +{item.baseAccuracy}</Typography>
          )}
          {item.baseDamage > 0 && (
            <Typography variant="body2">Damage: +{item.baseDamage}</Typography>
          )}
          {item.baseMagicDamage > 0 && (
            <Typography variant="body2">Magic Damage: +{item.baseMagicDamage}</Typography>
          )}
        </Box>

        <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="primary">
            Total: {item.price * quantity} gold
          </Typography>
          {item.isConsumable && (
            <TextField
              type="number"
              size="small"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1, max: 5 }}
              sx={{ width: '80px' }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default InventoryItem; 