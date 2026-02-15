# eiku studio - 免費部署架構

專業的 STEAM 教育、嵌入式工程、品牌設計服務展示網站。

## 🚀 功能特色

- ✅ 完全響應式設計（手機/平板/桌面）
- ✅ 深淺主題切換
- ✅ 平滑滾動與動畫效果
- ✅ 聯絡表單（Firebase + Formspree 雙重備份）
- ✅ 線上預約系統（Calendly 整合）
- ✅ 客戶資料管理（Firestore 資料庫）
- ✅ 100% 免費託管

## 📋 架構概覽

```
前端：Netlify（免費 CDN + HTTPS）
後端：Firebase Firestore（免費資料庫）
表單：Formspree（免費 email 通知）
預約：Calendly（免費預約系統）
```

### 成本分析

| 服務 | 方案 | 費用 |
|------|------|------|
| Netlify | 100GB 流量/月 | **$0** |
| Firebase | 50k 讀/20k 寫/天 | **$0** |
| Formspree | 50 次提交/月 | **$0** |
| Calendly | 無限預約 | **$0** |
| **總計** | | **$0/月** |

適用於小流量網站（< 1000 訪客/月）。

## 🛠️ 技術棧

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **資料庫**: Firebase Firestore
- **託管**: Netlify
- **表單**: Formspree
- **預約**: Calendly

## 📦 專案結構

```
eiku_studio/
├── index.html                 # 主頁面
├── styles.css                # 樣式
├── script.js                 # JavaScript 功能
├── firebase-config.js        # Firebase 配置
├── firebase.json             # Firebase 設定
├── firestore.rules           # 資料庫安全規則
├── firestore.indexes.json    # 資料庫索引
├── netlify.toml              # Netlify 設定
├── .gitignore                # Git 忽略檔案
├── README.md                 # 本檔案
│
├── FIREBASE_SETUP.md         # Firebase 設定指南
├── FIRESTORE_STRUCTURE.md    # 資料庫結構說明
├── NETLIFY_DEPLOY.md         # Netlify 部署指南
├── FORMSPREE_SETUP.md        # Formspree 設定指南
├── CALENDLY_SETUP.md         # Calendly 設定指南
└── TESTING_GUIDE.md          # 測試指南
```

## 🚀 快速開始

### 1. 前置準備

需要的帳號（全部免費）：
- [x] Google 帳號（Firebase + Calendly）
- [x] GitHub/GitLab 帳號（程式碼託管）
- [x] Netlify 帳號
- [x] Formspree 帳號

### 2. 設定步驟

#### Step 1: Firebase 設定
```bash
# 參考 FIREBASE_SETUP.md
npm install -g firebase-tools
firebase login
firebase init
```

選擇：Firestore + Functions + Hosting

更新 `firebase-config.js` 中的配置。

#### Step 2: 部署 Firestore 規則
```bash
firebase deploy --only firestore:rules
```

#### Step 3: 設定 Formspree
1. 前往 https://formspree.io/ 註冊
2. 建立表單，取得 Form ID
3. 在 `index.html` 第 225 行替換 `YOUR_FORM_ID`

詳見 `FORMSPREE_SETUP.md`

#### Step 4: 設定 Calendly（可選）
1. 前往 https://calendly.com/ 註冊
2. 建立活動類型
3. 取得嵌入代碼
4. 在 `index.html` 第 160-175 行替換預約區塊

詳見 `CALENDLY_SETUP.md`

#### Step 5: 推送到 Git
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

#### Step 6: 部署到 Netlify
1. 前往 https://app.netlify.com/
2. "Add new site" → "Import from Git"
3. 選擇你的 repository
4. 部署設定：
   - Build command: 留空
   - Publish directory: `.`
5. Deploy site

詳見 `NETLIFY_DEPLOY.md`

### 3. 測試

參考 `TESTING_GUIDE.md` 完整測試所有功能。

## 📝 設定清單

在上線前確認：

- [ ] `firebase-config.js` 已更新（Firebase 配置）
- [ ] `firestore.rules` 已部署
- [ ] `index.html` 中的 `YOUR_FORM_ID` 已替換
- [ ] Calendly 嵌入代碼已更新（如果使用）
- [ ] 聯絡 email 正確（index.html line 213）
- [ ] 社群連結已更新（index.html line 215-219）
- [ ] 測試表單提交成功
- [ ] 確認 Firestore 有收到資料
- [ ] 收到 Formspree email 通知

