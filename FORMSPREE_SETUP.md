# Formspree 設定指南

Formspree 提供免費的表單處理服務，可以將表單提交直接轉成 email 通知。

## 為什麼需要 Formspree？

雖然我們已經用 Firebase Firestore 儲存表單資料，但 Formspree 提供：
1. **即時 Email 通知**：有人提交表單時立即收到 email
2. **備份機制**：如果 Firebase 有問題，Formspree 還是會收到
3. **垃圾郵件過濾**：內建 reCAPTCHA 和反垃圾郵件功能

## 設定步驟

### 1. 註冊 Formspree

1. 前往 https://formspree.io/
2. 點擊 "Get Started"
3. 用 Google 或 Email 註冊
4. 免費方案包含：
   - 每月 50 次提交
   - 1 個表單
   - 基本反垃圾郵件保護

### 2. 建立新表單

1. 登入後點擊 "New Form"
2. 設定表單：
   - **Name**: `eiku studio 聯絡表單`
   - **Email**: 填入你要接收通知的 email（例如：eikustudio@gmail.com）
3. 建立後會得到一個 Form ID，例如：`mwpebvlo`

### 3. 更新 index.html

找到 `index.html` 中的第 225 行：

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
```

改成：

```html
<form action="https://formspree.io/f/mwpebvlo" method="POST" class="contact-form">
```

（把 `YOUR_FORM_ID` 改成你的實際 Form ID）

### 4. 測試表單

1. 部署網站到 Netlify
2. 開啟你的網站
3. 填寫聯絡表單並提交
4. 第一次提交時需要確認 email（Formspree 會寄確認信）
5. 確認後，之後的提交都會直接寄到你的 email

### 5. 自訂設定（可選）

在 Formspree Dashboard 可以設定：

#### Email 模板
自訂收到的 email 格式。

#### 自動回覆
寄感謝信給提交表單的人：
1. 進入你的表單設定
2. Settings → Autoresponder
3. 啟用並自訂訊息：

```
親愛的 {{name}}，

感謝您聯絡 eiku studio！

我們已收到您的訊息，會在 1-2 個工作天內回覆。

eiku studio 團隊
```

#### 重定向（目前已用 JavaScript 處理）
提交後跳轉到感謝頁面（我們已經用 JavaScript 顯示訊息了）。

#### 垃圾郵件過濾
- Settings → Spam → 啟用 reCAPTCHA
- 需要加入 reCAPTCHA script（可選）

### 6. 升級方案（如果需要）

如果每月超過 50 次提交，可以升級：

- **Freelancer**: $10/月
  - 1,000 次提交/月
  - 無限表單
  - 進階垃圾郵件保護

- **Agency**: $40/月
  - 10,000 次提交/月
  - 團隊功能

對於小型網站，免費方案通常夠用。

## 表單欄位映射

Formspree 會自動辨識以下欄位名稱：

| HTML name 屬性 | Formspree 辨識 | 說明 |
|---------------|---------------|------|
| `name` | 姓名 | 提交者姓名 |
| `email` 或 `_replyto` | Email | 回覆地址 |
| `message` | 訊息 | 主要內容 |
| `service` | 自訂欄位 | 感興趣的服務 |

我們的表單已經使用這些標準名稱。

## 進階功能

### 隱藏欄位

可以加入隱藏欄位追蹤來源：

```html
<input type="hidden" name="_subject" value="eiku studio 新聯絡">
<input type="hidden" name="_gotcha" style="display:none">
```

### Ajax 提交

我們已經在 `script.js` 中實作 Ajax 提交：
- 不會跳轉頁面
- 顯示友善的成功/錯誤訊息
- 資料同時存到 Firebase 和 Formspree

### Webhook

如果想串接其他服務（Slack、Discord）：
1. Settings → Webhooks
2. 加入 webhook URL
3. 有人提交時會送 POST request

例如串接 Slack：
```
https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## 替代方案

如果不想用 Formspree，還有：

### 選項 1: Netlify Forms（如果部署在 Netlify）

在 form 標籤加上 `netlify` 屬性：

```html
<form netlify name="contact" class="contact-form">
```

免費方案：100 次提交/月

優點：
- 整合在 Netlify Dashboard
- 不需要第三方服務
- 可以下載 CSV

缺點：
- 只能在 Netlify 使用
- Email 通知需要設定

### 選項 2: EmailJS

完全前端的 email 服務：
- 每月 200 封 email（免費）
- 不需要後端
- 支援多個 email 服務商

### 選項 3: 自己的 Firebase Function

用 Firebase Functions 寄 email（需要付費方案）：

```javascript
// functions/index.js
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.sendEmail = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    // 寄送 email...
  });
```

但這需要：
- Firebase Blaze 付費方案
- 設定 SMTP（SendGrid、Mailgun 等）

## 監控與維護

### 查看提交記錄

Formspree Dashboard → Your Forms → 點擊表單

可以看到：
- 所有提交
- 提交時間
- 表單內容
- IP 位址

### Export 資料

可以匯出 CSV 檔案做備份或分析。

### 垃圾郵件處理

如果收到垃圾郵件：
1. 在 Dashboard 標記為 spam
2. 啟用 reCAPTCHA
3. 設定 honeypot（已在表單中加入 `_gotcha`）

## 故障排除

### 問題：沒收到 email

檢查：
1. 垃圾郵件資料夾
2. Formspree Dashboard 是否有收到提交
3. Email 設定是否正確

### 問題：提交失敗

檢查：
1. Form ID 是否正確
2. 網路連線
3. 瀏覽器 Console 錯誤訊息

### 問題：超過免費額度

- 升級方案，或
- 使用 Netlify Forms（100 次/月），或
- 實作 Firebase Functions

## 相關連結

- [Formspree 文件](https://help.formspree.io/)
- [Formspree API](https://formspree.io/docs/api)
- [reCAPTCHA 設定](https://www.google.com/recaptcha)
