# eiku studio 網站

專業的 STEAM 教育、嵌入式工程與品牌設計工作室網站。

## 🚀 快速開始

直接用瀏覽器開啟 `index.html` 即可預覽網站。

## 📋 下一步設定

### 1. 整合 Formspree 表單（必要）

1. 前往 [https://formspree.io](https://formspree.io) 註冊免費帳號
2. 建立新表單，取得 Form ID
3. 在 `index.html` 找到這一行：
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. 將 `YOUR_FORM_ID` 替換成你的實際 Form ID
5. 測試表單提交功能

**免費方案：** 每月 100 次提交

### 2. 嵌入預約系統（推薦）

選項 A - Calendly：
1. 前往 [https://calendly.com](https://calendly.com) 註冊
2. 設定你的可預約時段
3. 取得嵌入代碼
4. 在 `index.html` 的 `booking-section` 區塊替換預設內容

選項 B - Setmore：
1. 前往 [https://www.setmore.com](https://www.setmore.com) 註冊
2. 設定服務項目和時間
3. 取得嵌入代碼
4. 替換到 `booking-section`

**免費方案：** 兩者都有永久免費版本

### 3. 更新內容

需要更新的內容：
- **Hero 區域**：確認業務描述是否準確
- **服務區塊**：填入實際的課程、專案、設計案例
- **作品集**：替換 placeholder 為真實作品圖片
- **關於區域**：更新統計數字和簡介
- **聯絡資訊**：更新 Email 和社群媒體連結

## 🌐 部署到線上

### 方法一：Netlify（推薦，最簡單）

1. **註冊帳號**
   - 前往 [https://www.netlify.com](https://www.netlify.com)
   - 使用 GitHub、GitLab 或 Email 註冊

2. **部署網站**
   - 登入後，點擊 "Add new site" → "Deploy manually"
   - 將整個 `eiku_studio` 資料夾拖放到部署區域
   - 等待部署完成（約 30 秒）

3. **獲得網址**
   - 系統會自動生成一個網址：`xxx.netlify.app`
   - 可在 Site settings 中自訂子網域名稱

4. **綁定自訂網域（可選）**
   - 在 Netlify 的 Domain settings 中
   - 新增你購買的網域（如 eikustudio.com）
   - 按照指示設定 DNS 記錄

**優勢：**
- ✅ 免費 SSL 憑證
- ✅ 全球 CDN 加速
- ✅ 自動表單處理
- ✅ 持續部署（更新時重新上傳即可）

### 方法二：GitHub Pages

1. **建立 GitHub 帳號**
   - 前往 [https://github.com](https://github.com)
   - 註冊免費帳號

2. **建立 Repository**
   - 點擊 "New repository"
   - 命名為 `eiku-studio`（或任何名稱）
   - 設為 Public
   - 建立 repository

3. **上傳檔案**
   - 在 repository 頁面點擊 "Add file" → "Upload files"
   - 將 `index.html`、`styles.css`、`script.js` 上傳
   - 提交更改（Commit changes）

4. **啟用 GitHub Pages**
   - 進入 Settings → Pages
   - Source 選擇 "Deploy from a branch"
   - Branch 選擇 `main`，資料夾選 `/ (root)`
   - 儲存設定

5. **訪問網站**
   - 網址會是：`https://你的用戶名.github.io/eiku-studio`
   - 等待約 1-2 分鐘部署完成

### 方法三：Vercel

1. 前往 [https://vercel.com](https://vercel.com)
2. 註冊並匯入專案
3. 選擇資料夾並部署
4. 類似 Netlify，自動生成網址

## 📁 檔案結構

```
eiku_studio/
├── index.html      # 主頁面
├── styles.css      # 樣式表（科技感極簡風格）
├── script.js       # 互動功能（深淺模式切換等）
└── README.md       # 說明文件
```

## 🎨 設計特色

- ✨ **極簡科技風格**：大量留白、簡潔排版
- 🌓 **深淺模式切換**：自動適應系統偏好
- 📱 **完全響應式**：手機、平板、桌面完美顯示
- ⚡ **快速載入**：純靜態網站，無需後端
- 🎯 **Space Grotesk 字體**：現代化的科技感字體

## 🛠 技術棧

- HTML5
- CSS3 (CSS Variables for theming)
- Vanilla JavaScript
- Google Fonts (Space Grotesk, JetBrains Mono)
- Formspree (表單處理)
- Calendly/Setmore (預約系統)

## 💰 成本

**完全免費方案：**
- 託管：Netlify/GitHub Pages（$0）
- 表單：Formspree 免費版（$0，100次/月）
- 預約：Calendly/Setmore 免費版（$0）
- **總計：$0/月**

**未來升級選項：**
- 自訂網域：~$10-15/年
- Formspree Pro：$10/月（無限表單）
- Calendly Professional：$12/月（多種會議類型）

## 📝 內容更新指南

### 新增作品到作品集

在 `index.html` 的 `portfolio-grid` 中新增：

```html
<article class="portfolio-card">
    <div class="portfolio-image">
        <div class="placeholder-image steam-bg"></div>
        <!-- 或者用圖片：<img src="your-image.jpg" alt="專案名稱"> -->
    </div>
    <div class="portfolio-info">
        <span class="portfolio-category">分類名稱</span>
        <h3>專案標題</h3>
        <p>專案描述</p>
    </div>
</article>
```

### 修改配色

在 `styles.css` 的 `:root` 區塊修改變數：

```css
:root {
  --accent: #0066ff;  /* 主要強調色 */
  --steam-color: #00ff88;  /* STEAM 教育色 */
  --embedded-color: #0066ff;  /* 嵌入式工程色 */
  --design-color: #ff0066;  /* 設計服務色 */
}
```

## 🤝 支援

如有問題，請聯絡：hello@eikustudio.com

## 📄 授權

© 2026 eiku studio. All rights reserved.
