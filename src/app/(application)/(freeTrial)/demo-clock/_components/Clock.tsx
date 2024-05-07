"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { MdAutoDelete } from "react-icons/md";

interface CountdownValues {
  textDay: number;
  textHour: number;
  textMinute: number;
  textSecond: number;
}

interface DateData {
  _id: string;
  date: string;
}

const Clock: React.FC = () => {
  const [targetDate, setTargetDate] = useState<string>("2025-01-01T00:00:00");
  const [dbDate, setDbDate] = useState<DateData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [countdownValues, setCountdownValues] = useState<CountdownValues>({
    textDay: 0,
    textHour: 0,
    textMinute: 0,
    textSecond: 0,
  });

  const calculateCountdown = (date: string): CountdownValues => {
    const targetTime = new Date(date).getTime();
    const currentTime = new Date().getTime();
    const gap = targetTime - currentTime;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    return { textDay, textHour, textMinute, textSecond };
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/handleDate");

      if (response.ok) {
        
        const data: DateData[] = await response.json();
        setDbDate(data);
        if (data.length > 0) {
          setSelectedDate(data[data.length - 1].date); // Set selectedDate to the first item in dbData
        }
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

    
  const handleSubmit = async () => {
    if (dbDate.some((date) => date.date === targetDate)) {
      alert("Same date already exists!");
      return;
    }

    try {
      const response = await fetch("api/handleDate", {
        method: "POST",
        body: JSON.stringify({ targetDate }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("error submitting date");
      }
      fetchData();
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/handleDate`, {
        method: "DELETE",
        body: JSON.stringify({ id: id }), // Send _id in the request body
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("Data deleted successfully");
        // Remove the deleted item from the state
        setDbDate(dbDate.filter((item) => item._id !== id));
        setSelectedDate(null);
      } else {
        console.error("Failed to delete data:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDate !== null) {
      const interval = setInterval(() => {
        setCountdownValues(calculateCountdown(selectedDate));
        if (countdownValues.textDay < 0) {
          alert("The selected date is in the past!");
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      // Reset countdown values when selectedDate is null
      setCountdownValues({
        textDay: 0,
        textHour: 0,
        textMinute: 0,
        textSecond: 0,
      });
    }
  }, [selectedDate]);


  return (
    <>
      <div className="flex justify-center items-center h-[100vh">
        <div className="flex flex-col gap-10 h-[100vh] w-full py-16 justify-start items-center ">
          <div>
            <label className="text-5xl font-bold">CountDown</label>
          </div>
          {countdownValues.textDay < 0 ? (
            <>
              <h2 className="text-2xl">Congratulations!</h2>
              <p>Enter new date</p>
            </>
          ) : (

            <div className={`flex gap-20 text-2xl `}>
              <span>
                Day <br /> {countdownValues.textDay}
              </span>
              <span>
                Hour <br /> {countdownValues.textHour}
              </span>
              <span>
                Minute <br /> {countdownValues.textMinute}
              </span>
              <span>
                Second <br /> {countdownValues.textSecond}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-5 w-[40%] p-10 border-2 text-xl">
            <label>Enter Target Date:</label>
            <input
                className="w-[100%] rounded-lg pt-3 text-center bg-blue-400 text-black-800"
                type="datetime-local"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                placeholder="Enter custom date (e.g., YYYY-MM-DD HH:MM:SS)"
            />
            <div className="flex justify-center items-center">
              <Button onClick={handleSubmit}>
                Add Date
              </Button>
            </div>

            <label htmlFor="">Some Events</label>
            <div className="flex flex-col h-[20vh] max-h-[50vh] overflow-auto">
              {dbDate.map((date) => (
                <div key={date._id} className="flex gap-5">
                  <input
                    type="checkbox"
                    onChange={() => setSelectedDate(date.date)}
                    checked={date.date === selectedDate}
                  />
                  <label>{date.date}</label>
                  <button onClick={() => handleDelete(date._id)}>
                    <MdAutoDelete className=" text-cyan-900" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clock;
