'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import HeroSection from '@/components/HeroSection';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [stats] = useState([
    { number: '50+', label: 'عملاء سعداء' },
    { number: '80+', label: 'قطع مباعة' },
    { number: '100%', label: 'معدل الرضا' },
  ]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true })
        .limit(4);

      setLoading(false);
      if (error) {
        setFeaturedProducts([]);
        return;
      }

      setFeaturedProducts(data || []);
    };

    fetchFeatured();
  }, []);

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

        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            جاري تحميل المنتجات...
          </div>
        ) : (
          <>
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
          </>
        )}
      </section>
    </>
  );
}