## 🎯 使用流程

### 客戶聯絡流程

1. **訪客填寫表單** → 2. **資料存入 Firestore** → 3. **你收到 email 通知** → 4. **回覆客戶**

### 預約諮詢流程

1. **訪客選擇時段** → 2. **Calendly 預約** → 3. **雙方收到確認** → 4. **Google Calendar 同步** → 5. **會議提醒**

## 📊 資料管理

### 查看聯絡資料

**Firebase Console**:
1. 前往 https://console.firebase.google.com/
2. 選擇專案
3. Firestore Database → contacts collection

**Formspree Dashboard**:
- 查看所有提交記錄
- 匯出 CSV

### 查看預約記錄

**Calendly Dashboard**:
- 所有預約列表
- 行事曆檢視
- 匯出功能

**Google Calendar**:
- 自動同步所有預約

## 🔧 維護與監控

### 定期檢查

**每週**:
- 檢查新的聯絡與預約
- 確認 email 通知正常

**每月**:
- Firebase 用量（Firestore Console）
- Formspree 用量（50 次/月）
- Netlify 流量（Dashboard）

### 備份

**Firestore 資料**:
```bash
# 手動備份
firebase firestore:export gs://your-bucket/backups
```

或在 Firebase Console 手動匯出。

## 🚀 未來擴充

### 可以加入的功能

1. **Google Analytics**
   - 追蹤訪客流量
   - 免費

2. **Gemini AI 聊天機器人**
   - 你有 Gemini Pro 訂閱
   - 用 Firebase Functions 整合
   - 智能客服

3. **後台管理介面**
   - Firebase Authentication
   - 簡單的 admin.html
   - 管理聯絡資料

4. **Blog / 作品集 CMS**
   - 用 Firestore 存內容
   - 動態生成頁面

5. **多語言支援**
   - 繁中 / 英文切換

### 效能優化

- 圖片壓縮與 lazy loading
- 使用 CDN（Netlify 已內建）
- 加入 Service Worker（PWA）

## 🐛 故障排除

### 常見問題

**Q: 表單提交失敗**
- 檢查 Firebase config 是否正確
- 確認 Firestore rules 已部署
- 查看瀏覽器 Console 錯誤

**A: 參考 `TESTING_GUIDE.md` 的故障排除章節**

**Q: 沒收到 email 通知**
- 檢查垃圾郵件資料夾
- 確認 Formspree Form ID 正確
- 第一次需要確認 email

**A: 參考 `FORMSPREE_SETUP.md`**

**Q: Calendly widget 沒顯示**
- 檢查嵌入代碼是否正確
- 確認 JavaScript 載入
- 查看 Console 錯誤

**A: 參考 `CALENDLY_SETUP.md`**

## 📚 文件索引

- [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md) - Firebase 完整設定
- [`FIRESTORE_STRUCTURE.md`](FIRESTORE_STRUCTURE.md) - 資料庫結構
- [`NETLIFY_DEPLOY.md`](NETLIFY_DEPLOY.md) - 部署到 Netlify
- [`FORMSPREE_SETUP.md`](FORMSPREE_SETUP.md) - 表單 email 通知
- [`CALENDLY_SETUP.md`](CALENDLY_SETUP.md) - 預約系統整合
- [`TESTING_GUIDE.md`](TESTING_GUIDE.md) - 完整測試流程

## 💡 提示

### Google Cloud / Gemini Pro 額度

你提到有 Gemini Pro 訂閱，可能包含：

1. **Google Cloud 額度**（通常 $300）
   - 查看：https://console.cloud.google.com/billing
   - 如有額度，Firebase 超過免費額度也不用擔心

2. **Vertex AI / Gemini API**
   - 可以在網站加入 AI 功能
   - 例如：智能客服、自動回覆、內容生成

### 聯絡方式

專案相關問題歡迎透過：
- Email: eikustudio@gmail.com
- 或在 GitHub Issues 提問

## 📄 授權

此專案供 eiku studio 使用。

---

**部署成功後的網站 URL**: `https://eiku-studio.netlify.app`（或你的自訂網域）

祝部署順利！🎉
