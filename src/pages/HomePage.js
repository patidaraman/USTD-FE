import React from "react";
import BalanceForm from "../components/BalanceForm";
import "./HomePage.css"; // Add this for styling

const HomePage = () => {
  const fetchBalance = async (address, network) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/usdt-balance?address=${address}&network=${network}`;
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch balance. Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching balance:", err);
      throw new Error(
        err.message || "An error occurred while fetching the balance."
      );
    }
  };

  return (
    <div className="home-page">
      <h1>USDT Balance Checker</h1>
      <BalanceForm fetchBalance={fetchBalance} />
    </div>
  );
};

export default HomePage;
