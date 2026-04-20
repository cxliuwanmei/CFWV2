# Firebase 商品录入步骤

这份文档对应 Firestore 里的 `products` 集合。

如果你已经在 Firebase 控制台里创建好了项目，就可以按下面步骤把 3 个商品录进去。

## 1. 打开 Firestore Database

在 Firebase 控制台中进入你的项目，然后按这个顺序点：

1. 左侧菜单找到 `Build`
2. 点击 `Firestore Database`
3. 如果你还没创建数据库，先点 `Create database`
4. 选择测试模式或生产模式后继续
5. 选择数据库地区并完成创建

## 2. 创建集合

进入 Firestore 后：

1. 点击 `Start collection` 或 `+ Start collection`
2. Collection ID 填：

```txt
products
```

3. 点击下一步

## 3. 创建第 1 个商品：Toy Car

Document ID 推荐填：

```txt
toy-car
```

然后依次添加这些字段：

| Field | Type | Value |
| --- | --- | --- |
| `name` | string | `Toy Car` |
| `price` | number | `10` |
| `desc` | string | `A small toy car for fun indoor play.` |
| `category` | string | `Kids` |
| `image` | string | `/toy-car.svg` |
| `imageAlt` | string | `Blue toy car illustration` |

填完后点击 `Save`。

## 4. 创建第 2 个商品：Book

点击 `Add document`

Document ID 推荐填：

```txt
book
```

然后依次添加这些字段：

| Field | Type | Value |
| --- | --- | --- |
| `name` | string | `Book` |
| `price` | number | `5` |
| `desc` | string | `A short story book for relaxed reading time.` |
| `category` | string | `Books` |
| `image` | string | `/book.svg` |
| `imageAlt` | string | `Open orange book illustration` |

填完后点击 `Save`。

## 5. 创建第 3 个商品：Apple Juice

再次点击 `Add document`

Document ID 推荐填：

```txt
apple-juice
```

然后依次添加这些字段：

| Field | Type | Value |
| --- | --- | --- |
| `name` | string | `Apple Juice` |
| `price` | number | `3` |
| `desc` | string | `Fresh apple juice with a crisp and sweet taste.` |
| `category` | string | `Drinks` |
| `image` | string | `/apple-juice.svg` |
| `imageAlt` | string | `Bottle of apple juice illustration` |

填完后点击 `Save`。

## 6. 特别注意

- 不要在文档内容里自己再加 `id` 字段
- `price` 的类型一定要选 `number`
- `price` 要填 `10` 这种数字，不要填 `"10"` 这种字符串
- `image` 现在使用的是项目 `public/` 目录里的本地图片，所以要填 `/toy-car.svg` 这种路径

## 7. 录入完成后你应该看到什么

`products` 集合下应该至少有这 3 个文档：

- `toy-car`
- `book`
- `apple-juice`

## 8. 如果页面还是显示本地数据

请检查这几项：

1. 你的 `.env.local` 是否已经填写 Firebase 配置
2. Firestore 集合名是不是 `products`
3. 字段名是否完全一致：

- `name`
- `price`
- `desc`
- `category`
- `image`
- `imageAlt`

4. `price` 类型是不是 `number`

如果这些都对，页面顶部提示就会从本地演示数据切换成 Firebase 数据。
