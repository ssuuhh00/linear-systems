registerPage("ch4-solution", "상태방정식 풀이", () => `
<h1>Ch 4 — 상태방정식의 해 (State Equation Solution)</h1>
<p class="lead">${tag("매년출제", "must")} 족보 2013 #2 (별도), 2015 #4(b), #4(d). 풀이 공식 + 정상상태(steady-state) 응답.</p>

<h2>1. 일반해 공식</h2>
${defCard("LTI 상태방정식의 해", `
$\\dot{\\mathbf{x}} = A\\mathbf{x} + B\\mathbf{u}$, $\\mathbf{x}(0) = \\mathbf{x}_0$ 의 해는:
$$\\boxed{\\mathbf{x}(t) = e^{At} \\mathbf{x}_0 + \\int_0^t e^{A(t-\\tau)} B \\mathbf{u}(\\tau) d\\tau}$$
출력:
$$\\mathbf{y}(t) = C\\mathbf{x}(t) + D\\mathbf{u}(t)$$
`)}

${note(`<strong>두 부분:</strong><br>
• <strong>Zero-input response</strong> $e^{At}\\mathbf{x}_0$ — 초기조건만에 의한 응답<br>
• <strong>Zero-state response</strong> $\\int e^{A(t-\\tau)} B \\mathbf{u} d\\tau$ — 입력만에 의한 응답<br>
이 둘이 합쳐지는 게 LTI 시스템의 핵심 (linearity).`)}

${collapse("실생활 비유: 그네 타기", `
<strong>Zero-input:</strong> 그네에 누가 미리 앉혀놓고 손 뗐을 때 → 마찰로 천천히 멈춤. 초기조건 (높이, 속도)만으로 결정됨.<br><br>
<strong>Zero-state:</strong> 정지한 그네를 부모가 계속 밀어줌 → 입력 $u(t)$ (미는 힘)만에 의한 응답.<br><br>
<strong>실제:</strong> 둘 다 동시에 → 그네가 어떻게 움직이는지 = 두 응답의 합.<br><br>
<strong>이게 linearity의 의미:</strong> 입력과 초기조건의 효과가 깔끔히 분리돼서 더해짐. 비선형 시스템에선 이게 안 됨.
`)}

${collapse("적분의 의미: 입력의 \"누적 효과\"", `
$\\int_0^t e^{A(t-\\tau)} B \\mathbf{u}(\\tau) d\\tau$ 를 풀어보면:<br><br>
$\\tau$ 시점의 입력 $\\mathbf{u}(\\tau)$ 가 $B$ 를 통해 시스템에 들어와 → $t-\\tau$ 시간 동안 $e^{A(t-\\tau)}$ 만큼 진화 → 현재 시점($t$)에 영향.<br><br>
모든 과거 시점의 영향을 다 합한 게 적분. <strong>이게 합성곱(convolution)과 같은 구조.</strong> 사실 출력 $y = C\\mathbf{x} + D\\mathbf{u}$ 를 풀면 정확히 $y = (g * u)$ 형태 — 그래서 Ch 2 합성곱이 Ch 4와 직결됨.
`)}

<h2>2. 워크스루: 족보 2013 #2 — 직접 풀이</h2>
${walkthrough("$\\dot{\\mathbf{x}} = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}0\\\\1\\end{bmatrix}u$, $y = [0, 1]\\mathbf{x}$, $\\mathbf{x}(0)=[1,0]^T$, $u(t)=1$", [
  {
    title: "$e^{At}$ 가져오기",
    body: `Cayley-Hamilton 페이지에서 이미 구함:<br>
    $$e^{At} = \\begin{bmatrix}2e^{-t} - e^{-2t} & -2e^{-t} + 2e^{-2t} \\\\ e^{-t} - e^{-2t} & -e^{-t} + 2e^{-2t}\\end{bmatrix}$$`
  },
  {
    title: "Zero-input 부분",
    body: `$e^{At}\\mathbf{x}_0 = e^{At}\\begin{bmatrix}1\\\\0\\end{bmatrix} = \\begin{bmatrix}2e^{-t} - e^{-2t} \\\\ e^{-t} - e^{-2t}\\end{bmatrix}$`
  },
  {
    title: "Zero-state 부분",
    body: `$u(t) = 1$ 이므로 $B u(\\tau) = \\begin{bmatrix}0\\\\1\\end{bmatrix}$.<br>
    $e^{A(t-\\tau)} B = $ ($e^{At}$의 둘째 열에 $\\tau$ 시프트):<br>
    $\\begin{bmatrix} -2e^{-(t-\\tau)} + 2e^{-2(t-\\tau)} \\\\ -e^{-(t-\\tau)} + 2e^{-2(t-\\tau)} \\end{bmatrix}$<br><br>
    $\\int_0^t (\\text{둘째 항}) d\\tau$ 만 필요 (왜냐하면 $y = [0,1]\\mathbf{x}$):<br>
    $\\int_0^t (-e^{-(t-\\tau)} + 2e^{-2(t-\\tau)}) d\\tau$<br>
    $= [-e^{-(t-\\tau)} \\cdot 1 + 2 e^{-2(t-\\tau)} \\cdot \\frac{1}{2}]_0^t$<br>
    Wait, 다시: $\\frac{d}{d\\tau}e^{-(t-\\tau)} = e^{-(t-\\tau)}$ 이므로 $\\int e^{-(t-\\tau)} d\\tau = e^{-(t-\\tau)}$.<br>
    $\\int_0^t e^{-(t-\\tau)} d\\tau = 1 - e^{-t}$<br>
    $\\int_0^t 2 e^{-2(t-\\tau)} d\\tau = 1 - e^{-2t}$<br>
    합: $-(1 - e^{-t}) + (1 - e^{-2t}) = e^{-t} - e^{-2t}$`
  },
  {
    title: "총 $y(t)$",
    body: `$y(t) = $ (zero-input 둘째성분) + (zero-state 둘째성분)<br>
    $= (e^{-t} - e^{-2t}) + (e^{-t} - e^{-2t})$<br>
    $$\\boxed{y(t) = 2e^{-t} - 2e^{-2t}}$$<br>
    검증: $y(0) = 2 - 2 = 0$. $\\mathbf{x}(0) = [1, 0]^T$ 이고 $y = x_2 = 0$ ✓`
  }
])}

<h2>3. Steady-state Response (정상상태 응답)</h2>
${defCard("Steady-state란?", `
시간이 충분히 흐른 뒤 ($t \\to \\infty$) 시스템이 보이는 응답. <strong>안정한 시스템</strong>에 한해 의미가 있음 (불안정하면 발산).
`)}

<h3>유형 1: Step 입력에 대한 steady-state</h3>
${note(`안정한 LTI 시스템에 $u(t) = 1$ (step) 입력 시:
$$y_{ss} = \\hat{g}(0) = -CA^{-1}B + D$$
또는 그냥 transfer function의 $s = 0$ 값 대입.`, "tip")}

<h3>유형 2: Sinusoidal 입력에 대한 steady-state (족보 2015 #4(d))</h3>
${defCard("주파수 응답", `
안정한 LTI 시스템에 $u(t) = \\sin(\\omega t)$ 입력 시:
$$y_{ss}(t) = |\\hat{g}(j\\omega)| \\sin(\\omega t + \\angle \\hat{g}(j\\omega))$$
즉 같은 주파수의 사인파인데, <strong>크기는 $|\\hat{g}(j\\omega)|$ 만큼 증폭</strong>되고 <strong>위상은 $\\angle \\hat{g}(j\\omega)$ 만큼 이동</strong>.
`)}

${walkthrough("족보 2015 #4(d): $G(s) = \\frac{1}{s^2+3s+2}$ 에 $u(t) = \\sin(2t)$ 입력", [
  {
    title: "$\\omega = 2$ 대입",
    body: `$G(j2) = \\frac{1}{(j2)^2 + 3(j2) + 2} = \\frac{1}{-4 + 6j + 2} = \\frac{1}{-2 + 6j}$`
  },
  {
    title: "분모 정리",
    body: `$\\frac{1}{-2 + 6j} \\cdot \\frac{-2 - 6j}{-2 - 6j} = \\frac{-2 - 6j}{4 + 36} = \\frac{-2 - 6j}{40} = -\\frac{1}{20} - \\frac{3}{20}j$`
  },
  {
    title: "Magnitude & phase",
    body: `$|G(j2)| = \\sqrt{(-1/20)^2 + (-3/20)^2} = \\frac{1}{20}\\sqrt{1 + 9} = \\frac{\\sqrt{10}}{20} = \\frac{1}{2\\sqrt{10}}$<br>
    $\\angle G(j2) = \\arctan(-3/20 \\div -1/20) = \\arctan(3)$, 단 분자/분모 모두 음 → 3사분면 → $\\arctan(3) - \\pi$ rad ($\\approx -1.892$ rad, 즉 $-108.4°$)`
  },
  {
    title: "최종",
    body: `$$\\boxed{y_{ss}(t) = \\frac{1}{2\\sqrt{10}} \\sin(2t - 108.4°)}$$<br>
    족보 2013 #4 도 같은 형식: $G(s)$ 를 $j\\omega$로 평가해 magnitude/phase 구하면 끝.`
  }
])}

