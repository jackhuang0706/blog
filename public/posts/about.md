---
tags: [關於, 部落格, 技術, 操作說明]
---

# 關於本站

歡迎來到 Lazy Blog！這是一個以學習與分享為主題的個人部落格，記錄我的技術筆記、生活隨筆與成長歷程。

Vibe Coding by Cursor

## 網站技術架構

- **前端框架**：React + TypeScript
- **建構工具**：Vite
- **Markdown 支援**：所有文章皆以 Markdown 撰寫，方便編輯與排版
- **樣式設計**：自訂 CSS，極簡明亮風格，支援動態背景
- **部署方式**：靜態網站，可直接放在任意靜態主機

## 如何操作本網站

### 新增文章
1. 進入 `blog/public/posts/` 資料夾
2. 新增一個 `.md` 檔案，例如 `my-new-post.md`
3. 以 Markdown 格式撰寫內容，檔案開頭可加上 `# 標題`
4. 存檔後重新整理網站，即可在 Archives 下拉選單中看到新文章

### 文章格式說明

#### 基本結構
```markdown
---
tags: [標籤1, 標籤2, 標籤3]
---

# 文章標題

文章內容...
```

#### Frontmatter（檔案開頭的設定區塊）
- **tags**：文章標籤，用於分類和搜尋
  - 格式：`tags: [標籤1, 標籤2, 標籤3]`
  - 範例：`tags: [JavaScript, React, 前端開發]`
  - 注意：標籤會自動出現在文章底部和 Tags 頁面

#### 標題格式
- 使用 `#` 來設定標題
- 支援 `#` 到 `######` 六個層級
- 標題會自動生成目錄（如果需要的話）

### 如何加入標籤（Tags）

1. **在文章開頭加入 frontmatter**：
```markdown
---
tags: [技術, JavaScript, 教學]
---

# 你的文章標題
```

2. **標籤規則**：
   - 使用方括號 `[]` 包圍標籤列表
   - 標籤之間用逗號分隔
   - 標籤會自動出現在文章底部
   - 可以在 Tags 頁面查看所有標籤

3. **標籤建議**：
   - 使用相關的技術關鍵字
   - 可以加入語言標籤（如：JavaScript, Python）
   - 可以加入主題標籤（如：教學, 心得, 工具）

### 修改文章
1. 進入 `blog/public/posts/` 資料夾
2. 找到要修改的 `.md` 檔案，直接用編輯器修改內容
3. 存檔後重新整理網站，變更即時生效

### 刪除文章
1. 進入 `blog/public/posts/` 資料夾
2. 刪除對應的 `.md` 檔案
3. 重新整理網站，該文章即會消失

### 網站功能說明

#### 導航功能
- **Home**：回到首頁
- **About**：關於本站（當前頁面）
- **Archives**：文章列表，顯示所有文章（除了 About）
- **Tags**：標籤頁面，可查看所有標籤和相關文章
- **Github Repo**：專案原始碼連結

#### 文章顯示
- 文章會自動隱藏 frontmatter（兩個 `---` 中間的內容）
- 支援完整的 Markdown 語法
- 標籤會顯示在文章底部
- 支援程式碼高亮

#### 標籤系統
- 在 Tags 頁面可以查看所有標籤
- 點擊標籤可以查看該標籤下的所有文章
- 標籤會自動收集和分類

### 開發與部署

#### 本地開發
```bash
npm run dev          # 啟動開發伺服器
npm run build        # 建構生產版本
npm run preview      # 預覽建構結果
```

#### GitHub Pages 部署

##### 初始部署
1. **確保 GitHub 專案已建立**
   - 在 GitHub 上建立新的 repository
   - 將本地專案推送到 GitHub

2. **設定 GitHub Pages**
   - 進入 GitHub repository 設定頁面
   - 找到 "Pages" 選項
   - Source 選擇 "Deploy from a branch"
   - Branch 選擇 "gh-pages" 分支
   - 點擊 "Save"

3. **執行部署**
```bash
npm run deploy
```

##### 更新部署（修改文章後）
當你新增、修改或刪除文章後，需要重新部署：

1. **本地修改文章**
   - 編輯 `blog/public/posts/` 中的 `.md` 檔案
   - 儲存變更

2. **提交到 Git**
```bash
git add .
git commit -m "更新文章內容"
git push origin main
```

3. **重新部署**
```bash
npm run deploy
```

##### 自動化部署（可選）
如果想要自動化部署，可以設定 GitHub Actions：

1. **建立 `.github/workflows/deploy.yml`**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

#### 部署流程說明

##### 手動部署流程
1. **修改文章** → 2. **Git 提交** → 3. **執行部署** → 4. **等待更新**

##### 自動部署流程（使用 GitHub Actions）
1. **修改文章** → 2. **Git 提交並推送** → 3. **自動部署**

#### 常見問題

##### 部署後看不到更新
- 檢查 GitHub Pages 設定是否正確
- 確認 `gh-pages` 分支已更新
- 清除瀏覽器快取

##### 文章沒有出現在 Archives
- 確認檔案副檔名是 `.md`
- 確認檔案放在 `blog/public/posts/` 目錄
- 重新整理網頁

##### 標籤沒有顯示
- 確認 frontmatter 格式正確
- 確認標籤在方括號內：`tags: [標籤1, 標籤2]`

#### 檔案結構說明
```
blog/
├── public/
│   └── posts/          # 文章目錄
│       ├── about.md    # 關於頁面
│       ├── sample.md   # 範例文章
│       └── *.md        # 其他文章
├── src/                # 原始碼
├── dist/               # 建構輸出（部署用）
└── package.json        # 專案設定
```

#### 部署檢查清單
- [ ] 文章已儲存到 `blog/public/posts/`
- [ ] 文章有正確的標題（`# 標題`）
- [ ] 標籤格式正確（`tags: [標籤1, 標籤2]`）
- [ ] Git 已提交變更
- [ ] 已執行 `npm run deploy`
- [ ] GitHub Pages 設定正確

---

如有任何建議或想法，歡迎留言或聯絡我，一起讓這個部落格更豐富！ 