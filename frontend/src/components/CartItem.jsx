import { useCartStore } from "../store/cartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="flex items-center justify-between border p-4 rounded shadow-sm">
      <div className="flex items-center gap-4">
        <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
        <div>
          <h4 className="font-semibold">{item.title}</h4>
          <p className="text-sm text-gray-600">${item.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          className="w-16 border rounded px-2 py-1"
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
