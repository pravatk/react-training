import React, { useState } from "react";
import "./App.css";
import UserInput from "./Components/UserInput";
import UserOutput from "./Components/UserOutput";

function App() {
  const [username, setUsername] = useState({ username: "Initial" });

  const updateUser = event => {
    console.log(`Changed: ${event.target.value}`);
    setUsername({ username: event.target.value });
  };
  return (
    <div>
      <UserInput changes={updateUser} />
      <UserOutput username={username.username} />
    </div>
  );
}

export default App;
