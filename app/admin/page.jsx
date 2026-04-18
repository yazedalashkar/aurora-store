'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from '@/styles/AdminDashboard.module.css';

const emptyProduct = {
  name: '',
  price: '',
  discount: '',
  description: '',
  category: '',
  image: '',
};

export default function AdminPage() {
  const [session, setSession] = useState({ loggedIn: false, email: '' });
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const productCount = useMemo(() => products.length, [products]);

  useEffect(() => {
    // Always show login form - no automatic login from localStorage
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    if (!session.loggedIn) return;
    fetchProducts();
  }, [session]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    setLoading(false);
    if (fetchError) {
      setError(fetchError.message);
      return;
    }
    setProducts(data || []);
  };

  const uploadImage = async (file) => {
    if (!file) return null;

    setImageUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    setImageUploading(false);
    if (uploadError) {
      setError(`خطأ في رفع الصورة: ${uploadError.message}`);
      return null;
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const hardcodedEmail = 'aurora@store.com';
    const hardcodedPassword = 'aurora123321@@';

    if (email !== hardcodedEmail || password !== hardcodedPassword) {
      setLoading(false);
      setError('البريد أو كلمة المرور غير صحيحة.');
      return;
    }

    setLoading(false);
    window.localStorage.setItem('adminSession', 'true');
    setSession({ loggedIn: true, email: hardcodedEmail });
    setMessage('تم تسجيل الدخول بنجاح.');
    fetchProducts();
  };

  const handleLogout = async () => {
    window.localStorage.removeItem('adminSession');
    setSession({ loggedIn: false, email: '' });
    setProducts([]);
    setEditId(null);
    setForm(emptyProduct);
    setMessage('تم تسجيل الخروج.');
  };

  const handleEdit = (product) => {
    const discountValue = product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : '';

    setEditId(product.id);
    setForm({
      name: product.name || '',
      price: product.price?.toString() || '',
      discount: discountValue?.toString() || '',
      description: product.description || '',
      category: product.category || '',
      image: product.image_url || '', // Keep existing image URL
    });
    setMessage('');
    setError('');
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyProduct);
    setEditId(null);
    setError('');
    setMessage('');
    // Reset file input
    const fileInput = document.querySelector('input[name="image"]');
    if (fileInput) fileInput.value = '';
  };

  const handleSaveProduct = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const formData = new FormData(event.target);
    const imageFile = formData.get('image');

    let imageUrl = form.image; // Use existing URL if no new file

    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        setLoading(false);
        return; // Error already set in uploadImage
      }
    }

    const price = parseFloat(form.price);
    const discount = parseFloat(form.discount);
    const originalPrice = discount > 0 ? +(price / (1 - discount / 100)).toFixed(2) : null;

    const payload = {
      name: form.name,
      price: Number.isNaN(price) ? null : price,
      originalPrice,
      description: form.description,
      category: form.category,
      image_url: imageUrl,
    };

    if (!payload.name || !payload.price || !payload.description || !payload.category || !payload.image_url) {
      setLoading(false);
      setError('جميع الحقول مطلوبة ما عدا التخفيض.');
      return;
    }

    if (editId) {
      const { error: updateError } = await supabase
        .from('products')
        .update(payload)
        .eq('id', editId);

      setLoading(false);
      if (updateError) {
        setError(updateError.message);
        return;
      }
      setMessage('تم تحديث المنتج بنجاح.');
    } else {
      const { error: insertError } = await supabase.from('products').insert([payload]);
      setLoading(false);
      if (insertError) {
        setError(insertError.message);
        return;
      }
      setMessage('تم إضافة المنتج بنجاح.');
    }

    resetForm();
    fetchProducts();
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('هل تريد حذف هذا المنتج نهائياً؟');
    if (!shouldDelete) return;

    setLoading(true);
    const { error: deleteError } = await supabase.from('products').delete().eq('id', id);
    setLoading(false);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setMessage('تم حذف المنتج بنجاح.');
    fetchProducts();
  };

  if (!authChecked) {
    return (
      <main className={styles.adminPage}>
        <div className={styles.shell}>جار التحقق من حالة الدخول...</div>
      </main>
    );
  }

  return (
    <main className={styles.adminPage}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.subtitle}>لوحة تحكم المشرف</p>
            <h1 className={styles.title}>إدارة المنتجات</h1>
          </div>
          {session.loggedIn && (
            <button className={styles.logoutBtn} onClick={handleLogout}>
              تسجيل الخروج
            </button>
          )}
        </header>

        {!session.loggedIn ? (
          <section className={styles.loginSection}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>تسجيل دخول المسؤول</h2>
              <p className={styles.cardDescription}>استخدم بريدك الإلكتروني وكلمة المرور للدخول.</p>
              <form className={styles.form} onSubmit={handleLogin}>
                <label className={styles.label}>
                  البريد الإلكتروني
                  <input
                    type="email"
                    name="email"
                    className={styles.input}
                    placeholder="admin@example.com"
                    required
                  />
                </label>
                <label className={styles.label}>
                  كلمة المرور
                  <input
                    type="password"
                    name="password"
                    className={styles.input}
                    placeholder="••••••••"
                    required
                  />
                </label>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.primaryBtn} disabled={loading}>
                  {loading ? 'جارٍ الدخول...' : 'دخول'}
                </button>
              </form>
            </div>
          </section>
        ) : (
          <section className={styles.dashboardSection}>
            <div className={styles.statusGrid}>
              <div className={styles.summaryCard}>
                <span className={styles.summaryLabel}>عدد المنتجات</span>
                <strong className={styles.summaryValue}>{productCount}</strong>
              </div>
              <div className={styles.summaryCard}>
                <span className={styles.summaryLabel}>المسجل</span>
                <strong className={styles.summaryValue}>{session.email || 'مشرف'}</strong>
              </div>
            </div>

            <div className={styles.gridTwo}> 
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>{editId ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h2>
                  {editId && (
                    <button type="button" className={styles.secondaryBtn} onClick={resetForm}>
                      إلغاء التعديل
                    </button>
                  )}
                </div>
                <form className={styles.form} onSubmit={handleSaveProduct}>
                  <label className={styles.label}>
                    اسم المنتج
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      className={styles.input}
                      placeholder="مثال: طقم خواتم كلاسيكي"
                      required
                    />
                  </label>
                  <label className={styles.label}>
                    السعر
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      value={form.price}
                      onChange={handleFormChange}
                      className={styles.input}
                      placeholder="مثال: 12.50"
                      required
                    />
                  </label>
                  <label className={styles.label}>
                    نسبة الخصم (%)
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="99"
                      name="discount"
                      value={form.discount}
                      onChange={handleFormChange}
                      className={styles.input}
                      placeholder="مثال: 20"
                    />
                  </label>
                  <label className={styles.label}>
                    الفئة
                    <input
                      type="text"
                      name="category"
                      value={form.category}
                      onChange={handleFormChange}
                      className={styles.input}
                      placeholder="مثال: خواتم"
                      required
                    />
                  </label>
                  <label className={styles.label}>
                    صورة المنتج
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className={styles.input}
                      required={!editId}
                    />
                    {editId && form.image && (
                      <div className={styles.imagePreview}>
                        <p>الصورة الحالية:</p>
                        <img src={form.image} alt="Current product" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                      </div>
                    )}
                    {imageUploading && <p className={styles.message}>جاري رفع الصورة...</p>}
                  </label>
                  <label className={styles.label}>
                    الوصف
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleFormChange}
                      className={styles.textarea}
                      placeholder="اكتب وصف المنتج هنا"
                      rows="4"
                      required
                    />
                  </label>
                  {error && <p className={styles.error}>{error}</p>}
                  {message && <p className={styles.message}>{message}</p>}
                  <button type="submit" className={styles.primaryBtn} disabled={loading || imageUploading}>
                    {loading ? 'جارٍ الحفظ...' : imageUploading ? 'جاري رفع الصورة...' : editId ? 'تحديث المنتج' : 'إضافة المنتج'}
                  </button>
                </form>
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>قائمة المنتجات</h2>
                </div>
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>الاسم</th>
                        <th>السعر</th>
                        <th>الخصم</th>
                        <th>الفئة</th>
                        <th>عمليات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        const discountValue = product.originalPrice
                          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                          : 0;
                        return (
                          <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{discountValue ? `-${discountValue}%` : '-'}</td>
                            <td>{product.category}</td>
                            <td className={styles.actions}>
                              <button type="button" className={styles.actionBtn} onClick={() => handleEdit(product)}>
                                تعديل
                              </button>
                              <button type="button" className={styles.deleteBtn} onClick={() => handleDelete(product.id)}>
                                حذف
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {!products.length && (
                        <tr>
                          <td colSpan="5" className={styles.emptyState}>
                            لا توجد منتجات حالياً
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
