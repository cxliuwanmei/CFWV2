# Vercel 部署指南

## 部署步骤

### 1. 准备环境变量
在 Vercel 控制台中配置以下环境变量：

```
NEXT_PUBLIC_FIREBASE_API_KEY=你的 Firebase API Key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=你的 Firebase Auth Domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=你的 Firebase Project ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=你的 Firebase Storage Bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=你的 Firebase Messaging Sender ID
NEXT_PUBLIC_FIREBASE_APP_ID=你的 Firebase App ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=你的 Firebase Measurement ID
```

### 2. 部署方式选择

#### 方式一：通过 GitHub 自动部署（推荐）
1. 将代码推送到 GitHub
2. 访问 [Vercel](https://vercel.com)
3. 点击 "New Project"
4. 选择你的 GitHub 仓库
5. 配置环境变量
6. 点击 "Deploy"

#### 方式二：通过 Vercel CLI
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

### 3. 部署后配置

#### Firebase 安全规则更新
部署后需要确保 Firestore 安全规则允许访问：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{product} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### 域名配置
- Vercel 会自动提供 `.vercel.app` 域名
- 可以添加自定义域名

### 4. 测试部署

#### 基本功能测试
1. 访问部署的 URL
2. 测试登录功能
3. 测试产品添加功能
4. 测试认证保护

#### 性能测试
- 检查页面加载速度
- 验证 Firebase 连接
- 测试移动端适配

### 5. 常见问题解决

#### 环境变量问题
- 确保所有 Firebase 配置都已添加到 Vercel
- 检查变量名是否正确（需要 `NEXT_PUBLIC_` 前缀）

#### 构建失败
- 检查 `npm run build` 是否本地成功
- 查看 Vercel 构建日志

#### 认证问题
- 确认 Firebase Authentication 已启用
- 检查 Firestore 安全规则

### 6. 监控和维护

#### Vercel Analytics
- 启用 Vercel Analytics 监控性能
- 查看访问日志

#### Firebase 监控
- 监控 Firestore 使用量
- 查看 Authentication 日志

## 部署成功验证

部署完成后，你应该能够：
- ✅ 访问网站首页
- ✅ 使用管理员账户登录
- ✅ 添加新产品到 Firebase
- ✅ 看到产品列表更新