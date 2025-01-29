import React from "react";
import BalanceForm from "../components/BalanceForm";
import "./HomePage.css";

const HomePage = () => {
  const fetchBalance = async (address, network) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/usdt-balance?address=${address}&network=${network}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || `Failed to fetch balance.`);
      }

      return data;
    } catch (err) {
      console.error("Error fetching balance:", err);
      return { error: err.message || "An error occurred." };
    }
  };

  return (
    <>
      <div className="home-page">
        <h1>USDT Balance Checker</h1>
        <div className="balance-form-container">
          <BalanceForm fetchBalance={fetchBalance} />
        </div>
      </div>

      <div className="blockchain-logo">
        <span>B</span>
        <span>L</span>
        <span>O</span>
        <span>C</span>
        <span>K</span>
        <span>C</span>
        <span>H</span>
        <span>A</span>
        <span>I</span>
        <span>N</span>
      </div>
    </>
  );
};

export default HomePage;
