"use client";
import { useEffect, useState } from 'react';
import styles from './ScrollbarIndicator.module.scss';

export default function ScrollbarIndicator() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollPosition / documentHeight) * 100;
      setHeight(scrollPercentage);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.scrollbarIndicator} style={{ height: `${height}%` }} />
  );
}
