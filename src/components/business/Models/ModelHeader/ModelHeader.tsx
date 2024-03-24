import { FC } from 'react';
import styles from './ModelHeader.module.css';
import classNames from 'classnames';
interface ModelHeaderProps {
  title: string;
  leftImage?: string;
  leftImageClassName?: string;
  onLeftClick?: () => void;
  rightImage?: string;
  onRightClick?: () => void;
  titleImage?: string;
  onTitleClick?: () => void;
  rightImageClassName?: string;
}
const ModelHeader: FC<ModelHeaderProps> = ({
  title,
  titleImage,
  rightImage,
  leftImage,
  leftImageClassName,
  onLeftClick,
  onTitleClick,
  onRightClick,
  rightImageClassName,
}) => {
  return (
    <div className={styles.container}>
      {leftImage ? (
        <img
          src={leftImage}
          alt='arrow'
          onClick={onLeftClick}
          className={classNames(styles.leftArrow, leftImageClassName)}
        />
      ) : undefined}
      <h1 className={classNames(styles.text, styles.title)}>
        {title}
        {titleImage ? <img src={titleImage} alt='edit' onClick={onTitleClick} className={styles.edit} /> : undefined}
      </h1>
      {rightImage ? (
        <div className={styles.rightArrowBox}>
          <img
            src={rightImage}
            alt='arrow'
            onClick={onRightClick}
            className={classNames(styles.rightArrow, rightImageClassName)}
          />
        </div>
      ) : undefined}
    </div>
  );
};

export default ModelHeader;
