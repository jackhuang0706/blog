# Lazy Blog

一個簡潔的個人部落格，使用 React + TypeScript + Vite 建構，支援 Markdown 文章和標籤系統。

## 功能特色

- ✨ **極簡設計**：清爽的視覺風格，動態背景效果
- 📝 **Markdown 支援**：所有文章使用 Markdown 撰寫
- 🏷️ **標籤系統**：自動收集和分類文章標籤
- 📱 **響應式設計**：支援各種裝置尺寸
- 🚀 **快速部署**：一鍵部署到 GitHub Pages
- 🔄 **自動更新**：新增文章自動出現在 Archives

## 快速開始

### 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 預覽建構結果
npm run preview
```

### 新增文章

1. 在 `public/posts/` 目錄新增 `.md` 檔案
2. 使用以下格式：

```markdown
---
tags: [標籤1, 標籤2, 標籤3]
---

# 文章標題

文章內容...
```

3. 重新整理網頁，新文章會自動出現在 Archives

### 部署到 GitHub Pages

#### 手動部署
```bash
npm run deploy
```

#### 自動部署（推薦）
1. 推送程式碼到 GitHub
2. GitHub Actions 會自動建構和部署

## 專案結構

```
blog/
├── public/
│   └── posts/          # 文章目錄
│       ├── about.md    # 關於頁面
│       └── *.md        # 其他文章
├── src/                # 原始碼
│   ├── App.tsx         # 主要元件
│   ├── App.css         # 樣式檔案
│   └── main.tsx        # 入口檔案
├── .github/workflows/  # GitHub Actions
├── dist/               # 建構輸出
└── package.json        # 專案設定
```

## 技術棧

- **前端框架**：React 19 + TypeScript
- **建構工具**：Vite
- **Markdown 處理**：react-markdown
- **部署平台**：GitHub Pages
- **自動化部署**：GitHub Actions

## 開發指令

```bash
npm run dev          # 啟動開發伺服器
npm run build        # 建構生產版本
npm run preview      # 預覽建構結果
npm run deploy       # 部署到 GitHub Pages
```

## 授權

MIT License

## 貢獻

歡迎提交 Issue 和 Pull Request！

---

更多詳細說明請參考 [About 頁面](https://jackhuang0706.github.io/blog/about)。 