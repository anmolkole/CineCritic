import axios from "axios";

const PaymentBbutton = () => {
  const handlePayment = async () => {
    try {
      // Create order via backend
      const response = await axios.post(
        "http://localhost:3000/api/v1/payment/create-order",
        {
          amount: 500, // Amount in rupees
          currency: "INR",
        }
      );

      const { id: order_id, amount, currency } = response.data;

      // Set up RazorPay options
      const options = {
        key: "rzp_test_Kl3ITu4JEXjH2p",
        amount: amount,
        currency: currency,
        name: "MOVIES FLIX",
        description: "Test Transaction",
        order_id: order_id,
        handler: (response) => {
          alert(
            `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
          );
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PaymentBbutton;
