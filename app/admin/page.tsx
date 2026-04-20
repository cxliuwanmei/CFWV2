'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { createProduct, type ProductDocument } from '@/lib/products';
import { useAuth } from '@/app/contexts/AuthContext';
import { logOut } from '@/lib/firebase';

import styles from './page.module.css';

type FormState = ProductDocument;

const initialFormState: FormState = {
  name: '',
  price: 0,
  desc: '',
  category: '',
  image: '',
  imageAlt: '',
};

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/login');
    } catch (err) {
      setError('退出登录失败：' + (err as Error).message);
    }
  };

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setError('');

    try {
      if (
        !form.name.trim() ||
        !form.desc.trim() ||
        !form.category.trim() ||
        !form.image.trim() ||
        !form.imageAlt.trim()
      ) {
        throw new Error('Please complete every field before submitting.');
      }

      if (Number.isNaN(form.price) || form.price <= 0) {
        throw new Error('Price must be a number greater than 0.');
      }

      await createProduct({
        name: form.name.trim(),
        price: form.price,
        desc: form.desc.trim(),
        category: form.category.trim(),
        image: form.image.trim(),
        imageAlt: form.imageAlt.trim(),
      });

      setMessage('Product saved to Firebase successfully.');
      setForm(initialFormState);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Something went wrong while saving the product.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.loading}>加载中...</div>
      </main>
    );
  }

  if (!user) {
    return null; // 重定向到登录页面
  }

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Admin Panel</p>
            <h1>Add a product to Firebase</h1>
            <p className={styles.subtitle}>
              This page writes directly to the Firestore `products` collection.
            </p>
            {user && (
              <p className={styles.userInfo}>
                当前用户: {user.email} | 
                <button 
                  onClick={handleLogout}
                  className={styles.logoutButton}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'blue', 
                    cursor: 'pointer', 
                    textDecoration: 'underline' 
                  }}
                >
                  退出登录
                </button>
              </p>
            )}
          </div>

          <Link href="/" className={styles.backLink}>
            Back to shop
          </Link>
        </div>

        <div className={styles.layout}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span>Name</span>
              <input
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Toy Car"
                required
              />
            </label>

            <label className={styles.field}>
              <span>Price</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price === 0 ? '' : form.price}
                onChange={(event) => updateField('price', Number(event.target.value))}
                placeholder="10"
                required
              />
            </label>

            <label className={styles.field}>
              <span>Category</span>
              <input
                value={form.category}
                onChange={(event) => updateField('category', event.target.value)}
                placeholder="Kids"
                required
              />
            </label>

            <label className={styles.field}>
              <span>Description</span>
              <textarea
                value={form.desc}
                onChange={(event) => updateField('desc', event.target.value)}
                placeholder="A small toy car for fun indoor play."
                rows={4}
                required
              />
            </label>

            <label className={styles.field}>
              <span>Image path</span>
              <input
                value={form.image}
                onChange={(event) => updateField('image', event.target.value)}
                placeholder="/toy-car.svg"
                required
              />
            </label>

            <label className={styles.field}>
              <span>Image alt</span>
              <input
                value={form.imageAlt}
                onChange={(event) => updateField('imageAlt', event.target.value)}
                placeholder="Blue toy car illustration"
                required
              />
            </label>

            <div className={styles.actions}>
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save to Firebase'}
              </button>

              {message ? <p className={styles.success}>{message}</p> : null}
              {error ? <p className={styles.error}>{error}</p> : null}
            </div>
          </form>

          <aside className={styles.preview}>
            <p className={styles.previewLabel}>Live preview</p>
            <h2>{form.name || 'Product name'}</h2>
            <p className={styles.previewPrice}>
              {form.price > 0 ? `$${form.price}` : '$0'}
            </p>
            <p className={styles.previewText}>
              {form.desc || 'Your product description will appear here.'}
            </p>

            <dl className={styles.previewMeta}>
              <div>
                <dt>Category</dt>
                <dd>{form.category || 'Not set yet'}</dd>
              </div>
              <div>
                <dt>Image</dt>
                <dd>{form.image || 'Example: /toy-car.svg'}</dd>
              </div>
              <div>
                <dt>Image alt</dt>
                <dd>{form.imageAlt || 'Accessible image description'}</dd>
              </div>
            </dl>

            <p className={styles.tip}>
              If saving fails with permissions, update Firestore rules so this page can write to
              the `products` collection.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
