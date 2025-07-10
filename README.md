# Lazy Blog

一個極簡、科技感的個人部落格系統，支援 Markdown 文章、文章自動排序、日期顯示，適合用於學習日記、技術筆記等。

## 特色
- 支援 Markdown 語法
- 文章自動依日期新到舊排序
- 首頁顯示標題與最後更新日期
- 點擊標題閱讀全文，支援返回列表
- 無需後端，純前端靜態部署
- 適合部署到 GitHub Pages

## 安裝與啟動
1. 下載或 clone 此專案：
   ```sh
   git clone https://github.com/你的帳號/blog.git
   cd blog
   npm install
   npm run dev
   ```
2. 打開瀏覽器進入 http://localhost:5173

## 如何新增文章
1. 到 `public/posts` 資料夾新增一個 `.md` 檔案。
2. 建議在檔案最上方加上：
   ```
   ---
   date: 2024-07-12
   ---
   # 文章標題
   內容...
   ```
3. 回到首頁即可看到新文章。

## 如何上傳到 GitHub
1. 寫完文章後，在專案根目錄執行：
   ```sh
   git add .
   git commit -m "your-article.md"
   git push origin main
   ```
2. 你的部落格就會同步到 GitHub。

## 如何部署到 GitHub Pages
1. 安裝 gh-pages 套件：
   ```sh
   npm install gh-pages --save-dev
   ```
2. 在 `package.json` 加入：
   ```json
   "homepage": "https://你的帳號.github.io/blog/",
   "scripts": {
     ...
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. 執行：
   ```sh
   npm run deploy
   ```
4. 完成後即可在 GitHub Pages 網址看到你的部落格。

## License
MIT 