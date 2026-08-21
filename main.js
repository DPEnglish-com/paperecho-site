// PaperEcho 宣传站脚本:入场动画、页脚年份、可交互设备演示
// 演示发音为预生成的云端语音录音(assets/audio/*.mp3),通过共享 <audio> 播放,支持真实倍速。
(function () {
  "use strict";

  /* ---------- 页脚年份 ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- 滚动入场 ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- 共享音频播放器 ---------- */
  var demoAudio = document.getElementById("demo-audio");
  var AUDIO_BASE = "assets/audio/";

  var AUDIO = {
    sentenceGB: AUDIO_BASE + "sentence-gb.mp3",
    sentenceUS: AUDIO_BASE + "sentence-us.mp3",
    paragraphs: [AUDIO_BASE + "para-1.mp3", AUDIO_BASE + "para-2.mp3", AUDIO_BASE + "para-3.mp3"],
    words: {
      mitigate: AUDIO_BASE + "word-mitigate.mp3",
      coherent: AUDIO_BASE + "word-coherent.mp3",
      urban: AUDIO_BASE + "word-urban.mp3"
    }
  };

  // 播放状态指示:一个或多个按钮进入 .playing
  var playingNodes = [];
  function setPlaying(node, on) {
    if (!node) return;
    node.classList.toggle("playing", on);
  }

  function playFile(src, rate, node) {
    if (!demoAudio) return;
    demoAudio.src = src;
    demoAudio.playbackRate = rate;
    demoAudio.currentTime = 0;
    var promise = demoAudio.play();
    if (promise && promise.catch) {
      promise.catch(function () {
        setPlaying(node, false);
        if (hintEl) setHint("nospeech");
      });
    }
    setPlaying(node, true);
    if (node && node._endHandler) demoAudio.removeEventListener("ended", node._endHandler);
    var onEnd = function () { setPlaying(node, false); };
    node._endHandler = onEnd;
    demoAudio.addEventListener("ended", onEnd, { once: true });
    demoAudio.onerror = function () { setPlaying(node, false); };
  }

  /* ---------- 设备切换 ---------- */
  var toggleButtons = document.querySelectorAll(".demo-toggle-btn");
  var devicePanels = document.querySelectorAll(".demo-device");

  toggleButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      toggleButtons.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      devicePanels.forEach(function (panel) {
        panel.classList.toggle("active", panel.dataset.devicePanel === btn.dataset.device);
      });
      if (demoAudio) demoAudio.pause();
    });
  });

  /* ---------- 手机演示:听 → 写 → 揭晓 → 标记 ---------- */
  var hintEl = document.getElementById("demo-hint");
  var phoneState = { played: false, revealed: false, rated: false, accent: "GB", speed: 1 };
  var answer = document.getElementById("d-answer");
  var revealLabel = document.querySelector("[data-reveal-label]");
  var nextBtn = document.querySelector("[data-action=reset]");
  var playBtn = document.querySelector("[data-action=play-sentence]");

  function setHint(step) {
    if (!hintEl) return;
    hintEl.classList.toggle("done", step === "done");
    var html = {
      1: "第 1 步:点击 <b>▶</b> 听一句,然后在纸上写下来",
      2: "第 2 步:在纸上写下你听到的句子(真的拿纸笔!)",
      3: "第 3 步:标记你的掌握程度",
      done: "完成!这就是一次纸笔训练的最小闭环",
      nospeech: "音频加载失败,请检查网络后刷新重试"
    }[step];
    if (html) hintEl.innerHTML = '<span class="demo-hint-dot"></span>' + html;
  }

  if (playBtn) {
    playBtn.addEventListener("click", function () {
      playFile(
        phoneState.accent === "GB" ? AUDIO.sentenceGB : AUDIO.sentenceUS,
        phoneState.speed,
        playBtn
      );
      phoneState.played = true;
      if (!phoneState.revealed) setHint(2);
    });
  }

  // 英音/美音、倍速
  document.querySelectorAll(".dchips").forEach(function (group) {
    group.querySelectorAll(".dchip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        group.querySelectorAll(".dchip").forEach(function (c) { c.classList.remove("on"); });
        chip.classList.add("on");
        if (chip.dataset.accent) phoneState.accent = chip.dataset.accent;
        if (chip.dataset.speed) {
          phoneState.speed = parseFloat(chip.dataset.speed);
          // 播放中切换倍速,实时生效
          if (demoAudio && !demoAudio.paused && phoneState.played) {
            demoAudio.playbackRate = phoneState.speed;
          }
        }
      });
    });
  });

  // 揭晓原文
  var revealBtn = document.querySelector("[data-action=reveal]");
  if (revealBtn) {
    revealBtn.addEventListener("click", function () {
      phoneState.revealed = !phoneState.revealed;
      answer.classList.toggle("open", phoneState.revealed);
      revealLabel.textContent = phoneState.revealed ? "隐藏原文" : "揭晓原文,核对答案";
      if (phoneState.revealed && !phoneState.rated) setHint(3);
      else if (!phoneState.revealed && !phoneState.rated) setHint(phoneState.played ? 2 : 1);
    });
  }

  // 评分
  var rateChips = document.querySelectorAll(".drate-chip");
  rateChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      rateChips.forEach(function (c) { c.classList.remove("on"); });
      chip.classList.add("on");
      phoneState.rated = true;
      nextBtn.disabled = false;
      setHint("done");
    });
  });

  // 下一句(重置演示)
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      phoneState = { played: false, revealed: false, rated: false, accent: phoneState.accent, speed: phoneState.speed };
      answer.classList.remove("open");
      revealLabel.textContent = "揭晓原文,核对答案";
      rateChips.forEach(function (c) { c.classList.remove("on"); });
      nextBtn.disabled = true;
      if (demoAudio) demoAudio.pause();
      setPlaying(playBtn, false);
      setHint(1);
    });
  }

  /* ---------- 平板演示:三栏精读 ---------- */
  var WORD_DETAILS = {
    mitigate: {
      term: "mitigate",
      meta: "/ˈmɪtɪɡeɪt/ · v.",
      core: "核心义:缓解,减轻",
      ctx: "本文语境:减轻城市拥堵",
      collocations: "mitigate the impact · mitigate risks",
      synonyms: "alleviate 多指减轻痛苦;ease 语气更日常"
    },
    coherent: {
      term: "coherent",
      meta: "/kəʊˈhɪərənt/ · adj.",
      core: "核心义:连贯的,一致的",
      ctx: "本文语境:政策保持一致",
      collocations: "a coherent strategy · coherent arguments",
      synonyms: "consistent 侧重前后不矛盾;logical 侧重逻辑自洽"
    },
    urban: {
      term: "urban",
      meta: "/ˈɜːbən/ · adj.",
      core: "核心义:城市的",
      ctx: "本文语境:城市规划",
      collocations: "urban planning · urban areas",
      synonyms: "metropolitan 更正式,多指大都市圈"
    }
  };

  var tabletScreen = document.querySelector(".dtablet-screen");
  var paragraphs = document.querySelectorAll(".dpara");
  var tocItems = document.querySelectorAll(".dtoc-item");
  var wordButtons = document.querySelectorAll(".dword");
  var currentWord = "mitigate";
  var currentSection = 0;

  function selectSection(index) {
    currentSection = index;
    tocItems.forEach(function (item) {
      item.classList.toggle("active", Number(item.dataset.section) === index);
    });
    paragraphs.forEach(function (para) {
      para.classList.toggle("active", Number(para.dataset.para) === index);
    });
  }

  function selectWord(word) {
    currentWord = word;
    wordButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.word === word);
    });
    var detail = WORD_DETAILS[word];
    document.getElementById("d-word-term").textContent = detail.term;
    document.getElementById("d-word-meta").textContent = detail.meta;
    document.getElementById("d-word-core").textContent = detail.core;
    document.getElementById("d-word-ctx").textContent = detail.ctx;
    document.getElementById("d-word-collocations").textContent = detail.collocations;
    document.getElementById("d-word-synonyms").textContent = detail.synonyms;
  }

  tocItems.forEach(function (item) {
    item.addEventListener("click", function () { selectSection(Number(item.dataset.section)); });
  });

  wordButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectWord(btn.dataset.word);
      var para = btn.closest(".dpara");
      if (para) selectSection(Number(para.dataset.para));
    });
  });

  var translationToggle = document.querySelector("[data-action=toggle-translations]");
  if (translationToggle) {
    translationToggle.addEventListener("change", function () {
      tabletScreen.classList.toggle("show-translations", translationToggle.checked);
    });
  }

  var wordPlay = document.querySelector("[data-action=play-word]");
  if (wordPlay) {
    wordPlay.addEventListener("click", function () {
      playFile(AUDIO.words[currentWord], 1, wordPlay);
    });
  }

  var articlePlay = document.querySelector("[data-action=play-article]");
  if (articlePlay) {
    articlePlay.addEventListener("click", function () {
      playFile(AUDIO.paragraphs[currentSection], 1, articlePlay);
    });
  }

  /* ---------- 移动端导航(抽屉) ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var siteHeader = document.querySelector(".site-header");
  var siteNav = document.getElementById("site-nav");

  function closeMenu() {
    if (!siteHeader) return;
    siteHeader.classList.remove("menu-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "打开菜单");
    }
  }

  if (navToggle && siteNav && siteHeader) {
    navToggle.addEventListener("click", function () {
      var open = siteHeader.classList.toggle("menu-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    });
    siteNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("click", function (e) {
      if (!siteHeader.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }
})();
