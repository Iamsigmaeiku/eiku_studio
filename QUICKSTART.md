# 快速開始指南

最快 30 分鐘完成免費部署！

## ⏱️ 時間估算

- Firebase 設定：10 分鐘
- Netlify 部署：5 分鐘
- Formspree 設定：5 分鐘
- Calendly 設定：10 分鐘（可選）
- 測試：5-10 分鐘

**總計：約 30-40 分鐘**

## 🎯 三步驟快速部署

### Step 1️⃣: Firebase（10 分鐘）

```bash
# 1. 安裝 Firebase CLI
npm install -g firebase-tools

# 2. 登入
firebase login

# 3. 在 Firebase Console 建立專案
# 前往 https://console.firebase.google.com/
# 點擊「新增專案」，名稱：eiku-studio

# 4. 啟用 Firestore
# Firebase Console → Firestore Database → 建立資料庫
# 選擇「測試模式」+ 位置（asia-east1）

# 5. 取得 Firebase 配置
# 專案設定 → 你的應用程式 → 網頁 </> → 註冊應用程式
# 複製 firebaseConfig

# 6. 更新 firebase-config.js
# 把 YOUR_API_KEY 等替換成你的實際值

# 7. 連結專案
firebase use --add
# 選擇你的專案，設定別名 default

# 8. 部署規則
firebase deploy --only firestore:rules
```

✅ Firebase 設定完成！

### Step 2️⃣: Git + Netlify（5 分鐘）

```bash
# 1. 初始化 Git（如果還沒）
git init
git add .
git commit -m "Initial commit: eiku studio website"

# 2. 推送到 GitHub
# 在 GitHub 建立新 repository: eiku_studio
git remote add origin https://github.com/YOUR_USERNAME/eiku_studio.git
git push -u origin main

# 3. 部署到 Netlify
# 前往 https://app.netlify.com/
# Add new site → Import from Git
# 選擇你的 repository
# Build command: 留空
# Publish directory: .
# Deploy site

# 4. 自訂網域名稱（可選）
# Site settings → Change site name → eiku-studio
# 網址變成：https://eiku-studio.netlify.app
```

✅ 網站上線了！

### Step 3️⃣: Formspree（5 分鐘）

```bash
# 1. 註冊 Formspree
# 前往 https://formspree.io/
# 用 Google 登入

# 2. 建立表單
# New Form → Name: eiku studio contact
# Email: eikustudio@gmail.com

# 3. 取得 Form ID（例如：mwpebvlo）

# 4. 更新 index.html
# 找到第 225 行：
# action="https://formspree.io/f/YOUR_FORM_ID"
# 改成：
# action="https://formspree.io/f/mwpebvlo"

# 5. 推送更新
git add index.html
git commit -m "Update Formspree form ID"
git push

# Netlify 會自動重新部署（約 1-2 分鐘）
```

✅ 表單功能完成！

## 🧪 快速測試

### 1. 測試網站載入
```
開啟：https://eiku-studio.netlify.app
確認：網站正常顯示，沒有錯誤
```

### 2. 測試表單提交
```
1. 填寫聯絡表單
2. 提交
3. 確認：
   ✅ 顯示成功訊息
   ✅ Firebase Console → Firestore → contacts 有新資料
   ✅ 收到 Formspree email（第一次需確認）
```

### 3. 測試主題切換
```
點擊右上角主題按鈕
確認：深淺色切換正常
```

## ✨ 完成！

你的網站已經上線並可以接收客戶聯絡了！

## 🔄 下一步（可選）

### 加入 Calendly 預約（10 分鐘）

```bash
# 1. 註冊 Calendly
# 前往 https://calendly.com/
# 用 Google 登入

# 2. 連結 Google Calendar
# Settings → Calendars → Connect Calendar

# 3. 建立活動
# Event Types → Create
# Name: eiku studio 諮詢
# Duration: 30 分鐘
# Location: Google Meet

# 4. 取得嵌入代碼
# 點擊活動 → Add to Website → 複製 Inline Embed

# 5. 更新 index.html
# 找到第 160-175 行的 booking-placeholder
# 整個替換成 Calendly 代碼

# 6. 推送更新
git add index.html
git commit -m "Add Calendly booking widget"
git push
```

### 加入 Google Analytics（5 分鐘）

```html
<!-- 在 index.html <head> 加入 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 📝 完整文件

需要更詳細的說明？參考：
- [`README.md`](README.md) - 完整概覽
- [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md) - Firebase 詳細設定
- [`TESTING_GUIDE.md`](TESTING_GUIDE.md) - 完整測試流程

## 🆘 需要幫助？

遇到問題查看：
- [`TESTING_GUIDE.md`](TESTING_GUIDE.md) 的故障排除章節
- Firebase Console 錯誤訊息
- 瀏覽器開發者工具 Console

## 🎉 恭喜！

你已經用完全免費的方式部署了一個專業網站，包含：
- ✅ 前端網站（Netlify）
- ✅ 後端資料庫（Firebase）
- ✅ 表單處理（Formspree）
- ✅ 自動 HTTPS
- ✅ 全球 CDN

而且全部 $0/月！
