registerPage("ch3-diagonal", "Diagonalization", () => `
<h1>Ch 3.4 — Diagonalization</h1>
<p class="lead">${tag("매년출제", "must")} 족보 2013 #2(b) — eigenvalue 구한 다음 자연스럽게 따라옴.</p>

<h2>1. 핵심 아이디어</h2>
${defCard("Diagonalization", `
$A$가 $n$개의 선형독립인 eigenvector를 가지면, eigenvector들을 열로 모은 행렬 $P$로:
$$\\boxed{P^{-1} A P = D}$$
여기서 $D = \\text{diag}(\\lambda_1, \\lambda_2, \\ldots, \\lambda_n)$ 는 eigenvalue를 대각으로 갖는 대각행렬.
`)}

${note(`<strong>왜 중요?</strong> 대각행렬은 거듭제곱·지수함수 계산이 압도적으로 쉬워:<br>
$D^k = \\text{diag}(\\lambda_1^k, \\ldots, \\lambda_n^k)$<br>
$e^{Dt} = \\text{diag}(e^{\\lambda_1 t}, \\ldots, e^{\\lambda_n t})$<br>
그래서 $e^{At} = P e^{Dt} P^{-1}$ 로 한 큐에 풀림. 이게 다음 페이지의 핵심.`, "tip")}

${collapse("직관: \"제대로 된 각도에서 보기\"", `
복잡하게 얽힌 시스템도 <strong>적절한 좌표축(= eigenvector)</strong>으로 바꿔서 보면 단순.<br><br>
비유: 회전한 직사각형이 표준 좌표에선 복잡한 부등식이지만, 직사각형의 변과 평행한 좌표축으로 바꾸면 $|x'| \\le a, |y'| \\le b$ 로 단순.<br><br>
$P$ 가 좌표 변환 행렬, $D$ 가 그 새 좌표에서 본 시스템. <br>
"문제가 어렵게 보이는 건 좌표를 잘못 잡아서일 수 있다" — 이게 선형대수의 큰 통찰.
`)}

${collapse("물리적 예시: 진동의 모드 분해", `
복잡한 진동도 <strong>모드별로 분해</strong>하면 단순. 각 모드는 독립적인 단순 진동.<br><br>
예: 기타 줄을 튕기면 — 기본음 + 2배음 + 3배음 + ... 이 동시에 울림. 각 음이 하나의 eigenvector(모드 형상), 주파수가 eigenvalue. <br><br>
$P$ = 모드 형상들의 행렬, $D$ = 각 모드의 주파수. 복잡한 진동을 모드별로 분리해서 분석한 뒤 다시 합침.
`)}

<h2>2. 절차</h2>
<ol>
  <li>Eigenvalue $\\lambda_1, \\ldots, \\lambda_n$ 찾기</li>
  <li>각 $\\lambda_i$에 대한 eigenvector $\\mathbf{v}_i$ 찾기</li>
  <li>$P = [\\mathbf{v}_1 \\;|\\; \\mathbf{v}_2 \\;|\\; \\cdots \\;|\\; \\mathbf{v}_n]$ — 열로 쌓기</li>
  <li>$D = P^{-1} A P$ 또는 곧바로 $D = \\text{diag}(\\lambda_1, \\ldots, \\lambda_n)$</li>
</ol>

${note(`주의: 강의자료/족보에서 보면 <strong>$PAP^{-1}$</strong>로 쓴 경우가 있어 (Chen 교재의 표기). 그 경우 $P$의 행이 left eigenvector거나, 단순히 표기 약속이 다름. 어느 쪽이든 결과 행렬 구조는 같음.`, "warn")}

<h2>3. 워크스루: 족보 2013 #2(b)</h2>
${walkthrough("$A = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}$ 를 대각화하는 $P$ 찾기", [
  {
    title: "이전 결과 가져오기",
    body: `이전 페이지에서 구함:<br>
    $\\lambda_1 = -1, \\mathbf{v}_1 = \\begin{bmatrix}2\\\\1\\end{bmatrix}$<br>
    $\\lambda_2 = -2, \\mathbf{v}_2 = \\begin{bmatrix}1\\\\1\\end{bmatrix}$`
  },
  {
    title: "$P$ 만들기",
    body: `Eigenvector를 열로:
    $$P = \\begin{bmatrix}2 & 1 \\\\ 1 & 1\\end{bmatrix}$$`
  },
  {
    title: "$P^{-1}$ 계산",
    body: `$2 \\times 2$ 역행렬 공식: $\\begin{bmatrix}a & b \\\\ c & d\\end{bmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{bmatrix}d & -b \\\\ -c & a\\end{bmatrix}$<br>
    $\\det P = 2 \\cdot 1 - 1 \\cdot 1 = 1$<br>
    $$P^{-1} = \\begin{bmatrix}1 & -1 \\\\ -1 & 2\\end{bmatrix}$$`
  },
  {
    title: "확인: $P^{-1} A P = D$",
    body: `$AP = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}\\begin{bmatrix}2 & 1 \\\\ 1 & 1\\end{bmatrix} = \\begin{bmatrix}-2 & -2 \\\\ -1 & -2\\end{bmatrix}$<br>
    $P^{-1}(AP) = \\begin{bmatrix}1 & -1 \\\\ -1 & 2\\end{bmatrix}\\begin{bmatrix}-2 & -2 \\\\ -1 & -2\\end{bmatrix} = \\begin{bmatrix}-1 & 0 \\\\ 0 & -2\\end{bmatrix} = D$ ✓`
  }
])}

<h2>4. 대각화 가능 조건</h2>
${defCard("Diagonalizable ↔ ?", `
$n \\times n$ 행렬 $A$가 대각화 가능 ⇔ <strong>$A$가 $n$개의 선형독립 eigenvector를 가진다</strong>.<br><br>
충분조건들:
<ul>
  <li>$n$개의 서로 다른(distinct) eigenvalue를 가지면 → 무조건 대각화 가능</li>
  <li>대칭행렬 ($A = A^T$) → 무조건 대각화 가능 (실수 직교행렬 $P$로)</li>
</ul>
중복된 eigenvalue가 있으면 → eigenvector 개수가 모자랄 수 있음 → <strong>Jordan form</strong> 써야 함.
`)}

${mcQuiz(
  "$A = \\begin{bmatrix}1 & 1 \\\\ 0 & 1\\end{bmatrix}$ 는 대각화 가능한가?",
  ["가능, 항등행렬과 닮았으니까", "불가능. eigenvalue 1이 중복인데 독립 eigenvector가 1개뿐", "가능. 모든 $2 \\times 2$는 대각화됨"],
  1,
  "$\\lambda = 1$ 중복근. $(A - I)\\mathbf{v} = \\mathbf{0}$ 풀면 $\\mathbf{v} = [1, 0]^T$ 하나만 → 독립 eigenvector 1개 → 대각화 불가. (Jordan form 필요)"
)}

${mcQuiz(
  "대각화 $P^{-1} A P = D$ 가 성립할 때, $A^{10}$ 은?",
  ["$P D^{10} P^{-1}$", "$P^{10} D P^{-1}$", "$D^{10}$", "$P^{-1} D^{10} P$"],
  0,
  "$A = PDP^{-1}$ 이므로 $A^k = PD^kP^{-1}$. 중간의 $P^{-1}P$가 다 상쇄됨."
)}

${note(`<strong>다음 페이지 예고:</strong> 이렇게 $P, D$ 가 손에 들어오면 <strong>$e^{At}$</strong> 가 단순 곱셈으로 풀려. 그게 시험의 핵심.`, "tip")}
`);
