# Firebase 設定指南

## 步驟 1: 安裝 Firebase CLI

```bash
npm install -g firebase-tools
```

## 步驟 2: 登入 Firebase

```bash
firebase login
```

這會開啟瀏覽器，用你的 Google 帳號登入。

## 步驟 3: 建立 Firebase 專案

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 點擊「新增專案」
3. 輸入專案名稱，例如：`eiku-studio`
4. 選擇是否啟用 Google Analytics（建議啟用）
5. 建立專案

## 步驟 4: 連結本地專案

在專案資料夾執行：

```bash
firebase use --add
```

選擇你剛建立的專案，並設定別名為 `default`。

或者直接編輯 `.firebaserc`，將 `your-project-id` 改成你的專案 ID。

## 步驟 5: 啟用服務

在 Firebase Console 中：

### 5.1 啟用 Firestore
1. 左側選單 → Firestore Database
2. 點擊「建立資料庫」
3. 選擇「以測試模式啟動」（之後會套用我們的安全規則）
4. 選擇位置（建議：asia-east1 台灣，或 asia-northeast1 日本）

### 5.2 啟用 Functions
Functions 會在第一次部署時自動啟用。

### 5.3 取得 Firebase 配置

1. 專案設定 → 一般
2. 往下滾動到「你的應用程式」
3. 點擊「網頁」圖示 `</>`
4. 註冊應用程式，名稱例如：`eiku-studio-web`
5. 複製 `firebaseConfig` 物件
6. 貼到 `firebase-config.js` 中

## 步驟 6: 部署 Firestore 規則

```bash
firebase deploy --only firestore:rules
```

## 步驟 7: 部署 Functions（可選）

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

## 步驟 8: 測試 Firestore

在 Firebase Console → Firestore Database 中，你應該能看到空的資料庫。
當有人提交表單時，會自動建立 `contacts` collection。

## 故障排除

### 錯誤：Permission denied
確認你的 Google 帳號有權限存取該專案。

### 錯誤：Firebase CLI 指令無效
確認已全域安裝：`npm install -g firebase-tools`

### Functions 部署失敗
確認已在 `functions/` 資料夾中執行 `npm install`

## 檢查 Google Cloud 額度

你提到有 Gemini Pro 訂閱，可能有 Google Cloud 額度：

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 選擇你的 Firebase 專案（會自動建立對應的 GCP 專案）
3. 左側選單 → 帳單 → 概覽
4. 查看是否有可用額度

如果有額度，即使超過 Firebase 免費額度也不會收費（直到額度用完）。

## 相關連結

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase 文件](https://firebase.google.com/docs)
- [Firestore 定價](https://firebase.google.com/pricing)
