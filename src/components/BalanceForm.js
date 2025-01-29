// import React, { useState, useEffect } from "react";
// import "./BalanceForm.css";

// const BalanceForm = ({ fetchBalance }) => {
//   const [address, setAddress] = useState("");
//   const [network, setNetwork] = useState("ethereum");
//   const [balance, setBalance] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);

//   // Load previous addresses from localStorage when component mounts
//   useEffect(() => {
//     const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
//     setSuggestions(savedAddresses);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!address) {
//       setError("Please enter a valid address.");
//       return;
//     }

//     setLoading(true);
//     setBalance(null); // Reset balance before fetching
//     setError(""); // Reset error before fetching

//     try {
//       const balanceData = await fetchBalance(address, network);
//       if (balanceData && balanceData.balance) {
//         setBalance(balanceData.balance);

//         // Save the entered address in localStorage if it's not already saved
//         const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
//         if (!savedAddresses.includes(address)) {
//           const updatedAddresses = [address, ...savedAddresses].slice(0, 5); // Keep only the last 5 addresses
//           localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
//           setSuggestions(updatedAddresses);
//         }
//       } else {
//         setError("No balance found or invalid address.");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddressChange = (e) => {
//     setAddress(e.target.value);
//   };

//   const handleSelectAddress = (selectedAddress) => {
//     setAddress(selectedAddress);
//     setSuggestions([]); // Hide suggestions after selection
//   };

//   return (
//     <div className="balance-form">
//       <h2>Check USDT Balance</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="input-container">
//           <input
//             type="text"
//             placeholder="Enter Wallet Address"
//             value={address}
//             onChange={handleAddressChange}
//             className="input-field"
//           />
//           {suggestions.length > 0 && (
//             <ul className="suggestions-list">
//               {suggestions.map((addr, index) => (
//                 <li key={index} onClick={() => handleSelectAddress(addr)}>
//                   {addr}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         <select
//           value={network}
//           onChange={(e) => setNetwork(e.target.value)}
//           className="select-field"
//         >
//           <option value="ethereum">Ethereum</option>
//           <option value="tron">Tron</option>
//         </select>
//         <button type="submit" className="submit-button" disabled={loading}>
//           {loading ? "Loading..." : "Get Balance"}
//         </button>
//       </form>
//       {error && <p className="error-message">{error}</p>}
//       {balance !== null && (
//         <p className="balance-message">Balance: {balance} USDT</p>
//       )}
//     </div>
//   );
// };

// export default BalanceForm;


import React, { useState, useEffect } from "react";
import "./BalanceForm.css";

const BalanceForm = ({ fetchBalance }) => {
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("ethereum");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Load previous addresses from localStorage when component mounts
  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    setSuggestions(savedAddresses);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!address) {
      setError("Please enter a valid address.");
      return;
    }

    setLoading(true);
    setBalance(null); // Reset balance before fetching
    setError(""); // Reset error before fetching

    try {
      const balanceData = await fetchBalance(address, network);
      if (balanceData && balanceData.balance) {
        setBalance(balanceData.balance);

        // Save the entered address in localStorage if it's not already saved
        const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
        if (!savedAddresses.includes(address)) {
          const updatedAddresses = [address, ...savedAddresses].slice(0, 5); // Keep only the last 5 addresses
          localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
          setSuggestions(updatedAddresses);
        }
      } else {
        setError("No balance found or invalid address.");
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setShowDropdown(true); 
  };

  const handleSelectAddress = (selectedAddress) => {
    setAddress(selectedAddress);
    setShowDropdown(false); // Hide dropdown after selection
  };

  return (
    <div className="balance-form">
      <h2>Check USDT Balance</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Wallet Address"
            value={address}
            onChange={handleAddressChange}
            onFocus={() => setShowDropdown(true)} // Show dropdown when input is focused
            className="input-field"
          />
          {showDropdown && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((addr, index) => (
                <li key={index} onClick={() => handleSelectAddress(addr)}>
                  {addr}
                </li>
              ))}
            </ul>
          )}
        </div>
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="select-field"
        >
          <option value="ethereum">Ethereum</option>
          <option value="tron">Tron</option>
        </select>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Loading..." : "Get Balance"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {balance !== null && (
        <p className="balance-message">Balance: {balance} USDT</p>
      )}
    </div>
  );
};

export default BalanceForm;
