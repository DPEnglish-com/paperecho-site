# PaperEcho 宣传网站 — 上线指南

纯静态单页(HTML + CSS + JS,零依赖、无任何 API 调用),可直接部署到任意静态托管。

## 本地预览

```bash
cd site
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

## 〇、设计语言:INK

站点与 App 使用同一套设计语言 **INK**,改样式前请先读这一节。

- **墨与纸**:`--paper #F4F1EA` / `--ink #0A0A0A`,暗色(`prefers-color-scheme: dark`)翻转为墨底纸字。
- **唯一强调色**:朱红 `--accent #C0432A` 只出现在「当前位置」与「主操作」——导航当前项下划线、区块序号、主按钮 hover、正文里的当前定位。
- **直角、零阴影**:所有容器 `border-radius: 0`、无 `box-shadow`,层次靠 1px 细线(`--hair` 14% / `--hair-2` 30% 墨)。
- **排版**:标题用衬线(自托管思源宋体子集),数据、序号、版本号、SHA 一律等宽;正文用系统无衬线。
- **评分用墨色深浅**:演示里的「不会 / 模糊 / 掌握」分别是朱红 / 淡墨 / 实墨,不用红黄绿三色。
- **动效克制**:入场只有 12px 位移 + 淡入,顶部 1px 滚动进度线,`prefers-reduced-motion` 下全部关闭。

字体:`assets/fonts/paperecho-serif.otf`(思源宋体子集,827 个码位,428 KB,SIL OFL 1.1,授权文本见同目录 `LICENSE-SourceHanSerif.txt`)。
**不要**改回 `@import` Google Fonts 之类的外部字体服务——站点是零依赖的,且国内基本加载不出来。
站点用字变化后重新生成子集:

```bash
python3 ../tools/fonts/subset_site_serif.py   # 扫描 site/*.html|css|js 的用字
```

`preview.html`(阅读工作台预览)与主站共用同一份字体与配色,改动设计时两个页面一起看。

### 品牌标记:衬线「Paper」+ 一条朱红横格线

标记只用英文字母 **Paper** 构成:衬线字,**上面一行「Pa」、下面一行「per」**,
下面压一条朱红横格线——就是「写在纸上的横格」,与产品本身(纸笔训练)同构。
字体取自应用自带的思源宋体,轮廓由 `tools/brand/make_logo.py` 从字体里直接取路径,
所以标记是矢量、任何尺寸都清晰,也不依赖系统字体。

| 位置 | 用哪一版 | 文件 |
| --- | --- | --- |
| 浏览器标签页 | 墨底纸字 | `favicon.svg` |
| 页头 / 页脚 | 墨底纸字(内联 SVG) | `index.html` 的 `.brand-mark` |
| iOS 主屏图标 | 纸底墨字 180×180 | `assets/apple-touch-icon.png` |
| 社交分享卡片 | 墨底纸字(含页头) | `assets/og.png` |
| 安卓启动图标 | 纸底墨字(自适应图标前景 + 单色层) | `app/src/main/res/drawable/ic_launcher_foreground.xml` |
| 安卓通知栏 | 单字母「P」(24dp 下多字母必然糊) | `app/src/main/res/drawable/ic_notification.xml` |

正负两版是同一套轮廓,只是纸墨互换:网页底色是纸,标记用墨底才立得住;启动图标反过来。

**改标记的正确姿势**:改 `tools/brand/make_logo.py` 里的参数(字块宽度、行距、细线粗细、
描边粗细),然后

```bash
python3 tools/brand/make_logo.py            # 重新生成 favicon / 安卓 drawable / 预览页
python3 tools/brand/make_logo.py --preview  # 另出 viz/logo-paper.png 预览图
python3 tools/brand/verify_logo.py          # 自检:安全区、字符画、细线位置、drawable 结构
```

`verify_logo.py` 会用字符画把标记「打印」出来,所以即使看不到图也能确认字长什么样;
它还会检查墨迹是否落在自适应图标的 66×66 安全区内(超了会被启动器裁掉)。

### 让每一节「一眼可分」(不是审美问题,是可读性问题)

弱化到极致会失去辨识度:如果每节都是同一种底色、同一种版式,读者分不清哪里是新的一节。现行做法:

