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
import { useAddress } from "@chopinframework/react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { address, login } = useAddress();

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;