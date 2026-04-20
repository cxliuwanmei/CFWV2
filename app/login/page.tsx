'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from '@/lib/firebase';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/admin');
    } catch (err) {
      setError('登录失败：' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Authentication</p>
          <h1 className={styles.title}>管理员登录</h1>
          <p className={styles.subtitle}>
            请输入您的管理员账户信息以访问后台管理系统
          </p>
        </div>

        <div className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}
            
            <div className={styles.field}>
              <label htmlFor="email">邮箱地址</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="请输入管理员邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">密码</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>
        </div>

        <div className={styles.footer}>
          <Link href="/" className={styles.backLink}>
            ← 返回商店首页
          </Link>
        </div>
      </div>
    </main>
  );
}