| 手段 | 具体做法 |
|---|---|
| **交替底色** | 首屏(纸)/ 01 痛点(纸)/ 02 演示(纸二)/ 03 功能(纸)/ 04 配置(纸二)/ 05 隐私(墨底)/ 06 问答(纸)/ 07 下载(墨底)——相邻两节底色必不同。规格条 `.specs` 已删(四条信息与 03/05 重复) |
| **每节不同版式** | 01 用「2×2 + 大号衬线数字」;03 用「三列 + 等宽标签 + 要点列表」;02 是设备演示;04 两栏 + 窗口示意;06 折叠问答 |
| **序号带标签** | 每节开头是 `01 痛点与解法`(等宽小字 + 细线分隔),与右侧章节轨道一致 |
| **右侧章节轨道** | ≥1400px 常驻,显示 01–07,当前节朱红 + 显示名称(hover 也显示),回答「我在哪一节」 |
| **扫读锚点** | 痛点用「做法」朱红小标签 + 左竖线;功能全用要点列表(每条约 15–25 字);**任何段落不超过 3 行**(超了要么删,要么拆成「一句结论 + 三条要点」,问答区长答案就是这么处理的) |

### 文字密度:用「每屏字数」管,不靠感觉

辨识度解决「分不清」,密度解决「看着累」——后者更容易被忽略,因为每一块单看都不算长。
审计工具会把整页按 900px 切成屏,统计**每屏字数与文字块数**(`■ 文字密度` 一节):

| 指标 | 目标 | 现值(1440px) |
|---|---|---|
| 每屏平均字数 | ≤ 200 | **169** |
| 单屏最多字数 | ≤ 300(仅记录) | 318 |
| 单屏最多文字块 | ≤ 26 | **19** |
| 换行成两行以上的账目/要点 | 0 | **0** |
| 页面总高 | — | 7619px |

(最初是 平均 259 / 最多 435 / 28 块——435 字那一屏就是「密密麻麻」的来源。
注意「每屏字数」会随页面总高变化:同样的文字挤进更少的屏,这个数就会上升,
所以它要和「文字块数」「换行行数」一起看,别单独追一个数字。)

维持这个水平的四条写法约束:

1. **一张卡最多 2 条要点**,每条 ≤ 20 字;原来 6 张卡各 3–4 条(共 19 条)是最大的密度来源,现为 12 条。
2. **「做法 / 说明」类正文控制在一行**(28–32 字)。痛点区的做法原来 51–55 字,两行,四张卡就是八行字。
3. **正文字号下限**:正文 15.5px、辅助文字 15px、等宽标签 10–11px;演示界面里的小字也不低于 11px
   (界面小字小于 11px 会让整块显得「碎」)。
4. **一个模块只占一行**:01 痛点从 2×2 网格改成通栏账目行(序号 | 症状 | 做法),
   03 功能从 6 张卡(19 条要点)合并成 3 张卡(9 条要点、六个模块名写在标签里)。
   判断标准是「一眼扫过去能不能一行读完」,不是「信息全不全」。
5. **能在别处已经说过的就删掉**(这条最有效,已删的重复信息):
   首屏规格条与信任清单(与 07/05 重复)、规格条 `.specs` 整条(四条信息 03/05 都说过)、
   页脚 7 条导航(顶部导航常驻)、问答里的「支持哪些手机」(07 规格条已有)、
   问答末尾的「微信联系作者」(页脚已有)、隐私区与 h2 重复的那句话、
   演示区手机视图的说明句(交互自带引导)。
   **判断方法**:同一个事实如果在页面上出现两次,删掉靠后的那次——访客不会因为少看一遍而困惑,
   但会因为没有重复信息而觉得清爽。
6. **能用折叠就别平铺**:SHA-256 那串 64 位十六进制是整页最长的一行字,现在收在
   `<details>` 里默认不展开;需要校验的人点开就有。:首屏原有的规格条与 07 下载区的规格条重复、4 条信任清单与 05 隐私重复,
   都已删除;首屏手机示意里也去掉了听写与评分段——下面 02 演示里有完整的可交互版本。

底色差是**量出来**的,不是凭感觉:纸 `#F4F1EA`(L\*=95.2)与纸二 `#E7E1D4`(L\*=89.7)相差 **ΔL\*=5.5**。
低于 5 的大面积色块人眼基本看不出交替——原来 `#EAE5DA` 只有 4.4,等于白做。改这两个值请重新量一次。

### 颜色的五条硬规则(都踩过坑)

