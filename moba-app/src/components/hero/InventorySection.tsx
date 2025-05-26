import { useState, useEffect } from 'react';
import { Item } from '../../types/game';

export default function InventorySection() {
  const [inventory, setInventory] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3000/inventory', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInventory(data.items);
      } else {
        setError('Failed to fetch inventory');
      }
    } catch (err) {
      setError('An error occurred while fetching inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, item: Item) => {
    e.dataTransfer.setData('item', JSON.stringify(item));
  };

  if (loading) {
    return <div className="text-gray-400">Loading inventory...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {inventory.map((item) => (
        <div
          key={item.id}
          className="bg-gray-700 p-4 rounded-lg cursor-move"
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
        >
          <div className="aspect-square bg-gray-600 rounded mb-2">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover rounded"
              />
            )}
          </div>
          <h3 className="text-white font-medium">{item.name}</h3>
          <p className="text-gray-400 text-sm mb-2">{item.description}</p>
          {item.isConsumable && (
            <div className="text-gray-400 text-sm">Quantity: {item.quantity}</div>
          )}
          <div className="text-gray-400 text-sm">Slot: {item.slotType}</div>
        </div>
      ))}
    </div>
  );
} 