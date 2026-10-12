---
name: PaperEcho 宣传站 · INK
description: 纸与墨的编辑式设计语言。一个强调色、直角、零阴影、1px 细线分区。
colors:
  paper: "#F4F1EA"
  paper-raised: "#E7E1D4"
  paper-pressed: "#DBD4C5"
  ink: "#0A0A0A"
  ink-secondary: "#4A4A48"
  ink-tertiary: "#68625A"
  accent: "#C0432A"
  accent-text: "#A8371F"
  accent-on-ink: "#E2603F"
  on-accent: "#FFFFFF"
  on-ink: "#F4F1EA"
  hair: "rgba(10, 10, 10, .14)"
  hair-strong: "rgba(10, 10, 10, .30)"
  dark-paper: "#0C0C0C"
  dark-paper-raised: "#1A1918"
  dark-paper-pressed: "#242320"
  dark-ink: "#F2F0EA"
  dark-ink-secondary: "#B9B5AC"
  dark-ink-tertiary: "#918C84"
  dark-accent: "#E76B4A"
  dark-on-accent: "#0C0C0C"
  shadow-float: "rgba(0, 0, 0, .28)"

typography:
  display-hero:
    fontFamily: '"PaperEcho Serif", "Songti SC", "Source Han Serif SC", Georgia, serif'
    fontSize: "clamp(40px, 6.2vw, 88px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.012em"
  display-1:
    fontFamily: '"PaperEcho Serif", "Songti SC", "Source Han Serif SC", Georgia, serif'
    fontSize: "clamp(30px, 3.6vw, 44px)"
    fontWeight: 400
    lineHeight: 1.12
  display-2:
    fontFamily: '"PaperEcho Serif", "Songti SC", "Source Han Serif SC", Georgia, serif'
    fontSize: "clamp(28px, 3.3vw, 46px)"
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: "-0.008em"
  heading-1:
    fontFamily: '"PaperEcho Serif", "Songti SC", "Source Han Serif SC", Georgia, serif'
    fontSize: "clamp(22px, 1.9vw, 27px)"
    fontWeight: 400
    lineHeight: 1.3
  heading-2:
    fontFamily: '"PaperEcho Serif", "Songti SC", "Source Han Serif SC", Georgia, serif'
    fontSize: "clamp(19px, 1.5vw, 23px)"
    fontWeight: 400
    lineHeight: 1.35
  subhead:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Inter, system-ui, sans-serif'
    fontSize: "clamp(17px, 1.5vw, 20px)"
    fontWeight: 400
    lineHeight: 1.8
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Inter, system-ui, sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "normal"
  ui:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Inter, system-ui, sans-serif'
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Inter, system-ui, sans-serif'
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.16em"
  label-mono:
    fontFamily: 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.5
  ui-sm:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Inter, system-ui, sans-serif'
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.6
  ui-lg:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Inter, system-ui, sans-serif'
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  ui-xl:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Inter, system-ui, sans-serif'
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  ui-2xl:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Inter, system-ui, sans-serif'
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.5
  detail-lead:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Inter, system-ui, sans-serif'
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.6
  display-sub:
    fontFamily: '"PaperEcho Serif", "Songti SC", "Source Han Serif SC", Georgia, serif'
    fontSize: "25px"
    fontWeight: 400
    lineHeight: 1.3
  display-sub-lg:
    fontFamily: '"PaperEcho Serif", "Songti SC", "Source Han Serif SC", Georgia, serif'
    fontSize: "26px"
    fontWeight: 500
    lineHeight: 1.3
  metric-xl:
    fontFamily: '"PaperEcho Serif", "Songti SC", "Source Han Serif SC", Georgia, serif'
    fontSize: "34px"
    fontWeight: 400
    lineHeight: 1.2
  metric-hero:
    fontFamily: '"PaperEcho Serif", "Songti SC", "Source Han Serif SC", Georgia, serif'
    fontSize: "42px"
    fontWeight: 400
    lineHeight: 1.1

rounded:
  all: "0"
  dot: "50%"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  section: "clamp(104px, 12vw, 200px)"
  gutter: "clamp(20px, 5vw, 64px)"

components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.all}"
    padding: "14px 26px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.all}"
    padding: "14px 26px"
  button-secondary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  link-inline:
    textColor: "{colors.ink}"
---

# PaperEcho 宣传站 · INK 设计系统

