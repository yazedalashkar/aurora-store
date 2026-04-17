'use client';

import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import styles from '@/styles/ProductCard.module.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    addToast(`تم إضافة ${product.name} إلى السلة!`, 'success');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
        />
        {product.badge && (
          <div className={`${styles.badge} ${styles[product.badge]}`}>
            {product.badge}
          </div>
        )}
        <div className={styles.overlay}>
          <button className={styles.quickAdd} onClick={handleAdd}>
            إضافة سريعة إلى السلة
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{product.description}</p>

        <div className={styles.priceRow}>
          <div className={styles.prices}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
            )}
            {discount && (
              <span className={styles.discount} style={{ marginLeft: '0.4rem', color: '#e05555', fontSize: '0.8125rem', fontWeight: 600 }}>
                -{discount}%
              </span>
            )}
          </div>
          <button
            className={styles.addBtn}
            onClick={handleAdd}
            aria-label="Add to cart"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
