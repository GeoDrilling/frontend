import { FC } from 'react';
import { Link as ReactLink, LinkProps } from 'react-router-dom';
import classNames from 'classnames';

import styles from '@components/Link/Link.module.css';

const Link: FC<LinkProps> = ({ className, children, ...props }) => {
  return (
    <ReactLink className={classNames(styles.link, className)} {...props}>
      {children}
    </ReactLink>
  );
};

export default Link;
