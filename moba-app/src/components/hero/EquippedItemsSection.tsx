import { useState, useEffect } from 'react';
import { ItemSlotType, Item, EquippedItem } from '../../types/game';

const SLOT_ORDER = [
  ItemSlotType.HEAD,
  ItemSlotType.CHEST,
  ItemSlotType.LEGS,
  ItemSlotType.FEET,
  ItemSlotType.WEAPON,
  ItemSlotType.ACCESSORY
];

export default function EquippedItemsSection() {
  const [equippedItems, setEquippedItems] = useState<EquippedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEquippedItems();
  }, []);

  const fetchEquippedItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3000/equipped-items/active', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEquippedItems(data);
      } else {
        setError('Failed to fetch equipped items');
      }
    } catch (err) {
      setError('An error occurred while fetching equipped items');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (slot: ItemSlotType, item: Item) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3000/equipped-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemId: item.id,
        }),
      });

      if (response.ok) {
        fetchEquippedItems();
      } else {
        setError('Failed to equip item');
      }
    } catch (err) {
      setError('An error occurred while equipping item');
    }
  };

  const handleUnequip = async (equippedItemId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`http://localhost:3000/equipped-items/${equippedItemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchEquippedItems();
      } else {
        setError('Failed to unequip item');
      }
    } catch (err) {
      setError('An error occurred while unequipping item');
    }
  };

  if (loading) {
    return <div className="text-gray-400">Loading equipped items...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {SLOT_ORDER.map((slot) => {
        const equippedItem = equippedItems.find(item => item.slot === slot);
        return (
          <div
            key={slot}
            className="bg-gray-700 p-4 rounded-lg"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const item = JSON.parse(e.dataTransfer.getData('item'));
              handleDrop(slot, item);
            }}
          >
            <h3 className="text-white font-medium mb-2">{slot}</h3>
            {equippedItem ? (
              <div className="flex items-center justify-between">
                <span className="text-gray-300">{equippedItem.itemId}</span>
                <button
                  onClick={() => handleUnequip(equippedItem.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  Unequip
                </button>
              </div>
            ) : (
              <div className="text-gray-500 italic">Empty slot</div>
            )}
          </div>
        );
      })}
    </div>
  );
} 