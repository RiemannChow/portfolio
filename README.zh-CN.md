# RiemannChow 的作品集

[English](./README.md) | **简体中文**

目前展示：

| 项目 | 一句话 | 站内详情 | 仓库 |
| --- | --- | --- | --- |
| agent-hub | 会查数据、把结果渲染成结构化卡片的对话式 AI Agent | `./projects/agent-hub/` | [RiemannChow/agent-hub](https://github.com/RiemannChow/agent-hub) |
| GroveMQ | 面向 AI / IoT / 车联网的 Go MQTT Broker | `./projects/grovemq/` | [RiemannChow/GroveMQ](https://github.com/RiemannChow/GroveMQ) |
| SpeakBuddy | 打开网页就能练的英语口语私教：兴趣定级、逐词纠音、情景对话 | `./projects/speak-buddy/` | [riemann-chow-product/speak-buddy](https://github.com/riemann-chow-product/speak-buddy) |

## 目录结构

```
portfolio/
├── index.html                    # 首页：项目卡片墙 + 全部文案
├── styles.css                    # 全站基础样式（配色变量集中在 :root）
├── detail.css                    # 详情页样式：品牌色主题、深色示意面板、分区
├── i18n.js                       # 全站中英文字典 + 语言切换逻辑
├── script.js                     # 滚动浮现、卡片跟随光晕、页脚年份
├── assets/
│   ├── agent-hub.svg             # 项目图标（首页卡片 / 图标排 / 详情页共用）
│   ├── grovemq.svg
│   ├── speak-buddy.svg
│   ├── favicon.svg
│   ├── avatar.jpg                # GitHub 头像的本地副本，避免外部请求
│   ├── wechat-qr.jpg             # 公众号 / 微信原始名片图（点击看大图）
│   └── wechat-qr-code.jpg        # 从原图裁出的 650×650 二维码正方形
├── projects/
│   ├── agent-hub/index.html      # 蓝色主题详情页
│   ├── grovemq/index.html        # 绿色主题详情页
│   └── speak-buddy/index.html    # 紫色主题详情页
├── .nojekyll                     # 告诉 Pages 跳过 Jekyll，原样发布静态文件
├── .gitignore
├── README.md                     # 英文（GitHub 默认展示）
└── README.zh-CN.md               # 简体中文
```

所有资源都写成**相对路径**（首页 `./assets/...`，详情页 `../../assets/...`、`../../` 回首页、`../<项目>/` 互相跳转），所以无论部署到 `https://RiemannChow.github.io/` 还是 `https://RiemannChow.github.io/<仓库名>/` 都能正常打开，不用改代码。

## 本地预览

```bash
cd /Users/Riemann/Code/Workspace/portfolio
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

直接双击 `index.html` 也能看，但用本地服务器更接近线上环境。

## 部署到 GitHub Pages

### 1. 建仓库并推上去

在 GitHub 新建一个空仓库，二选一：

- 命名为 `RiemannChow.github.io` → 访问地址 `https://RiemannChow.github.io/`（用户主页）
- 命名为 `portfolio`（或任意名字）→ 访问地址 `https://RiemannChow.github.io/portfolio/`（项目页）

然后：

```bash
cd /Users/Riemann/Code/Workspace/portfolio
git add .
git commit -m "feat: portfolio site"
git branch -M main
git remote add origin https://github.com/RiemannChow/<仓库名>.git
git push -u origin main
```

### 2. 打开 Pages

仓库 → **Settings** → **Pages** → **Build and deployment**：

- Source：`Deploy from a branch`
- Branch：`main` / `/(root)` → Save

等一两分钟即可访问。之后每次 `git push` 都会自动更新，无需 Actions、无需构建。

> 如果你想改用 GitHub Actions 部署，把 Pages 的 Source 切成 **GitHub Actions**，再新建 `.github/workflows/deploy.yml`，用官方的 `actions/configure-pages` + `actions/upload-pages-artifact` + `actions/deploy-pages` 三步即可。两种方式**不要同时开着**。

### 3. 自定义域名（可选）

在仓库根目录放一个纯文本 `CNAME` 文件，内容只写域名（例如 `portfolio.example.com`），再到域名服务商加一条指向 `RiemannChow.github.io` 的 `CNAME` 记录，并在 Pages 设置里勾选 HTTPS。

## 中英文切换

首页与两个详情页共用 `i18n.js`，顶部胶囊「中文 / EN」是切换入口：

- HTML 里默认写中文（关闭 JS 时内容也完整可读），需要翻译的元素加 `data-i18n="键名"`
- 含 `<br>` / `<em>` / `<code>` 的元素再加一个 `data-i18n-html`，按 innerHTML 替换；其余按 textContent
- `data-i18n-label` / `data-i18n-alt` 分别翻译 aria-label 和 img alt
- 两套字典集中在 `i18n.js` 的 `ZH` / `EN` 对象，键名按 `common.*` / `home.*` / `ah.*` / `mq.*` 分组
- 每页 `<body data-page="home|ah|mq">`，切换时同步更新 `document.title` 与 meta description
- 语言存 `localStorage` 的 `portfolio-lang`，首页与详情页之间跳转会保持；选中态按钮的颜色自动跟随当前页品牌色

**改文案时两份字典都要改**（HTML 里的中文只是无 JS 兜底）。新增文案：给元素加 `data-i18n`，再去 `ZH` / `EN` 各加一个同名键。命令、版本号、协议名等纯技术内容不翻译，保持原样。

## 公众号二维码

关于区右侧是一张二维码卡片：

- `assets/wechat-qr.jpg` — 原始名片图（含头像、名称与说明），点击卡片里的图片会打开这张大图
- `assets/wechat-qr-code.jpg` — 从原图精确裁出的 650×650 二维码正方形，页面实际展示这张，保证扫码可用

换二维码时把两张图一起替换；裁切逻辑是找出原图中的彩色像素边界、加 26px 白边后取正方形。卡片里的名称与提示语走 `i18n.js` 的 `home.qr.*` 键。

## 项目详情页

三页共用 `detail.css`，骨架参考 `product.yao-yang.cn/tools/news/`：

1. **顶部**：左侧「‹ 全部项目」返回首页，右侧 GitHub 源码按钮 + 另外两个项目的交叉链接
2. **Hero**：左文案（项目图标 / 名称 / 双行标题，第二行用项目品牌色 / 描述 / CTA / 标签），右侧深色产品示意面板 + 浮动标签；背景是斜向淡色条纹
3. **为什么**：三张痛点卡 + 一句过渡
4. **做了什么**：六张能力卡（内联 SVG 图标）
5. **跑起来**：三步命令，用代码块展示
6. **设计取舍 / 上线前**：问答卡
7. **收尾 CTA + 页脚**：都留了 GitHub 源码入口

品牌色由 `<body class="detail-page theme-blue">`（或 `theme-green`、`theme-purple`）决定，在 `detail.css` 里改 `--accent` 系列变量就能换一套；`theme-*` 加在 body 上，会覆盖首页写死的琥珀色按钮与 kicker。

深色面板里的柱状图、命中列表、节点与路由流程、逐词对齐结果都是**纯 HTML/CSS 画的示意图**，不是截图，面板底部也标注了「界面示意」，避免被误读成真实运行数据。三页文案均来自对应仓库的 README、代码与仓库描述。

## 维护

### 新增一个项目

**1）首页卡片**：在 `index.html` 的 `.tools-grid` 里复制一整段 `<a class="tool-card featured lead reveal" ...>`（里面有 `<!-- 新增项目 -->` 注释），改这几处：

- `id` / `href`：锚点 id 与**站内详情页地址** `./projects/<slug>/`
- `style="--tc:#xxxxxx"`：这张卡的品牌色，决定 hover 光晕、箭头和 badge 的颜色
- `src="./assets/xxx.svg"`：把新图标放进 `assets/`
- `h3` / `.desc` / `.sub-desc` / `.tag`：项目名、描述、亮点、技术标签
- 右侧装饰：`.lead-dots`（三色呼吸点）或 `.port-stack`（端口/指标）二选一，也可以删掉
- 顶部图标排里的项目图标同样指向详情页，新增时照着加一个 `<a class="hi">`

卡片默认是通栏 `.lead`。如果想改成两列小卡，去掉 `lead` class 即可（`.tools-grid` 本身就是两列栅格）。

**2）详情页**：复制 `projects/agent-hub/index.html` 到 `projects/<slug>/index.html`，然后：

- 换 `<body>` 的主题 class（或在 `detail.css` 里新增一套 `theme-*` 变量）
- 改 `../../assets/` 下的图标引用、标题、描述、facts
- 替换 `.demo-panel` 里的内容，做出这个产品自己的界面示意
- 按「为什么 / 做了什么 / 跑起来 / 取舍」四段换文案，改掉所有 GitHub 链接和交叉链接

详情页的 `../../` 一定对应站点根目录，不要再多加一层目录，否则相对路径会断。

### 换文案 / 配色 / 头像

- **所有页面文案**：`i18n.js` 的 `ZH` 与 `EN` 两份字典，两份都要改；HTML 里的中文只是无 JS 兜底
- 自我介绍：键 `home.about.bio`；公众号卡片：键 `home.qr.*`
- 首页主题色：`styles.css` 顶部 `:root` 的 `--accent`、`.hero-title em` 的渐变
- 详情页品牌色：`detail.css` 里的 `body.theme-blue` / `body.theme-green` / `body.theme-purple`
- 头像 / 二维码：替换 `assets/avatar.jpg`、`assets/wechat-qr.jpg`、`assets/wechat-qr-code.jpg`（保持文件名即可）
- 页脚年份由 `script.js` 自动更新，不用手改

## 说明

- 首页与详情页文案都基于三个仓库的 README、代码与仓库描述整理，没有虚构功能、许可证或性能数字。
- 深色产品面板是 HTML/CSS 画的界面示意，面板内已明确标注，避免被当成真实截图或压测数据。
- 项目内容直接写在 HTML 里（不是 JS 动态渲染），便于搜索引擎抓取，也方便离线预览；双语仅替换已有文案，不改变 DOM 结构。
- 全站支持中英文切换，选择保存在 `localStorage`；关闭 JS 时保持中文且内容完整可见。
- 已适配窄屏，并遵循 `prefers-reduced-motion`。
