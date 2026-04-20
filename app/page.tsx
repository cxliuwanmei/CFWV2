'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { loadProducts, type Product } from '@/lib/products';
import styles from './page.module.css';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [productSource, setProductSource] = useState<'firebase' | 'local'>('local');
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      const result = await loadProducts();

      if (!isMounted) {
        return;
      }

      setProducts(result.products);
      setProductSource(result.source);
      setSelected((currentSelected) => {
        if (!currentSelected) {
          return null;
        }

        return (
          result.products.find((product) => product.id === currentSelected.id) ?? null
        );
      });
      setIsLoadingProducts(false);
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalCartItems = Object.values(cart).reduce((sum, count) => sum + count, 0);

  const addToCart = (productId: string) => {
    setCart((currentCart) => ({
      ...currentCart,
      [productId]: (currentCart[productId] ?? 0) + 1,
    }));
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <div>
            <p className={styles.eyebrow}>Mini Shop</p>
            <h1 className={styles.title}>Simple products, cleaner shopping experience.</h1>
          </div>

          <div className={styles.cartSummary}>
            <span className={styles.cartLabel}>Cart</span>
            <strong>{totalCartItems}</strong>
          </div>
        </div>

        <p className={styles.subtitle}>
          We are turning this page into a real storefront step by step. Today, the
          focus is product images plus an add-to-cart experience.
        </p>

        <p className={styles.dataSource}>
          {isLoadingProducts
            ? 'Loading products...'
            : productSource === 'firebase'
              ? 'Products are currently loaded from Firebase.'
              : 'Firebase is not ready yet, so products are using local demo data.'}
        </p>

        <Link href="/admin" className={styles.adminLink}>
          Open admin panel
        </Link>
      </section>

      <section className={styles.grid}>
        {products.map((item) => {
          const cartCount = cart[item.id] ?? 0;

          return (
            <article
              key={item.id}
              className={styles.card}
              onClick={() => setSelected(item)}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={640}
                  height={480}
                  className={styles.productImage}
                />
              </div>

              <div className={styles.cardTop}>
                <span className={styles.badge}>{item.category}</span>
                <span className={styles.price}>${item.price}</span>
              </div>

              <div className={styles.cardBody}>
                <h2>{item.name}</h2>
                <p>{item.desc}</p>
              </div>

              <div className={styles.cardActions}>
                <button
                  type="button"
                  className={styles.detailsButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelected(item);
                  }}
                >
                  View details
                </button>

                <button
                  type="button"
                  className={styles.cartButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    addToCart(item.id);
                  }}
                >
                  {cartCount > 0 ? `Added (${cartCount})` : 'Add to cart'}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {selected && (
        <section className={styles.detailPanel}>
          <div className={styles.detailHeader}>
            <div>
              <p className={styles.detailLabel}>Selected product</p>
              <h2>{selected.name}</h2>
            </div>
            <span className={styles.detailPrice}>${selected.price}</span>
          </div>

          <div className={styles.detailImageWrap}>
            <Image
              src={selected.image}
              alt={selected.imageAlt}
              width={640}
              height={480}
              className={styles.detailImage}
            />
          </div>

          <p className={styles.detailText}>{selected.desc}</p>

          <div className={styles.detailActions}>
            <span className={styles.detailBadge}>{selected.category}</span>

            <div className={styles.detailButtons}>
              <button
                type="button"
                className={styles.cartButton}
                onClick={() => addToCart(selected.id)}
              >
                {cart[selected.id] ? `Add one more (${cart[selected.id]})` : 'Add to cart'}
              </button>

              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
