// Component helpers — keep DSL terse so chapter files stay readable.

const PAGES = {}; // pageId -> { title, render() }

function registerPage(id, title, renderFn) {
  PAGES[id] = { title, render: renderFn };
}

// Definition card
function defCard(title, body) {
  return `<div class="def-card">
    <div class="def-title">📖 ${title}</div>
    <div class="def-body">${body}</div>
  </div>`;
}

// Collapsible details
function collapse(summary, body) {
  return `<details><summary>${summary}</summary><div class="body">${body}</div></details>`;
}

// Note callouts
function note(body, kind = "info") {
  const labelMap = { info: "💡 직관", warn: "⚠️ 주의", tip: "✅ 팁" };
  return `<div class="note ${kind === "info" ? "" : kind}">
    <span class="label">${labelMap[kind] || ""}</span>${body}
  </div>`;
}

// Tag
function tag(text, kind = "concept") {
  return `<span class="tag ${kind}">${text}</span>`;
}

// Multiple choice quiz
let quizCounter = 0;
function mcQuiz(question, options, correctIdx, explanation) {
  const id = `quiz-${++quizCounter}`;
  const opts = options.map((opt, i) => `
    <div class="quiz-option" data-id="${id}" data-i="${i}" onclick="window.checkMC('${id}', ${i}, ${correctIdx})">
      <span class="marker"></span><span>${opt}</span>
    </div>`).join("");
  return `<div class="quiz" id="${id}">
    <div class="quiz-q">${question}</div>
    <div class="quiz-options">${opts}</div>
    <div class="quiz-feedback" id="${id}-fb">${explanation}</div>
  </div>`;
}

window.checkMC = function (qid, picked, correct) {
  const root = document.getElementById(qid);
  if (root.dataset.answered) return;
  root.dataset.answered = "1";
  const opts = root.querySelectorAll(".quiz-option");
  opts.forEach((el, i) => {
    el.classList.add("disabled");
    if (i === correct) el.classList.add("correct");
    else if (i === picked) el.classList.add("wrong");
  });
  document.getElementById(qid + "-fb").classList.add("shown");
  if (window.renderMathInElement) {
    window.renderMathInElement(document.getElementById(qid + "-fb"), {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
    });
  }
};

// Short-answer quiz
function saQuiz(question, acceptable, explanation) {
  const id = `quiz-${++quizCounter}`;
  const accStr = JSON.stringify(acceptable.map(a => a.toString().trim().toLowerCase()));
  return `<div class="quiz" id="${id}">
    <div class="quiz-q">${question}</div>
    <input class="quiz-input" id="${id}-in" placeholder="답을 입력하세요"
      onkeypress="if(event.key==='Enter')window.checkSA('${id}', ${escapeAttr(accStr)})" />
    <button class="quiz-submit" onclick="window.checkSA('${id}', ${escapeAttr(accStr)})">확인</button>
    <div class="quiz-feedback" id="${id}-fb">${explanation}</div>
  </div>`;
}

function escapeAttr(s) {
  return JSON.stringify(s);
}

window.checkSA = function (qid, accStr) {
  const acceptable = JSON.parse(JSON.parse(accStr));
  const input = document.getElementById(qid + "-in");
  const v = input.value.trim().toLowerCase().replace(/\s+/g, "");
  const norm = acceptable.map(a => a.replace(/\s+/g, ""));
  const correct = norm.includes(v);
  input.style.borderColor = correct ? "var(--ok)" : "var(--danger)";
  const fb = document.getElementById(qid + "-fb");
  fb.classList.add("shown");
  fb.style.borderLeftColor = correct ? "var(--ok)" : "var(--danger)";
  fb.innerHTML = (correct ? "✅ 정답! " : `❌ 정답: <code>${acceptable[0]}</code><br>`) + fb.innerHTML.replace(/^✅[^<]*|^❌[^<]*/, "");
  if (window.renderMathInElement) window.renderMathInElement(fb, {
    delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
  });
};

