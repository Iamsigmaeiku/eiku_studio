// Firebase 配置
// 請在 Firebase Console 取得你的配置資訊：
// 1. 前往 https://console.firebase.google.com/
// 2. 選擇你的專案
// 3. 專案設定 → 一般 → 你的應用程式
// 4. 選擇網頁應用程式（</>）
// 5. 複製 firebaseConfig 並貼到下方

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);

// 初始化 Firestore
const db = firebase.firestore();

// 設定 Firestore 設定（可選）
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

// 啟用離線持久化（可選）
db.enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.warn('多個分頁開啟，離線持久化只能在一個分頁中啟用');
    } else if (err.code == 'unimplemented') {
      console.warn('目前瀏覽器不支援離線持久化');
    }
  });

console.log('Firebase 已初始化');
