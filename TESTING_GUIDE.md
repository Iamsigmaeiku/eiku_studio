# 測試指南

完成所有設定後，請依照此檢查清單測試網站功能。

## 測試前檢查清單

### ✅ Firebase 設定

- [ ] 已在 Firebase Console 建立專案
- [ ] 已啟用 Firestore Database
- [ ] 已部署 Firestore 安全規則（`firebase deploy --only firestore:rules`）
- [ ] 已更新 `firebase-config.js` 中的配置資訊
- [ ] 在 Firebase Console 可以看到 Firestore Database（即使是空的）

### ✅ Formspree 設定

- [ ] 已在 Formspree 註冊
- [ ] 已建立表單並取得 Form ID
- [ ] 已在 `index.html` 第 225 行替換 `YOUR_FORM_ID`
- [ ] 已設定要接收通知的 email

### ✅ Calendly 設定（可選但建議）

- [ ] 已在 Calendly 註冊
- [ ] 已建立活動類型
- [ ] 已連結 Google Calendar
- [ ] 已在 `index.html` 替換預約區塊的嵌入代碼

### ✅ Netlify 部署

- [ ] 程式碼已推送到 Git repository
- [ ] 已在 Netlify 連結 repository
- [ ] 網站已成功部署
- [ ] 可以用瀏覽器開啟網站 URL

## 功能測試

### 1. 基本功能測試

#### 1.1 網站載入

```
測試項目：網站是否正常載入
步驟：
1. 開啟瀏覽器
2. 前往你的 Netlify URL（例如：https://eiku-studio.netlify.app）
3. 確認網站完整載入

預期結果：
✅ 網站完整顯示
✅ 沒有 404 錯誤
✅ CSS 樣式正確
✅ JavaScript 功能正常（主題切換、滾動效果等）
```

#### 1.2 響應式設計

```
測試項目：手機/平板/桌面版本
步驟：
1. 按 F12 開啟開發者工具
2. 切換到 Device Toolbar（Cmd/Ctrl + Shift + M）
3. 測試不同尺寸：
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)

預期結果：
✅ 所有尺寸都正常顯示
✅ 文字可讀
✅ 按鈕可點擊
✅ 表單可操作
```

#### 1.3 瀏覽器相容性

測試瀏覽器：
- [ ] Chrome/Edge（Chromium）
- [ ] Firefox
- [ ] Safari（如果是 Mac）
- [ ] 手機瀏覽器（iOS Safari / Android Chrome）

### 2. Firebase 整合測試

#### 2.1 檢查 Firebase 連線

```
測試項目：Firebase 是否正確初始化
步驟：
1. 開啟網站
2. 按 F12 開啟開發者工具
3. 切換到 Console 分頁
4. 查看是否有 "Firebase 已初始化" 訊息

預期結果：
✅ Console 顯示 "Firebase 已初始化"
❌ 如果有錯誤，檢查：
   - firebase-config.js 是否正確設定
   - Firebase SDK 是否載入（Network tab）
   - Firestore 是否已啟用
```

#### 2.2 測試表單提交到 Firestore

```
測試項目：表單資料是否儲存到 Firestore
步驟：
1. 填寫聯絡表單：
   - 姓名：測試用戶
   - Email：test@example.com
   - 服務：STEAM 教育課程
   - 訊息：這是測試訊息
2. 點擊「送出訊息」
3. 等待成功訊息
4. 前往 Firebase Console → Firestore Database
5. 查看 "contacts" collection

預期結果：
✅ 網站顯示「訊息已送出！我們會盡快回覆您。」
✅ Firestore 出現新文件，包含：
   - name: "測試用戶"
   - email: "test@example.com"
   - service: "steam"
   - message: "這是測試訊息"
   - timestamp: (自動產生)
   - status: "new"
✅ Console 顯示 "資料已儲存到 Firestore"

故障排除：
❌ 如果失敗，檢查 Console 錯誤訊息
❌ 如果顯示 Permission Denied：
   - 確認 Firestore Rules 已部署
   - 檢查規則是否允許 create 操作
```

### 3. Formspree 測試

```
測試項目：Email 通知是否發送
步驟：
1. 填寫並提交表單（使用真實 email）
2. 檢查你設定的接收 email 信箱
3. 如果是第一次，需要確認 Formspree 驗證信

預期結果：
✅ 收到包含表單內容的 email
✅ Email 格式正確，包含所有欄位
✅ 可以直接回覆（Reply-To 是提交者的 email）

故障排除：
❌ 沒收到 email：
   - 檢查垃圾郵件資料夾
   - 確認 Formspree Form ID 正確
   - 到 Formspree Dashboard 查看提交記錄
❌ 第一次提交後需要確認 email 才會開始收信
```

### 4. Calendly 測試

```
測試項目：預約系統是否正常運作
步驟：
1. 滾動到預約區塊
2. 確認 Calendly widget 正常顯示
3. 選擇一個可用時段
4. 填寫資訊並預約
5. 檢查確認 email
6. 檢查 Google Calendar

預期結果：
✅ Calendly widget 正確顯示可用時段
✅ 可以成功預約
✅ 收到確認 email
✅ Google Calendar 出現新行程
✅ Calendly Dashboard 顯示預約記錄

故障排除：
❌ Widget 沒顯示：
   - 檢查嵌入代碼是否正確
   - 確認 Calendly URL 有效
   - 查看 Console 是否有 JavaScript 錯誤
❌ 沒有可用時段：
   - 檢查 Calendly 設定的工作時間
   - 確認 Google Calendar 同步正確
```