0. **`--ink-3` 是「三级文字色」,不是装饰灰**——它必须自己就过 4.5:1。
   旧值 `#8C877C` 在纸上只有 3.17:1、在纸二上 2.75:1,全站的页脚、脚注、时间戳、
   演示界面里的标签全都在这个值上,是「文字看着累」的最大单一来源。
   现值:`#68625A`(纸 5.34 / 纸二 4.63)与暗色 `#8C8880`(5.54 / 4.97)。
   需要「更淡」时不要再调浅文字色——用更细的字号层级或更小的字距来表达层级。
   大号装饰数字(如 `.problem-no` 40px)另有 `opacity: .5`,不受此限。


1. **小号朱红文字用 `--accent-text`,不要用 `--accent`**。`--accent #C0432A` 在纸上 4.57:1 勉强过关,
   但纸二底色更深,同一颜色掉到 3.95:1——而小字要求 4.5:1。所以 12px 以下的朱红文字
   (`.index`、`.feature-tag`、`.spec-k`、`.fix b`、导航/轨道序号)统一用更深的 `--accent-text #A8371F`(5.76 / 4.99:1)。
   `--accent` 继续负责「面积」:按钮底、细线、选中块、进度条。
2. **墨块(05 隐私 / 07 下载)内部的颜色一律走令牌,禁止硬编码 `rgba(244, 241, 234, …)`**。
   暗色模式下 `--ink` 反成浅色(`#F2F0EA`),硬编码的浅色文字会变成「浅底浅字」直接消失。
   现用 `--on-ink / --on-ink-2 / --on-ink-3 / --hair-on-ink / --hair-on-ink-2 / --accent-on-ink`,六个令牌在暗色模式全部翻转。
3. **`.index-inverse` 必须写在 `.index span` 之后**。两者特异性相同(0,2,0),CSS 里后写的赢;
   写到前面时墨块上的节标签会继承 `.index span` 的深墨色,在黑底上只有 1.79:1,几乎看不见。

### 排版的三条硬规则(踩过坑,勿改回去)

0. **放在栅格列里的正文别再写 `max-width`**。`.fix` 原来有 `max-width: 28em`(434px),
   而账目行的第三列实际有 558px——于是 29 字的「做法」被硬生生折成两行,四行就是八行字。
   横排之后由栅格决定宽度,`max-width` 只留一个「别超过一行的上限」(现为 36em)。
   同理:**`display: block` 会被低特异性的同名规则悄悄继承**——`.provider-step strong` 是 `display: block`,
   新加的 `.provider-step p strong` 只改了字号和颜色,标题依旧独占一行,三步变六行。改行内标题必须显式写 `display: inline`。

1. **两列网格里,「标题 + 正文」必须包在一个容器里**(如 `.problem` / `.feature` 各自带完整结构,
   或旧版 `.ledger-row` 的 `.ledger-body`)。若把 `<h3>` 与 `<p>` 平铺进「120px + 1fr」这类网格,
   段体会掉进窄列,中文一行只排得下 8 个字——整页文字会变成一条条窄带(窗口越窄越明显)。
2. **首屏栅格 `.hero-grid` 必须与 `.hero-inner` 用同一套定位**:都是
   `left/right: var(--gutter)` + `max-width: var(--maxw)` + `margin: 0 auto`。
   若栅格写成 `inset: 0`,它会铺满全宽而文字在边距内,细线会切进字里(实测错位 44–59px)。
3. **中文正文行长上限 `38em`(约 38 字/行)**,并且**不要在小屏取消这个上限**——
   900–1080px 区间取消后会出现 53 字/行的长行。

### 断点

| 宽度 | 变化 |
|---|---|
| ≤ 1150px | 页头收紧:隐藏导航序号、导航间距 26→16px(避免 901–1150px 之间页头被挤到换行) |
| ≤ 1080px | 首屏改单列,手机示意移到下方 |
| ≤ 900px | 导航变抽屉菜单;账目行改单列(序号在正文上方) |
| ≤ 560px | 手机细节:隐藏版本号、便签改为行内、按钮通栏 |

### 改完样式请跑三个检查(都在 `/tools/web/`)

```bash
cd <仓库根> && python3 -m http.server 8099
# ① 排版:http://127.0.0.1:8099/tools/web/layout-audit.html
# ② 辨识度与密度:http://127.0.0.1:8099/tools/web/identity-audit.html
# ③ 交互冒烟:http://127.0.0.1:8099/tools/web/smoke-test.html
python3 tools/web/check-tokens.py     # ④ styles.css 与 preview.css 的令牌是否一致
```

① 在 15 种宽度下测横向溢出、文字挤压、正文行长、页头是否换行、首屏栅格是否错位。
期望:溢出 0、桌面正文 25–42 字/行(实测 ≈29)、栅格错位 0。

