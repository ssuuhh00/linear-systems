registerPage("ch3-eigen", "Eigenvalue · Eigenvector", () => `
<h1>Ch 3.3 — Eigenvalue · Eigenvector</h1>
<p class="lead">${tag("매년출제", "must")} 족보 2013 #2(a), 2017 #1, 과제 3.14 모두 이거. 시스템의 "고유 모드" — 가장 중요한 개념.</p>

<h2>1. 정의</h2>
${defCard("Eigenvalue & Eigenvector", `
정사각 행렬 $A$ 에 대해, 영이 아닌 벡터 $\\mathbf{v}$ 와 스칼라 $\\lambda$가:
$$\\boxed{A\\mathbf{v} = \\lambda \\mathbf{v}}$$
를 만족하면 $\\lambda$ = eigenvalue, $\\mathbf{v}$ = (해당 $\\lambda$의) eigenvector.
`)}

${note(`<strong>직관:</strong> $A$를 곱해도 방향이 안 바뀌고, 그저 스칼라 $\\lambda$ 배 늘어나기만 하는 특별한 방향이 eigenvector. 그 늘어나는 비율이 eigenvalue.`)}

${note(`<strong>왜 시스템론에서 중요?</strong> $\\dot{\\mathbf{x}} = A\\mathbf{x}$의 해는 $\\mathbf{x}(t) = e^{At}\\mathbf{x}(0)$ 인데, eigenvalue가 $\\lambda$ 면 그 모드는 $e^{\\lambda t}$로 진화. <br>→ <strong>$\\text{Re}(\\lambda) < 0$ 이면 안정, $> 0$ 이면 발산</strong>. 이게 Ch 5 stability의 핵심.`, "tip")}

${collapse("실생활 예시: 인구 동역학 (Population Dynamics)", `
토끼와 여우가 같이 사는 생태계. 매달 토끼·여우 수가 다음 행렬로 진화:<br>
$\\begin{bmatrix}r_{n+1}\\\\f_{n+1}\\end{bmatrix} = \\begin{bmatrix}1.1 & -0.2 \\\\ 0.1 & 0.9\\end{bmatrix}\\begin{bmatrix}r_n\\\\f_n\\end{bmatrix}$<br><br>
이 행렬의 eigenvalue를 계산하면:<br>
- $\\lambda_1 \\approx 1.05$ → 천천히 증가하는 모드<br>
- $\\lambda_2 \\approx 0.95$ → 천천히 감소하는 모드<br><br>
시간이 지나면 큰 eigenvalue 모드가 살아남아서, 그 eigenvector 방향 비율로 안정됨. <strong>"장기적으로 토끼:여우 비율이 결정된다"</strong>는 게 eigenvector의 의미.
`)}

${collapse("물리적 예시: 스프링-질량 시스템", `
두 개의 질량이 스프링으로 연결됨. 운동방정식을 세우면:<br>
$M\\ddot{\\mathbf{x}} = -K\\mathbf{x}$<br><br>
$M^{-1}K$ 의 eigenvalue $\\omega^2$ → <strong>고유진동수</strong> (natural frequency)<br>
Eigenvector → <strong>모드 형상</strong> (mode shape, 두 질량이 같이 어떻게 움직이는지)<br><br>
- Eigenvector 1 (대칭 모드): 두 질량이 같은 방향으로 움직임 → 낮은 주파수<br>
- Eigenvector 2 (반대칭 모드): 두 질량이 반대로 움직임 → 높은 주파수<br><br>
<strong>이게 건물 내진설계, 자동차 진동 분석의 핵심.</strong>
`)}

${collapse("기하적 직관: 행렬은 무엇을 하는가?", `
행렬 $A$는 벡터를 다른 벡터로 바꾸는 "변환". <br><br>
$A = \\begin{bmatrix}2 & 0 \\\\ 0 & 3\\end{bmatrix}$ — x축 방향 2배, y축 방향 3배 늘림.<br>
- $\\mathbf{v} = [1, 0]^T$ (x축) → $A\\mathbf{v} = [2, 0]^T$ (방향 그대로, 크기 2배). <strong>Eigenvector! $\\lambda = 2$.</strong><br>
- $\\mathbf{v} = [0, 1]^T$ (y축) → $A\\mathbf{v} = [0, 3]^T$. <strong>Eigenvector! $\\lambda = 3$.</strong><br>
- $\\mathbf{v} = [1, 1]^T$ → $A\\mathbf{v} = [2, 3]^T$. 방향이 바뀜 → eigenvector 아님.<br><br>
<strong>요약:</strong> 변환 후 같은 직선 위에 머무는 방향이 eigenvector. 그 늘어나는 비율이 eigenvalue.
`)}

<h2>2. 어떻게 구하나?</h2>
${defCard("Characteristic Polynomial (특성다항식)", `
$$\\Delta(\\lambda) = \\det(\\lambda I - A) = 0$$
이 방정식의 근이 eigenvalue.<br>
주의: $\\det(A - \\lambda I)$ 라고 써도 부호만 다를 뿐 근은 같아.
`)}

<h3>풀이 절차</h3>
<ol>
  <li>$\\det(\\lambda I - A) = 0$ 을 전개해서 $\\lambda$에 대한 다항식 만들기</li>
  <li>그 다항식의 근 (= eigenvalues)</li>
  <li>각 $\\lambda_i$에 대해 $(\\lambda_i I - A)\\mathbf{v} = \\mathbf{0}$ 풀어서 eigenvector 찾기</li>
</ol>

<h2>3. 워크스루: 족보 2013 #2(a)</h2>
${walkthrough("$A = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}$ 의 eigenvalue/vector", [
  {
    title: "Characteristic polynomial 세우기",
    body: `$\\lambda I - A = \\begin{bmatrix}\\lambda & 2 \\\\ -1 & \\lambda + 3\\end{bmatrix}$
    <br>$\\det = \\lambda(\\lambda+3) - 2(-1)(-1)$ ... 잠깐, $-1 \\cdot 2 = -2$ 인데 부호 주의.
    <br>$\\det = \\lambda(\\lambda+3) - (2)(-1)$ <br>= $\\lambda^2 + 3\\lambda + 2$`
  },
  {
    title: "근 구하기",
    body: `$\\lambda^2 + 3\\lambda + 2 = (\\lambda+1)(\\lambda+2) = 0$
    <br>$$\\lambda_1 = -1, \\quad \\lambda_2 = -2$$ 둘 다 음수 → 시스템 안정.`
  },
  {
    title: "Eigenvector for $\\lambda_1 = -1$",
    body: `$(\\lambda_1 I - A)\\mathbf{v} = \\mathbf{0}$<br>
    $\\begin{bmatrix}-1 & 2 \\\\ -1 & 2\\end{bmatrix}\\begin{bmatrix}v_1\\\\v_2\\end{bmatrix} = \\mathbf{0}$<br>
    한 식만 풀면 됨: $-v_1 + 2v_2 = 0 \\Rightarrow v_1 = 2v_2$<br>
    $v_2 = 1$ 잡으면: $$\\mathbf{v}_1 = \\begin{bmatrix}2\\\\1\\end{bmatrix}$$`
  },
  {
    title: "Eigenvector for $\\lambda_2 = -2$",
    body: `$\\begin{bmatrix}-2 & 2 \\\\ -1 & 1\\end{bmatrix}\\begin{bmatrix}v_1\\\\v_2\\end{bmatrix} = \\mathbf{0}$<br>
    $-2v_1 + 2v_2 = 0 \\Rightarrow v_1 = v_2$<br>
    $$\\mathbf{v}_2 = \\begin{bmatrix}1\\\\1\\end{bmatrix}$$`
  },
  {
    title: "검증",
    body: `$A\\mathbf{v}_1 = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}\\begin{bmatrix}2\\\\1\\end{bmatrix} = \\begin{bmatrix}-2\\\\-1\\end{bmatrix} = -1 \\cdot \\begin{bmatrix}2\\\\1\\end{bmatrix} = \\lambda_1 \\mathbf{v}_1$ ✓<br>
    $A\\mathbf{v}_2 = \\begin{bmatrix}-2\\\\-2\\end{bmatrix} = -2 \\cdot \\begin{bmatrix}1\\\\1\\end{bmatrix} = \\lambda_2 \\mathbf{v}_2$ ✓<br>
    답 확인됨.`
  }
])}

<h2>4. 자주 나오는 성질</h2>
<ul>
  <li><strong>Trace = $\\sum \\lambda_i$</strong>: 행렬의 대각합 = 모든 eigenvalue의 합</li>
  <li><strong>Det = $\\prod \\lambda_i$</strong>: 행렬식 = 모든 eigenvalue의 곱</li>
  <li>대각행렬 / 삼각행렬: eigenvalue = 대각 원소들 (그대로)</li>
  <li>$A^k$의 eigenvalue = $\\lambda^k$ (vector 그대로)</li>
  <li>$A^{-1}$의 eigenvalue = $1/\\lambda$ (vector 그대로)</li>
</ul>

${mcQuiz(
  "$A = \\begin{bmatrix}3 & 0 \\\\ 0 & -1\\end{bmatrix}$ 의 eigenvalue는?",
  ["3과 0", "3과 -1", "0과 -1", "3과 -3"],
  1,
  "대각행렬이라 대각원소 = eigenvalues. $\\lambda_1 = 3, \\lambda_2 = -1$."
)}

${mcQuiz(
  "$A$가 $3 \\times 3$이고 $\\det(A) = 6$, eigenvalue 두 개가 1과 2 라면 셋째 eigenvalue는?",
  ["3", "$-3$", "$1/3$", "구할 수 없음"],
  0,
  "$\\det = \\lambda_1 \\lambda_2 \\lambda_3 = 1 \\cdot 2 \\cdot \\lambda_3 = 6 \\Rightarrow \\lambda_3 = 3$."
)}

<h2>5. 과제 3.14 — Companion-form Matrix</h2>
${note(`이 문제는 <strong>증명형</strong>이야. Companion 행렬:
$$A = \\begin{bmatrix}-\\alpha_1 & -\\alpha_2 & -\\alpha_3 & -\\alpha_4 \\\\ 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 1 & 0\\end{bmatrix}$$
의 characteristic polynomial이 $\\lambda^4 + \\alpha_1 \\lambda^3 + \\alpha_2 \\lambda^2 + \\alpha_3 \\lambda + \\alpha_4$ 임을 보이고, $\\lambda_i$가 근이면 $[\\lambda_i^3, \\lambda_i^2, \\lambda_i, 1]^T$ 가 eigenvector임을 보이라.`)}

${collapse("증명 스케치", `
<strong>(a) Characteristic polynomial:</strong> $\\det(\\lambda I - A)$를 첫 행 cofactor expansion. 패턴이 재귀적으로 풀려서 결과가 $\\lambda^n + \\alpha_1 \\lambda^{n-1} + \\cdots + \\alpha_n$.<br><br>
<strong>(b) Eigenvector:</strong> $\\mathbf{v} = [\\lambda^3, \\lambda^2, \\lambda, 1]^T$로 두고 $A\\mathbf{v}$ 직접 계산.<br>
- 1행: $-\\alpha_1 \\lambda^3 - \\alpha_2 \\lambda^2 - \\alpha_3 \\lambda - \\alpha_4 = \\lambda^4$ (왜냐하면 $\\lambda$가 근이니까 $\\lambda^4 = -\\alpha_1\\lambda^3 - \\cdots$)<br>
- 2행: $\\lambda^3$<br>
- 3행: $\\lambda^2$<br>
- 4행: $\\lambda$<br>
즉 $A\\mathbf{v} = \\lambda \\mathbf{v}$ 가 된다.
`)}

${note(`<strong>왜 이게 중요?</strong> 전달함수에서 상태공간 만들 때 (Ch 4) companion form 자주 등장. eigenvalue ↔ pole 관계가 직접 보여.`, "tip")}
`);
