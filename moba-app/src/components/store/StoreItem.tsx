'use client';

import React, { forwardRef } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Item } from '@/types/item';

interface StoreItemProps {
  item: Item;
  onDrop: (item: Item) => void;
}

const StoreItem = forwardRef<HTMLDivElement, StoreItemProps>(({ item, onDrop }, ref) => {
  const [{ isDragging }, drag] = useDrag<Item, void, { isDragging: boolean }>(() => ({
    type: 'ITEM',
    item: { ...item },
    end: (item: Item, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDrop(item);
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={ref}
      component="div"
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" component="div">
            {item.name}
          </Typography>
          <Chip
            label={`${item.price} gold`}
            color="primary"
            size="small"
          />
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

        {item.isConsumable && (
          <Chip
            label="Consumable"
            color="secondary"
            size="small"
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>
    </Card>
  );
});

StoreItem.displayName = 'StoreItem';

export default StoreItem; 