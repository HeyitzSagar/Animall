import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import React from "react";
import LandingPage from "./components/LandingPage";
import TimerPage from "./components/TimerPage";
import GetMilkingSessions from "./components/GetMilkingSessions";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
         <Route path="/" element={<LandingPage />} />
         <Route path="/timer" element={<TimerPage />} />
         <Route path="/session" element={<GetMilkingSessions />} />
    </Routes>
  );
}

export default App;
