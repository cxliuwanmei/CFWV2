# Firebase 邮箱/密码认证设置指南

## 启用邮箱/密码认证

### 步骤 1: 访问 Firebase Console
1. 打开浏览器访问 [Firebase Console](https://console.firebase.google.com/)
2. 选择你的项目 "cfwv1-78869"

### 步骤 2: 启用认证服务
1. 在左侧菜单中找到并点击 "Authentication"（认证）
2. 点击 "Get started"（开始使用）或 "设置"
3. 选择 "Sign-in method"（登录方法）标签页

### 步骤 3: 启用邮箱/密码认证
1. 在 "Sign-in providers"（登录提供商）列表中找到 "Email/Password"（邮箱/密码）
2. 点击右侧的铅笔图标（编辑）
3. 切换开关到 "Enabled"（已启用）状态
4. 点击 "Save"（保存）

## 创建管理员账户

### 方法 1: 通过 Firebase Console 手动创建

1. 在 Authentication 页面，点击 "Users"（用户）标签页
2. 点击 "Add user"（添加用户）按钮
3. 输入以下信息：
   - **Email**: admin@example.com（或你想要的邮箱）
   - **Password**: 设置一个强密码（至少6位字符）
   - **Confirm password**: 再次输入密码确认
4. 点击 "Add user"（添加用户）

### 方法 2: 通过注册页面创建（推荐）

由于我们已经创建了登录页面，你可以直接通过应用界面注册：

1. 访问 http://localhost:3001/login
2. 点击 "注册新账户" 链接（我们需要添加这个功能）
3. 输入邮箱和密码进行注册

## 配置密码要求（可选）

### 设置密码策略
1. 在 Authentication 页面，点击 "Settings"（设置）标签页
2. 找到 "Password policy"（密码策略）部分
3. 点击 "Edit"（编辑）
4. 可以设置以下要求：
   - 最小长度（建议至少8位）
   - 需要包含大写字母
   - 需要包含小写字母
   - 需要包含数字
   - 需要包含特殊字符
5. 点击 "Save"（保存）

## 测试认证功能

### 测试登录
1. 访问 http://localhost:3001/login
2. 输入你创建的管理员邮箱和密码
3. 点击 "登录" 按钮
4. 应该会被重定向到 http://localhost:3001/admin

### 测试退出登录
1. 在 admin 页面，点击 "退出登录" 按钮
2. 应该会被重定向回登录页面
3. 再次访问 http://localhost:3001/admin 应该会被重定向到登录页

## 故障排除

### 常见问题

1. **"登录失败：The password is invalid or the user does not have a password"**
   - 检查邮箱和密码是否正确
   - 确认账户已在 Firebase Console 中创建

2. **"登录失败：There is no user record corresponding to this identifier"**
   - 该邮箱尚未注册，需要先创建账户

3. **"登录失败：Too many unsuccessful login attempts"**
   - 由于多次失败尝试，账户被临时锁定
   - 等待一段时间后再试，或通过 Firebase Console 重置密码

### 验证设置

1. 在 Firebase Console 的 Authentication > Users 页面
2. 应该能看到你创建的管理员账户
3. 用户状态应该显示为 "Enabled"（已启用）

## 安全建议

1. **使用强密码**：包含大小写字母、数字和特殊字符
2. **定期更换密码**：建议每3-6个月更换一次
3. **启用两步验证**：为管理员账户添加额外安全层
4. **限制登录尝试**：在认证设置中可以配置登录尝试次数限制
5. **监控登录活动**：定期查看 Firebase Console 中的认证日志

## 下一步

完成认证设置后，记得更新 Firestore 安全规则以要求认证，具体步骤请参考 `docs/firestore-security-rules-zh.md`。