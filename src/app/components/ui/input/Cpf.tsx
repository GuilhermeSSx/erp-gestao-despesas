import React from 'react';

interface InputCpfProps {
    value: string;
    onChange: (newValue: string) => void;
}

const Cpf: React.FC<InputCpfProps> = ({ value, onChange }) => {
    const formatCpf = (cpf: string) => {
        const numericValue = cpf.replace(/\D/g, ''); // Remover não números

        if (numericValue.length <= 11) {
            let formattedValue = '';
            for (let i = 0; i < numericValue.length; i++) {
                if (i === 3 || i === 6) {
                    formattedValue += '.';
                } else if (i === 9) {
                    formattedValue += '-';
                }
                formattedValue += numericValue[i];
            }
            return formattedValue;
        }

        return cpf;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const formattedValue = formatCpf(inputValue);
        onChange(formattedValue);
    };

    const formattedValue = formatCpf(value); // Formata o valor inicial

    return (
        <input
            id='inputCpf'
            type="text"
            value={formattedValue}
            onChange={handleChange}
            placeholder="CPF (XXX.XXX.XXX-XX)"
            maxLength={14}
            className="mt-2 border rounded p-2 h-8 w-full px-4"
            autoComplete='off'
        />
    );
};

export default Cpf;
