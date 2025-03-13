import React, { useEffect, useState } from "react";
import { useMilkingSessionStore } from "../store/milking";
import { useNavigate } from "react-router-dom";

const GetMilkingSessions = () => {
  const { milkingSessions, getAllMilkingSession } = useMilkingSessionStore();
  const navigate = useNavigate();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [data, setData] = useState([]);

  // Fetch data from API based on page
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllMilkingSession(currentPage);
      if (response) {
        setData(response.data);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
        setHasNextPage(response.hasNextPage);
        setHasPrevPage(response.hasPrevPage);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header & Navigation */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">Milking Sessions</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Home Page
        </button>
      </div>

      {/* Table View (Hidden on Mobile) */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 text-left">Milking Session ID</th>
              <th className="px-4 py-2 text-left">Start Time</th>
              <th className="px-4 py-2 text-left">End Time</th>
              <th className="px-4 py-2 text-left">Duration (s)</th>
              <th className="px-4 py-2 text-left">Milk Quantity (L)</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((session) => (
                <tr key={session._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{session.milkingSessionId}</td>
                  <td className="px-4 py-2">{session.startTime}</td>
                  <td className="px-4 py-2">{session.endTime}</td>
                  <td className="px-4 py-2">{session.duration}</td>
                  <td className="px-4 py-2">{session.milkQuantity} L</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No milking sessions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${
              !hasPrevPage ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={!hasPrevPage}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-white border rounded-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${
              !hasNextPage ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={!hasNextPage}
          >
            Next
          </button>
        </div>
      )}

      {/* Card View (Visible on Mobile) */}
      <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
        {data.length > 0 ? (
          data.map((session) => (
            <div
              key={session._id}
              className="bg-white p-4 rounded-lg shadow-md border"
            >
              <p className="text-lg font-semibold text-blue-600">
                Milking Session Id: {session.milkingSessionId}
              </p>
              <p className="text-gray-700">Start: {session.startTime}</p>
              <p className="text-gray-700">End: {session.endTime}</p>
              <p className="text-gray-700">Duration: {session.duration} sec</p>
              <p className="text-gray-700">Milk Quantity: {session.milkQuantity} L</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No milking sessions found</p>
        )}
      </div>
    </div>
  );
};

export default GetMilkingSessions;
