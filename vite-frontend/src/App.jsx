// import React, { useState } from "react";
// import { ParaModal } from "@getpara/react-sdk";
// import para from "./clients/para"; // or the path to where you created your para instance
// import "@getpara/react-sdk/styles.css";

// function App() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       <button onClick={() => setIsOpen(true)}>Sign in with Para</button>
//       <ParaModal
//         para={para}
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//       />
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { ParaModal } from "@getpara/react-sdk";
import para from "./clients/para"; // Your configured para instance
import "@getpara/react-sdk/styles.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState(""); // You might get this from the Para modal

  // Function to fetch data from the backend using the /me endpoint
  const fetchUserData = async (userAddress) => {
    try {
      const response = await fetch("http://localhost:5000/me", {
        headers: { "x-address": userAddress },
      });
      const data = await response.json();
      console.log("Data: ", data)
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Simulate handling sign in with Para
  const handleSignIn = async () => {
    try {
    const response = await fetch("http://localhost:4000/_chopin/login");
    const user = await response.json();
  
    // Extract the address string from the returned object
    const userAddress = user.address;
    console.log("userAddress: ", userAddress);
  
    setAddress(userAddress);
    setIsOpen(false);
  
    // Now fetch user data from the backend
    fetchUserData(userAddress);
    } catch (error) {
      console.error(error.message);
    }
    
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Sign in with Para</button>

      <ParaModal
        para={para}
        isOpen={isOpen}
        onClose={handleSignIn} // Call handleSignIn on modal close (after successful sign in)
        appName="Memify"
        theme={{ backgroundColor: "#ffffff", foregroundColor: "#000000" }}
        oAuthMethods={["GOOGLE", "TWITTER", "DISCORD"]}
      />
    </div>
  );
}

export default App;