站点与安卓 App 共用同一套设计语言 **INK**。权威令牌来源有两处，改动必须同步：
`site/styles.css` 与 `site/preview.css` 的 `:root`（`preview.css` 复制了一份令牌，不是共享文件），
以及 App 侧的 `app/src/main/java/com/paperecho/app/ui/designsystem/EditorialTokens.kt`。

`python3 tools/web/check-tokens.py` 逐项比对两个样式表的配色令牌，必须通过。

## Overview

PaperEcho 是**纸笔雅思训练应用**：手机出题、朗读、揭晓、排复习，真正的作答发生在纸上。
这个物理事实就是设计语言的来源——站点读起来应该像**纸与墨**，而不是一个 SaaS 面板。

三条不可动摇的取舍：

1. **层次靠墨的深浅与字号，不靠色块。** 需要强调时先加深墨色、再放大字号，最后才考虑朱红。
2. **朱红是标点，不是装饰。** 它只标记「当前所处位置」与「主操作」。一屏里朱红面积超过约十分之一就是超支。
3. **分区靠 1px 细线。** 不用卡片、不用圆角、不用投影。纸上的分隔是画出来的线，不是浮起来的块。

语气：自信、平实、不着急。写「手机出题，纸上作答。」，不写「AI 驱动的智能学习革命」。

## Colors

### 浅色（纸面墨字，默认）

| 令牌 | 值 | 用途 |
|---|---|---|
| `--paper` | `#F4F1EA` | 主纸面。**品牌核心隐喻，不得替换。** |
| `--paper-2` | `#E7E1D4` | 抬升/着色纸面（卡片、栏、侧列）。与 paper 明度差 ΔL\*≈5.5 |
| `--paper-3` | `#DBD4C5` | 选中态 / 按下态 |
| `--ink` | `#0A0A0A` | 主文字与墨块底。**纯墨，不是暖黑** |
| `--ink-2` | `#4A4A48` | 次级文字、正文 |
| `--ink-3` | `#68625A` | 三级文字：图注、元信息、序号。已加深到此值以过 4.5:1 |
| `--hair` / `--hair-2` | ink @ 14% / 30% | 发丝分隔线 |

### 强调色（朱红 vermillion）

| 令牌 | 值 | 用途 |
|---|---|---|
| `--accent` | `#C0432A` | **面积色**：按钮底、细线、选中底、进度条。不用于小号文字 |
| `--accent-text` | `#A8371F` | ≤12px 的朱红文字专用。`#C0432A` 在 `--paper-2` 上只有 3.95:1，不够 |
| `--accent-on-ink` | `#E2603F` | **墨块上的**小号朱红文字 |
| `--on-accent` | `#FFFFFF` | 朱红底上的文字（5.15:1） |

### 墨块（深色区块）翻转令牌

墨底区块（05 隐私、07 下载、宣传片画面）必须走这套，**不能直接复用纸面令牌**——
暗色模式下 `--ink` 会翻成浅色，纸面令牌会变成「浅底浅字」：

`--on-ink #F4F1EA`、`--on-ink-2` / `--on-ink-3`（纸色 78% / 60%）、
`--hair-on-ink`（18%）、`--accent-on-ink`。

### 暗色模式

`@media (prefers-color-scheme: dark)` 翻转：纸变墨 `#0C0C0C`，墨变纸 `#F2F0EA`，
朱红提亮到 `#E76B4A`，`--on-accent` 翻成近黑 `#0C0C0C`。

**规则**：任何落在「会翻转的底色」上的文字，都必须用对应的 `--on-*` 令牌，不得硬编码。
唯一的例外是 `.promo-len`（宣传片画面在两种模式下都是深色，硬编码是故意的，`check-tokens.py` 有注释说明）。

### 已废弃

`#FAF9F5`（旧纸）、`#141413`（旧暖黑）、`#6C6A64`、`#D8EFE9`（薄荷）、`#FBE9C9`（沙色）、
琥珀 `#F0B849`、墨绿 `#173B35`。INK 版**只有一个强调色**，不再有冷色配重。

## Typography

三种字体各司其职，**不能互换**：

- **衬线**（自托管思源宋体子集，428 KB）— 标题、正文引文、编辑式时刻。
- **无衬线**（系统字体栈）— 正文、UI 文案。
- **等宽**（系统 mono）— 数据、序号、版本号、SHA、小号标签。

**不要**改回 `@import` Google Fonts 之类的外部服务——站点是零依赖的，且国内基本加载不出来。
用字变化后重跑 `python3 tools/fonts/subset_site_serif.py`。

字号下限：**承载信息或可交互的文字不得小于 11px**（检测器 `undersized-ui-text`）。
正文行宽控制在 36em 以内（约 46 个汉字），超过会被判 `line-length`。

