import { useState } from "react";

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function CalendarBox({ selectedDate, setSelectedDate, todos }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const startDate = new Date(year, month, 1 - firstDay.getDay());

  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });

  const moveMonth = (direction) => {
    setCurrentMonth(new Date(year, month + direction, 1));
  };

  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={() => moveMonth(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-500"
        >
          ‹
        </button>

        <h2 className="text-lg font-bold text-gray-900">
          {year}년 {month + 1}월
        </h2>

        <button
          onClick={() => moveMonth(1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-500"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="text-xs font-semibold text-gray-400">
            {day}
          </div>
        ))}

        {calendarDays.map((date) => {
          const dateKey = getDateKey(date);
          const isCurrentMonth = date.getMonth() === month;
          const isSelected = selectedDate === dateKey;
          const hasTodo = todos.some((todo) => todo.date === dateKey);

          return (
            <button
              key={dateKey}
              onClick={() => setSelectedDate(dateKey)}
              className={`relative flex h-10 items-center justify-center rounded-full text-sm font-semibold transition ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : isCurrentMonth
                  ? "text-gray-800 hover:bg-blue-50"
                  : "text-gray-300"
              }`}
            >
              {date.getDate()}

              {hasTodo && (
                <span
                  className={`absolute bottom-1 h-1 w-1 rounded-full ${
                    isSelected ? "bg-white" : "bg-blue-500"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarBox;