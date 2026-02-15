# 部署檢查清單

使用此清單確保所有設定都已完成。

## 📋 設定前檢查

### 必要帳號
- [ ] Google 帳號（Firebase + Calendly）
- [ ] GitHub/GitLab 帳號
- [ ] Netlify 帳號（https://app.netlify.com/）
- [ ] Formspree 帳號（https://formspree.io/）

### 本地環境
- [ ] 已安裝 Node.js（檢查：`node -v`）
- [ ] 已安裝 Git（檢查：`git --version`）
- [ ] 已安裝 Firebase CLI（檢查：`firebase --version`）

---

## 1️⃣ Firebase 設定

### Firebase Console
- [ ] 已建立 Firebase 專案
- [ ] 專案 ID：________________
- [ ] 已啟用 Firestore Database
- [ ] Firestore 位置：asia-east1（或其他）
- [ ] 已註冊網頁應用程式

### 本地設定
- [ ] 已執行 `firebase login`
- [ ] 已執行 `firebase use --add` 並選擇專案
- [ ] 已更新 `firebase-config.js`：
  - [ ] apiKey
  - [ ] authDomain
  - [ ] projectId
  - [ ] storageBucket
  - [ ] messagingSenderId
  - [ ] appId
- [ ] 已執行 `firebase deploy --only firestore:rules`

### 驗證
- [ ] Firebase Console → Firestore Database 可以看到空資料庫
- [ ] 開啟網站，Console 顯示「Firebase 已初始化」

---

## 2️⃣ Git Repository

### GitHub/GitLab
- [ ] 已建立 repository
- [ ] Repository 名稱：________________
- [ ] Repository URL：________________

### 本地 Git
- [ ] 已執行 `git init`
- [ ] 已執行 `git add .`
- [ ] 已執行 `git commit -m "Initial commit"`
- [ ] 已執行 `git remote add origin [URL]`
- [ ] 已執行 `git push -u origin main`

### 驗證
- [ ] 在 GitHub/GitLab 可以看到所有檔案

---

## 3️⃣ Netlify 部署

### Netlify 設定
- [ ] 已登入 Netlify
- [ ] 已點擊「Add new site」→「Import from Git」
- [ ] 已連結 Git repository
- [ ] 部署設定：
  - [ ] Build command：留空
  - [ ] Publish directory：`.`
- [ ] 已點擊「Deploy site」

### 網域設定
- [ ] 部署成功
- [ ] 網站 URL：________________
- [ ] （可選）已自訂 site name
- [ ] （可選）已設定自訂網域

### 驗證
- [ ] 可以用瀏覽器開啟網站
- [ ] 網站顯示正常
- [ ] HTTPS 正常運作

---

## 4️⃣ Formspree 設定

### Formspree 帳號
- [ ] 已註冊 Formspree
- [ ] 已建立新表單
- [ ] 表單名稱：eiku studio contact
- [ ] 接收 email：________________
- [ ] Form ID：________________

### 整合到網站
- [ ] 已更新 `index.html` 第 225 行
- [ ] 已把 `YOUR_FORM_ID` 替換成實際 Form ID
- [ ] 已推送更新：
  ```bash
  git add index.html
  git commit -m "Update Formspree form ID"
  git push
  ```
- [ ] Netlify 已自動重新部署

### 驗證
- [ ] 填寫並提交表單
- [ ] Firestore 有收到資料
- [ ] Formspree Dashboard 看到提交記錄
- [ ] 收到 email 通知（第一次需確認）

---

## 5️⃣ Calendly 設定（可選但建議）

### Calendly 帳號
- [ ] 已註冊 Calendly
- [ ] 已連結 Google Calendar
- [ ] 已建立活動類型
- [ ] 活動名稱：eiku studio 諮詢
- [ ] 時長：30 分鐘
- [ ] 位置：Google Meet（或其他）

### 自訂設定
- [ ] 已設定可預約時段
- [ ] 已設定緩衝時間（建議 15 分鐘）
- [ ] 已設定最短預約通知（建議 24 小時）
- [ ] 已加入自訂問題（感興趣的服務）

### 整合到網站
- [ ] 已取得嵌入代碼
- [ ] 已更新 `index.html` 第 160-175 行
- [ ] 已推送更新
- [ ] Netlify 已自動重新部署

