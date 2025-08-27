import React, { ChangeEvent, useState, InputHTMLAttributes } from 'react';

type InputDateProps = InputHTMLAttributes<HTMLInputElement>;

const InputDate: React.FC<InputDateProps> = (props) => {
    const [selectedDate, setSelectedDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().slice(0, 10);
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    return (
        <input
            className='m-1 appearance-none rounded-none relative h-8 block border w-[10rem] px-4 py-2 rounded-t-md'
            type='date'
            value={selectedDate}
            onChange={handleChange}
            {...props}
        />
    );
};

export default InputDate;
