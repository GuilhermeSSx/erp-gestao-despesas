import React, { useState, ChangeEvent } from 'react';

const Moeda: React.FC = () => {
    const [value, setValue] = useState<number>(0);

    const formatCurrency = (rawValue: string) => {
        // Remove tudo que não for número (exceto o ponto decimal, se houver)
        const numericValue = rawValue.replace(/[^\d.]/g, '');

        // Transforma o valor em número
        const floatValue = parseFloat(numericValue);

        return isNaN(floatValue) ? 0 : floatValue;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = formatCurrency(event.target.value);
        setValue(newValue);
    };

    const handleBlur = () => {
        if (isNaN(value)) {
            setValue(0);
        }
    };

    return (
        <input
            className='appearance-none rounded-none relative h-10 block border w-full sm:w-1/5 px-4 py-2 rounded-t-md'
            type='text'
            placeholder='Valor'
            value={value === 0 ? '' : value.toFixed(2).replace('.', ',')}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );
};

export default Moeda;
