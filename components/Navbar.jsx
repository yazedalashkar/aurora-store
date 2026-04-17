'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from '@/styles/Navbar.module.css';

export default function Navbar() {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoName}>Aurora Store</span>
          <span className={styles.logoTagline}>منتجات راقية تناسبكم</span>
        </Link>

        <div className={styles.nav}>
          <Link href="/" className={styles.navLink}>الرئيسية</Link>
          <Link href="/products" className={styles.navLink}>المتجر</Link>
          <Link href="/about" className={styles.navLink}>حول</Link>
          <Link href="/contact" className={styles.navLink}>اتصل بنا</Link>
        </div>

        <div className={styles.actions}>
          <Link href="/cart" className={styles.cartBtn}>
            <span className={styles.cartIcon}>🛍</span>
            السلة
            {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
          </Link>
        </div>

        <button
          className={styles.menuBtn}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <Link href="/" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
          الرئيسية
        </Link>
        <Link href="/products" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
          المتجر
        </Link>
        <Link href="/about" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
          حول
        </Link>
        <Link href="/contact" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
          اتصل بنا
        </Link>
        <Link href="/cart" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
          السلة {itemCount > 0 && `(${itemCount})`}
        </Link>
      </div>
    </nav>
  );
}
