import { useCartStore } from "../store/cartStore";
import fallbackImage from "/fallback.jpg"; // ensure this file is in /public

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="flex items-center justify-between border p-4 rounded shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={item.thumbnail || fallbackImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
          alt={item.title}
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h4 className="font-semibold">{item.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ₹{Number(item.price).toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          className="w-16 border rounded px-2 py-1 
            bg-white text-black 
            dark:bg-gray-800 dark:text-white 
            border-gray-300 dark:border-gray-600"
        />
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
