'use client';

import Link from 'next/link';
import { useState } from 'react';
import { featuredProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import HeroSection from '@/components/HeroSection';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [stats] = useState([
    { number: '50+', label: 'عملاء سعداء' },
    { number: '80+', label: 'قطع مباعة' },
    { number: '100%', label: 'معدل الرضا' },
  ]);

  return (
    <>
      <HeroSection />

      <section className={styles.statsRow}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statNumber}>{stat.number}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </section>

      <section className={styles.section} id="featured">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>✨ مجموعة مختارة</span>
          <h2 className={styles.sectionTitle}>القطع المميزة</h2>
          
        </div>

        <div className={styles.featuredGrid}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link href="/products?category=الكل" className={styles.btnPrimary}>
            عرض جميع المنتجات ←
          </Link>
        </div>
      </section>
    </>
  );
}
