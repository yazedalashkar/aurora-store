'use client';

import styles from '@/styles/Products.module.css';

export default function CategoryFilter({ selected, onChange, categories = [] }) {
  return (
    <div className={styles.filterRow}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.filterBtn} ${selected === cat ? styles.active : ''}`}
          onClick={() => onChange(cat)}
          type="button"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
