import { ComponentProps, useState, useEffect } from 'react';

export type ComboProps = ComponentProps<'input'>;

export interface Item {
    itemId: number;
    itemNome: string;
}

interface ComboBoxProps extends ComboProps {
    data: Item[];
    selectValue: string | null;
    onItemSelect: (itemId: number | null) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({ className, data, selectValue, onItemSelect, ...props }) => {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null); // Alterado para armazenar o objeto Item completo
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    // console.log( selectedItem?.itemNome, selectedItem?.itemId);

    useEffect(() => {
        setInputValue(selectValue || '');
        setSelectedItem(data.find(item => item.itemNome === selectValue) || null); // Alterado para encontrar o objeto Item correspondente
    }, [selectValue, data]);

    const filteredData = data.filter((item) =>
        item && item.itemNome && item.itemNome.toLowerCase().includes(inputValue.toLowerCase())
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setIsOpen(true);

        if (selectedItem && !newValue.toLowerCase().includes(selectedItem.itemNome.toLowerCase())) {
            // Se o valor de entrada não contiver mais o nome do item selecionado,
            // desmarque o item selecionado.
            setSelectedItem(null);
            onItemSelect(null);
        }

        setFocusedIndex(null);
    };

    const handleItemClick = (item: Item) => { // Alterado para receber o objeto Item
        setInputValue(item.itemNome);
        setIsOpen(false);
        setSelectedItem(item); // Armazena o objeto Item completo
        setFocusedIndex(null);
        onItemSelect(item.itemId);
    };

    const handleBlur = () => {
        setIsOpen(false);
        setFocusedIndex(null);
    };

    const handleInputClick = () => {
        if (selectedItem === null || inputValue.toLowerCase() !== selectedItem.itemNome.toLowerCase()) {
            setIsOpen(true);
        }
    };

    const handleItemMouseDown = (e: React.MouseEvent<HTMLLIElement>, item: Item, index: number) => { // Alterado para receber o objeto Item
        e.preventDefault();
        handleItemClick(item);
    };

    const handleClearInput = () => {
        setInputValue('');
        setSelectedItem(null);
        onItemSelect(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (focusedIndex === null) {
                setFocusedIndex(0);
            } else if (focusedIndex < filteredData.length - 1) {
                setFocusedIndex(focusedIndex + 1);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (focusedIndex === null) {
                setFocusedIndex(filteredData.length - 1);
            } else if (focusedIndex > 0) {
                setFocusedIndex(focusedIndex - 1);
            }
        } else if (e.key === 'Enter') {
            if (focusedIndex !== null && focusedIndex >= 0 && focusedIndex < filteredData.length) {
                handleItemClick(filteredData[focusedIndex]); // Alterado para passar o objeto Item
            }
        }
    };

    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                className="border ... rounded px-2 py-1"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                onClick={handleInputClick}
                {...props}
            />
            {selectedItem && inputValue.trim() !== '' && (
                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={handleClearInput}
                >
                    X
                </button>
            )}
            {isOpen && (
                <ul className="absolute left-0 mt-[4px] z-50 bg-white border border-gray-300 h-[136px] overflow-auto rounded ... w-full">
                    {filteredData.map((item, index) => (
                        <li
                            key={item.itemId} // Usar o campo de ID único do objeto Item
                            className={`cursor-pointer px-2 py-1 ${selectedItem === item ? 'bg-blue-100' : ''
                                } ${focusedIndex === index ? 'bg-gray-200' : ''}`}
                            onMouseDown={(e) => handleItemMouseDown(e, item, index)} // Alterado para passar o objeto Item
                            onMouseEnter={() => setFocusedIndex(index)}
                        >
                            {item.itemNome} {/* Usar o campo itemNome do objeto Item */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ComboBox;
