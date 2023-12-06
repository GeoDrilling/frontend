import styles from './DotNavigation.module.css';

interface DotNavigationProps {
  count: number;
  activeIndex: number; // Добавлено новое свойство
  onDotClick: (index: number) => void;
}

const DotNavigation: React.FC<DotNavigationProps> = ({ count, activeIndex, onDotClick }) => {
  const handleDotClick = (index: number) => {
    onDotClick(index);
  };

  return (
    <div className={styles.dotNavigation}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          className={`${styles.dotButton} ${activeIndex === index ? styles.active : ''}`}
          onClick={() => handleDotClick(index)}
        />
      ))}
    </div>
  );
};

export default DotNavigation;
