'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import styles from '@/styles/CartPage.module.css';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, clearCart, total } = useCart();
  const { addToast } = useToast();

  const handleWhatsApp = () => {
    if (cartItems.length === 0) {
      addToast('Your cart is empty!', 'error');
      return;
    }

    const itemsList = cartItems
      .map((item) => `${item.name} (x${item.qty})`)
      .join(', ');

    const message = `مرحباً، قمت بزيارة موقعك و أريد طلب هذا الاوردر:  ${itemsList}. Total: $${total.toFixed(2)}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/963995787620?text=${encoded}`, '_blank');

    addToast('Opening WhatsApp...', 'success');
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🛍</div>
          <h2>السلة فارغة</h2>
          <p>تصفح منتجاتنا واختر ما يعجبك</p>
          <Link href="/products" className={styles.btnPrimary} style={{ display: 'inline-flex' }}>
            متابعة التسوق →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <span className={styles.eyebrow}>🛒 سلة التسوق</span>
      <h1 className={styles.title}>منتجاتي</h1>

      <div className={styles.layout}>
        <div className={styles.items}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.image_url || item.image || ''} alt={item.name} className={styles.itemImage} />

              <div className={styles.itemInfo}>
                <p className={styles.itemCategory}>{item.category}</p>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
              </div>

              <div className={styles.itemActions}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className={styles.qty}>{item.qty}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove from cart"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h3 className={styles.summaryTitle}>ملخص الطلب</h3>

          <div className={styles.summaryRow}>
            <span>الإجمالي الفرعي</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>الشحن</span>
            <span>مجاني</span>
          </div>

          <div className={styles.summaryDivider} />

          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>الإجمالي</span>
            <span className={styles.totalAmount}>${total.toFixed(2)}</span>
          </div>

          <button className={styles.whatsappBtn} onClick={handleWhatsApp}>
            <span>💬</span>
            إرسال الطلب عبر واتساب
          </button>

          <button className={styles.clearBtn} onClick={clearCart}>
            تفريغ السلة
          </button>
        </div>
      </div>
    </div>
  );
}
