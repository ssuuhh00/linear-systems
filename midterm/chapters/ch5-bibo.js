registerPage("ch5-bibo", "BIBO Stability", () => `
<h1>Ch 5 — BIBO Stability</h1>
<p class="lead">${tag("자주 출제", "exam")} 족보 2015 #4(c), 과제 5.4, 5.7. 족보 2017 robust에서도 변형 출제.</p>

<h2>1. 정의</h2>
${defCard("BIBO Stable (Bounded-Input Bounded-Output)", `
모든 <strong>유계(bounded)</strong> 입력에 대해 출력도 <strong>유계</strong> 이면 BIBO stable.<br>
수식: $|u(t)| \\le M \\Rightarrow |y(t)| \\le N$ 인 $M, N$이 존재.
`)}

${collapse("실생활 비유: 마이크와 앰프 (하울링)", `
마이크 → 앰프 → 스피커 → (소리가 다시 마이크로) → 앰프 → ... 이 폐루프.<br><br>
<strong>BIBO stable:</strong> 가수가 노래해도 (유계 입력) → 스피커 소리도 유계. 정상 작동.<br>
<strong>BIBO unstable:</strong> 작은 잡음만 들어가도 → 스피커 소리가 점점 커지다가 "삐~~~" 하는 하울링 폭발.<br><br>
이게 정확히 시스템 pole이 우반평면 (RHP)으로 넘어갔을 때의 모습. 작은 입력이 무한히 커지는 발산 응답.
`)}

${collapse("실생활 비유 2: 자전거의 안정성", `
자전거 핸들이 살짝 기울었을 때 (작은 외란):<br>
- BIBO stable: 자동으로 다시 똑바로 → 잘 가는 자전거<br>
- BIBO unstable: 점점 더 기울어서 넘어짐 → 균형 잡기 어려운 자전거<br><br>
세그웨이 같은 거꾸로 진자(inverted pendulum) 시스템은 본래 unstable이라, 제어기를 추가해서 stable로 만드는 것.
`)}

<h2>2. 판별 조건</h2>
${defCard("(연속시간 LTI) BIBO stable ⇔ 다음 중 하나", `
<ol>
  <li><strong>임펄스응답이 절대 적분 가능:</strong> $\\int_0^\\infty |h(t)| dt < \\infty$</li>
  <li><strong>전달함수의 모든 pole이 좌반평면(LHP)에 있다:</strong> $\\text{Re}(p_i) < 0 \\;\\forall i$</li>
</ol>
`)}

${note(`<strong>주의:</strong> "허수축 위 (Re = 0)" 는 BIBO unstable! 예: $\\hat{g}(s) = 1/s$ 의 극은 0 → not BIBO stable. step 입력 → 출력은 ramp ($t$) → 발산.`, "warn")}

<h2>3. 워크스루 #1: 과제 5.4 — $\\hat{g}(s) = e^{-2s}/(s+1)$</h2>
${walkthrough("Time delay 가 있는 시스템", [
  {
    title: "분석",
    body: `$e^{-2s}$ 는 시간지연 (2초). 임펄스응답으로 보면:<br>
    $h(t) = e^{-(t-2)} u(t-2)$ — 2초 지연된 지수감쇠.`
  },
  {
    title: "BIBO 검사",
    body: `$\\int_0^\\infty |h(t)| dt = \\int_2^\\infty e^{-(t-2)} dt = 1 < \\infty$ ✓<br>
    또는: pole이 $s = -1$ (LHP) ✓.<br>
    $$\\Rightarrow \\text{BIBO stable}$$`
  }
])}

<h2>4. 워크스루 #2: 과제 5.7 — 상태공간으로 BIBO 판정</h2>
${walkthrough("$\\dot{\\mathbf{x}} = \\begin{bmatrix}-1 & 10 \\\\ 0 & 1\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}-2\\\\0\\end{bmatrix}u$, $y = [-2, 3]\\mathbf{x} - 2u$", [
  {
    title: "Eigenvalue (= 시스템 pole 후보)",
    body: `삼각행렬 → 대각원소가 eigenvalue: $\\lambda_1 = -1, \\lambda_2 = 1$.<br>
    $\\lambda_2 = 1 > 0$ 인데 — 일단 internal stability는 깨졌어. BIBO는 어떨까?`
  },
  {
    title: "전달함수 계산",
    body: `$\\hat{g}(s) = C(sI-A)^{-1}B + D$<br>
    $sI - A = \\begin{bmatrix}s+1 & -10 \\\\ 0 & s-1\\end{bmatrix}$, $\\det = (s+1)(s-1)$<br>
    $(sI-A)^{-1} = \\frac{1}{(s+1)(s-1)}\\begin{bmatrix}s-1 & 10 \\\\ 0 & s+1\\end{bmatrix}$<br>
    $(sI-A)^{-1}B = \\frac{1}{(s+1)(s-1)}\\begin{bmatrix}s-1 & 10 \\\\ 0 & s+1\\end{bmatrix}\\begin{bmatrix}-2\\\\0\\end{bmatrix} = \\frac{1}{(s+1)(s-1)}\\begin{bmatrix}-2(s-1)\\\\0\\end{bmatrix} = \\begin{bmatrix}-2/(s+1)\\\\0\\end{bmatrix}$<br><br>
    $C(sI-A)^{-1}B = [-2, 3] \\cdot \\begin{bmatrix}-2/(s+1)\\\\0\\end{bmatrix} = \\frac{4}{s+1}$<br>
    $\\hat{g}(s) = \\frac{4}{s+1} - 2 = \\frac{4 - 2(s+1)}{s+1} = \\frac{-2s + 2}{s+1} = \\frac{-2(s-1)}{s+1}$`
  },
  {
    title: "Pole-zero 분석",
    body: `Pole: $s = -1$ (LHP) → BIBO stable!<br><br>
    <strong>관찰:</strong> 시스템에 unstable mode($\\lambda = 1$)가 있어도, 그게 입력→출력 전달함수에서 <em>pole-zero 상쇄</em> 되면 BIBO stable. 하지만 internal stability는 여전히 깨짐. → <strong>BIBO ≠ Internal stability</strong>.`
  }
])}

${note(`<strong>핵심 통찰:</strong> BIBO는 "외부에서 본" 안정도. Internal stability는 "내부 모든 상태"의 안정도. 후자가 더 강한 조건. 둘이 일치하려면 controllable & observable (= minimal realization) 이어야 함.`, "tip")}

<h2>5. Discrete-time 버전</h2>
${defCard("Discrete BIBO stable", `
- $\\sum_{k=0}^\\infty |h[k]| < \\infty$<br>
- 또는 모든 pole이 <strong>단위원 내부</strong>: $|p_i| < 1$
`)}

<h2>6. 체크</h2>
${mcQuiz(
  "$\\hat{g}(s) = \\frac{1}{s^2 + 2s + 5}$ 는 BIBO stable?",
  ["Yes", "No", "추가 정보 필요"],
  0,
  "Pole: $s = \\frac{-2 \\pm \\sqrt{4 - 20}}{2} = -1 \\pm 2j$. 실수부 −1 < 0 → LHP → BIBO stable."
)}

${mcQuiz(
  "$\\hat{g}(s) = \\frac{s}{s^2 + 1}$ 는 BIBO stable?",
  ["Yes", "No (pole이 허수축 위)", "Yes, 분자에 0 있어서"],
  1,
  "Pole: $s = \\pm j$. 실수부 0 → 허수축 위 → BIBO unstable. (sin 입력에 공진 가능.)"
)}

${mcQuiz(
  "Discrete-time 시스템의 pole이 $z = 0.5, -1.2$ 라면?",
  ["Stable, 둘 다 단위원 안에 있어 보이니까", "Unstable, $|-1.2| > 1$"],
  1,
  "Discrete은 unit circle이 기준. $|−1.2| = 1.2 > 1$ → unstable."
)}
`);
