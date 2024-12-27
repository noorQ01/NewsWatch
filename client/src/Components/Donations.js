import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addDonate } from "../Features/donationSlice";

const Donations = () => {
  const email = useSelector((state) => state.users.user.email);
  const user = useSelector((state) => state.users.user);
  const news = useSelector((state) => state.news.news);
  const { state } = useLocation();
  const { title, newsId } = state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleAddDonate = () => {
    try {
      let convertedAmount = 0;

      if (currency === "USD") {
        convertedAmount = amount * 0.38;
      } else if (currency === "EUR") {
        convertedAmount = amount * 0.4;
      } else if (currency === "SAR") {
        convertedAmount = amount * 0.1;
      } else if (currency === "AED") {
        convertedAmount = amount * 0.1;
      } else if (currency === "QAR") {
        convertedAmount = amount * 0.11;
      } else if (currency === "BHD") {
        convertedAmount = amount * 1.02;
      } else if (currency === "KWD") {
        convertedAmount = amount * 1.25;
      } else if (currency === "OMR") {
        convertedAmount = amount;
      }

      const donationData = {
        userId: user._id,
        newsId: newsId,
        amount: convertedAmount,
        paymentMethod: paymentMethod,
      };
      console.log("data", donationData);
      dispatch(addDonate(donationData));
      alert("Thank you For Donate");
      navigate("/receipts")
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="donations-container">
      <h1>Donations</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddDonate();
        }}
      >
        <label>News Title</label>
        <input type="text" value={title} />
        <label>Currency</label>

        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="">Select...</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="OMR">OMR</option>
          <option value="SAR">SAR</option>
          <option value="AED">AED</option>
          <option value="QAR">QAR</option>
          <option value="BHD">BHD</option>
          <option value="KWD">KWD</option>
        </select>

        <label>Donation Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>Email</label>
        <input type="email" value={email} />

        <label>Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select..</option>
          <option value="Card">Credit Card</option>
          <option value="Chash">Cash</option>
        </select>

        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Donations;
