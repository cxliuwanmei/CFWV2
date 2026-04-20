# Firestore 安全规则配置

## 更新安全规则以要求认证

为了配合我们新添加的登录认证功能，你需要更新Firestore安全规则，要求用户必须登录才能进行读写操作。

### 步骤

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 选择你的项目 "cfwv1-78869"
3. 在左侧菜单中选择 "Firestore Database"
4. 点击 "规则" 标签页
5. 更新规则为以下内容：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 要求用户认证才能读取产品
    match /products/{product} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // 如果你还有其他集合，可以添加相应的规则
    // match /otherCollection/{document} {
    //   allow read, write: if request.auth != null;
    // }
  }
}
```

### 规则说明

- `request.auth != null`：确保用户已登录
- `allow read`：允许已认证用户读取数据
- `allow write`：允许已认证用户写入数据

### 测试规则

更新规则后，你可以测试：

1. 未登录状态下访问 `/admin` 应该会被重定向到 `/login`
2. 登录后应该能够正常保存产品到Firebase
3. 退出登录后应该无法访问admin功能

### 高级配置（可选）

如果你想更精细地控制权限，可以使用以下规则：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{product} {
      allow read: if true; // 允许所有人读取
      allow create: if request.auth != null; // 仅登录用户可以创建
      allow update, delete: if request.auth != null 
        && request.auth.uid == resource.data.authorId; // 只允许作者更新/删除
    }
  }
}
```

注意：使用高级规则需要在产品数据中添加 `authorId` 字段。