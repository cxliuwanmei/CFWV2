import { addDoc, collection, getDocs } from 'firebase/firestore';

import { getDb, hasFirebaseConfig } from './firebase';

export const productsCollectionName = 'products';

export type Product = {
  id: string;
  name: string;
  price: number;
  desc: string;
  category: string;
  image: string;
  imageAlt: string;
};

export type ProductDocument = Omit<Product, 'id'>;

export const fallbackProducts: Product[] = [
  {
    id: '1',
    name: 'Toy Car',
    price: 10,
    desc: 'A small toy car for fun indoor play.',
    category: 'Kids',
    image: '/toy-car.svg',
    imageAlt: 'Blue toy car illustration',
  },
  {
    id: '2',
    name: 'Book',
    price: 5,
    desc: 'A short story book for relaxed reading time.',
    category: 'Books',
    image: '/book.svg',
    imageAlt: 'Open orange book illustration',
  },
  {
    id: '3',
    name: 'Apple Juice',
    price: 3,
    desc: 'Fresh apple juice with a crisp and sweet taste.',
    category: 'Drinks',
    image: '/apple-juice.svg',
    imageAlt: 'Bottle of apple juice illustration',
  },
];

type ProductLoadResult = {
  products: Product[];
  source: 'firebase' | 'local';
};

function isProductShape(value: unknown): value is ProductDocument {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.name === 'string' &&
    typeof candidate.price === 'number' &&
    typeof candidate.desc === 'string' &&
    typeof candidate.category === 'string' &&
    typeof candidate.image === 'string' &&
    typeof candidate.imageAlt === 'string'
  );
}

export async function loadProducts(): Promise<ProductLoadResult> {
  if (!hasFirebaseConfig) {
    return {
      products: fallbackProducts,
      source: 'local',
    };
  }

  try {
    const snapshot = await getDocs(collection(getDb(), productsCollectionName));

    const products = snapshot.docs
      .map((doc) => {
        const data = doc.data();

        if (!isProductShape(data)) {
          return null;
        }

        return {
          id: doc.id,
          ...data,
        };
      })
      .filter((product): product is Product => product !== null);

    if (products.length === 0) {
      return {
        products: fallbackProducts,
        source: 'local',
      };
    }

    return {
      products,
      source: 'firebase',
    };
  } catch {
    return {
      products: fallbackProducts,
      source: 'local',
    };
  }
}

export async function createProduct(product: ProductDocument) {
  if (!hasFirebaseConfig) {
    throw new Error(
      'Firebase config is missing. Copy .env.example to .env.local and fill in your Firebase project values.'
    );
  }

  return addDoc(collection(getDb(), productsCollectionName), product);
}
