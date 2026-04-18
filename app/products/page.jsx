'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import styles from '@/styles/Products.module.css';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['الكل']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      setLoading(false);
      if (error) {
        setProducts([]);
        setCategories(['الكل']);
        return;
      }

      const loadedProducts = data || [];
      setProducts(loadedProducts);
      const uniqueCategories = Array.from(
        new Set(loadedProducts.map((product) => product.category).filter(Boolean))
      );
      setCategories(['الكل', ...uniqueCategories]);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory !== 'الكل' && !categories.includes(selectedCategory)) {
      setSelectedCategory('الكل');
    }
  }, [categories, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    params.set('category', category);
    router.push(`${pathname}?${params.toString()}`);
  };

  const filtered = useMemo(() => {
    if (selectedCategory === 'الكل') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, products]);

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
        <CategoryFilter selected={selectedCategory} onChange={handleCategoryChange} categories={categories} />
        <div className={styles.count}>
          {filtered.length} {filtered.length === 1 ? 'عنصر' : 'عناصر'}
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
          جاري تحميل المنتجات...
        </div>
      ) : filtered.length > 0 ? (
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
