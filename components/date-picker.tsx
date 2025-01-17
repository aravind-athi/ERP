import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export function CustomDatePicker() {
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        dateFormat="MMMM d, yyyy"
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {startDate && (
        <p className="mt-2">Selected date: {startDate.toLocaleDateString()}</p>
      )}
    </div>
  )
}

