# ⚡ 快速開始指南

## 🎯 5 分鐘讓網站上線

### 1️⃣ 預覽網站（現在就可以！）

**Mac：**
```bash
cd /Applications/eiku_studio
open index.html
```

**或直接用 Finder：**
- 找到 `index.html` 檔案
- 雙擊開啟

✨ 網站就在你的瀏覽器中！

---

### 2️⃣ 必做設定（5 分鐘）

#### A. 設定聯絡表單

1. 開啟瀏覽器，前往：https://formspree.io
2. 點擊 "Get Started" 註冊（用 Email 或 GitHub）
3. 建立新表單 "New Form"
4. 複製你的 Form ID（格式：`xxxxxxxxx`）
5. 用編輯器開啟 `index.html`
6. 搜尋：`YOUR_FORM_ID`
7. 替換成你的實際 ID
8. 儲存檔案

✅ 完成！表單可以使用了（每月免費 100 次提交）

#### B. 設定預約系統

**選項 1 - Calendly（推薦）：**
1. 前往：https://calendly.com → Sign Up
2. 設定你的可預約時段
3. 完成後，點擊 "Share" → "Add to website"
4. 複製嵌入代碼
5. 在 `index.html` 找到 `booking-placeholder` 區塊
6. 用嵌入代碼替換整個 `booking-placeholder` div

**選項 2 - Setmore：**
1. 前往：https://www.setmore.com → Sign Up Free
2. 設定服務和時間
3. 取得嵌入代碼
4. 同樣方式替換到 `booking-placeholder`

✅ 完成！客戶可以直接預約了

---

### 3️⃣ 部署上線（3 分鐘）

**最簡單方法 - Netlify 拖放：**

1. 前往：https://www.netlify.com → Sign up
2. 登入後，看到 "Drag and drop your site" 區域
3. **把整個 `eiku_studio` 資料夾拖進去**
4. 等待 30 秒
5. 🎉 完成！你會得到網址：`https://xxx.netlify.app`

**自訂網址（可選）：**
- 點擊 "Site settings"
- "Change site name" → 輸入 `eiku-studio`
- 新網址：`https://eiku-studio.netlify.app`

---

### 4️⃣ 更新內容（隨時）

#### 更新文字內容：

在 `index.html` 中搜尋並替換：

| 要改的內容 | 搜尋關鍵字 | 位置 |
|----------|---------|------|
| Email | `hello@eikustudio.com` | 聯絡區域 |
| 服務描述 | `service-description` | 三個服務區塊 |
| 作品案例 | `portfolio-card` | 作品集區域 |
| 統計數字 | `stat-number` | 關於區域 |

#### 更換作品圖片：

1. 準備圖片（建議尺寸：1600x1000px）
2. 放到 `eiku_studio` 資料夾
3. 在 `index.html` 找到：
   ```html
   <div class="placeholder-image steam-bg"></div>
   ```
4. 改成：
   ```html
   <img src="your-image.jpg" alt="專案名稱">
   ```

#### 修改配色：

開啟 `styles.css`，找到最上方的 `:root`：

```css
:root {
  --accent: #0066ff;  /* 改這裡！主要顏色 */
  --steam-color: #00ff88;
  --embedded-color: #0066ff;
  --design-color: #ff0066;
}
```

儲存後重新載入網頁就能看到效果。

---

## 📱 測試清單

部署前確認：

- [ ] 在電腦瀏覽器開啟正常
- [ ] 在手機瀏覽器開啟正常
- [ ] 深淺模式切換正常（點右上角圓形按鈕）
- [ ] 所有導航連結都能跳轉
- [ ] 表單可以提交（測試一次）
- [ ] Email 和社群連結都正確

---

## 🚀 下一步

完成基本設定後：

1. **收集素材**
   - 拍攝/收集專案照片
   - 準備案例說明文字
   - 整理服務項目細節

2. **優化內容**
   - 撰寫吸引人的服務描述
   - 展示最佳作品
   - 加入客戶評價（可選）

3. **推廣網站**
   - 在社群媒體分享
   - 加入 Google 搜尋（Google Search Console）
   - 印製名片/文宣時加上網址

4. **持續更新**
   - 定期新增作品案例
   - 更新服務內容
   - 分享部落格文章（未來功能）

---

## 💡 進階功能

想要更多功能？

- **部落格**：使用 Decap CMS 或手寫 HTML 文章
- **多語言**：複製 HTML 建立英文版
- **分析工具**：加入 Google Analytics 追蹤流量
- **SEO 優化**：提交網站地圖到搜尋引擎
- **效能優化**：壓縮圖片、使用 WebP 格式

詳見 `README.md` 和 `DEPLOY.md`

---

## ❓ 需要幫助？

- 📖 完整說明：見 `README.md`
- 🚀 部署問題：見 `DEPLOY.md`
- 📧 其他問題：hello@eikustudio.com

---

**開始你的 Vibecoding 之旅！** 🎉
