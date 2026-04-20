registerPage("ch3-cayley", "Cayley-Hamilton & e^At", () => `
<h1>Ch 3.5 — Cayley-Hamilton & $e^{At}$</h1>
<p class="lead">${tag("100% 출제", "must")} 족보 2013, 2015, 과제 모두에 등장. <strong>이 페이지가 중간고사의 핵심</strong>.</p>

<h2>1. Matrix Exponential $e^{At}$ 가 뭔가?</h2>
${defCard("$e^{At}$ 정의", `
스칼라 지수함수의 Taylor 전개를 행렬로 확장:
$$e^{At} = I + At + \\frac{(At)^2}{2!} + \\frac{(At)^3}{3!} + \\cdots = \\sum_{k=0}^{\\infty} \\frac{(At)^k}{k!}$$
`)}

${note(`<strong>왜 중요?</strong> 상태방정식 $\\dot{\\mathbf{x}} = A\\mathbf{x}$ 의 해가 정확히<br>
$$\\mathbf{x}(t) = e^{At}\\mathbf{x}(0)$$<br>
이라서. 시스템 응답 = $e^{At}$ 계산. 중간고사 한 문제는 무조건 이거.`, "tip")}

${collapse("스칼라와 비교: 왜 $e^{At}$ 라는 형태인가?", `
스칼라 미분방정식 $\\dot{x} = ax$ 의 해는 $x(t) = e^{at} x(0)$. <br>
이걸 행렬 버전으로 그대로 일반화한 게 $\\mathbf{x}(t) = e^{At}\\mathbf{x}(0)$.<br><br>
스칼라 케이스에서:<br>
- $a < 0$: $x(t) \\to 0$ (감쇠)<br>
- $a > 0$: $x(t) \\to \\infty$ (발산)<br>
- $a = 0$: $x(t) = x(0)$ (정지)<br><br>
행렬 케이스에선 $a$ 자리에 eigenvalue $\\lambda_i$. 각 모드가 $e^{\\lambda_i t}$로 진화. → <strong>eigenvalue가 시스템의 운명을 결정</strong>.
`)}

${collapse("실생활 비유: 복리 이자도 $e^{At}$", `
은행 이자 $r$ 로 1년 후 잔액 = $(1 + r)$ 배. <br>
연속 복리 (continuous compounding) 로 시간 $t$ 후 = $e^{rt}$ 배.<br><br>
이게 1차원 동역학. 만약 여러 계좌가 서로 영향을 준다면 → $e^{At}$ 행렬. <br>
예: 외환 거래 — USD/EUR/JPY 잔액이 환율에 따라 서로 변환되는 시스템.
`)}

<h2>2. 계산 방법 3가지</h2>
<table>
  <tr><th>방법</th><th>장점</th><th>단점</th></tr>
  <tr><td>1. Diagonalization 이용</td><td>대각화 되면 한 줄</td><td>중복 eigenvalue면 막힘</td></tr>
  <tr><td>2. <strong>Cayley-Hamilton</strong></td><td>모든 경우 OK, 시험 정답 방법</td><td>설명이 좀 김</td></tr>
  <tr><td>3. Laplace ($\\mathcal{L}^{-1}\\{(sI-A)^{-1}\\}$)</td><td>직관적</td><td>역행렬 + 부분분수 → 노가다</td></tr>
</table>

<h2>3. 방법 1: Diagonalization으로</h2>
${defCard("$A = PDP^{-1}$ 이면", `
$$\\boxed{e^{At} = P e^{Dt} P^{-1}, \\qquad e^{Dt} = \\text{diag}(e^{\\lambda_1 t}, \\ldots, e^{\\lambda_n t})}$$
`)}

${collapse("이전 예제 이어서: $A = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}$, $\\lambda = -1, -2$", `
$P = \\begin{bmatrix}2 & 1 \\\\ 1 & 1\\end{bmatrix}$, $P^{-1} = \\begin{bmatrix}1 & -1 \\\\ -1 & 2\\end{bmatrix}$, $D = \\text{diag}(-1, -2)$.
<br><br>
$e^{Dt} = \\begin{bmatrix}e^{-t} & 0 \\\\ 0 & e^{-2t}\\end{bmatrix}$
<br><br>
$e^{At} = P e^{Dt} P^{-1} = \\begin{bmatrix}2 & 1 \\\\ 1 & 1\\end{bmatrix}\\begin{bmatrix}e^{-t} & 0 \\\\ 0 & e^{-2t}\\end{bmatrix}\\begin{bmatrix}1 & -1 \\\\ -1 & 2\\end{bmatrix}$
<br><br>
중간 단계: $\\begin{bmatrix}2e^{-t} & e^{-2t} \\\\ e^{-t} & e^{-2t}\\end{bmatrix}\\begin{bmatrix}1 & -1 \\\\ -1 & 2\\end{bmatrix}$
<br><br>
$$e^{At} = \\begin{bmatrix}2e^{-t} - e^{-2t} & -2e^{-t} + 2e^{-2t} \\\\ e^{-t} - e^{-2t} & -e^{-t} + 2e^{-2t}\\end{bmatrix}$$
`)}

<h2>4. 방법 2: Cayley-Hamilton ⭐</h2>
${defCard("Cayley-Hamilton Theorem", `
모든 정사각 행렬은 자기 자신의 characteristic polynomial을 만족한다.<br>
$\\Delta(\\lambda) = \\lambda^n + a_{n-1}\\lambda^{n-1} + \\cdots + a_0$ 이면:
$$\\boxed{\\Delta(A) = A^n + a_{n-1} A^{n-1} + \\cdots + a_0 I = 0}$$
`)}

${note(`<strong>의미:</strong> $A^n$ 은 더 낮은 차수 $A^{n-1}, \\ldots, I$ 의 선형결합으로 표현 가능. <br>
→ $A$의 모든 다항식은 $n-1$ 차 다항식으로 줄어듦.<br>
→ <strong>$e^{At}$ 도 $n-1$ 차 다항식</strong>으로 표현 가능!`, "tip")}

<h3>핵심 공식 (외워!)</h3>
$n \\times n$ 행렬 $A$에 대해:
$$\\boxed{e^{At} = \\beta_0(t) I + \\beta_1(t) A + \\beta_2(t) A^2 + \\cdots + \\beta_{n-1}(t) A^{n-1}}$$

$\\beta_i(t)$ 들은 다음 연립방정식 풀어 구함 (각 eigenvalue $\\lambda_i$ 마다 1식):
$$e^{\\lambda_i t} = \\beta_0(t) + \\beta_1(t) \\lambda_i + \\beta_2(t) \\lambda_i^2 + \\cdots + \\beta_{n-1}(t) \\lambda_i^{n-1}$$

${note(`<strong>중복 eigenvalue가 있으면?</strong> 그 식의 양변을 $\\lambda$로 미분해서 추가 식을 만들어. 예: $\\lambda_1$이 중근이면<br>
- 식1: $e^{\\lambda_1 t} = \\beta_0 + \\beta_1 \\lambda_1 + \\beta_2 \\lambda_1^2 + \\cdots$<br>
- 식2: $t e^{\\lambda_1 t} = \\beta_1 + 2\\beta_2 \\lambda_1 + 3\\beta_3 \\lambda_1^2 + \\cdots$ (1차 미분)`, "warn")}

<h2>5. 워크스루: 족보 2013 #2(c) — Cayley-Hamilton으로 $e^{At}$</h2>
${walkthrough("$A = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}$, eigenvalue $-1, -2$ 사용", [
  {
    title: "공식 형태 적기",
    body: `$n = 2$ 이므로:
    $$e^{At} = \\beta_0(t) I + \\beta_1(t) A$$
    미지수 $\\beta_0(t), \\beta_1(t)$ 두 개.`
  },
  {
    title: "각 eigenvalue로 식 세우기",
    body: `$\\lambda_1 = -1$: $\\quad e^{-t} = \\beta_0 + \\beta_1 (-1) = \\beta_0 - \\beta_1$<br>
    $\\lambda_2 = -2$: $\\quad e^{-2t} = \\beta_0 + \\beta_1 (-2) = \\beta_0 - 2\\beta_1$`
  },
  {
    title: "연립방정식 풀기",
    body: `식1 − 식2: $e^{-t} - e^{-2t} = \\beta_1$<br>
    그러므로 $\\boxed{\\beta_1(t) = e^{-t} - e^{-2t}}$<br><br>
    식1에 대입: $\\beta_0 = e^{-t} + \\beta_1 = e^{-t} + e^{-t} - e^{-2t}$<br>
    $\\boxed{\\beta_0(t) = 2e^{-t} - e^{-2t}}$`
  },
  {
    title: "$e^{At}$ 조립",
    body: `$e^{At} = \\beta_0 I + \\beta_1 A$<br>
    $= (2e^{-t} - e^{-2t})\\begin{bmatrix}1 & 0 \\\\ 0 & 1\\end{bmatrix} + (e^{-t} - e^{-2t})\\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}$<br><br>
    $(1,1)$: $(2e^{-t} - e^{-2t}) + 0 = 2e^{-t} - e^{-2t}$<br>
    $(1,2)$: $0 + (e^{-t} - e^{-2t})(-2) = -2e^{-t} + 2e^{-2t}$<br>
    $(2,1)$: $0 + (e^{-t} - e^{-2t})(1) = e^{-t} - e^{-2t}$<br>
    $(2,2)$: $(2e^{-t} - e^{-2t}) + (e^{-t} - e^{-2t})(-3) = 2e^{-t} - e^{-2t} - 3e^{-t} + 3e^{-2t} = -e^{-t} + 2e^{-2t}$<br><br>
    $$\\boxed{e^{At} = \\begin{bmatrix}2e^{-t} - e^{-2t} & -2e^{-t} + 2e^{-2t} \\\\ e^{-t} - e^{-2t} & -e^{-t} + 2e^{-2t}\\end{bmatrix}}$$<br>
    방법 1과 같은 답. ✓`
  },
  {
    title: "Sanity check (필수!)",
    body: `$t = 0$ 대입 → $I$ 가 나와야 함.<br>
    $e^0 = 1, e^0 = 1$ 대입:<br>
    $(1,1)$: $2 - 1 = 1$ ✓<br>
    $(1,2)$: $-2 + 2 = 0$ ✓<br>
    $(2,1)$: $1 - 1 = 0$ ✓<br>
    $(2,2)$: $-1 + 2 = 1$ ✓<br>
    답 확인 완료.`
  }
])}

<h2>6. 워크스루 #2: 족보 2015 #2(b) — 중복 eigenvalue 케이스</h2>
${walkthrough("$A = \\begin{bmatrix}1 & 0 & 1 \\\\ 0 & 1 & 1 \\\\ 1 & 1 & 1\\end{bmatrix}$ — 좀 어려움", [
  {
    title: "Eigenvalue 구하기",
    body: `$\\det(\\lambda I - A) = \\det\\begin{bmatrix}\\lambda - 1 & 0 & -1 \\\\ 0 & \\lambda - 1 & -1 \\\\ -1 & -1 & \\lambda - 1\\end{bmatrix}$<br>
    첫 행 cofactor expansion: $(\\lambda-1)[(\\lambda-1)^2 - 1] - 0 + (-1)[0 - (-(\\lambda-1))]$<br>
    $= (\\lambda-1)[(\\lambda-1)^2 - 1] - (\\lambda-1)$<br>
    $= (\\lambda-1)[(\\lambda-1)^2 - 2]$<br>
    $= (\\lambda-1)(\\lambda - 1 - \\sqrt 2)(\\lambda - 1 + \\sqrt 2)$<br><br>
    $$\\lambda_1 = 1, \\quad \\lambda_2 = 1 + \\sqrt 2, \\quad \\lambda_3 = 1 - \\sqrt 2$$
    세 개 다 distinct → 일반 공식 적용 가능.`
  },
  {
    title: "공식 세우기",
    body: `$n = 3$ 이므로 $e^{At} = \\beta_0 I + \\beta_1 A + \\beta_2 A^2$<br>
    각 eigenvalue로 식 3개:<br>
    $e^{\\lambda_i t} = \\beta_0 + \\beta_1 \\lambda_i + \\beta_2 \\lambda_i^2$<br><br>
    구체적으로:<br>
    (1): $e^{t} = \\beta_0 + \\beta_1 + \\beta_2$<br>
    (2): $e^{(1+\\sqrt 2)t} = \\beta_0 + \\beta_1 (1+\\sqrt 2) + \\beta_2 (1+\\sqrt 2)^2 = \\beta_0 + (1+\\sqrt 2)\\beta_1 + (3 + 2\\sqrt 2)\\beta_2$<br>
    (3): $e^{(1-\\sqrt 2)t} = \\beta_0 + (1-\\sqrt 2)\\beta_1 + (3 - 2\\sqrt 2)\\beta_2$`
  },
  {
    title: "연립방정식 풀기",
    body: `(2) − (3): $e^{(1+\\sqrt 2)t} - e^{(1-\\sqrt 2)t} = 2\\sqrt 2\\, \\beta_1 + 4\\sqrt 2\\, \\beta_2$<br>
    (2) + (3): $e^{(1+\\sqrt 2)t} + e^{(1-\\sqrt 2)t} = 2\\beta_0 + 2\\beta_1 + (6)\\beta_2$<br>
    이 식들과 (1)을 조합해서 $\\beta_0, \\beta_1, \\beta_2$ 풀면 됨. 노가다지만 절차는 같아.`
  },
  {
    title: "팁: 중복 eigenvalue 케이스",
    body: `만약 eigenvalue가 $\\lambda_1$ (중복) 과 $\\lambda_2$ 였다면:<br>
    (1): $e^{\\lambda_1 t} = \\beta_0 + \\beta_1 \\lambda_1 + \\beta_2 \\lambda_1^2$<br>
    (2 — (1)을 $\\lambda$로 미분): $t e^{\\lambda_1 t} = \\beta_1 + 2\\beta_2 \\lambda_1$<br>
    (3): $e^{\\lambda_2 t} = \\beta_0 + \\beta_1 \\lambda_2 + \\beta_2 \\lambda_2^2$<br>
    이렇게 미분으로 식 보충.`
  }
])}

<h2>7. 시험 직전 체크</h2>
${mcQuiz(
  "$2 \\times 2$ 행렬 $A$의 $e^{At}$를 Cayley-Hamilton으로 구할 때 형태는?",
  ["$\\beta_0(t) I$", "$\\beta_0(t) I + \\beta_1(t) A$", "$\\beta_0(t) I + \\beta_1(t) A + \\beta_2(t) A^2$", "$e^{\\lambda t} I$"],
  1,
  "$n = 2$ 이므로 $n-1 = 1$ 차까지. 즉 $\\beta_0 I + \\beta_1 A$. 미지수 2개라 eigenvalue 2개 식으로 풀림."
)}

${mcQuiz(
  "$e^{At}$ 의 sanity check는?",
  ["$e^{A \\cdot 0} = 0$", "$e^{A \\cdot 0} = I$", "$\\det(e^{At}) = 0$"],
  1,
  "$t = 0$ 에서 $e^{0} = I$. 항상 이걸로 검증해."
)}

${mcQuiz(
  "$A = \\begin{bmatrix}-1 & 0 \\\\ 0 & -3\\end{bmatrix}$ 일 때 $e^{At}$는?",
  ["$\\begin{bmatrix}e^{-t} & 0 \\\\ 0 & e^{-3t}\\end{bmatrix}$", "$\\begin{bmatrix}-e^{-t} & 0 \\\\ 0 & -e^{-3t}\\end{bmatrix}$", "$e^{-4t} I$"],
  0,
  "이미 대각이라 $e^{At} = \\text{diag}(e^{-t}, e^{-3t})$. 이런 거 나오면 1초 만에 풀어."
)}

${note(`<strong>시험장에서 시간 절약 팁</strong>:<br>
1. 행렬이 대각/삼각인지 먼저 확인 → 그러면 즉시 답<br>
2. $2 \\times 2$면 Cayley-Hamilton이 가장 빠름 (보통 5분 내)<br>
3. 마지막에 $t=0$ 으로 검증 — 1점이라도 더 챙김`, "tip")}
`);
