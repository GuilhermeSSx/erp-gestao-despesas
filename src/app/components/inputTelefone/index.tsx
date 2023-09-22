import React, { useState, useEffect, ChangeEvent } from 'react';

interface PhoneInputProps {
    value: string;
    onChange: (newValue: string) => void;
}

const InputTelefone: React.FC<PhoneInputProps> = ({ value, onChange }) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        // Formatando o número ao receber o valor inicial
        const numericValue = value.replace(/\D/g, ''); // Remover não números
        
        let formattedValue = '';
        if (numericValue.length > 2) {
            formattedValue += `(${numericValue.substring(0, 2)}) `;
        }
        if (numericValue.length > 7) {
            formattedValue += `${numericValue.substring(2, 7)}-${numericValue.substring(7, 11)}`;
        } else if (numericValue.length > 2) {
            formattedValue += numericValue.substring(2, 7);
        } else {
            formattedValue = numericValue;
        }

        setInputValue(formattedValue);
    }, [value]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Remover não números
        
        let formattedValue = '';
        if (numericValue.length > 2) {
            formattedValue += `(${numericValue.substring(0, 2)}) `;
        }
        if (numericValue.length > 7) {
            formattedValue += `${numericValue.substring(2, 7)}-${numericValue.substring(7, 11)}`;
        } else if (numericValue.length > 2) {
            formattedValue += numericValue.substring(2, 7);
        } else {
            formattedValue = numericValue;
        }

        setInputValue(formattedValue);
        onChange(numericValue); // Passando o número sem formatação para o onChange
    };

    return (
        <input
            id='inputTelefone'
            className='mt-2 border rounded p-2 h-8 w-full px-4'
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="(XX) X XXXX-XXXX"
            maxLength={15}
        />
    );
};

export default InputTelefone;