// Step-by-step walkthrough
let walkCounter = 0;
function walkthrough(title, steps) {
  const id = `walk-${++walkCounter}`;
  const data = JSON.stringify(steps).replace(/'/g, "&#39;");
  return `<div class="walkthrough" id="${id}" data-steps='${data}' data-current="0">
    <div class="walkthrough-header">
      <div class="title">🧮 ${title}</div>
      <div class="step-counter"><span class="cur">1</span> / ${steps.length}</div>
    </div>
    <div class="walkthrough-step"></div>
    <div class="walkthrough-controls">
      <button onclick="window.walkPrev('${id}')">← 이전</button>
      <button onclick="window.walkNext('${id}')">다음 →</button>
    </div>
  </div>`;
}

function renderWalkStep(id) {
  const root = document.getElementById(id);
  const steps = JSON.parse(root.dataset.steps);
  const i = parseInt(root.dataset.current);
  const step = steps[i];
  const stepEl = root.querySelector(".walkthrough-step");
  stepEl.innerHTML = `<div class="step-title">Step ${i + 1}: ${step.title}</div><div>${step.body}</div>`;
  root.querySelector(".cur").textContent = i + 1;
  const [prev, next] = root.querySelectorAll(".walkthrough-controls button");
  prev.disabled = i === 0;
  next.disabled = i === steps.length - 1;
  if (window.renderMathInElement) window.renderMathInElement(stepEl, {
    delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
  });
}

window.walkNext = function (id) {
  const root = document.getElementById(id);
  const steps = JSON.parse(root.dataset.steps);
  const i = parseInt(root.dataset.current);
  if (i < steps.length - 1) { root.dataset.current = i + 1; renderWalkStep(id); }
};
window.walkPrev = function (id) {
  const root = document.getElementById(id);
  const i = parseInt(root.dataset.current);
  if (i > 0) { root.dataset.current = i - 1; renderWalkStep(id); }
};

// Page complete button
function completeBtn(pageId) {
  const done = isComplete(pageId);
  return `<button class="complete-btn ${done ? "done" : ""}" id="complete-${pageId}"
    onclick="window.toggleComplete('${pageId}')">
    ${done ? "✓ 완료됨 (다시 학습 표시)" : "이 페이지 학습 완료로 표시"}
  </button>`;
}

window.toggleComplete = function (pageId) {
  const cur = isComplete(pageId);
  setComplete(pageId, !cur);
  if (window.refreshNav) window.refreshNav();
  const btn = document.getElementById("complete-" + pageId);
  if (btn) {
    btn.classList.toggle("done");
    btn.textContent = !cur ? "✓ 완료됨 (다시 학습 표시)" : "이 페이지 학습 완료로 표시";
  }
};

function isComplete(pageId) {
  const data = JSON.parse(localStorage.getItem("ls-progress") || "{}");
  return !!data[pageId];
}
function setComplete(pageId, val) {
  const data = JSON.parse(localStorage.getItem("ls-progress") || "{}");
  if (val) data[pageId] = Date.now(); else delete data[pageId];
  localStorage.setItem("ls-progress", JSON.stringify(data));
}

// Homework problem block
let spoilerCounter = 0;
function hwProblem({ num, topic, image, problemText, answer, variant }) {
  const sid = `spoiler-${++spoilerCounter}`;
  const images = image ? (Array.isArray(image) ? image : [image]) : [];
  const imgHtml = images.map(img =>
    `<img src="images/hw/${img}" alt="Problem ${num}" loading="lazy" />`
  ).join("");
  return `<div class="hw-problem">
    <div class="hw-head">
      <span class="hw-num">Problem ${num}</span>
      <span class="hw-topic">${topic}</span>
    </div>
    <div class="hw-q">
      ${imgHtml}
      ${problemText ? `<div class="text"><strong>📌 한국어 번역:</strong><br>${problemText}</div>` : ""}
    </div>
    <div class="hw-answer">
      <div class="ans-title">모범 답안</div>
      <button class="spoiler-toggle" onclick="window.toggleSpoiler('${sid}')">답안 보기/숨기기</button>
      <div class="spoiler-content" id="${sid}">
        ${answer}
      </div>
      ${variant ? `<div class="hw-variant"><span class="v-label">시험 변형 가능성:</span>${variant}</div>` : ""}
    </div>
  </div>`;
}

window.toggleSpoiler = function(sid) {
  const el = document.getElementById(sid);
  el.classList.toggle("shown");
  if (el.classList.contains("shown") && window.renderMathInElement) {
    window.renderMathInElement(el, {
      delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
    });
  }
};

// Exam timer
let examTimerInterval = null;
function examTimer(minutes) {
  return `<div class="exam-timer" id="exam-timer">
    <div class="timer-display">
      <span class="timer-label">남은 시간</span>
      <span class="timer-value" id="timer-value">${minutes}:00</span>
    </div>
    <div class="timer-controls">
      <button id="timer-start" onclick="window.startTimer(${minutes})">시작</button>
      <button id="timer-pause" onclick="window.pauseTimer()" disabled>일시정지</button>
      <button id="timer-reset" onclick="window.resetTimer(${minutes})">리셋</button>
    </div>
  </div>`;
}

window.startTimer = function(minutes) {
  if (examTimerInterval) return;
  let remaining = parseInt(localStorage.getItem("ls-timer-remaining") || (minutes * 60));
  const tick = () => {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    const el = document.getElementById("timer-value");
    if (!el) { clearInterval(examTimerInterval); examTimerInterval = null; return; }
    el.textContent = `${m}:${s.toString().padStart(2, "0")}`;
    if (remaining <= 300) el.classList.add("warning");
    if (remaining <= 60) el.classList.add("danger");
    if (remaining <= 0) {
      clearInterval(examTimerInterval); examTimerInterval = null;
      alert("시험 시간 종료!");
      return;
    }
    remaining--;
    localStorage.setItem("ls-timer-remaining", remaining);
  };
  tick();
  examTimerInterval = setInterval(tick, 1000);
  document.getElementById("timer-start").disabled = true;
  document.getElementById("timer-pause").disabled = false;
};

window.pauseTimer = function() {
  if (examTimerInterval) {
    clearInterval(examTimerInterval);
    examTimerInterval = null;
  }
  const start = document.getElementById("timer-start");
  const pause = document.getElementById("timer-pause");
  if (start) start.disabled = false;
  if (pause) pause.disabled = true;
};

window.resetTimer = function(minutes) {
  if (examTimerInterval) clearInterval(examTimerInterval);
  examTimerInterval = null;
  localStorage.removeItem("ls-timer-remaining");
  const el = document.getElementById("timer-value");
  if (el) {
    el.textContent = `${minutes}:00`;
    el.classList.remove("warning", "danger");
  }
  const start = document.getElementById("timer-start");
  const pause = document.getElementById("timer-pause");
  if (start) start.disabled = false;
  if (pause) pause.disabled = true;
};

// Exam problem block
let examCounter = 0;
function examProblem({ num, points, topic, statement, koreanText, answer }) {
  const sid = `exam-spoiler-${++examCounter}`;
  return `<div class="exam-problem">
    <div class="exam-head">
      <span class="exam-num">문제 ${num}</span>
      <span class="exam-points">[${points}점]</span>
      <span class="exam-topic">${topic}</span>
    </div>
    <div class="exam-statement">${statement}</div>
    ${koreanText ? `<div class="text"><strong>📌 한국어 번역:</strong><br>${koreanText}</div>` : ""}
    <div class="hw-answer">
      <div class="ans-title">모범 답안</div>
      <button class="spoiler-toggle" onclick="window.toggleSpoiler('${sid}')">답안 보기/숨기기</button>
      <div class="spoiler-content" id="${sid}">
        ${answer}
      </div>
    </div>
  </div>`;
}

// Page nav (prev/next)
function pageNav(prev, next) {
  return `<div class="page-nav">
    ${prev ? `<a href="#${prev.id}" onclick="window.go('${prev.id}')"><span class="label">← 이전</span>${prev.title}</a>` : `<div></div>`}
    ${next ? `<a class="next" href="#${next.id}" onclick="window.go('${next.id}')"><span class="label">다음 →</span>${next.title}</a>` : `<div></div>`}
  </div>`;
}
