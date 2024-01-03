import React, { useState, useRef } from 'react';

const emailDomains = ['@hotmail.com', '@outlook.com', '@gmail.com', '@gmail.com.br'];

interface InputEmailProps {
    value?: string;
    onChange?: (value: string) => void;
}

const InputEmail: React.FC<InputEmailProps> = ({ value = '', onChange }) => {
    const [inputValue, setInputValue] = useState(value);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);

        if (onChange) {
            onChange(newValue);
        }

        if (newValue.includes('@')) {
            const parts = newValue.split('@');
            setShowOptions(parts.length === 2 && parts[0].length > 0);
            setSelectedOptionIndex(null);
        } else {
            setShowOptions(false);
        }
    };

    const handleOptionClick = (option: string) => {
        const parts = option.split('@');
        setInputValue(parts[0] + '@' + parts[1]);
        setShowOptions(false);
        setSelectedOptionIndex(null);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedOptionIndex(prev =>
                prev === null ? 0 : Math.min(prev + 1, emailDomains.length - 1)
            );

            if (optionsRef.current && selectedOptionIndex !== null) {
                const liElement = optionsRef.current.querySelector(
                    `li:nth-child(${selectedOptionIndex + 1})`
                );
                liElement?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedOptionIndex(prev =>
                prev === null ? emailDomains.length - 1 : Math.max(prev - 1, 0)
            );

            if (optionsRef.current && selectedOptionIndex !== null) {
                const liElement = optionsRef.current.querySelector(
                    `li:nth-child(${selectedOptionIndex + 1})`
                );
                liElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (event.key === 'Enter' && selectedOptionIndex !== null) {
            event.preventDefault();
            const selectedOption = inputValue.split('@')[0] + emailDomains[selectedOptionIndex];
            setInputValue(selectedOption);
            setShowOptions(false);
            setSelectedOptionIndex(null);
        }
    };

    return (
        <div className="w-full relative mt-2 z-20">
            <input
                id='inputEmail'
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                maxLength={60}
                placeholder="Digite o e-mail..."
                className="border rounded p-2 h-8 w-full px-4"
                autoComplete='off'
            />
            {showOptions && (
                <ul className="mt-[2px] border rounded py-1 px-2 w-full absolute bg-white shadow overflow-auto h-[140px]" ref={optionsRef}>
                    {emailDomains.map((option, index) => (
                        <li
                            key={option}
                            className={`cursor-pointer p-1 ${index === selectedOptionIndex ? 'bg-blue-200' : 'hover:bg-gray-100'}`}
                            onClick={() => handleOptionClick(inputValue.split('@')[0] + option)}
                        >
                            {inputValue.split('@')[0] + option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default InputEmail;
