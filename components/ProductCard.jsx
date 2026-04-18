'use client';

import { useState } from 'react';
import ProductModal from './ProductModal';
import styles from '@/styles/ProductCard.module.css';

export default function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const price = Number(product.price ?? 0);
  const originalPrice = product.originalPrice != null ? Number(product.originalPrice) : null;
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;
  const imageUrl = product.image_url || '';

  return (
    <>
      <div className={styles.card} onClick={handleCardClick}>
        <div className={styles.imageWrap}>
          <img
            src={imageUrl}
            alt={product.name}
            className={styles.image}
          />
          {product.badge && (
            <div className={`${styles.badge} ${styles[product.badge]}`}>
              {product.badge}
            </div>
          )}
        </div>

        <div className={styles.body}>
          <p className={styles.category}>{product.category}</p>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.desc}>{product.description}</p>

          <div className={styles.priceRow}>
            <div className={styles.prices}>
              <span className={styles.price}>${price.toFixed(2)}</span>
              {originalPrice != null && (
                <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
              )}
              {discount && (
                <span className={styles.discount} style={{ marginLeft: '0.4rem', color: '#e05555', fontSize: '0.8125rem', fontWeight: 600 }}>
                  -{discount}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
