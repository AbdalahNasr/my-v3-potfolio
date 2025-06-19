"use client";
import { useEffect } from 'react';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;
    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    document.addEventListener('mousemove', move);
    return () => document.removeEventListener('mousemove', move);
  }, []);

  return <div id="custom-cursor" className={styles.cursor}></div>;
}
