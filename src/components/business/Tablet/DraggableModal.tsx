import React, { useState } from 'react';

interface DraggableModalProps {
    children: React.ReactNode;
    initialX?: number;
    initialY?: number;
    onClose: () => void;
}

const DraggableModal: React.FC<DraggableModalProps> = ({ children, initialX = 0, initialY = 0, onClose }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const startDragging = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
        setIsDragging(true);
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    const whileDragging = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y
            });
        }
    };

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', whileDragging);
            window.addEventListener('mouseup', stopDragging);
        }

        return () => {
            window.removeEventListener('mousemove', whileDragging);
            window.removeEventListener('mouseup', stopDragging);
        };
    }, [isDragging, offset]);

    return (
        <div
            style={{
                position: 'fixed',
                top: position.y,
                left: position.x,
                cursor: isDragging ? 'grabbing' : 'grab',
                border: '1px solid black', // Добавление рамки
                maxWidth: '400px', // Фиксированная ширина
                maxHeight: '300px', // Фиксированная высота
                overflowY: 'auto', // Прокрутка, если содержимое превышает высоту
                wordWrap: 'break-word', // Перенос текста
                padding: '10px', // Отступ внутри модального окна
                backgroundColor: 'white', // Фон модального окна
                zIndex: 1000 // Убедитесь, что модальное окно поверх других элементов
            }}
            onMouseDown={startDragging}
        >
            <div style={{ position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: 0, right: 0, zIndex: 1001 }}>Закрыть</button>
                <div style={{ paddingTop: '30px' }}>{children}</div>
            </div>
        </div>
    );
};

export default DraggableModal;