② 回答「每节能不能一眼分清、文字会不会太密」:区块底色序列与 ΔL\*、相邻同色是否有分界线、
每节专属的辨识标记、章节轨道是否常驻、正文总量 / 最长段落行数、**所有小字的实际对比度**、
纸与纸二的明度差,并给出页面高度与各节高度。期望:区块 7 节全通过、相邻同色无分界线 0 处、
超出 3 行的段落 0 处、小字 ≥4.5:1。

`preview.html` 用的是自己的 `preview.css`,它**复制了一份令牌**(不是共享文件),所以任何令牌改动
两个文件都要改;而且它原先根本没有暗色模式,系统切暗色时会一直亮着——现已补上与主站一致的暗色块。
审计时加参数即可同时看两个页面:

```bash
# 主站(preview.css 与 styles.css 的令牌必须一致,两个都要过)
…/identity-audit.html?page=../../site/preview.html
```

③ 真的在 iframe 里把演示点一遍(播放 / 揭晓 / 评分 / 重置 / 手机平板切换 / 问答折叠 /
章节轨道联动 / 所有锚点),共 20 项。改样式很容易顺手改坏交互(选择器改名、结构挪位、按钮被盖住点不到),
这个页面就是防这个的。命令行推荐参数见页面顶部提示。

④ 是一行 Python:`preview.css` 复制了主站的配色令牌,这个脚本逐项比对两边是否一致。

②在暗色模式下也要跑一遍——headless Chrome 加 `--force-dark-mode` 就会让
`prefers-color-scheme: dark` 真的生效,这是本机唯一能验证暗色配色的办法:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --force-dark-mode --virtual-time-budget=6000 --dump-dom \
  http://127.0.0.1:8099/tools/web/identity-audit.html | grep -o '✗[^<]*'
```

## 〇·补 · 02 节的宣传片(2026-09-13 新增)

02「上手试试」这一节现在是两步:**先看 15 秒成片,再自己动手点**。
片子放在交互演示上方,两者不是重复关系 —— 片子是被动看一遍整条链路,
下面的设备是主动操作。

| 路径 | 内容 |
|---|---|
| `assets/video/paperecho-promo.mp4` | 成片,1920×1080 / 30fps / 15 秒,3.1 MB |
| `assets/video/paperecho-promo-poster.jpg` | 封面图,从片子的 11.45 秒抽帧,1600×900 |

页面结构在 `index.html` 第 211 行起:`.promo-film` 里一个 `<button class="promo-frame">`
包住 `<video class="promo-media">`。行为在 `main.js` 末尾。

**三个不要改回去的地方:**

1. **`preload="none"`。** 移动端展开这一节不该顺带下 3 MB 视频。点了才加载。
2. **点了才 `play()`。** 有声视频不允许自动播放;点击同时满足浏览器限制和不浪费流量。
3. **播完回到封面。** `ended` 里必须先 `pause()` 再 `load()` —— `load()` 会把
   `paused` 复位成 `false`,浏览器随即从 0 秒自己续播,观众看到的是「刚看完又自动重播」。
   同理**不要**监听 `pause`:用户用原生控制条暂停时不该把封面盖回去。

**封面图里已经带「界面示意 · 非实机截图」标注**(抽帧自带,不是后加的)。
这一点必须在:片子里的界面是还原稿,不是 APK 截图。改封面图时不要裁掉那行字。

**小字对比度:** `.promo-len`(右下角「15 秒」)用的是硬编码的深底浅字,
**不要**换成 `--on-ink`。那个令牌在暗色模式下会翻成近黑色,而片子画面在两种模式下
都是深色,换过去会让这枚标签在封面上消失(实测 1.01:1)。
`check-tokens.py` 会比对 `styles.css` 与 `preview.css`,所以那两行硬编码是故意的。

## 一、下载按钮配置(上线前必做)

下载链接共 **4 处**(顶栏、首屏、正文引导、下载区),都指向 `href="./downloads/PaperEcho.apk"`,`download` 属性保证点击即开始下载。发布时二选一:

**方案 A · APK 与网站同站托管(推荐自有服务器/OSS)**

1. 把构建出的 APK 重命名为 `PaperEcho.apk`(debug 包在 `app/build/outputs/apk/debug/app-debug.apk`);
2. 放进 `site/downloads/` 目录,随网站一起上传。

**方案 B · APK 外部托管(如 GitHub Releases、网盘直链)**

把 3 处 `href` 改成完整地址,例如:
`https://github.com/<你>/PaperEcho/releases/download/v1.0.1/PaperEcho.apk`



