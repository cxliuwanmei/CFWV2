# Firebase Products Collection

Use the Firestore collection name:

```txt
products
```

Each document in `products` should contain these fields:

| Field | Type | Required | Example |
| --- | --- | --- | --- |
| `name` | string | yes | `Toy Car` |
| `price` | number | yes | `10` |
| `desc` | string | yes | `A small toy car for fun indoor play.` |
| `category` | string | yes | `Kids` |
| `image` | string | yes | `/toy-car.svg` |
| `imageAlt` | string | yes | `Blue toy car illustration` |

Notes:

- Do not add `id` inside the document body. Firestore document ID is used as the product `id`.
- `price` must be a number, not a string. Use `10`, not `"10"`.
- `image` currently points to files in `public/`, so values should start with `/`.

Recommended document IDs:

- `toy-car`
- `book`
- `apple-juice`

Example document body:

```json
{
  "name": "Toy Car",
  "price": 10,
  "desc": "A small toy car for fun indoor play.",
  "category": "Kids",
  "image": "/toy-car.svg",
  "imageAlt": "Blue toy car illustration"
}
```

If Firebase config is missing, or documents do not match this shape, the app will fall back to local demo products.
