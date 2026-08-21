# PaperEcho 宣传网站 — 上线指南

纯静态单页(HTML + CSS + JS,零依赖、无任何 API 调用),可直接部署到任意静态托管。

## 本地预览

```bash
cd site
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

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
| 首屏 `hero-meta` | 版本号 / 包体积 / 构建日期 |
| 下载区 `download-meta` | 版本号 / 包体积 / 系统要求 |
| 下载区 `download-sha` | APK 的 SHA-256:`shasum -a 256 PaperEcho.apk` |

**同步更新 App 内检查更新清单**(`version.json`,App「设置 → 关于与更新 → 检查更新」读取它):

每次发布新版时,把 `site/version.json` 的 `versionCode`(整数,必须大于上一版)、`versionName`、`notes`(一句话更新说明)同步更新;`apkUrl` 保持 `downloads/PaperEcho.apk` 相对路径即可。未更新 `version.json` 会导致 App 检查更新永远提示「已是最新版本」。

当前官网发布包：v1.2.11（versionCode 16），3,165,602 bytes，SHA-256 `01bf9dd7127fd4a01c77df10c63f3aa0687ed1415e38a990b8b9f10b8ce9ea91`。

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
- [ ] `PaperEcho.apk` 已放置或 3 处 `href` 已替换
- [ ] 版本号 / 体积 / 日期已更新(2 处)
- [ ] `version.json` 的 versionCode/versionName/notes 已同步本次发布版本
- [ ] SHA-256 已填写(1 处)
- [ ] 在手机浏览器点过一遍下载按钮,确认立即开始下载
- [ ] 交互演示的发音播放正常(Chrome/Safari 移动端)

## 四、文件结构

```
site/
├── index.html          # 页面(下载链接与发布信息在此修改)
├── styles.css          # 样式(色板变量在 :root;演示样式在文件末尾)
├── main.js             # 入场动画、设备切换与交互演示逻辑
├── favicon.svg         # 图标(与 App 启动图标同款)
├── version.json        # App 内「检查更新」的版本清单(发布时同步 versionCode/versionName/notes)
├── assets/audio/*.mp3  # 演示发音(预生成录音,约 350KB,可直接随站托管)
└── downloads/
    ├── PaperEcho.apk   # ← 你的 APK 放这里(方案 A)
    └── README.md       # 放置说明(不要随站上传)
```
