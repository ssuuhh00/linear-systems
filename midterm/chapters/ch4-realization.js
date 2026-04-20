registerPage("ch4-realization", "State-Space Realization", () => `
<h1>Ch 4 — State-Space Realization</h1>
<p class="lead">${tag("매년출제", "must")} 족보 2013 #3, 2015 #4(a), 과제 4.9, 4.11, 4.14. 전달함수 → 상태공간 변환.</p>

<h2>1. 무엇을 하는 건가?</h2>
${defCard("Realization 문제", `
주어진 전달함수 $\\hat{g}(s)$ 또는 행렬 $\\hat{G}(s)$ 에 대해, 다음을 만족하는 $(A, B, C, D)$ 찾기:
$$\\dot{\\mathbf{x}} = A\\mathbf{x} + B\\mathbf{u}, \\quad \\mathbf{y} = C\\mathbf{x} + D\\mathbf{u}$$
$$\\hat{G}(s) = C(sI - A)^{-1} B + D$$
`)}

${note(`<strong>핵심:</strong> 전달함수는 입출력만 보는 외부 모델, 상태공간은 내부까지 보는 모델. 둘이 동치인 변환을 찾는 것.`)}

${collapse("실생활 비유: 자동차 블랙박스 vs 엔진 내부", `
<strong>전달함수 ($\\hat{g}(s)$):</strong> 액셀러레이터 누르면 → 속도 변화. 입출력 관계만 봄.<br>
<strong>상태공간 ($A, B, C, D$):</strong> 액셀 → 연료분사 → 연소 → 토크 → 바퀴회전 → 속도. 내부 상태(연료량, RPM, 토크)까지 모두 추적.<br><br>
같은 자동차지만 두 가지 표현. 외부에서만 보면 같은 시스템, 내부 구조는 여러가지가 가능 → <strong>realization은 유일하지 않다!</strong>
`)}

${collapse("왜 \"실현(realization)\"이라 부르나?", `
전달함수는 추상적인 식. 상태공간 $(A, B, C, D)$ 는 그 식을 <em>물리적으로 실현</em>한 회로/시스템. <br>
같은 전달함수를 만들 수 있는 회로가 여러 개 있을 수 있는 것처럼, realization도 무수히 많음.<br><br>
- Controllable canonical: "입력에서 보기 좋게"<br>
- Observable canonical: "출력에서 보기 좋게"<br>
- Modal form: "각 mode가 분리되게" (대각화된 형태)<br>
같은 시스템의 다른 \"각도\".
`)}

<h2>2. SISO Controllable Canonical Form (가장 자주 출제)</h2>
${defCard("Strictly proper SISO 전달함수", `
$$\\hat{g}(s) = \\frac{b_{n-1} s^{n-1} + \\cdots + b_1 s + b_0}{s^n + a_{n-1} s^{n-1} + \\cdots + a_1 s + a_0}$$
의 controllable canonical form realization:
$$A = \\begin{bmatrix} 0 & 1 & 0 & \\cdots & 0 \\\\ 0 & 0 & 1 & \\cdots & 0 \\\\ \\vdots & & & \\ddots & \\vdots \\\\ 0 & 0 & 0 & \\cdots & 1 \\\\ -a_0 & -a_1 & -a_2 & \\cdots & -a_{n-1} \\end{bmatrix}, \\quad B = \\begin{bmatrix} 0 \\\\ 0 \\\\ \\vdots \\\\ 0 \\\\ 1 \\end{bmatrix}$$
$$C = \\begin{bmatrix} b_0 & b_1 & \\cdots & b_{n-1} \\end{bmatrix}, \\quad D = 0$$
`)}

${note(`<strong>외우는 법:</strong> $A$는 분모 다항식 계수를 마지막 행에 부호 바꿔서, 위쪽은 단위행렬 시프트. $B$는 마지막만 1. $C$는 분자 계수.`, "tip")}

<h2>3. 워크스루: 족보 2015 #4(a) — $G(s) = \\frac{1}{s^2 + 3s + 2}$</h2>
${walkthrough("간단한 SISO realization", [
  {
    title: "분모/분자 계수 추출",
    body: `분모: $s^2 + 3s + 2$ → $a_0 = 2, a_1 = 3$<br>
    분자: $1$ → $b_0 = 1, b_1 = 0$`
  },
  {
    title: "공식 대입",
    body: `$$A = \\begin{bmatrix} 0 & 1 \\\\ -2 & -3 \\end{bmatrix}, \\quad B = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$$
    $$C = \\begin{bmatrix} 1 & 0 \\end{bmatrix}, \\quad D = 0$$`
  },
  {
    title: "검증",
    body: `$C(sI - A)^{-1} B$를 계산해서 $G(s)$가 나오는지 확인:<br>
    $sI - A = \\begin{bmatrix} s & -1 \\\\ 2 & s+3 \\end{bmatrix}$, $\\det = s(s+3) + 2 = s^2 + 3s + 2$ ✓<br>
    $(sI - A)^{-1} = \\frac{1}{s^2+3s+2}\\begin{bmatrix} s+3 & 1 \\\\ -2 & s \\end{bmatrix}$<br>
    $(sI-A)^{-1}B = \\frac{1}{s^2+3s+2}\\begin{bmatrix} 1 \\\\ s \\end{bmatrix}$<br>
    $C(sI-A)^{-1}B = \\frac{1}{s^2+3s+2} \\cdot 1 = G(s)$ ✓`
  }
])}

<h2>4. 워크스루 #2: 족보 2013 #3 — 벡터 출력 케이스</h2>
${walkthrough("$\\hat{G}(s) = \\begin{bmatrix} \\frac{1}{s+1} \\\\ \\frac{1}{(s+1)(s+2)} \\end{bmatrix}$ realization", [
  {
    title: "분석",
    body: `2-출력, 1-입력 시스템. 공통분모 $(s+1)(s+2) = s^2 + 3s + 2$ 로 정리:<br>
    $$\\hat{G}(s) = \\frac{1}{s^2 + 3s + 2} \\begin{bmatrix} s+2 \\\\ 1 \\end{bmatrix}$$<br>
    분자는 행렬 $N(s) = \\begin{bmatrix} s + 2 \\\\ 1 \\end{bmatrix}$.`
  },
  {
    title: "분모는 동일하니 controllable form 채택",
    body: `$d(s) = s^2 + 3s + 2$, $a_0 = 2, a_1 = 3$, $n = 2$.<br>
    $$A = \\begin{bmatrix} 0 & 1 \\\\ -2 & -3 \\end{bmatrix}, \\quad B = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$$`
  },
  {
    title: "$C$ 행렬",
    body: `각 출력의 분자 → $C$의 행:<br>
    1번째 분자: $s + 2$ → $b_0 = 2, b_1 = 1$ → $[2, 1]$<br>
    2번째 분자: $1$ → $b_0 = 1, b_1 = 0$ → $[1, 0]$<br>
    $$C = \\begin{bmatrix} 2 & 1 \\\\ 1 & 0 \\end{bmatrix}, \\quad D = \\begin{bmatrix}0\\\\0\\end{bmatrix}$$`
  },
  {
    title: "검증",
    body: `$C(sI-A)^{-1}B = \\frac{1}{s^2+3s+2} \\begin{bmatrix} 2 & 1 \\\\ 1 & 0 \\end{bmatrix} \\begin{bmatrix} 1 \\\\ s \\end{bmatrix} = \\frac{1}{s^2+3s+2}\\begin{bmatrix} 2 + s \\\\ 1 \\end{bmatrix}$ ✓`
  }
])}

<h2>5. Proper (not strictly) 처리</h2>
${note(`<strong>주의:</strong> 분자 차수 = 분모 차수면 (proper but not strictly proper) → $D \\neq 0$.<br>
방법: 분자를 분모로 나눠서 $\\hat{g}(s) = D + \\frac{\\text{strictly proper}}{\\text{denom}}$ 로 분리. $D$는 $\\lim_{s \\to \\infty} \\hat{g}(s)$.`, "warn")}

<h2>6. 다중입출력 (MIMO) — 과제 4.11, 4.14</h2>
${defCard("Observable Canonical Form", `
MIMO에서는 controllable form 대신 <strong>observable canonical form</strong> 자주 사용:
$$A = \\begin{bmatrix} -\\alpha_1 I_q & I_q & 0 & \\cdots & 0 \\\\ -\\alpha_2 I_q & 0 & I_q & \\cdots & 0 \\\\ \\vdots & & & \\ddots & \\vdots \\\\ -\\alpha_r I_q & 0 & 0 & \\cdots & 0 \\end{bmatrix}, \\quad B = \\begin{bmatrix} N_1 \\\\ N_2 \\\\ \\vdots \\\\ N_r \\end{bmatrix}, \\quad C = [I_q, 0, \\ldots, 0]$$
$N_i$ 는 분자행렬을 분모로 펼친 계수 행렬.
`)}

${note(`MIMO realization은 시간 많이 잡아먹음. 시험에 나오면 SISO처럼 단순한 형태일 가능성이 높음. 주로 $1\\times 2$ 또는 $2\\times 1$ 정도.`)}

<h2>체크</h2>
${mcQuiz(
  "$G(s) = \\frac{s+1}{s^2 + 4s + 3}$ 의 controllable canonical form 의 $A$ 는?",
  ["$\\begin{bmatrix}0&1\\\\-3&-4\\end{bmatrix}$", "$\\begin{bmatrix}0&1\\\\-4&-3\\end{bmatrix}$", "$\\begin{bmatrix}-3&-4\\\\1&0\\end{bmatrix}$"],
  0,
  "$a_0 = 3, a_1 = 4$. 마지막 행은 $[-a_0, -a_1] = [-3, -4]$."
)}

${mcQuiz(
  "위 문제에서 $C$ 는?",
  ["$[1, 0]$", "$[1, 1]$", "$[0, 1]$", "$[3, 4]$"],
  1,
  "분자 $s+1$: $b_0 = 1, b_1 = 1$ → $C = [b_0, b_1] = [1, 1]$."
)}
`);