### 驗證
- [ ] Widget 正常顯示
- [ ] 可以看到可用時段
- [ ] 測試預約成功
- [ ] 收到確認 email
- [ ] Google Calendar 有行程

---

## 6️⃣ 內容檢查

### 聯絡資訊
- [ ] Email 正確：`index.html` 第 213 行
- [ ] 社群連結已更新（或暫時保留 `#`）：
  - [ ] Instagram（第 216 行）
  - [ ] Twitter（第 217 行）
  - [ ] Behance（第 218 行）

### 作品集
- [ ] 作品集內容已更新（第 104-152 行）
- [ ] 如有實際專案，已替換 placeholder

### SEO & Meta
- [ ] 網站標題正確（第 6 行）
- [ ] （可選）已加入 meta description
- [ ] （可選）已加入 Open Graph tags

---

## 7️⃣ 測試

### 基本功能
- [ ] 網站載入正常
- [ ] 所有區塊顯示正確
- [ ] 主題切換功能正常
- [ ] 平滑滾動功能正常
- [ ] 響應式設計正常（手機/平板/桌面）

### 表單功能
- [ ] 可以填寫所有欄位
- [ ] 提交後顯示成功訊息
- [ ] Firestore 有資料
- [ ] 收到 Formspree email
- [ ] 表單 reset 正常

### 預約功能（如有設定）
- [ ] Calendly widget 顯示
- [ ] 可以選擇時段
- [ ] 預約成功
- [ ] 收到確認 email

### 效能測試
- [ ] PageSpeed Insights > 80 分（行動版）
- [ ] PageSpeed Insights > 90 分（桌面版）
- [ ] 沒有 Console 錯誤

### 瀏覽器測試
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari（如果有 Mac）
- [ ] 手機瀏覽器

---

## 8️⃣ 安全與監控

### Firebase 安全
- [ ] Firestore Rules 已部署
- [ ] 測試無法未授權讀取資料
- [ ] 測試可以新增資料（表單提交）

### 監控設定
- [ ] 知道如何查看 Firebase Console
- [ ] 知道如何查看 Netlify Dashboard
- [ ] 知道如何查看 Formspree 提交記錄
- [ ] （可選）已設定 Google Analytics

---

## 9️⃣ 文件與備份

### 文件記錄
- [ ] 已記錄所有帳號資訊：
  - Firebase 專案 ID
  - Netlify 網站名稱
  - Formspree Form ID
  - Calendly URL
- [ ] 已儲存重要密碼（密碼管理器）

### 備份計畫
- [ ] 知道如何備份 Firestore 資料
- [ ] 知道如何匯出 Formspree 資料
- [ ] Git repository 是最新的

---

## 🎉 上線檢查

### 最終確認
- [ ] 所有 TODO 都已完成
- [ ] 所有 placeholder 都已替換
- [ ] 測試資料已清理（如有）
- [ ] 沒有 console.error
- [ ] 在無痕視窗測試過

### 分享準備
- [ ] 網站 URL：________________
- [ ] 已截圖/錄影展示
- [ ] 已準備分享文案

---

## 📊 上線後維護

### 每週
- [ ] 檢查 Firestore 新聯絡
- [ ] 回覆客戶
- [ ] 檢查 Calendly 預約

### 每月
- [ ] 檢查 Firebase 用量
- [ ] 檢查 Formspree 用量（50 次/月）
- [ ] 檢查 Netlify 流量
- [ ] 備份資料

### 需要時
- [ ] 更新作品集
- [ ] 更新服務內容
- [ ] 加入新功能

---

## 🆘 問題回報

如果遇到問題：

1. 查看相關文件：
   - `TESTING_GUIDE.md` - 故障排除
   - `FIREBASE_SETUP.md` - Firebase 問題
   - `FORMSPREE_SETUP.md` - 表單問題
   - `CALENDLY_SETUP.md` - 預約問題

2. 檢查：
   - 瀏覽器 Console 錯誤
   - Firebase Console 錯誤
   - Netlify Deploy Log

3. 常見解決方案：
   - 清除瀏覽器快取
   - 重新部署
   - 檢查配置檔案

---

## ✅ 完成！

當所有項目都打勾後，你的網站就完全準備好了！

**下一步**：
1. 分享網站連結
2. 開始接收客戶諮詢
3. 考慮未來擴充功能（Gemini AI、後台管理等）

**恭喜！你已經用完全免費的方式建立了專業的商業網站！** 🎉
