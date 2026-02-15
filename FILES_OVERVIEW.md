# 檔案結構概覽

## 📁 專案檔案說明

### 🌐 前端核心檔案

| 檔案 | 說明 | 需要修改 |
|------|------|---------|
| `index.html` | 主頁面，包含所有內容區塊 | ✅ 是（Formspree ID、Calendly 代碼、聯絡資訊） |
| `styles.css` | 完整 CSS 樣式，包含響應式設計 | ❌ 否（除非要自訂樣式） |
| `script.js` | JavaScript 功能（主題、滾動、動畫、表單處理） | ❌ 否（已整合 Firebase） |

### 🔥 Firebase 相關檔案

| 檔案 | 說明 | 需要修改 |
|------|------|---------|
| `firebase-config.js` | Firebase SDK 配置 | ✅ **必須**（替換 YOUR_API_KEY 等） |
| `firebase.json` | Firebase 專案設定 | ❌ 否 |
| `.firebaserc` | Firebase 專案連結 | ✅ 是（替換 your-project-id 或用 CLI） |
| `firestore.rules` | Firestore 安全規則 | ❌ 否（已設定好） |
| `firestore.indexes.json` | Firestore 索引設定 | ❌ 否 |

### 🚀 部署相關檔案

| 檔案 | 說明 | 需要修改 |
|------|------|---------|
| `netlify.toml` | Netlify 部署設定 | ❌ 否 |
| `.gitignore` | Git 忽略檔案列表 | ❌ 否 |
| `.gitattributes` | Git 屬性設定 | ❌ 否 |

### 📚 文件檔案

| 檔案 | 用途 | 何時閱讀 |
|------|------|---------|
| `README.md` | **主文件**：完整專案概覽 | 📖 開始時必讀 |
| `QUICKSTART.md` | **快速開始**：30 分鐘部署指南 | 🚀 急著上線時看這個 |
| `DEPLOYMENT_CHECKLIST.md` | **檢查清單**：確保沒遺漏 | ✅ 部署時逐項確認 |
| `FIREBASE_SETUP.md` | Firebase 詳細設定步驟 | 🔥 設定 Firebase 時 |
| `FIRESTORE_STRUCTURE.md` | 資料庫結構與查詢範例 | 📊 需要了解資料結構時 |
| `NETLIFY_DEPLOY.md` | Netlify 部署詳細說明 | 🌐 部署網站時 |
| `FORMSPREE_SETUP.md` | Formspree 表單設定 | 📧 設定 email 通知時 |
| `CALENDLY_SETUP.md` | Calendly 預約系統整合 | 📅 設定預約功能時 |
| `TESTING_GUIDE.md` | 完整測試流程與故障排除 | 🧪 測試或遇到問題時 |
| `FILES_OVERVIEW.md` | 本檔案：檔案結構說明 | 📁 想了解專案結構時 |

### 🗑️ 可選擇刪除的檔案

| 檔案 | 說明 |
|------|------|
| `DEPLOY.md` | 舊的部署說明（可能重複） |

---

## 🎯 建議的閱讀順序

### 首次部署（完整版）

1. **`README.md`** - 了解整體架構
2. **`DEPLOYMENT_CHECKLIST.md`** - 準備檢查清單
3. **`FIREBASE_SETUP.md`** - 設定 Firebase
4. **`NETLIFY_DEPLOY.md`** - 部署網站
5. **`FORMSPREE_SETUP.md`** - 設定表單
6. **`CALENDLY_SETUP.md`** - 設定預約（可選）
7. **`TESTING_GUIDE.md`** - 測試所有功能

### 首次部署（快速版）⚡

**只看這個：`QUICKSTART.md`**

30 分鐘快速部署，包含所有必要步驟。

### 日常維護

- **查看新聯絡**：Firebase Console → Firestore → contacts
- **查看預約**：Calendly Dashboard
- **修改內容**：編輯 `index.html`，推送到 Git

### 遇到問題

**`TESTING_GUIDE.md`** → 故障排除章節

---

## 🔄 修改檔案後的部署流程

```bash
# 1. 修改檔案（例如：index.html）

# 2. 查看變更
git status

# 3. 加入變更
git add .

# 4. 提交
git commit -m "描述你的變更"

# 5. 推送
git push

# Netlify 會自動重新部署（1-2 分鐘）
```

