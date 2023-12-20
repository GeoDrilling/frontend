import React, { useCallback, useState } from 'react';

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

  const whileDragging = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    },
    [offset, isDragging],
  );

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', whileDragging);
      window.addEventListener('mouseup', stopDragging);
    }

    return () => {
      window.removeEventListener('mousemove', whileDragging);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging, offset, whileDragging]);

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        cursor: isDragging ? 'grabbing' : 'grab',
        border: '1px solid black', // Добавление рамки
        wordWrap: 'break-word', // Перенос текста
        padding: '10px', // Отступ внутри модального окна
        backgroundColor: 'white', // Фон модального окна
        zIndex: 1000, // Убедитесь, что модальное окно поверх других элементов
      }}
      onMouseDown={startDragging}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={onClose}>Закрыть</button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DraggableModal;
