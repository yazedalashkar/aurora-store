import styles from '@/styles/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logoName}>Aurora Store</div>
            <p>
              قطع و منتجات مختارة بعناية لتناسب جميع الاذواق، مرحبا بكم في متجري البسيط، أتشكّر زيارتكم!
            </p>
            <div className={styles.social}>
              <a href="https://www.instagram.com/aurorastore1458" className={styles.socialLink} aria-label="Instagram">📷</a>
              <a href="https://wa.me/963995787620" className={styles.socialLink} aria-label="TikTok">📞</a>
              <a href="https://www.facebook.com/ghinwa.m.saleh.2025" className={styles.socialLink} aria-label="Facebook">👍</a>
            </div>
          </div>

          <div className={styles.col}>
            <h4>المتجر</h4>
            <ul>
              <li><a href="/products?category=الكل">جميع المنتجات</a></li>
              <li><a href="/products?category=خواتم">خواتم</a></li>
              <li><a href="/products?category=Necklaces">قلادات</a></li>
              <li><a href="/products?category=Gifts">هدايا</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.disclaimer}>
          <p>
            <strong>شي إن : </strong>  هذه المنتجات تحت رعاية متجر شي إن الالكتروني  
          </p>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {currentYear} غنوة صالح || جميع الحقوق محفوظة  <span className={styles.heart}> ❤ </span>
          </p>
          <p>مصنوع بحب | ضمان الجودة الفاخرة</p>
        </div>
      </div>
    </footer>
  );
}
