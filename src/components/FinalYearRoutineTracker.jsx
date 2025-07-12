// src/components/FinalYearRoutineTracker.jsx

import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import finalYearSchedule from "../finalYearSchedule";

const dailySchedule = finalYearSchedule;

const FinalYearRoutineTracker = () => {
  const [progress, setProgress] = useState({});
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fyr_progress") || "{}");
    setProgress(saved);
    const savedTheme = localStorage.getItem("fyr_theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("fyr_progress", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("fyr_theme", theme);
  }, [theme]);

  const toggleTask = (day, key) => {
    const today = new Date().toISOString().split("T")[0];
    setProgress(prev => ({
      ...prev,
      [`${day}_${key}_${today}`]: !prev[`${day}_${key}_${today}`],
    }));
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const chartData = Object.keys(dailySchedule).map(day => {
    const total = dailySchedule[day].length;
    const done = dailySchedule[day].filter(
      t => progress[`${day}_${t.key}_${todayStr}`]
    ).length;
    return { day: day.slice(0, 3), done, total };
  });

  const isPerfectDay =
    chartData.find(c => c.day === new Date().toDateString().slice(0, 3))?.done ===
    chartData.find(c => c.day === new Date().toDateString().slice(0, 3))?.total;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📅 Final Year Tracker</h1>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      <BarChart width={500} height={200} data={chartData} className="my-4">
        <XAxis dataKey="day" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="done" fill="#4caf50" />
      </BarChart>

      {isPerfectDay && (
        <div className="my-4 p-4 bg-green-100 text-green-800 rounded">
          🎉 Perfect day! All tasks completed.
        </div>
      )}

      <Tabs defaultValue="Monday">
        <TabsList className="grid grid-cols-7 gap-1">
          {Object.keys(dailySchedule).map(day => (
            <TabsTrigger key={day} value={day}>
              {day}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(dailySchedule).map(([day, tasks]) => (
          <TabsContent key={day} value={day} className="mt-4">
            {tasks.map(({ task, key, icon }) => (
              <Card key={key} className="my-2">
                <CardContent className="flex items-center space-x-4">
                  <Checkbox
                    checked={!!progress[`${day}_${key}_${todayStr}`]}
                    onCheckedChange={() => toggleTask(day, key)}
                  />
                  {icon && <span>{icon}</span>}
                  <span
                    className={
                      progress[`${day}_${key}_${todayStr}`]
                        ? "line-through"
                        : ""
                    }
                  >
                    {task}
                  </span>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <button
        className="mt-6 p-2 border rounded bg-blue-200 hover:bg-blue-300"
        onClick={() =>
          Notification.requestPermission().then(
            p =>
              p === "granted" &&
              new Notification("📌 Check your routine today!")
          )
        }
      >
        Enable Daily Reminder 🔔
      </button>
    </div>
  );
};

export default FinalYearRoutineTracker;
