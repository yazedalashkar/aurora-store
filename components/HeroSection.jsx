import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
        <div className={styles.blob3}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroEyebrow}>
          مجموعة من المنتجات الراقية ❤️
        </div>

        <h1 className={styles.heroTitle}>
          ارتقِ بـ <span>أسلوبك</span>
        </h1>

        <p className={styles.heroSub}>
اكتشف منتجاتنا ذات الطابع المندرج تحت جميع الاذواق الراقية و الجميلة، شكراً لزيارتكم ❤️
        </p>

        <div className={styles.heroCtas}>
          <Link href="/products" className={styles.btnPrimary}>
            استكشف الآن ←
          </Link>
          <a href="#featured" className={styles.btnSecondary}>
            عرض المميز ↓
          </a>
        </div>
      </div>

      <div className={styles.scrollIndicator}>↓</div>
    </section>
  );
}
