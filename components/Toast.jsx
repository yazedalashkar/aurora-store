'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/context/ToastContext';
import styles from '@/styles/Toast.module.css';

function ToastItem({ toast, onClose }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 250);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  return (
    <div className={`${styles.toast} ${styles[toast.type]} ${isExiting ? styles.exiting : ''}`}>
      <div className={styles.icon}>{icons[toast.type] || '✓'}</div>
      <p className={styles.message}>{toast.message}</p>
      <button className={styles.close} onClick={() => setIsExiting(true)}>×</button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
