'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import styles from '@/styles/ProductModal.module.css';

export default function ProductModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    addToast(`تم إضافة ${product.name} إلى السلة!`, 'success');
    onClose();
  };

  const handleImageClick = () => {
    setIsImageZoomed(!isImageZoomed);
  };

  const price = Number(product.price ?? 0);
  const originalPrice = product.originalPrice != null ? Number(product.originalPrice) : null;
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;
  const imageUrl = product.image_url || '';

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          ×
        </button>

        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img
              src={imageUrl}
              alt={product.name}
              className={`${styles.image} ${isImageZoomed ? styles.zoomed : ''}`}
              onClick={handleImageClick}
            />
            {product.badge && (
              <div className={`${styles.badge} ${styles[product.badge]}`}>
                {product.badge}
              </div>
            )}
          </div>

          <div className={styles.details}>
            <p className={styles.category}>{product.category}</p>
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.priceSection}>
              <div className={styles.prices}>
                <span className={styles.price}>${price.toFixed(2)}</span>
                {originalPrice != null && (
                  <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
                )}
                {discount && (
                  <span className={styles.discount}>-{discount}%</span>
                )}
              </div>
            </div>

            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
              إضافة إلى السلة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}