<h2>4. BIBO 안정성 미리 보기 (Ch 5 연결)</h2>
${note(`<strong>주의:</strong> Steady-state 응답은 시스템이 <em>안정</em>할 때만 의미 있음. 불안정하면 천천히/빠르게 발산. → 다음 챕터 BIBO stability에서 확인하는 법 배움.`, "warn")}

<h2>체크</h2>
${mcQuiz(
  "안정한 시스템 $G(s)$에 unit step 입력 시 steady-state 출력은?",
  ["$G(\\infty)$", "$G(0)$", "$\\lim_{s\\to 0} sG(s)$", "$G$의 pole의 합"],
  1,
  "Final value theorem으로 $\\lim_{t \\to \\infty} y(t) = \\lim_{s \\to 0} s \\cdot \\frac{1}{s} G(s) = G(0)$. step 입력의 라플라스가 $1/s$ 이라."
)}

${mcQuiz(
  "$\\dot{\\mathbf{x}} = A\\mathbf{x}$ ($\\mathbf{u} = 0$) 의 해는?",
  ["$\\mathbf{x}(t) = A\\mathbf{x}_0 t$", "$\\mathbf{x}(t) = e^{At}\\mathbf{x}_0$", "$\\mathbf{x}(t) = \\mathbf{x}_0 e^{At}$", "$\\mathbf{x}(t) = (sI-A)^{-1}\\mathbf{x}_0$"],
  1,
  "표준 zero-input 응답. 행렬 곱 순서 주의 — 벡터가 오른쪽."
)}
`);
