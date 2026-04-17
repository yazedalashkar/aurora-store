'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import styles from '@/styles/Products.module.css';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    params.set('category', category);
    router.push(`${pathname}?${params.toString()}`);
  };

  const filtered = useMemo(() => {
    if (selectedCategory === 'الكل') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>🛍 تسوق المجموعة</span>
        <h1 className={styles.title}>جميع المنتجات</h1>
        <p className={styles.sub}>
        تصفح منتجاتنا المميزة، لا تتردد في التواصل معنا لأي استفسار
        </p>
      </div>

      <div className={styles.controls}>
        <CategoryFilter selected={selectedCategory} onChange={handleCategoryChange} />
        <div className={styles.count}>
          {filtered.length} {filtered.length === 1 ? 'عنصر' : 'عناصر'}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <span>🔍</span>
          لا توجد منتجات في هذه الفئة
        </div>
      )}
    </div>
  );
}
