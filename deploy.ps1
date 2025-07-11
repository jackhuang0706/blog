# 部落格部署腳本
# 使用方法：在 blog 目錄下執行 .\deploy.ps1

Write-Host "=== 部落格部署腳本 ===" -ForegroundColor Green

# 1. 產生 posts.json
Write-Host "1. 正在產生 posts.json..." -ForegroundColor Yellow
$postsPath = "public/posts"
$files = Get-ChildItem -Path $postsPath -Filter *.md | Select-Object -ExpandProperty Name | Sort-Object
$files | ConvertTo-Json | Set-Content -Path "$postsPath/posts.json" -Encoding UTF8
Write-Host "   ✓ posts.json 已產生，包含 $($files.Count) 個檔案" -ForegroundColor Green

# 2. 檢查是否有變更
Write-Host "2. 檢查 Git 狀態..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "   發現變更：" -ForegroundColor Cyan
    $gitStatus | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }
} else {
    Write-Host "   ✓ 沒有新的變更" -ForegroundColor Green
    exit
}

# 3. 詢問是否要提交
Write-Host "3. 是否要提交變更？" -ForegroundColor Yellow
$response = Read-Host "   輸入 commit 訊息 (或按 Enter 使用預設訊息)"
if ($response -eq "") {
    $response = "更新文章內容"
}

# 4. Git 操作
Write-Host "4. 執行 Git 操作..." -ForegroundColor Yellow
try {
    git add .
    git commit -m $response
    Write-Host "   ✓ Git commit 成功" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Git commit 失敗: $_" -ForegroundColor Red
    exit 1
}

# 5. 推送到 GitHub
Write-Host "5. 推送到 GitHub..." -ForegroundColor Yellow
try {
    git push origin main
    Write-Host "   ✓ 推送到 GitHub 成功" -ForegroundColor Green
} catch {
    Write-Host "   ✗ 推送到 GitHub 失敗: $_" -ForegroundColor Red
    exit 1
}

# 6. 本地建構（可選）
Write-Host "6. 是否要本地建構？" -ForegroundColor Yellow
$buildResponse = Read-Host "   輸入 'y' 進行本地建構，或按 Enter 跳過"
if ($buildResponse -eq "y") {
    Write-Host "   正在建構..." -ForegroundColor Yellow
    try {
        npm run build
        Write-Host "   ✓ 本地建構成功" -ForegroundColor Green
    } catch {
        Write-Host "   ✗ 本地建構失敗: $_" -ForegroundColor Red
    }
}

# 完成
Write-Host "=== 部署完成 ===" -ForegroundColor Green
Write-Host "你的部落格會在 1-2 分鐘內自動更新" -ForegroundColor Cyan
Write-Host "網址: https://jackhuang0706.github.io/blog/" -ForegroundColor Cyan 