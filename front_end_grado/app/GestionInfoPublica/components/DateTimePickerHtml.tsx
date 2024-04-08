import React, { useState } from 'react';

interface DateTimePickerProps {
    title: string;
    onChange:(dateTime: string) => void;
    dateValue: string;
}

const DateTimePickerHtml: React.FC<DateTimePickerProps> = ({ title , onChange, dateValue}) => {
    const [meetingTime, setMeetingTime] = useState<string>(dateValue);

    // Get current date and time
    const now = new Date();
    now.setDate(now.getDate() - 1); // Subtract one day
    const minTimestamp = now.toISOString().slice(0, 16); // Format to 'YYYY-MM-DDTHH:MM'

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDateTime = event.target.value;
        setMeetingTime(event.target.value);
        onChange(newDateTime);
    };

    return (
        <>
            <label htmlFor="meeting-time">{title}</label>
            <input
                className="appearance-none border rounded shadow py-3 px-2 text-gray-500"
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
                value={meetingTime}
                onChange={handleTimeChange}
                min={minTimestamp}
            />
        </>
    );
};

export default DateTimePickerHtml;
