# 台灣海洋永續休閒採捕聯盟 TSRHA — Landing Page

Taiwan Sustainable Recreational Harvest Alliance (TSRHA) 官方 Landing Page。

> 以科學管理，實現海洋保育與永續休閒採捕。
> Supporting Marine Conservation Through Science and Responsible Recreation.

一個**零建置（no build step）**的純靜態網站，直接從 repository root 的 `index.html` 服務，適合 GitHub Pages 部署。

---

## 特色

- **純靜態 HTML / CSS / JS**，不需 build、不需 npm、不需任何框架。
- **不依賴外部字體、圖片或 CDN** — 海洋背景、波紋、卡片質感全部以 CSS 產生，避免外部資源在 GitHub Pages 上失效。
- **響應式（RWD）** — 手機與桌面皆有良好排版。
- **可訪問性（a11y）** — skip link、語意化 HTML、ARIA 標籤、鍵盤 focus styles、足夠色彩對比。
- **輕量 JS 增強** — 手機選單、平滑捲動、目前區塊 active nav、回到頂部按鈕、scroll reveal，並尊重 `prefers-reduced-motion`。

## 檔案結構

```
.
├── index.html              # 主頁面（所有 section）
├── international-cases.html # 國際休閒採捕管理制度比較（摘要）子頁
├── styles.css              # 全站樣式（深藍海洋、極簡留白）
├── script.js               # 互動增強（漸進式，無 JS 也可閱讀）
├── 404.html                # 找不到頁面時導回首頁
├── .nojekyll               # 讓 GitHub Pages 略過 Jekyll 處理
└── README.md
```

## 內容區塊（Navigation）

Hero · About · Current Issue · Our Position · Actions · Latest Updates · Resources · Join Us · Footer

### 頁面與外部連結

- **首頁（`index.html`）**
  - Current Issue「閱讀完整內容」→ <https://ocean-petition-tw.github.io/>（外部，`target="_blank" rel="noopener noreferrer"`）
  - Resources「意見陳述書」→ <https://ocean-petition-tw.github.io/formal-opinion.html>（外部）
  - Resources「國際案例」→ `international-cases.html`（站內子頁）
  - Hero / 記者會等「加入連署」→ SurveyCake 連署表單
  - Join Us「加入 LINE」→ LINE 群組邀請連結
  - Footer「Facebook」→ 官方 Facebook 專頁
- **國際案例（`international-cases.html`）** — 國際休閒採捕管理制度比較（摘要），含 9 個地區（Western Australia、New Zealand、Hawaii、Mediterranean Coast、Florida、Queensland、Portugal、The Bahamas、Palau）與各地官方來源／制度重點整理，並提供回首頁連結。

---

## 本地預覽

任選一種方式，然後開啟 <http://localhost:8000> ：

```bash
# Python（大多數系統內建）
python3 -m http.server 8000

# 或 Node（若已安裝）
npx serve .
```

> 因為完全是靜態檔案，你也可以直接用瀏覽器打開 `index.html`。

---

## 部署到 GitHub Pages

1. 建立 GitHub repository 並推送本專案（`index.html` 必須位於 repo root）：

   ```bash
   git add .
   git commit -m "Add TSRHA landing page"
   git branch -M main
   git remote add origin https://github.com/<你的帳號>/<repo>.git
   git push -u origin main
   ```

2. 在 GitHub 上進入 **Settings → Pages**。
3. **Source** 選擇 `Deploy from a branch`。
4. **Branch** 選擇 `main`、資料夾選擇 `/ (root)`，按 **Save**。
5. 等待約 1 分鐘，網站會發布在：

   ```
   https://<你的帳號>.github.io/<repo>/
   ```

   若使用者/組織 Pages（repo 名為 `<帳號>.github.io`），網址則為 `https://<帳號>.github.io/`。

### 關於 `.nojekyll`

GitHub Pages 預設會用 Jekyll 處理網站。本專案已附 `.nojekyll` 空檔案，讓 GitHub 直接原樣提供靜態檔案，避免以底線開頭的檔案被忽略等問題。無需額外設定。

### 自訂網域（選用）

在 repo root 新增一個 `CNAME` 檔案，內容為你的網域（例如 `tsrha.org`），再於 DNS 設定 CNAME/A 記錄指向 GitHub Pages。

---

## 客製化

- **文案**：直接編輯 `index.html` 內對應 section。
- **顏色 / 間距**：於 `styles.css` 最上方的 `:root` CSS 變數調整（`--navy-800`、`--teal-400` 等）。
- **最新消息**：複製 `.update-card` 區塊並更新 `<time datetime="YYYY-MM-DD">`。
- **連結**：Footer 的 Facebook 已設定為正式粉專網址；GitHub / Email 目前仍為 placeholder，請替換為實際網址。CTA「加入 LINE」已設定為正式 LINE 群組邀請連結；CTA「加入連署」已設定為 SurveyCake 連署表單。

## 授權

網站程式碼供 TSRHA 使用。文字內容版權歸台灣海洋永續休閒採捕聯盟所有。
