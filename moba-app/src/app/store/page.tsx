'use client';

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Typography, Button, Box } from '@mui/material';
import StoreItem from '@/components/store/StoreItem';
import DropTarget from '@/components/store/DropTarget';
import { useStore } from '@/hooks/useStore';
import { useHero } from '@/hooks/useHero';
import { Item } from '@/types/item';

const StorePage: React.FC = () => {
  const { items, loading, error, purchaseItems } = useStore();
  const { hero, loading: heroLoading } = useHero();
  const [selectedItems, setSelectedItems] = useState<{ item: Item; quantity: number }[]>([]);

  const handleDrop = (item: Item) => {
    const existingItem = selectedItems.find((selected) => selected.item.id === item.id);
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((selected) =>
          selected.item.id === item.id
            ? { ...selected, quantity: selected.quantity + 1 }
            : selected
        )
      );
    } else {
      setSelectedItems([...selectedItems, { item, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (itemId: number) => {
    setSelectedItems(selectedItems.filter((selected) => selected.item.id !== itemId));
  };

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setSelectedItems(
      selectedItems.map((selected) =>
        selected.item.id === itemId ? { ...selected, quantity } : selected
      )
    );
  };

  const totalCost = selectedItems.reduce(
    (sum, { item, quantity }) => sum + item.price * quantity,
    0
  );

  const handlePurchase = async () => {
    if (hero && totalCost <= hero.money) {
      await purchaseItems(selectedItems);
      setSelectedItems([]);
    }
  };

  if (loading || heroLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!hero) {
    return <Typography>Hero not found</Typography>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Store
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your Money: {hero.money} gold
        </Typography>

        <Box display="flex" gap={3}>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Available Items
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {items.map((item) => (
                <Box key={item.id} width={{ xs: '100%', sm: '45%', md: '30%' }}>
                  <StoreItem item={item} onDrop={handleDrop} />
                </Box>
              ))}
            </Box>
          </Box>

          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Selected Items
            </Typography>
            <DropTarget onDrop={handleDrop}>
              {selectedItems.length === 0 ? (
                <Typography color="textSecondary">
                  Drag items here to add them to your purchase
                </Typography>
              ) : (
                <Box display="flex" flexDirection="column" gap={2}>
                  {selectedItems.map(({ item, quantity }) => (
                    <Box
                      key={item.id}
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Price: {item.price} gold
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Quantity: {quantity}
                      </Typography>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}
            </DropTarget>

            <Box mt={2}>
              <Typography variant="h6">
                Total Cost: {totalCost} gold
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePurchase}
                disabled={totalCost > hero.money || selectedItems.length === 0}
                sx={{ mt: 2 }}
              >
                Purchase
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default StorePage; 