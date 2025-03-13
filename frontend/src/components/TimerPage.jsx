import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useMilkingSessionStore } from "../store/milking";

const TimerPage = () => {
  const [payload, setPayload] = useState({
    starttime: "",
    endtime: "",
    duration: 0,
    milkQuantity: "",
  });

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate
  const { createMilkingSessions, getAllMilkingSession } = useMilkingSessionStore(); // Get getAllMilkingSession

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      if (audioRef.current) {
        audioRef.current.play().catch((error) => console.error("Audio play error:", error));
      }
    } else {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStartPauseTimer = () => {
    if (isRunning) {
      handlePauseTimer();
    } else {
      handleStartTimer();
    }
  };

  const handleStartTimer = () => {
    setIsRunning(true);
    const start = new Date().toISOString();
    setPayload((prev) => ({
      ...prev,
      starttime: prev.starttime || start,
    }));
  };

  const handlePauseTimer = () => {
    setIsRunning(false);
    const end = new Date().toISOString();
    setPayload((prev) => ({
      ...prev,
      endtime: end,
    }));

    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleStopSession = async () => {
    setIsRunning(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const endTime = payload.endtime || new Date().toISOString();
    const startTime = new Date(payload.starttime);
    const durationInSeconds = Math.floor((new Date(endTime) - startTime) / 1000);

    const milkQuantity = prompt("Enter the quantity of milk collected (in liters):");

    if (milkQuantity !== null) {
      const updatedPayload = {
        startTime: payload.starttime,
        endTime: endTime,
        duration: durationInSeconds > 0 ? durationInSeconds : 1,
        milkQuantity: Number(milkQuantity),
      };

      console.log("Updated Payload", updatedPayload);
      setPayload(updatedPayload);

      try {
        const response = await createMilkingSessions(updatedPayload);
        console.log("Success and data: ", response);
        alert(`Milk quantity recorded: ${milkQuantity} liters`);

        setTime(0);
        setPayload({ starttime: "", endtime: "", duration: 0, milkQuantity: "" });
      } catch (error) {
        console.error("Error creating milking session:", error.response?.data || error.message);
      }
    }
  };

  const handleViewAllSessions = async () => {
    
      navigate("/session"); // Navigate to session list page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Milking Timer</h1>

      {/* Timer Display */}
      <div className="text-6xl font-bold text-gray-900 bg-white p-6 rounded-lg shadow-lg w-48 text-center">
        {formatTime(time)}
      </div>

      {/* Buttons - Start/Pause, Reset */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleStartPauseTimer}
          className={`px-6 py-3 text-white rounded-lg shadow-md transition-all ${
            isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            setTime(0);
            setIsRunning(false);
            setPayload({ starttime: "", endtime: "", duration: 0, milkQuantity: "" });
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
          }}
          className="px-6 py-3 text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-600 transition-all"
        >
          Reset
        </button>
      </div>

      {/* Stop Session Button */}
      <div className="mt-4">
        <button
          onClick={handleStopSession}
          className="px-6 py-3 text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 transition-all"
        >
          Stop Session
        </button>
      </div>

      {/* View All Sessions Button */}
      <div className="mt-4">
        <button
          onClick={handleViewAllSessions}
          className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          View All Sessions
        </button>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src="https://res.cloudinary.com/ds6qnmila/video/upload/v1741831056/After-the-Rain-Inspiring-Atmospheric-Music_ugh1u2.mp3" />
    </div>
  );
};

export default TimerPage;
