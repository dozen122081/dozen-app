'use client'
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { MdAutoDelete } from "react-icons/md";

interface CountdownValues {
  textDay: number;
  textHour: number;
  textMinute: number;
  textSecond: number;
}

interface EventData {
  id: string;
  date: string;
}

const AlertModal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-xl text-white">{message}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const Clock: React.FC = () => {
  const [targetDate, setTargetDate] = useState<string>("2024-12-31T23:59:59");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [countdownValues, setCountdownValues] = useState<CountdownValues>({
    textDay: 0,
    textHour: 0,
    textMinute: 0,
    textSecond: 0,
  });
  const [events, setEvents] = useState<EventData[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false); // State to control alert modal
  const [alertMessage, setAlertMessage] = useState<string>("");

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

  const handleSubmit = () => {
    const existingDate = events.find((event) => event.date === targetDate);
    if (existingDate) {
      setAlertMessage("Same date already exists!");
      setShowAlert(true);
    } else {
      setCountdownValues(calculateCountdown(targetDate));
      setSelectedDate(targetDate);
      setEvents([...events, { id: new Date().getTime().toString(), date: targetDate }]);
    }
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  useEffect(() => {
    if (selectedDate) {
      const interval = setInterval(() => {
        setCountdownValues(calculateCountdown(selectedDate));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [selectedDate]);

  return (
    <>
      <div className="flex justify-center items-center h-[100vh]">
        <div className="flex flex-col gap-10 h-[100vh] w-full py-16 justify-start items-center">
          <div>
            <label className="text-5xl font-bold">CountDown</label>
          </div>
          {selectedDate && (
            <div className={`flex gap-20 text-2xl`}>
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
              <Button onClick={handleSubmit}>Add Date</Button>
            </div>

            <label htmlFor="">Some Events</label>
            <div className="flex flex-col h-[20vh] max-h-[50vh] overflow-auto">
              {events.map((event) => (
                <div key={event.id} className="flex gap-5">
                  <input
                    type="checkbox"
                    onChange={() => setSelectedDate(event.date)}
                    checked={event.date === selectedDate}
                  />
                  <label>{event.date}</label>
                  <button onClick={() => handleDelete(event.id)}>
                    <MdAutoDelete className="text-cyan-900" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showAlert && <AlertModal message={alertMessage} onClose={() => setShowAlert(false)} />}
    </>
  );
};

export default Clock;
