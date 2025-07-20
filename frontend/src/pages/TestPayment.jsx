import React, { useState } from 'react';

const TestPayment = () => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);

    const res = await fetch('http://localhost:5000/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '9999999999',
        amount: 1
      })
    });

    const data = await res.json();
    setLoading(false);

    if (data.payment_link) {
      window.open(data.payment_link, '_blank');
    } else {
      alert('Payment creation failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Cashfree Test Payment</h2>
      <button
        onClick={handlePay}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay ₹1'}
      </button>
    </div>
  );
};

export default TestPayment;
