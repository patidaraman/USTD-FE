import React, { useState, useEffect, useRef } from "react";
import "./BalanceForm.css";

const BalanceForm = ({ fetchBalance }) => {
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const [networkError, setNetworkError] = useState(""); // New state for network error
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log("Component mounted");

    // Reset the form and remove error messages when the page is refreshed or reloaded
    setAddress("");
    setNetwork("");
    setBalance(null);
    setError("");
    setNetworkError("");

    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    console.log("Saved Addresses:", savedAddresses);
    setSuggestions(savedAddresses.slice(0, 5));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit clicked");

    if (!address.trim()) {
      setError("Please enter a valid wallet address.");
      setBalance(null);
      return;
    }

    if (!network.trim()) {
      setError("Please select a network.");
      setBalance(null);
      return;
    }

    setLoading(true);
    setBalance(null);
    setError("");
    console.log("Fetching balance for address:", address, "network:", network);

    try {
      const balanceData = await fetchBalance(address, network);
      console.log("Balance data:", balanceData);

      // Ensure the balance is defined before setting state
      if (balanceData && balanceData.balance !== undefined) {
        setBalance(balanceData.balance);
        saveAddress(address);
      } else {
        throw new Error(balanceData?.error || "Invalid address or network.");
      }
    } catch (err) {
      console.log("Error:", err);
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const saveAddress = (newAddress) => {
    console.log("Saving address:", newAddress);
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    if (!savedAddresses.includes(newAddress)) {
      const updatedAddresses = [newAddress, ...savedAddresses].slice(0, 5);
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
      setSuggestions(updatedAddresses);
    }
  };

  const clearAddress = () => {
    console.log("Clearing address");
    setAddress("");
    setNetwork(""); // Reset network when address is cleared
    setShowSuggestions(false);
    setBalance(null);
    setNetworkError(""); // Clear network error when address is cleared
    setError(""); // Clear the general error when address is cleared
  };

  const handleNetworkChange = (e) => {
    if (!address.trim()) {
      setNetworkError("Please provide a valid wallet address first.");
      return;
    }
    setNetworkError(""); // Clear error when user enters an address
    setNetwork(e.target.value);
    setBalance(null);
    setError(""); // Clear general error when user changes the network
  };

  return (
    <div className="balance-form">
      <h2>Check USDT Balance</h2>

      {/* Error message placed at the top */}
      {(error || networkError) && (
        <p className="error-message">{error || networkError}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-container" ref={inputRef}>
          <input
            type="text"
            placeholder="Enter Wallet Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="input-field"
          />
          {address && (
            <button
              type="button"
              className="clear-button"
              onClick={clearAddress}
            >
              ❌
            </button>
          )}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((addr, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setAddress(addr);
                    setShowSuggestions(false);
                    setNetworkError(""); // Clear error when selecting an address
                    setError(""); // Clear general error when selecting an address
                  }}
                >
                  {addr}
                </li>
              ))}
            </ul>
          )}
        </div>

        <select
          value={network}
          onChange={handleNetworkChange}
          className="select-field"
          disabled={!address.trim()} // Disable if no address is entered
        >
          <option value="" disabled>
            Select Network
          </option>
          <option value="ethereum">Ethereum</option>
          <option value="tron">Tron</option>
        </select>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Loading..." : "Get Balance"}
        </button>
      </form>

      {balance !== null && (
        <div className="balance-box">
          <p className="balance-message">Balance: {balance} USDT</p>
        </div>
      )}
    </div>
  );
};

export default BalanceForm;
