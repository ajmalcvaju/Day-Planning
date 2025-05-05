import React, { useState, useEffect } from "react";
import Header from "./Header";

const formatDateKey = (date = new Date()) => date.toISOString().split("T")[0];

const DoList = () => {
  // Fix: use "task" consistently across localStorage
  const [tasks, setTasks] = useState(
    localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : {}
  );

  const [selectedDate, setSelectedDate] = useState(formatDateKey());
  const [newTask, setNewTask] = useState({
    task: "",
    time: "",
    status: "Pending",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Fix: Use "task" for localStorage to ensure consistency
    localStorage.setItem("task", JSON.stringify(tasks));
  }, [tasks]);

  // Removed the incorrect useEffect: localStorage.removeItem
  // Instead, you can use it directly when you want to clear localStorage (e.g. on logout)
  // useEffect(() => {
  //   localStorage.removeItem("task");
  // }, []);

  const handleAddOrUpdate = () => {
    if (!newTask.task || !newTask.time) return;

    const currentTasks = tasks[selectedDate] || [];

    if (editIndex !== null) {
      currentTasks[editIndex] = newTask;
    } else {
      currentTasks.push(newTask);
    }

    setTasks({ ...tasks, [selectedDate]: currentTasks });
    setNewTask({ task: "", time: "", status: "Pending" });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const currentTasks = tasks[selectedDate] || [];
    currentTasks.splice(index, 1);
    setTasks({ ...tasks, [selectedDate]: currentTasks });
  };

  const handleEdit = (index) => {
    setNewTask(tasks[selectedDate][index]);
    setEditIndex(index);
  };

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const allDates = Object.keys(tasks).sort().reverse();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-orange-800 mb-6">
          📝 Task Manager - {todayFormatted}
        </h1>

        {/* Task Form */}
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Task Name"
              value={newTask.task}
              onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="time"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              className="border px-4 py-2 rounded w-full"
            />
            <select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
              className="border px-4 py-2 rounded w-full"
            >
              <option>Pending</option>
              <option>Success</option>
              <option>Failure</option>
            </select>
          </div>
          <button
            onClick={handleAddOrUpdate}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded hover:cursor-pointer"
          >
            {editIndex !== null ? "Update Task" : "Add Task"}
          </button>
        </div>

        {/* Date Selector */}
        <div className="bg-white p-4 rounded-xl shadow w-full max-w-2xl mb-6">
          <label className="block mb-2 font-semibold text-orange-700">
            📅 Select Date
          </label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          >
            {[
              formatDateKey(),
              ...allDates.filter((d) => d !== formatDateKey()),
            ].map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        {/* Task List */}
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-orange-800 mb-4 text-center">
            📋 Tasks for Selected Date
          </h2>
          {(tasks[selectedDate] || []).length === 0 ? (
            <p className="text-center text-gray-500">No tasks for this day.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-orange-100 text-orange-800">
                  <th className="py-2 px-4 border">Task</th>
                  <th className="py-2 px-4 border">Time</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks[selectedDate].map((t, idx) => (
                  <tr key={idx} className="hover:bg-orange-50">
                    <td className="py-2 px-4 border">{t.task}</td>
                    <td className="py-2 px-4 border">{t.time}</td>
                    <td
                      className={`py-2 px-4 border font-semibold ${
                        t.status === "Success"
                          ? "text-green-600"
                          : t.status === "Failure"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {t.status}
                    </td>
                    <td className="py-2 px-4 border space-x-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(idx)}
                          className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition duration-200 shadow-md hover:cursor-pointer"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition duration-200 shadow-md hover:cursor-pointer"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default DoList;