**同步更新 3 处占位信息**(HTML 里已用 `★` 注释标出):

| 位置 | 内容 |
| --- | --- |
| 下载区 `.download-spec` | 版本号 / 包体积 / 系统要求(三项,别再加「构建日期」——那个字段已删) |
| 下载区 `.download-verify` | APK 的 SHA-256,默认收在 `<details>` 里:`shasum -a 256 PaperEcho.apk` |
| 首屏 `.hero-note` | 免费 · 无广告 · 无需注册账户 · 数据只在本机 |

**同步更新 App 内检查更新清单**(`version.json`,App「设置 → 关于与更新 → 检查更新」读取它):

每次发布新版时,把 `site/version.json` 的 `versionCode`(整数,必须大于上一版)、`versionName`、`notes`(一句话更新说明)同步更新;`apkUrl` 保持 `downloads/PaperEcho.apk` 相对路径即可。未更新 `version.json` 会导致 App 检查更新永远提示「已是最新版本」。

> ⚠️ **反过来更危险:`version.json` 的 versionCode 绝不能超前于 `downloads/PaperEcho.apk`。**
> 2026-09-12 差点这么发出去:当时 `version.json` 被改成了 27 / 1.2.22,而站上的 APK 还是
> 26 / 1.2.21(`app/build.gradle.kts` 升了版本但没重新打包)。真发出去的话,所有已装
> 1.2.21 的用户都会看到「有新版本」→ 下载 → 装上去还是 1.2.21 → 再提示……死循环。
> **发布前必做一步**(两条命令,结果必须一致):
>
> ```bash
> ~/Library/Android/sdk/build-tools/36.0.0/aapt2 dump badging downloads/PaperEcho.apk | head -1
> cat version.json
> ```

当前官网下载包：v1.2.22（versionCode 27），约 5.4 MB，SHA-256 `e2f6c5727b1feef8b4e276e39a507f553aa54a8bd9277298b081d5f7d25b20ee`。本次新增 INK 学习工作台与练习导航，修复阅读、复习和实时口语体验。

## 一·补 · 域名与 SEO 占位(发布前必做)

页面为收录与社交分享补了一批元信息,其中的**正式域名**是占位值,发布前必须替换——index.html 的 `canonical`、`og:url`、`og:image`,以及 `sitemap.xml`、`robots.txt` 里的 `https://paperecho.app` 都要改成你的正式域名(一处替换,多处生效):

- **canonical / og:url / og:image**：在 `site/index.html` 的 `<head>` 里搜 `paperecho.app`,替换成你的域名即可;
- **sitemap.xml / robots.txt**：把里面的 `https://paperecho.app` 一并替换(与 canonical 保持一致);
- **og:image**：分享卡片用的是 `site/assets/og.png`(1200×630,已生成)。想换文案/配色可改;固定用该图即可。
- 若上 GitHub Pages,域名形如 `https://<用户名>.github.io/<仓库名>/`,注意结尾斜杠与子路径。

> 未替换域名会导致搜索引擎抓到的 canonical / 分享链接指到不存在的站点。上线清单里已加此检查项。

## 二、部署方案(三选一)

### 方案 1:GitHub Pages(免费,海外访问快)

1. 把项目推送到 GitHub 仓库;
2. 仓库 → Settings → Pages → Source 选 **Deploy from a branch**,分支 `main`、目录 **`/site`** → Save;
3. 访问 `https://<用户名>.github.io/<仓库名>/`;
4. APK 约 3 MB,放在 `site/downloads/` 随站托管即可(方案 A),无需外部文件托管;国内访问 GitHub Pages 可能较慢。

### 方案 2:国内对象存储 + CDN(推荐给国内用户)

以阿里云 OSS 为例(腾讯云 COS 同理):

1. 创建 Bucket,**开启静态网站托管**,默认首页填 `index.html`;
2. 上传 `site/` 里的 `index.html / styles.css / main.js / favicon.svg / assets/` 全部内容(**不要把 downloads/ 里的 README 传上去**);
3. APK 单独传到同 Bucket 的 `downloads/` 路径(用方案 A 的相对路径即可),或传 CDN 后改 3 处 `href`;
4. 绑定自己的域名 + CDN + HTTPS;按国内要求完成 **ICP 备案**(纯海外访问可跳过);
5. 别忘了在 `index.html` 的 `<meta name="theme-color">` 等元信息里没有需要改的域名项,分享时用你的最终域名。

