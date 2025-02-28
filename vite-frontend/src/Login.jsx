import { useAddress } from "@chopinframework/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { address, login, logout } = useAddress();
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualAddress, setManualAddress] = useState("");

  // Logout user when they enter the app for the first time
  useEffect(() => {
    if (!isInitialized) {
      logout();
      setIsInitialized(true);
    }
  }, [isInitialized, logout]);

  // Function to handle authentication
  const authenticateUser = async (userAddress) => {
    if (!userAddress) {
      alert("Please enter an address.");
      return;
    }

    setLoading(true);
    try {
      // Check if user exists (Signin)
      let response = await fetch("https://memifygateway.vercel.app/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: userAddress }),
        credentials: "include", // Important for cookies
      });

      if (response.status === 404) {
        // If user not found, Sign up
        response = await fetch("https://memifygateway.vercel.app/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: userAddress }),
          credentials: "include",
        });
      }

      const data = await response.json();
      if (response.ok) {
        console.log("User authenticated:", data);
        navigate("/landing");
      } else {
        console.error("Authentication error:", data.message);
      }
    } catch (error) {
      console.error("Server error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle login and authenticate the user
  useEffect(() => {
    if (address) {
      authenticateUser(address);
    }
  }, [address]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-white border border-white/20">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>

        {/* Login Button */}
        {!address ? (
          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login with Chopin"}
          </button>
        ) : (
          <div className="text-center">
            <button
              onClick={logout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              Logout
            </button>
            <p className="mt-3 text-sm text-gray-300">Logged in as: <span className="font-semibold">{address}</span></p>
          </div>
        )}

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="px-4 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Manual Address Input */}
        <div className="text-center">
          <h3 className="text-lg mb-2">Sign Up with Address</h3>
          <input
            type="text"
            placeholder="Enter your address"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:outline-none transition-all duration-300"
          />
          <button
            onClick={() => authenticateUser(manualAddress)}
            disabled={loading}
            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