### 5. 完整流程測試

#### 情境 1：客戶聯絡流程

```
模擬真實客戶使用：
1. 訪客瀏覽網站
2. 了解服務內容
3. 填寫聯絡表單
4. 提交成功

驗證點：
✅ Firestore 有記錄
✅ 你收到 email 通知
✅ 訪客看到成功訊息
```

#### 情境 2：預約諮詢流程

```
模擬預約諮詢：
1. 訪客瀏覽服務
2. 點擊「預約諮詢」連結
3. 選擇時段並預約
4. 收到確認

驗證點：
✅ Calendly 有預約記錄
✅ 雙方都收到確認 email
✅ Google Calendar 有行程
✅ （可選）Firebase bookings collection 有記錄
```

## 效能測試

### 1. 頁面載入速度

使用 Google PageSpeed Insights：
1. 前往 https://pagespeed.web.dev/
2. 輸入你的網站 URL
3. 執行分析

目標：
- 🎯 行動版 > 80 分
- 🎯 桌面版 > 90 分

優化建議：
- 壓縮圖片（如果有）
- 延遲載入非關鍵資源
- 使用 CDN（Netlify 已內建）

### 2. Firebase 用量監控

在 Firebase Console：
1. 前往 Usage and billing
2. 查看 Firestore 用量：
   - 讀取次數
   - 寫入次數
   - 儲存空間

確保在免費額度內：
- ✅ < 50,000 讀取/天
- ✅ < 20,000 寫入/天
- ✅ < 1GB 儲存

## 安全性測試

### 1. Firestore 安全規則

測試未授權存取：

```javascript
// 在瀏覽器 Console 執行
db.collection('contacts').get()
  .then(() => console.log('❌ 安全問題：可以讀取資料'))
  .catch(() => console.log('✅ 正確：無法讀取資料'));
```

預期結果：
- ✅ 應該要失敗（Permission Denied）
- ✅ 只有新增（create）操作可以成功

### 2. XSS 防護

測試表單輸入：

```
在訊息欄位輸入：<script>alert('XSS')</script>
提交後檢查 Firestore
```

預期結果：
- ✅ 儲存為純文字，不執行腳本
- ✅ 顯示時也不執行

## 錯誤處理測試

### 1. 網路斷線

```
測試步驟：
1. 開啟網站
2. 開發者工具 → Network → Offline
3. 嘗試提交表單

預期結果：
✅ 顯示友善的錯誤訊息
✅ 不會 crash
✅ 建議直接 email 聯絡
```

### 2. Firebase 配置錯誤

```
測試步驟：
1. 暫時把 firebase-config.js 中的 apiKey 改錯
2. 嘗試提交表單

預期結果：
✅ 顯示錯誤訊息（Firebase 配置問題）
✅ 不會 crash
```

## 測試完成檢查清單

### 核心功能
- [ ] 網站正常載入
- [ ] 響應式設計正常
- [ ] 主題切換功能正常
- [ ] 平滑滾動正常
- [ ] 所有連結都有效

### 表單功能
- [ ] 可以填寫並提交
- [ ] 資料儲存到 Firestore
- [ ] 收到 Formspree email
- [ ] 顯示成功/錯誤訊息
- [ ] 防止重複提交

### 預約功能
- [ ] Calendly widget 顯示
- [ ] 可以選擇時段
- [ ] 預約成功
- [ ] 收到確認 email
- [ ] Google Calendar 同步

### 效能與安全
- [ ] 頁面載入速度良好
- [ ] Firebase 用量在免費額度內
- [ ] 安全規則正確設定
- [ ] 錯誤處理完善

## 上線前最終檢查

- [ ] 所有 placeholder 都已替換（YOUR_FORM_ID、YOUR_API_KEY 等）
- [ ] Firebase config 已更新
- [ ] Firestore rules 已部署
- [ ] 測試資料已清理（如果需要）
- [ ] 聯絡 email 正確（index.html 中的 eikustudio@gmail.com）
- [ ] 社群連結已更新（如果有）
- [ ] 確認沒有 console.error
- [ ] 在無痕視窗測試過

## 持續監控

上線後定期檢查：

### 每週
- [ ] 檢查 Firebase Console 有沒有新的聯絡
- [ ] 確認 email 通知正常
- [ ] 查看 Netlify Analytics（如果有）

### 每月
- [ ] 檢查 Firebase 用量
- [ ] 檢查 Formspree 用量（50 次/月限制）
- [ ] 備份 Firestore 資料

### 問題回報

如果發現問題：
1. 截圖錯誤訊息
2. 查看瀏覽器 Console
3. 檢查 Firebase 和 Netlify logs
4. 參考各個 `*_SETUP.md` 檔案的故障排除章節

## 成功部署！

如果所有測試都通過，恭喜！你的網站已經成功上線。

下一步：
- 分享網站連結
- 開始接收客戶諮詢
- 考慮加入 Google Analytics 追蹤流量
- 未來可以加入 Gemini AI 聊天機器人
