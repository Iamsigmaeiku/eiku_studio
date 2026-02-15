# Firestore 資料結構設計

## Collection: contacts

儲存聯絡表單提交的資料。

### 結構

```javascript
{
  name: string,           // 聯絡人姓名
  email: string,          // Email 地址
  service: string,        // 感興趣的服務 (steam|embedded|design|multiple|other)
  message: string,        // 訊息內容
  timestamp: timestamp,   // 提交時間（自動）
  status: string         // 狀態: 'new' | 'contacted' | 'completed'
}
```

### 範例文件

```javascript
{
  name: "王小明",
  email: "wang@example.com",
  service: "steam",
  message: "想了解 Arduino 課程的詳細內容",
  timestamp: Timestamp(2026, 2, 15, 10, 30, 0),
  status: "new"
}
```

### 查詢範例

```javascript
// 取得所有新訊息，按時間排序
db.collection('contacts')
  .where('status', '==', 'new')
  .orderBy('timestamp', 'desc')
  .get()

// 取得特定服務的聯絡
db.collection('contacts')
  .where('service', '==', 'steam')
  .orderBy('timestamp', 'desc')
  .get()
```

---

## Collection: bookings

儲存 Calendly 預約資料（可選，透過 webhook 整合）。

### 結構

```javascript
{
  name: string,              // 預約人姓名
  email: string,             // Email 地址
  service: string,           // 預約的服務類型
  scheduled_time: timestamp, // 預約時間
  calendly_event_id: string, // Calendly 事件 ID
  calendly_uri: string,      // Calendly 事件 URI
  status: string,            // 'scheduled' | 'completed' | 'cancelled'
  notes: string             // 備註（可選）
}
```

### 範例文件

```javascript
{
  name: "陳小華",
  email: "chen@example.com",
  service: "embedded",
  scheduled_time: Timestamp(2026, 2, 20, 14, 0, 0),
  calendly_event_id: "ABCDEFGH123",
  calendly_uri: "https://calendly.com/events/ABCDEFGH123",
  status: "scheduled",
  notes: ""
}
```

---

## Collection: portfolio (未來擴充)

儲存作品集項目，用於動態管理作品展示。

### 結構

```javascript
{
  title: string,          // 作品標題
  category: string,       // 'steam' | 'embedded' | 'design' | 'mixed'
  description: string,    // 作品描述
  image_url: string,      // 圖片 URL（可用 Firebase Storage）
  link: string,          // 相關連結（可選）
  featured: boolean,      // 是否為精選
  order: number,         // 排序順序
  created_at: timestamp  // 建立時間
}
```

---

## 安全規則說明

### Contacts Collection
- **新增 (create)**: 任何人都可以提交，無需認證
  - 驗證必填欄位存在
  - 驗證 email 格式
  - 驗證資料類型

- **讀取/更新/刪除**: 僅限已認證的管理員
  - 需要設定 Firebase Authentication

### Bookings Collection
- **新增 (create)**: 允許無認證新增（供 Calendly webhook 使用）
- **讀取/更新/刪除**: 僅限管理員

### Portfolio Collection
- **讀取 (read)**: 公開，任何人可讀
- **新增/更新/刪除**: 僅限管理員

---

## 設定後台管理（可選）

如果想要管理這些資料，有幾個選項：

### 選項 1: Firebase Console（最簡單）
直接在 Firebase Console → Firestore Database 手動查看和編輯。

### 選項 2: 簡單的管理後台
建立 `admin.html`，使用 Firebase Authentication：

```javascript
// 簡單的後台登入
firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    // 登入成功，顯示資料
    loadContacts();
  });

function loadContacts() {
  db.collection('contacts')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
      });
    });
}
```

### 選項 3: 使用第三方工具
- [Retool](https://retool.com/) - 可視化管理介面（有免費方案）
- [Forest Admin](https://www.forestadmin.com/) - 自動生成管理後台
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) - 用 Node.js 建立自訂工具

---

## 資料導出與備份

### 手動導出
Firebase Console → Firestore → 選擇 collection → 導出

### 自動備份（需要付費方案）
```bash
gcloud firestore export gs://your-bucket/backups
```

### 簡易備份腳本
建立定期備份到 JSON：

```javascript
// backup.js
const admin = require('firebase-admin');
const fs = require('fs');

admin.initializeApp();
const db = admin.firestore();

async function backup() {
  const contacts = await db.collection('contacts').get();
  const data = contacts.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  fs.writeFileSync(
    `backup-${Date.now()}.json`,
    JSON.stringify(data, null, 2)
  );
}

backup();
```

---

## 成本估算

基於小流量（<1000 訪客/月）：

- **讀取**: 假設每訪客 5 次讀取 = 5,000 次/月
- **寫入**: 假設 30 次表單提交 = 30 次/月
- **儲存**: 約 1MB 資料

**免費額度**:
- 50,000 讀取/天 = 1,500,000/月 ✅
- 20,000 寫入/天 = 600,000/月 ✅
- 1GB 儲存 ✅

完全在免費額度內。
