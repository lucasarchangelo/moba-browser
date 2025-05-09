import { toast } from 'react-hot-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, change: number) => void;
  onPurchase: () => void;
  heroMoney: number;
  purchasing: boolean;
}

export default function ShoppingCart({
  items,
  onRemove,
  onQuantityChange,
  onPurchase,
  heroMoney,
  purchasing,
}: ShoppingCartProps) {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  return (
    <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
      </div>
      <div className="p-6">
        {items.length === 0 ? (
          <p className="text-gray-400 text-center">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-yellow-400 text-sm">{item.price} gold each</p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    disabled={purchasing}
                    className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  {item.quantity !== undefined ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onQuantityChange(item.id, -1)}
                        disabled={purchasing}
                        className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        onClick={() => onQuantityChange(item.id, 1)}
                        disabled={purchasing}
                        className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400">Equipment (1)</span>
                  )}
                  <span className="text-white">
                    Total: {item.price * (item.quantity || 1)} gold
                  </span>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Total Cost:</span>
                <span className="text-2xl font-bold text-yellow-400">
                  {calculateTotal()} gold
                </span>
              </div>
              <button
                onClick={onPurchase}
                disabled={calculateTotal() > heroMoney || purchasing}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {purchasing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Purchasing...
                  </div>
                ) : (
                  'Purchase'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 