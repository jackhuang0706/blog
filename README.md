# Lazy Blog

一個基於 React + TypeScript + Vite 的個人部落格系統，支援 Markdown 文章管理、標籤分類和響應式設計。

## 🚀 特色功能

- **📝 Markdown 支援**: 完整的 Markdown 語法支援
- **🏷️ 標籤系統**: 自動標籤收集與分類
- **📱 響應式設計**: 支援桌面、平板、手機
- **🎨 動態背景**: CSS 動畫與漸層效果
- **🔗 SPA 路由**: 單頁應用程式，無需重新載入
- **⚡ 快速建構**: 基於 Vite 的快速開發體驗
- **🌐 自動部署**: GitHub Pages + GitHub Actions CI/CD

## 🛠️ 技術棧

### 前端框架
- **React 18**: 現代化 UI 框架
- **TypeScript**: 型別安全的 JavaScript
- **React Router v6**: 客戶端路由
- **ReactMarkdown**: Markdown 渲染

### 建構工具
- **Vite 7.0**: 快速的前端建構工具
- **ESBuild**: 快速的 JavaScript 打包器

### 部署平台
- **GitHub Pages**: 靜態網站託管
- **GitHub Actions**: 自動化 CI/CD

## 📁 專案結構

```
blog/
├── public/
│   ├── posts/              # 文章目錄
│   │   ├── about.md        # 關於頁面
│   │   ├── sample.md       # 範例文章
│   │   └── posts.json      # 文章列表
│   ├── 404.html            # SPA 路由重定向
│   └── logo_of_blog.png    # 網站 Logo
├── src/
│   ├── App.tsx             # 主要應用程式組件
│   ├── App.css             # 全域樣式
│   ├── main.tsx            # 應用程式入口
│   └── vite-env.d.ts       # Vite 型別定義
├── scripts/
│   └── generate-posts-meta.js  # 文章元數據生成腳本
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 部署配置
├── package.json            # 專案依賴配置
├── vite.config.js          # Vite 建構配置
├── tsconfig.json           # TypeScript 配置
└── README.md               # 專案說明文件
```

## 🚀 快速開始

### 環境需求
- Node.js 18+ 
- npm 或 yarn

### 安裝依賴
```bash
npm install
```

### 本地開發
```bash
npm run dev
```
開啟瀏覽器訪問 `http://localhost:5173/blog/`

### 建構生產版本
```bash
npm run build
```

### 預覽建構結果
```bash
npm run preview
```

## 📝 文章管理

### 新增文章
1. 在 `public/posts/` 目錄下建立新的 `.md` 檔案
2. 檔案開頭加入 frontmatter：
   ```markdown
   ---
   tags: [標籤1, 標籤2, 標籤3]
   date: 2024-01-15
   ---
   
   # 文章標題
   文章內容...
   ```
3. 儲存後重新整理網站，文章會自動出現在首頁和 Archives 選單

### 文章格式規範
- **標題**: 使用 `# 標題` 格式
- **標籤**: 在 frontmatter 中使用 `tags: [標籤1, 標籤2]` 格式
- **日期**: 使用 `date: YYYY-MM-DD` 格式
- **內容**: 支援完整的 Markdown 語法

## 🎨 自訂樣式

### 主要樣式檔案
- `src/App.css`: 全域樣式和組件樣式
- 支援 CSS 變數和動態背景效果

### 響應式斷點
- **桌面版**: 1200px+ (5列網格)
- **平板版**: 900px-1200px (3列網格)
- **手機版**: 600px-900px (2列網格)
- **小螢幕**: <600px (單列佈局)

## 🌐 部署

### GitHub Pages 部署
1. 將專案推送到 GitHub repository
2. 在 repository 設定中啟用 GitHub Pages
3. 設定 Source 為 "Deploy from a branch"
4. 選擇 "gh-pages" 分支
5. 每次推送到 main 分支時會自動部署

### 自動化部署流程
- 推送到 main 分支
- GitHub Actions 自動觸發建構
- 自動部署到 GitHub Pages
- 支援 SPA 路由的 404.html 重定向

## 🔧 開發指南

### 核心組件
- `App.tsx`: 主要應用程式邏輯
- `AppWithRouter`: 路由配置
- 文章處理和標籤系統

### 狀態管理
- 使用 React Hooks 管理本地狀態
- 文章列表、選中文章、標籤映射等

### 路由處理
- 支援直接 URL 訪問
- 404 頁面自動重定向
- 保持瀏覽器歷史記錄

## 📊 效能優化

### 建構優化
- Vite 快速建構
- ESBuild 快速打包
- 程式碼分割和懶載入

### 執行時優化
- React 18 的並發特性
- 虛擬化長列表
- 圖片懶載入

## 🐛 常見問題

### 文章不顯示
- 確認檔案副檔名是 `.md`
- 確認檔案放在 `public/posts/` 目錄
- 檢查 frontmatter 格式是否正確

### 標籤不顯示
- 確認 frontmatter 格式正確
- 確認標籤在方括號內：`tags: [標籤1, 標籤2]`

### 部署問題
- 檢查 GitHub Pages 設定
- 確認 GitHub Actions 工作流程
- 清除瀏覽器快取

## 🤝 貢獻指南

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權

本專案採用 MIT 授權 - 查看 [LICENSE](LICENSE) 檔案了解詳情

## 📞 聯絡資訊

- 專案連結: [https://github.com/jackhuang0706/blog.git](https://github.com/jackhuang0706/blog.git)
- 網站連結: [https://jackhuang0706.github.io/blog/](https://jackhuang0706.github.io/blog/)

---

⭐ 如果這個專案對你有幫助，請給個 Star！ 