### 方案 3:自有服务器(nginx)

```bash
# 上传 site 目录内容到服务器 /var/www/paperecho
scp -r site/* user@server:/var/www/paperecho/

# nginx 配置
server {
    listen 443 ssl;
    server_name 你的域名;
    root /var/www/paperecho;
    index index.html;
    location /downloads/ {
        # 25MB 文件:建议开启断点续传
        proxy_max_temp_file_size 0;
    }
}
```

1. HTTPS 证书用 Let's Encrypt(certbot)或云厂商免费证书;
2. APK 放 `/var/www/paperecho/downloads/PaperEcho.apk` 即与方案 A 匹配;
3. nginx 默认允许静态大文件,如需限速/防盗链可在 `location /downloads/` 里加 `limit_rate` 与 `valid_referers`。

## 三、上线前检查清单

- [ ] 密钥审计:全站与仓库无任何 API 密钥(页面零 API 调用,音频为静态 MP3)
- [ ] 正式域名已替换:index.html 的 `canonical`/`og:url`/`og:image` 与 `sitemap.xml`/`robots.txt` 里的 `https://paperecho.app`
- [ ] `assets/og.png`、`assets/fonts/paperecho-serif.otf`、`robots.txt`、`sitemap.xml` 已随站上传
- [ ] 站点仍是零依赖:除 `canonical`/`og:url` 自指域名与 JSON-LD 的 schema.org 上下文外,不应有任何外部请求
- [ ] `PaperEcho.apk` 已放置或 3 处 `href` 已替换
- [ ] 版本号 / 体积 / 日期已更新(2 处)
- [ ] `version.json` 的 versionCode/versionName/notes 已同步本次发布版本
- [ ] SHA-256 已填写(1 处)
- [ ] 在手机浏览器点过一遍下载按钮,确认立即开始下载
- [ ] 交互演示的发音播放正常(Chrome/Safari 移动端)

## 四、文件结构

```
site/
├── index.html          # 页面(下载链接 / 发布信息 / SEO 与分享元信息,含 canonical、OG、JSON-LD)
├── styles.css          # INK 样式(设计令牌在 :root;暗色为 prefers-color-scheme)
├── main.js             # 入场动画、进度线、导航高亮、设备切换与交互演示逻辑
├── preview.html        # 阅读工作台预览页(桌面形态示意,与主站同一套 INK 令牌)
├── preview.css         # 预览页样式(自托管字体,不再引用 Google Fonts)
├── favicon.svg         # 图标(与 App 启动图标同款)
├── robots.txt          # 爬虫允许规则与 sitemap 指向(发布前替换域名)
├── sitemap.xml         # 站点地图(发布前替换域名)
├── version.json        # App 内「检查更新」的版本清单(发布时同步 versionCode/versionName/notes)
├── assets/
│   ├── audio/*.mp3     # 演示发音(预生成录音,约 350KB,可直接随站托管)
│   ├── fonts/          # 思源宋体子集(428KB,SIL OFL 1.1)+ 授权文本
│   └── og.png          # 社交分享卡片图(1200×630,OG/Twitter 分享用)
└── downloads/
    ├── PaperEcho.apk   # ← 你的 APK 放这里(方案 A)
    └── README.md       # 放置说明(不要随站上传)

## 五、性能与托管建议

页面为纯静态、零依赖(无框架、无外部 CDN、字体走系统栈),已按性能优先处理:

- **音频按需加载**：演示 8 个 MP3 用 `preload="none"`,仅点击播放时才请求,首屏不预载;
- **无光栅大图**：视觉全部由内联 CSS/SVG 绘制,首屏 LCP 快,无第三方字体下载;
- 演示音频与 og.png 均为预生成静态文件,可直接随站托管。

托管时建议开启(以兼容静态托管为准):

- 对 `.mp3 / .png / .css / .js / .html / .svg` 启用 **gzip / Brotli** 压缩(音频已压缩,二次收益有限);
- 设置 **Cache-Control**：`index.html` 用 `no-cache`(每次校验),其余 `max-age=3600`;APK 支持 Range 断点续传;
- 若走 OSS+CDN,确认开启 **HTTP/2 / HTTP/3** 与回源压缩,国内用户优先选国内节点。

> 如需进一步瘦身,可仅保留 `sentence-gb.mp3`、`sentence-us.mp3` 两个关键演示音频,其余文字演示已足够(改动需同步 main.js 的 AUDIO 表)。
```