---

## 📝 必須修改的內容總結

### 1. `firebase-config.js`（必須）
```javascript
// 替換這些值
apiKey: "YOUR_API_KEY"           → 你的實際 API Key
authDomain: "your-project..."     → 你的實際 authDomain
projectId: "your-project-id"      → 你的實際專案 ID
// ... 其他配置
```

### 2. `index.html`（必須）

**Line 225**: Formspree Form ID
```html
action="https://formspree.io/f/YOUR_FORM_ID"
改成
action="https://formspree.io/f/mwpebvlo"  ← 你的實際 Form ID
```

**Line 160-175**: Calendly 嵌入代碼（可選）
```html
<!-- 整個 booking-placeholder 區塊替換成 Calendly 提供的代碼 -->
```

**Line 213**: 聯絡 Email（確認是否正確）
```html
eikustudio@gmail.com  ← 確認這是你的 email
```

**Line 215-219**: 社群連結（可選）
```html
<a href="#" ...>  ← 替換成你的實際社群連結
```

### 3. `.firebaserc`（選擇性，也可用 CLI）
```json
{
  "projects": {
    "default": "your-project-id"  ← 替換成你的專案 ID
  }
}
```

---

## 🎨 自訂樣式指南

如果想修改外觀，編輯 `styles.css` 中的 CSS 變數：

```css
:root {
  --accent: #6366f1;        /* 主色調 */
  --accent-hover: #4f46e5;  /* 懸停顏色 */
  --text: #1a202c;          /* 文字顏色 */
  --bg: #ffffff;            /* 背景色 */
  /* ... 更多變數 */
}
```

修改這些變數會自動套用到整個網站。

---

## 📊 檔案依賴關係

```
index.html
├── styles.css                (樣式)
├── script.js                 (功能)
│   └── firebase-config.js    (Firebase 配置)
├── Firebase SDK              (CDN)
└── Calendly Script           (CDN)

部署設定
├── netlify.toml              (Netlify)
├── firebase.json             (Firebase)
├── firestore.rules           (安全規則)
└── firestore.indexes.json    (索引)

版本控制
├── .git/
├── .gitignore
└── .gitattributes
```

---

## 💾 重要檔案備份

建議備份以下檔案（含敏感資訊）：
- `firebase-config.js` - Firebase 配置
- `.firebaserc` - Firebase 專案連結
- `index.html` - 包含你的自訂內容

其他檔案都可以從 Git 恢復。

---

## 🔍 快速參考

### 我想...

| 目標 | 檔案 | 說明 |
|------|------|------|
| 修改網站內容 | `index.html` | 文字、連結、區塊 |
| 修改樣式顏色 | `styles.css` | CSS 變數與樣式 |
| 查看資料庫資料 | Firebase Console | contacts collection |
| 查看表單提交 | Formspree Dashboard | 提交記錄 |
| 管理預約 | Calendly Dashboard | 預約列表 |
| 查看網站流量 | Netlify Dashboard | Analytics |
| 修改預約設定 | Calendly Settings | 時段、問題等 |
| 部署新版本 | Git push | 自動觸發部署 |

### 快速指令

```bash
# 查看 Git 狀態
git status

# 部署更新
git add . && git commit -m "更新" && git push

# 部署 Firestore 規則
firebase deploy --only firestore:rules

# 查看 Firebase 專案
firebase projects:list

# 本地測試（如果需要）
python3 -m http.server 8000
# 開啟 http://localhost:8000
```

---

## ✅ 檔案完整性檢查

確認所有必要檔案都存在：

```bash
ls -1 | grep -E '(html|css|js|json|toml|rules|md)$'
```

應該看到：
- ✅ index.html
- ✅ styles.css
- ✅ script.js
- ✅ firebase-config.js
- ✅ firebase.json
- ✅ .firebaserc
- ✅ firestore.rules
- ✅ firestore.indexes.json
- ✅ netlify.toml
- ✅ README.md
- ✅ QUICKSTART.md
- ✅ 其他 .md 文件

---

**有問題？** 查看各個 SETUP.md 文件的故障排除章節。
