import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import PageWrapper from "../components/PageWrapper";

const Checkout = () => {
  const { cart } = useCartStore();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalInPaise = Math.round(total * 100); // Convert to paise for Razorpay/Cashfree

  const handleCheckout = async () => {
    if (!name || !email || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    if (!totalInPaise || totalInPaise <= 0) {
      alert("Invalid total amount.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          amount: totalInPaise, // Send amount in paise (₹199.99 = 19999)
          cartItems: cart,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Server error:", data);
        alert(data?.error || "Failed to create payment link.");
        return;
      }

      if (data.payment_link) {
        window.location.href = data.payment_link;
      } else {
        console.error("No payment link in response:", data);
        alert("Failed to create payment link.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            className="w-full border px-4 py-2 rounded mt-1"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
          />
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2">Order Summary</h3>
        <ul className="space-y-2 mb-6">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between border-b py-2">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between text-xl font-bold mb-6">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700"
        >
          {loading ? "Redirecting to Cashfree..." : "Pay with Cashfree"}
        </button>
      </div>
    </PageWrapper>
  );
};

export default Checkout;
