# Calendly 設定指南

Calendly 是免費的線上預約系統，可以讓客戶直接預約諮詢時段。

## 功能特色

- 自動同步 Google Calendar
- 避免重複預約
- 自動寄送確認 email 和提醒
- 支援不同時區
- 可設定緩衝時間

## 設定步驟

### 1. 註冊 Calendly

1. 前往 https://calendly.com/
2. 點擊 "Sign up"
3. 用 Google 帳號註冊（最快）
4. 免費方案包含：
   - 1 個活動類型
   - 無限預約
   - 基本自訂選項

### 2. 連結行事曆

1. 登入後點擊 "Connect Calendar"
2. 選擇 Google Calendar
3. 授權存取
4. 選擇要檢查衝突的行事曆

這樣 Calendly 會自動避開你已有的行程。

### 3. 建立活動類型

1. Dashboard → Event Types → Create
2. 選擇 "One-on-One"
3. 設定活動：

**基本設定**:
- **Event name**: `eiku studio 諮詢`
- **Duration**: 30 分鐘（或 45/60 分鐘）
- **Location**: 
  - Google Meet（線上會議）
  - 或電話
  - 或實體地點

**描述**:
```
感謝預約 eiku studio 諮詢！

在這次會議中，我們將討論：
• 您的專案需求
• 服務內容與流程
• 報價與時程規劃

期待與您交流！
```

**可預約時段**:
- 設定你的工作時間
- 例如：週一到週五 10:00-18:00
- 週末是否開放

**進階選項**:
- **緩衝時間**: 預約之間空 15 分鐘
- **最短預約通知**: 至少提前 24 小時
- **最遠可預約**: 60 天內

### 4. 自訂問題

在 "Invitee Questions" 加入：

1. **感興趣的服務** （必填）
   - 單選
   - 選項：
     - STEAM 教育課程
     - 嵌入式系統開發
     - 品牌與視覺設計
     - 多項服務整合
     - 其他諮詢

2. **簡述需求** （選填）
   - 文字輸入
   - 讓你提前了解客戶需求

### 5. 取得嵌入代碼

1. 點擊你的活動
2. 右上角 "Copy Link"（複製連結）
3. 或點擊 "Add to Website" 取得嵌入代碼

你會得到類似這樣的代碼：

```html
<!-- Calendly inline widget begin -->
<div class="calendly-inline-widget" 
     data-url="https://calendly.com/your-username/eiku-studio-consultation" 
     style="min-width:320px;height:700px;">
</div>
<script type="text/javascript" 
        src="https://assets.calendly.com/assets/external/widget.js" 
        async>
</script>
<!-- Calendly inline widget end -->
```

### 6. 更新 index.html

找到 `index.html` 中的第 160-175 行（預約區塊）：

```html
<div class="booking-placeholder">
    <!-- 舊的 placeholder 內容 -->
</div>
```

替換成：

```html
<div class="calendly-inline-widget" 
     data-url="https://calendly.com/your-username/eiku-studio-consultation" 
     style="min-width:320px;height:700px;">
</div>
<script type="text/javascript" 
        src="https://assets.calendly.com/assets/external/widget.js" 
        async>
</script>
```

記得把 `your-username` 改成你的實際 Calendly 用戶名。

### 7. 測試預約

1. 部署網站
2. 到預約區塊
3. 嘗試預約一個時段
4. 檢查是否收到確認 email
5. 檢查 Google Calendar 是否有新增行程

## 進階自訂

### Email 通知範本

Workflows → Notifications → Edit templates

可以自訂：
- 確認 email
- 提醒 email（會議前 1 天/1 小時）
- 取消通知

範例確認信：

```
親愛的 {{invitee_full_name}}，

感謝預約 eiku studio 諮詢！

會議詳情：
日期時間：{{event_start_date_time}}
時長：30 分鐘
會議連結：{{location}}

如需變更或取消，請點擊以下連結：
{{cancellation_url}}

期待與您見面！

eiku studio
```

### 整合 Google Meet

1. Settings → Conferencing
2. 連結 Google Meet
3. 建立活動時選擇 Google Meet
4. 預約時會自動建立會議室

### 客製化顏色

Settings → Branding

- 主色調：設定成你的品牌色（例如：`#6366f1`）
- Logo：上傳你的 logo

### 時區設定

Calendly 會自動偵測訪客的時區，但你可以：
- Settings → Time Zone
- 設定你的預設時區（Asia/Taipei）

## 整合 Firebase（可選）

如果想把 Calendly 預約也存到 Firebase，可以用 Webhook：

### 1. 設定 Firebase Function

```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.calendlyWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const event = req.body.payload;
  
  if (event.event === 'invitee.created') {
    await admin.firestore().collection('bookings').add({
      name: event.invitee.name,
      email: event.invitee.email,
      scheduled_time: new Date(event.event_start_time),
      calendly_event_id: event.uuid,
      calendly_uri: event.uri,
      status: 'scheduled',
      created_at: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  res.status(200).send('OK');
});
```

### 2. 在 Calendly 設定 Webhook

1. Settings → Webhooks
2. Add webhook
3. URL: `https://your-region-your-project.cloudfunctions.net/calendlyWebhook`
4. 選擇事件：`invitee.created`

這需要 Firebase Blaze 付費方案（但用量小不會收費）。

## 替代方案

如果不想用 Calendly：

### 選項 1: Setmore（免費）

- https://www.setmore.com/
- 功能類似 Calendly
- 免費方案更多功能

### 選項 2: Cal.com（開源）

- https://cal.com/
- 開源預約系統
- 可自架或用雲端版

### 選項 3: 簡單的 Google Calendar 連結

直接分享 Google Calendar 預約連結：
- 簡單但不夠專業
- 沒有自動提醒
- 可能重複預約

## 付費方案（如果需要）

### Standard: $10/月

- 無限活動類型
- 群組活動
- 移除 Calendly 品牌
- SMS 提醒
- Stripe 整合（收款）

### Teams: $16/月/人

- 團隊排程
- 輪流分配
- 進階報表

對於個人工作室，免費方案完全夠用。

## 使用技巧

### 1. 設定緩衝時間

避免背靠背會議，在每個預約之間留 15 分鐘。

### 2. 限制當日預約

設定"最短預約通知"為 24 小時，避免突然的會議。

### 3. 使用範本回覆

在確認 email 中加入常見問題解答。

### 4. 追蹤轉換率

在 Analytics 中查看：
- 有多少人看到預約頁面
- 完成預約的比例

### 5. A/B 測試時段

試試不同的可預約時段，看哪個轉換率最高。

## 故障排除

### 問題：Widget 沒顯示

檢查：
1. URL 是否正確
2. JavaScript 是否載入
3. 瀏覽器 Console 錯誤

### 問題：時區不對

確認：
1. Calendly 設定的時區
2. Google Calendar 時區
3. 訪客瀏覽器時區

### 問題：沒收到通知

檢查：
1. 垃圾郵件資料夾
2. Calendly Email 設定
3. Gmail 過濾器

## 相關連結

- [Calendly Help Center](https://help.calendly.com/)
- [Calendly API](https://developer.calendly.com/)
- [Webhook 文件](https://developer.calendly.com/api-docs/ZG9jOjQ4MDQxOQ-webhooks)
