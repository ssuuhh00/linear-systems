registerPage("ch8-observer", "State Estimator & Separation", () => `
<h1>Ch 8 — State Estimator (Observer) & Separation Principle</h1>
<p class="lead">${tag("매년출제", "must")} observer gain $L$ 설계 + duality + separation principle.</p>

${profMemo(`<strong>두 덩어리.</strong> ① 2×2에서 $\\det(sI-(A-LC))$를 원하는 특성다항식과 매칭해 $L$ 구하기 (state feedback과 데칼코마니야 — duality). ② Separation Principle 단답: 추정상태로 궤환해도 폐루프 극이 {제어 극}∪{estimator 극}으로 분리된다. 이 두 개만 확실히 하면 된다.`)}

<h2>1. Observer가 왜 필요한가</h2>
${concept("녹취 비유 — 상태를 다 못 본다", `
State feedback $u=-Kx$는 <strong>상태 $x$ 전부</strong>를 알아야 쓸 수 있어. 그런데 현실에선 센서로 출력 $y=Cx$만 측정되지, 내부 상태 전부를 직접 못 보는 경우가 많다.<br><br>
그래서 출력 $y$와 입력 $u$만 보고 내부 상태를 <strong>추정</strong>하는 모델을 따로 돌린다. 이게 ${term("state-estimator", "observer(상태추정기)")}. 추정값 $\\hat x$가 진짜 $x$에 빨리 수렴하면, 그걸 $x$ 대신 써서 궤환할 수 있다.
`)}

<h2>2. Full-order Observer</h2>
${defCard("Full-order Observer", `
$$\\dot{\\hat{\\mathbf x}} = (A-LC)\\hat{\\mathbf x} + B\\mathbf u + L\\mathbf y$$
플랜트 복제($A\\hat x+Bu$)에 출력 보정항 $L(y-C\\hat x)$를 더한 것. $L$이 observer gain.
`)}

${defCard("추정오차 동역학 — decouple", `
추정오차 $\\mathbf e = \\mathbf x - \\hat{\\mathbf x}$를 미분하면:
$$\\dot{\\mathbf e} = \\dot{\\mathbf x}-\\dot{\\hat{\\mathbf x}} = (A-LC)\\mathbf e$$
$B\\mathbf u$와 $\\mathbf x$ 항이 깨끗이 사라진다 — <strong>오차는 입력·상태와 무관하게 자기들끼리 $(A-LC)$로 진화</strong>. 그러니 $A-LC$의 eigenvalue를 LHP로 배치하면 $\\mathbf e\\to0$.
`)}

${collapse("오차식 유도 (한 줄)", `
$\\dot e=\\dot x-\\dot{\\hat x}=(Ax+Bu)-((A-LC)\\hat x+Bu+Ly)$<br>
$=Ax-(A-LC)\\hat x-LCx$ &nbsp;($y=Cx$ 대입)<br>
$=A(x-\\hat x)-LC(x-\\hat x)=(A-LC)e$. 끝.`)}

${defCard("극배치 가능 조건", `
$$\\{A,C\\}\\ \\text{observable} \\iff A-LC\\text{의 eigenvalue를 임의로 배치 가능}$$
state feedback에서 controllable이 하던 역할을 여기선 ${term("observability", "observable")}이 한다.
`)}

<h2>3. Duality — 전치한 state feedback</h2>
${defCard("Duality", `
${term("duality", "쌍대성")}: $A-LC$의 극배치는 $A^T - C^T L^T$ 의 극배치와 같다. 즉 $L^T$를 "state feedback의 $K$"로 보면
$$(A-LC)^T = A^T - C^T L^T$$
는 $\\{A^T, C^T\\}$에 대한 state feedback $A^T-(C^T)(L^T)$ 와 똑같은 꼴. <strong>Observer 설계 = 전치한 시스템의 state feedback.</strong>
`)}

${note(`실전 의미: state feedback $K$ 구하는 법을 알면 observer $L$도 공짜로 안다. $A\\to A^T$, $B\\to C^T$, $K\\to L^T$로 바꿔서 똑같이 계수 비교하면 돼. transpose는 eigenvalue를 안 바꾸니 특성다항식은 그대로다.`, "tip")}

<h2>4. 워크스루 — 2×2 Observer gain $L$ 설계</h2>
${walkthrough("$A=\\begin{bmatrix}0&1\\\\-2&-3\\end{bmatrix},\\ C=[1\\ \\ 0]$, 원하는 estimator 극 $\\{-6,-6\\}$", [
  {
    title: "observable 확인",
    body: `${term("observability-matrix")} $\\mathcal O=\\begin{bmatrix}C\\\\CA\\end{bmatrix}=\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$, $\\rho=2$ → observable ✓. $L$ 임의배치 가능.`
  },
  {
    title: "$LC$ 계산",
    body: `$L=\\begin{bmatrix}l_1\\\\l_2\\end{bmatrix}$로 두면
    $$LC=\\begin{bmatrix}l_1\\\\l_2\\end{bmatrix}[1\\ 0]=\\begin{bmatrix}l_1 & 0\\\\l_2 & 0\\end{bmatrix}$$`
  },
  {
    title: "$A-LC$ 만들기",
    body: `$$A-LC=\\begin{bmatrix}0&1\\\\-2&-3\\end{bmatrix}-\\begin{bmatrix}l_1 & 0\\\\l_2 & 0\\end{bmatrix}=\\begin{bmatrix}-l_1 & 1\\\\-2-l_2 & -3\\end{bmatrix}$$`
  },
  {
    title: "$\\det(sI-(A-LC))$ 전개",
    body: `$$\\det\\begin{bmatrix}s+l_1 & -1\\\\2+l_2 & s+3\\end{bmatrix}=(s+l_1)(s+3)-(-1)(2+l_2)$$
    $=s^2+(l_1+3)s+(3l_1+2+l_2)$.`
  },
  {
    title: "원하는 특성다항식과 비교",
    body: `극 $\\{-6,-6\\}$ → $\\Delta_d(s)=(s+6)^2=s^2+12s+36$.<br>
    • $s^1$: $l_1+3=12 \\Rightarrow l_1=9$<br>
    • $s^0$: $3(9)+2+l_2=36 \\Rightarrow 29+l_2=36 \\Rightarrow l_2=7$<br>
    $$\\boxed{L=\\begin{bmatrix}9\\\\7\\end{bmatrix}}$$`
  }
])}

${note(`<strong>Estimator 극은 제어 극보다 훨씬 왼쪽에.</strong> 추정이 제어보다 빨리 수렴해야 $\\hat x\\approx x$가 보장되니까. 보통 제어 극의 2~5배 왼쪽으로 잡는다.<br><br>
그래서 $L$을 크게 잡아도 괜찮다 — observer는 <strong>소프트웨어 계산만 하니 비용이 없다</strong>. 반면 제어 $K$는 크게 잡으면 실제 액추에이터가 ${term("state-feedback", "saturation")}되니까 함부로 못 키운다. 비대칭이 포인트.`, "tip")}

<h2>5. Reduced-order Estimator (개념)</h2>
${defCard("Reduced-order Estimator", `
출력 $y$가 $q$개면 그 $q$개 상태는 이미 직접 알 수 있으니, 나머지 $n-q$개만 추정하면 된다. ${term("reduced-order-estimator")}는 차원이 $n-q$로 줄어든다.<br>
$F$는 $(n-q)$차 stable 행렬, eigenvalue가 $A$와 겹치면 안 됨 (Sylvester 방정식 해 존재 조건).
`)}

${concept("직관 — 아는 건 굳이 추정 안 한다", `
$y=x_1$이면 $x_1$은 센서로 바로 읽으니 추정할 필요가 없지. 남은 $x_2$ 하나만 추정하면 되니까 full-order(2차) 대신 1차짜리 estimator로 충분. 계산량 절약. 단 측정 잡음이 많으면 full-order가 더 robust할 수 있다는 trade-off가 있다.
`)}

<h2>6. Separation Principle</h2>
${defCard("Separation Principle", `
추정상태로 궤환($u=-K\\hat x$)해도, 폐루프 전체의 eigenvalue는
$$\\{\\,A-BK\\text{의 극}\\,\\}\\ \\cup\\ \\{\\,A-LC\\text{의 극}\\,\\}$$
즉 ${term("separation-principle")}: <strong>제어 극과 estimator 극이 분리</strong>돼 서로 영향 안 준다. $K$와 $L$을 <strong>독립적으로</strong> 설계해도 된다.
`)}

${concept("왜 분리되나 — 좌표 $(x, e)$로 보기", `
상태를 $(x, e)$ ($e=x-\\hat x$)로 잡으면 폐루프 행렬이 블록 상삼각이 된다:<br>
$\\begin{bmatrix}\\dot x\\\\\\dot e\\end{bmatrix}=\\begin{bmatrix}A-BK & BK\\\\0 & A-LC\\end{bmatrix}\\begin{bmatrix}x\\\\e\\end{bmatrix}$<br><br>
블록 상삼각의 eigenvalue = 대각 블록들의 eigenvalue 합집합 = {$A-BK$}∪{$A-LC$}. 좌하단이 0이라 둘이 안 섞인다. 그래서 분리.<br><br>
게다가 $r\\to y$ 전달함수는 <strong>estimator가 없는(상태 전부 측정 가능한) 경우와 동일</strong>하다 — estimator 극이 약분돼 사라진다.
`)}

<h2>7. 체크</h2>
${mcQuiz(
  "추정오차 $e=x-\\hat x$의 동역학 $\\dot e=(A-LC)e$가 의미하는 것은?",
  ["오차가 입력 $u$에 비례", "오차가 입력·상태와 무관하게 $(A-LC)$로 수렴", "오차가 항상 0", "오차가 $C$에만 의존"],
  1,
  "$Bu$와 $x$ 항이 사라져 오차는 자기들끼리 $(A-LC)$로 진화. $A-LC$를 LHP로 두면 $e\\to0$."
)}

${mcQuiz(
  "$A-LC$의 극을 임의 배치할 수 있는 조건은?",
  ["$\\{A,B\\}$ controllable", "$\\{A,C\\}$ observable", "$A$가 stable", "$C$가 정방행렬"],
  1,
  "Observer는 state feedback의 dual. controllable이 하던 역할을 observable이 한다."
)}

${mcQuiz(
  "Separation principle에 따라 $\\hat x$로 궤환한 폐루프 전체 극은?",
  ["{제어 극}만", "{estimator 극}만", "{제어 극} ∪ {estimator 극} (독립 설계 가능)", "둘의 곱"],
  2,
  "블록 상삼각 구조라 두 극 집합의 합집합. $K$와 $L$을 따로 설계해도 된다."
)}
`);
