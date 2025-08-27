import React from 'react';

interface InputCnpjProps {
    value: string;
    onChange: (newValue: string) => void;
}

const Cnpj: React.FC<InputCnpjProps> = ({ value, onChange }) => {
    const formatCnpj = (cnpj: string) => {
        const numericValue = cnpj.replace(/\D/g, ''); // Remover não números

        if (numericValue.length <= 14) {
            let formattedValue = '';
            for (let i = 0; i < numericValue.length; i++) {
                if (i === 2 || i === 5) {
                    formattedValue += '.';
                } else if (i === 8) {
                    formattedValue += '/';
                } else if (i === 12) {
                    formattedValue += '-';
                }
                formattedValue += numericValue[i];
            }
            return formattedValue;
        }

        return cnpj;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const formattedValue = formatCnpj(inputValue);
        onChange(formattedValue);
    };

    const formattedValue = formatCnpj(value); // Formata o valor inicial

    return (
        <input
            id='inputCnpj'
            type="text"
            value={formattedValue}
            onChange={handleChange}
            placeholder="CNPJ (XX.XXX.XXX/0001-XX)"
            maxLength={18}
            className="mt-2 border rounded p-2 h-8 w-full px-4"
            autoComplete='off'
        />
    );
};

export default Cnpj;