字距：正文一律 `normal`。大写小标签可用 `0.16em`–`0.2em`，
但**正文 letter-spacing 超过 0.05em 会拖慢阅读**（`wide-tracking`）。
绝不为了「风格」给中文字加字距——那读起来像排版坏了。

## Layout

- `--maxw: 1240px` 内容最大宽度；`--gutter: clamp(20px, 5vw, 64px)` 左右边距。
- `--step: clamp(104px, 12vw, 200px)` 区块上下留白。**密集感主要靠它缓解**，不要压缩它。
- 断点：≤1150px 页头收紧 / ≤1080px 首屏单列 / ≤900px 导航变抽屉 / ≤560px 按钮通栏。
- 相邻两节底色必须不同（纸 / 纸二 / 墨底交替），否则读者分不清哪里是新的一节。
- **任何段落不超过 3 行**。超了要么删，要么拆成「一句结论 + 三条要点」。

## Elevation & Depth

**INK 不用深度表达层次。**

- 所有容器 `border-radius: 0`。
- 全站只有两处真投影：`.promo-frame:hover` 的浮起投影（中性黑 `rgba(0,0,0,.28)`，
  **不用朱红调**——彩色投影落在暗色页面上会泛光，判为 `dark-glow`），
  以及 `:focus-visible` 的 `0 0 0 2px var(--accent)` 焦点环。
- 其余所有 `box-shadow` 都是 `inset` 下划线，那是「批改记号」母题（墨色下划线、划掉的错词、圈出的词），
  **不是深度**。不要把它们改成外投影。
- 全站**没有任何 `backdrop-filter`**。页头曾是半透明毛玻璃，会让页头文字压在下滚内容上，
  渲染后实测像素对比度掉到 1.1:1，已改为实心纸面 + 1px 细线。

## Shapes

直角。全部。`--rounded: 0`。

圆角会立刻把页面推向「卡片式 SaaS」，与纸的物理属性冲突。
需要区隔时用 1px 细线或墨色下划线，不要用圆角容器。

例外的只有品牌标记本身（衬线「Paper」+ 一条朱红横格线），它的形态由
`tools/brand/make_logo.py` 定义，**不得手改产物，也不得重绘替代标记**。

## Components

| 组件 | 规则 |
|---|---|
| `.btn` 主按钮 | 墨底纸字 → hover 转朱红底 `--on-accent` 字 |
| `.btn-paper` 次按钮 | 纸底墨字 + 1px 墨边 → hover 同上 |
| `.drate-chip` 评分 | **用墨色深浅**：不会＝朱红、模糊＝`--paper-3`、掌握＝实墨。不用红黄绿 |
| `.dpara` 段落 | 当前段 `background: var(--paper-3)` + 左侧 2px 墨竖线，其余降到 45% 不透明度 |
| `.dword` 词 | 墨色 `inset` 下划线；激活时朱红 `inset` 2px 下划线 |
| `.site-nav a` | 当前项朱红下划线，其余无装饰 |
| `.faq-item` | `<details>` 折叠，无图标，靠 1px 细线分区 |

## Do's and Don'ts

**Do**

- 需要强调时，先问「加深墨色够不够」，再问「放大字号够不够」，最后才考虑朱红。
- 改任何样式后跑 `bash tools/web/design-gate.sh`，退出码必须是 0。
- 动效改动前读 `emil-design-eng`；只动 `transform` / `opacity`。
- 新增可接受的例外时，写进 `tools/web/design-gate-waivers.txt` 并**附上理由**。

**Don't**

- 不要引入第二个强调色（薄荷、沙色、琥珀、墨绿都已废弃）。
- 不要用紫蓝渐变——它和这个品牌说的每一句话都相反。
- 不要把纸色 `#F4F1EA` 换成别的「更讲究」的米白。它是产品核心隐喻，且与 App 令牌同步。
- 不要用半透明毛玻璃、卡片投影、圆角容器制造层次。
- 不要在正文上加大于 0.05em 的字距，不要写小于 11px 的功能性文字。
- 不要在标题正上方放一行全大写小字眉标（`hero-eyebrow-chip` / `kicker-above-heading`）——
  那是 AI SaaS 首屏的默认脸，本站已于 2026-09-22 全部撤掉。
- 不要过渡 `width` / `height` / `padding` / `margin`（`layout-transition`）；高度过渡用 `grid-template-rows`。
- 不要展示任何虚构的产品界面、编造的数据或凭据。