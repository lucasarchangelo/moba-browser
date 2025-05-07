'use client';

import React, { forwardRef } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { Box } from '@mui/material';
import { Item } from '@/types/item';

interface DropTargetProps {
  onDrop: (item: Item) => void;
  children?: React.ReactNode;
}

const DropTarget = forwardRef<HTMLDivElement, DropTargetProps>(({ onDrop, children }, ref) => {
  const [{ isOver }, drop] = useDrop<Item, void, { isOver: boolean }>(() => ({
    accept: 'ITEM',
    drop: (item: Item) => {
      onDrop(item);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={ref}
      component="div"
      sx={{
        minHeight: 100,
        border: '2px dashed',
        borderColor: isOver ? 'primary.main' : 'grey.300',
        borderRadius: 1,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isOver ? 'action.hover' : 'background.paper',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {children}
    </Box>
  );
});

DropTarget.displayName = 'DropTarget';

export default DropTarget; 