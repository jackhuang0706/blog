---
date: 2024-07-12
---
# Lazy Blog 使用說明

歡迎使用 Lazy Blog！這裡簡單介紹網站的操作方式：

## 如何新增文章
1. 進入 `public/posts` 資料夾。
2. 新增一個 `.md` 檔案，例如 `my-first-post.md`。
3. 建議在檔案最上方加上如下 frontmatter：

   ```
   ---
   date: 2024-07-12
   ---
   # 文章標題
   這是我的第一篇文章！
   ```

4. 文章內容支援 Markdown 語法。

## 首頁操作
- 首頁會自動列出所有文章的標題與最後更新日期（若有填寫）。
- 點擊標題即可閱讀完整內容。

## 文章閱讀頁
- 左側顯示網站標題與返回按鈕。
- 右側顯示完整文章內容。
- 點擊「← 返回文章列表」可回到首頁。

## 注意事項
- 沒有填寫日期的文章，首頁會顯示 Last Update:（空白）。
- 文章會依日期新到舊排序。

如有任何問題，歡迎聯絡 Fijjj！ 

## 如何將新文章上傳到 GitHub
1. 確認你已經在本地 `public/posts` 新增或修改了 markdown 檔案。
2. 開啟終端機，切換到專案根目錄（例如 `D:/VC_byCursor/blog`）。
3. 執行以下指令：

   ```sh
   git add .
   git commit -m "first-post.md"
   git push origin main
   ```
   
   或者如果你是修改文章，可以這樣：
   ```sh
   git commit -m "sample.md"
   ```

4. 幾秒後，GitHub 上的 `blog` repository 就會同步更新。

> **備註：**
> - 第一次 push 前，請先用 `git remote add origin <你的 GitHub repo 連結>` 綁定遠端。
> - 若預設分支不是 main，請將 `main` 改為你的分支名稱。
> - 你可以用 GitHub Desktop、VSCode 內建 Git 或其他工具操作，步驟類似。 

### 範例：新增 my-first-post.md 後上傳
假設你在 `public/posts` 新增了一個 `my-first-post.md`，可以這樣操作：

```sh
git add public/posts/my-first-post.md
git commit -m "my-first-post.md"
git push origin main
```

這樣你的新文章就會同步到 GitHub 上的 blog repository！ 