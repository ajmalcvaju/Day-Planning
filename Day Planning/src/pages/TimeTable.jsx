import React, { useState, useEffect } from "react";
import Header from "./Header";

const shifts = [
  { title: "Morning Shift", time: "8:00 AM - 2:00 PM" },
  { title: "Afternoon Shift", time: "2:30 PM - 6:30 PM" },
  { title: "Overtime", time: "7:00 PM - 9:00 PM" },
];

const formatDateKey = (date = new Date()) => {
  return date.toISOString().split("T")[0]; // yyyy-mm-dd
};

const TimeTable = () => {
    const [attendance, setAttendance] = useState(() => {
        try {
          const stored = localStorage.getItem("attendance");
          return stored ? JSON.parse(stored) : {}; // Default to empty object if not found
        } catch (error) {
          console.error("Failed to parse attendance from localStorage", error);
          return {}; // Fallback to empty object on error
        }
      });
  const [selectedDate, setSelectedDate] = useState(formatDateKey());

  useEffect(() => {
    try {
      const stored = localStorage.getItem("attendance");
      console.log(stored);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === "object" && parsed !== null) {
          setAttendance(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to parse attendance from localStorage", error);
      setAttendance({});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
    console.log(attendance);
  }, [attendance]);

  const toggleAttendance = (title) => {
    const todayKey = formatDateKey();
    const currentDayAttendance = attendance[todayKey] || {};
    const updatedDayAttendance = {
      ...currentDayAttendance,
      [title]: !currentDayAttendance[title],
    };

    setAttendance({
      ...attendance,
      [todayKey]: updatedDayAttendance,
    });
  };

  const selectedDayAttendance = attendance[selectedDate] || {};

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const allDates = Object.keys(attendance).sort().reverse();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 flex flex-col items-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-4xl mb-8">
          <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
            🗓️ Time Table - {todayFormatted}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shifts.map(({ title, time }) => {
              const isMarked = attendance[formatDateKey()]?.[title] ?? false;

              return (
                <div
                  key={title}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold text-blue-800 mb-2">
                    {title}
                  </h2>
                  <p className="text-gray-700 mb-4">{time}</p>
                  <button
                    onClick={() => toggleAttendance(title)}
                    className={`px-4 py-2 rounded-lg transition hover:cursor-pointer ${
                      isMarked
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isMarked ? "Remove Attendance" : "Mark Attendance"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Show Attendance Records */}
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
            📋 View Attendance by Date
          </h2>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mb-4 px-4 py-2 rounded border border-blue-300 w-full"
          >
            {allDates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </select>

          <div className="space-y-3">
            {shifts.map(({ title }) => (
              <div
                key={title}
                className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg"
              >
                <span className="text-gray-800">{title}</span>
                <span
                  className={
                    selectedDayAttendance[title]
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {selectedDayAttendance[title] ? "✅ Marked" : "❌ Not Marked"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeTable;
