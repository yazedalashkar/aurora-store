'use client';

import { categories } from '@/data/products';
import styles from '@/styles/Products.module.css';

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className={styles.filterRow}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.filterBtn} ${selected === cat ? styles.active : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
