# Netlify 部署指南

## 前置準備

1. 確保程式碼已推送到 Git repository（GitHub、GitLab 或 Bitbucket）
2. 註冊 Netlify 帳號：https://app.netlify.com/signup

## 部署步驟

### 方法 1: 透過 Git 連結（推薦）

#### 1. 連結 Git Repository

1. 登入 Netlify
2. 點擊 "Add new site" → "Import an existing project"
3. 選擇你的 Git 提供商（GitHub/GitLab/Bitbucket）
4. 授權 Netlify 存取你的 repositories
5. 選擇 `eiku_studio` repository

#### 2. 設定建構選項

- **Branch to deploy**: `main` 或 `master`
- **Build command**: 留空（或填 `echo "靜態網站"`）
- **Publish directory**: `.`（當前目錄）
- **Functions directory**: 留空（或 `functions` 如果使用 Netlify Functions）

#### 3. 環境變數（可選）

如果需要設定環境變數：
- Site settings → Environment variables
- 目前專案不需要（Firebase config 是公開的）

#### 4. 部署

點擊 "Deploy site"，Netlify 會：
1. 克隆你的 repository
2. 建構網站（如果有 build command）
3. 發布到 CDN
4. 提供臨時網址，例如：`random-name-123456.netlify.app`

#### 5. 自訂網域（可選）

部署完成後：
1. Site settings → Domain management
2. 點擊 "Options" → "Edit site name"
3. 改成：`eiku-studio`
4. 網址變成：`https://eiku-studio.netlify.app`

如果有自己的網域：
1. 點擊 "Add custom domain"
2. 輸入你的網域（例如：`eikustudio.com`）
3. 按照指示設定 DNS（A record 或 CNAME）

### 方法 2: 透過 Netlify CLI（適合進階用戶）

#### 1. 安裝 CLI

```bash
npm install -g netlify-cli
```

#### 2. 登入

```bash
netlify login
```

#### 3. 初始化

在專案資料夾執行：

```bash
netlify init
```

選擇：
- Create & configure a new site
- 選擇 team
- 輸入網站名稱（例如：eiku-studio）

#### 4. 部署

```bash
# 測試部署（draft）
netlify deploy

# 正式部署
netlify deploy --prod
```

### 方法 3: 拖放上傳（最簡單，但不建議長期使用）

1. 登入 Netlify
2. 直接把專案資料夾拖放到 Netlify 首頁
3. 完成！但這種方式無法自動更新

## 自動部署

設定 Git 連結後，每次推送到 `main` branch 都會自動部署：

```bash
git add .
git commit -m "更新網站內容"
git push origin main
```

Netlify 會：
1. 偵測到新的 commit
2. 自動建構和部署
3. 幾分鐘內更新線上網站

## 部署狀態監控

在 Netlify Dashboard 可以看到：
- 部署歷史
- 建構日誌
- 流量統計
- 表單提交（如果使用 Netlify Forms）

## 進階功能

### Deploy Previews

每個 Pull Request 都會自動建立預覽版本：
- 獨立的 URL
- 可以在合併前測試
- 免費方案也有

### Split Testing (A/B Testing)

免費方案不支援，但可以手動建立多個分支測試。

### 重定向和改寫

已在 `netlify.toml` 中設定，支援：
- SPA 路由
- 301/302 重定向
- 自訂 HTTP 標頭

### Analytics

Netlify Analytics（付費，$9/月）：
- 伺服器端統計
- 不需要 JavaScript
- 更準確的數據

免費替代方案：
- Google Analytics
- Plausible（隱私友善）
- Umami（開源）

## 故障排除

### 問題：404 Not Found

檢查：
1. `netlify.toml` 中的 publish directory 是否正確
2. `index.html` 是否在根目錄

### 問題：部署失敗

查看 Build log：
1. Deploys → 點擊失敗的部署
2. 展開 "Deploy log"
3. 查看錯誤訊息

### 問題：Firebase 無法連線

確認：
1. `firebase-config.js` 已正確設定
2. Firestore 規則已部署
3. 瀏覽器 Console 沒有 CORS 錯誤

### 問題：網站很慢

優化建議：
1. 壓縮圖片（使用 TinyPNG 或 Squoosh）
2. 延遲載入圖片（lazy loading）
3. 使用 CDN（Netlify 已內建）
4. 減少 HTTP 請求

## 成本

免費方案包含：
- 100GB 流量/月
- 300 分鐘建構時間/月
- 無限網站
- HTTPS（自動）
- 自訂網域

對於小流量網站完全夠用。超過流量會自動暫停，不會收費。

## Netlify vs Vercel

| 功能 | Netlify | Vercel |
|------|---------|--------|
| 靜態網站 | ✅ 優秀 | ✅ 優秀 |
| 免費流量 | 100GB | 100GB |
| Functions | ✅ 125k/月 | ✅ 100k/月 |
| 表單處理 | ✅ 內建 | ❌ 需第三方 |
| 拆分測試 | ✅ （付費） | ❌ |
| 邊緣函數 | ✅ | ✅ 更強 |

兩者都很好，選擇看個人喜好。本專案用 Netlify 因為：
- 介面更直觀
- 內建表單處理
- 台灣也有 CDN 節點

## 相關連結

- [Netlify 文件](https://docs.netlify.com/)
- [Netlify Status](https://www.netlifystatus.com/)
- [Netlify Community](https://answers.netlify.com/)

## 下一步

部署完成後：
1. 測試表單提交功能
2. 設定 Formspree（見 FORMSPREE_SETUP.md）
3. 設定 Calendly（見 CALENDLY_SETUP.md）
4. 在 Firebase Console 確認資料有正確儲存
