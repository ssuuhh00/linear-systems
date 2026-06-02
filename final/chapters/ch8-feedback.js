registerPage("ch8-feedback", "State Feedback 극배치", () => `
<h1>Ch 8 — State Feedback 극배치 (Pole Placement)</h1>
<p class="lead">${tag("매년출제", "must")} 족보 p3-1(4) 류. 손계산 2×2로 $K$ 구하기 + Lyapunov 방법 + feedforward gain.</p>

${profMemo(`<strong>핵심은 단 하나.</strong> ${term("controllability", "controllable")}이면 폐루프 극을 <strong>아무 데나</strong> 옮길 수 있다. 시험은 거의 다 "2×2에서 원하는 극 주고 $K=[k_1\\ k_2]$ 구해라"야. $\\det(sI-(A-BK))$ 전개 → 원하는 특성다항식과 계수 비교 → 연립. 이거 하나만 손에 익히면 절반은 먹고 들어간다.`)}

<h2>1. State Feedback이 뭐냐</h2>
${defCard("상태궤환 (State Feedback)", `
상태 $\\mathbf x$를 전부 측정해서 입력으로 되먹임:
$$\\mathbf u = r - K\\mathbf x$$
대입하면 폐루프(closed-loop):
$$\\dot{\\mathbf x} = A\\mathbf x + B(r - K\\mathbf x) = (A-BK)\\mathbf x + Br$$
즉 ${term("state-feedback")}으로 시스템 행렬이 $A$ → $A-BK$로 바뀐다. 우리가 손댈 수 있는 건 $K$뿐.
`)}

${concept("녹취 비유 — 운전대를 직접 잡는 것", `
원래 시스템 $A$는 "차가 가는 대로 굴러가는" 자연스러운 동역학이야. 거기에 $-K\\mathbf x$를 더하는 건 운전자가 <strong>현재 상태(속도·방향)를 보고 핸들을 꺾는</strong> 것.<br><br>
$K$를 잘 잡으면 차가 휘청대던 걸($A$의 안 좋은 극) 안정하게($A-BK$의 좋은 극) 바꿀 수 있어. ${term("eigenvalue")}가 mode($e^{\\lambda t}$)를 결정하니까, 극을 왼쪽으로 옮기면 더 빨리 안정된다.
`)}

${defCard("핵심 정리 — 극배치 가능 조건", `
$$\\{A,B\\}\\ \\text{controllable} \\iff A-BK\\text{의 eigenvalue를 임의로 배치 가능}$$
즉 ${term("pole-placement", "극배치")}는 controllable이기만 하면 <strong>원하는 어떤 극 집합이든</strong> 만들 수 있다 (복소근은 켤레쌍으로). controllable이 아니면 안 옮겨지는 mode가 남는다 (그게 ${term("stabilizable")}와 연결).
`)}

<h2>2. 방법 1 — 계수 비교 (단일입력, 시험 메인)</h2>
${note(`<strong>절차.</strong> ① $K=[k_1\\ k_2]$로 두고 $A-BK$ 계산 → ② $\\det(sI-(A-BK))$ 전개해서 $s$에 대한 다항식 → ③ 원하는 극의 특성다항식 $\\Delta_d(s)$ 전개 → ④ 같은 차수 계수끼리 같다고 놓고 연립.`, "tip")}

${walkthrough("족보 p3-1(4) 류: $A=\\begin{bmatrix}0&1\\\\0&-3\\end{bmatrix},\\ B=\\begin{bmatrix}1\\\\0\\end{bmatrix}$, 원하는 극 $\\{-2,-4\\}$", [
  {
    title: "$BK$ 계산",
    body: `$K=[k_1\\ k_2]$로 두면
    $$BK=\\begin{bmatrix}1\\\\0\\end{bmatrix}[k_1\\ k_2]=\\begin{bmatrix}k_1 & k_2\\\\0 & 0\\end{bmatrix}$$`
  },
  {
    title: "$A-BK$ 만들기",
    body: `$$A-BK=\\begin{bmatrix}0&1\\\\0&-3\\end{bmatrix}-\\begin{bmatrix}k_1 & k_2\\\\0 & 0\\end{bmatrix}=\\begin{bmatrix}-k_1 & 1-k_2\\\\0 & -3\\end{bmatrix}$$
    $B$의 둘째 성분이 0이라 둘째 행은 안 건드려진 게 보이지? 입력이 첫 상태에만 직접 들어가서 그래.`
  },
  {
    title: "$\\det(sI-(A-BK))$ 전개",
    body: `$$\\det\\begin{bmatrix}s+k_1 & -(1-k_2)\\\\0 & s+3\\end{bmatrix}=(s+k_1)(s+3)$$
    하삼각이라 대각곱. $= s^2+(k_1+3)s+3k_1$.`
  },
  {
    title: "원하는 특성다항식과 비교",
    body: `원하는 극 $\\{-2,-4\\}$ → $\\Delta_d(s)=(s+2)(s+4)=s^2+6s+8$.<br>
    계수 비교:<br>
    • $s^1$: $k_1+3=6 \\Rightarrow k_1=3$<br>
    • $s^0$: $3k_1=8$ ... 어? $3\\cdot3=9\\ne8$ 모순!<br>
    <strong>주의:</strong> 이 $A,B$는 $\\lambda=-3$ mode가 입력과 분리돼 있어 그 극을 못 옮긴다. 즉 둘째 극은 $-3$에 묶여 있음.`
  },
  {
    title: "올바른 목표 — controllable 확인부터",
    body: `${term("controllability-matrix")} $\\mathcal C=[B\\ AB]=\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$, $\\rho=1\\ne2$ → <strong>uncontrollable!</strong><br>
    그래서 극 하나($-3$)는 고정. 옮길 수 있는 건 $-k_1$ 하나뿐. 원하는 극을 $\\{-2,-3\\}$처럼 잡아야 풀린다: $k_1=2$, $K=[2\\ \\ k_2]$ ($k_2$는 극에 영향 없음).`
  }
])}

${note(`위 예제는 일부러 함정을 보여준 거야. 시험에선 controllable한 $A,B$가 나온다. 예를 들어 $A=\\begin{bmatrix}0&1\\\\-2&-3\\end{bmatrix},\\ B=\\begin{bmatrix}0\\\\1\\end{bmatrix}$ (controllable canonical form)이면 $A-BK=\\begin{bmatrix}0&1\\\\-2-k_1 & -3-k_2\\end{bmatrix}$ → $\\det(sI-\\cdot)=s^2+(3+k_2)s+(2+k_1)$ 라서 계수 비교가 깔끔하게 풀린다.`, "warn")}

<h2>3. 방법 2 — Lyapunov / Sylvester 방정식 (다입력도 가능)</h2>
${defCard("Sylvester 방정식 방법", `
원하는 eigenvalue를 가진 행렬 $F$를 먼저 정하고, ${term("lyapunov-equation")}
$$AT - TF = B\\bar K$$
를 풀어 $T$를 구한 뒤
$$K = \\bar K\\,T^{-1}$$
그러면 $A-BK = TFT^{-1}$ 이라 $A-BK$의 eigenvalue $=$ $F$의 eigenvalue ${term("similarity-transform", "(닮음)")}.
`)}

${concept("왜 닮음이 되나 — 한 줄 유도", `
$AT-TF=B\\bar K$이고 $K=\\bar K T^{-1}$이면 $\\bar K = KT$. 대입:<br>
$AT-TF=BKT \\Rightarrow AT-BKT=TF \\Rightarrow (A-BK)T=TF$<br>
양변 오른쪽에 $T^{-1}$: $A-BK=TFT^{-1}$. 닮음변환이라 eigenvalue 보존. 끝.
`)}

${profMemo(`<strong>necessary vs sufficient — 교수님이 반복 강조.</strong> "$\\{A,B\\}$ controllable & $\\{A,F\\}$ observable이면 $T$가 nonsingular"는 <strong>necessary 조건이지 sufficient가 아니다.</strong> 즉 만족해도 $T$가 singular일 수 있다. 그러면 $\\bar K$를 다른 값으로 다시 잡아 재시도. 단답으로 "necessary와 sufficient 구분해 설명" 나올 수 있으니 이 문장 그대로 외워둬.`)}

${note(`<strong>$F$의 eigenvalue가 $A$의 eigenvalue와 겹치면 안 된다.</strong> 겹치면 Sylvester 방정식 $AT-TF=B\\bar K$가 유일해를 못 가진다 ($A$와 $F$가 공통 eigenvalue를 가지면 그렇다). 실무에선 살짝 옮겨서 ($-1 \\to -1.01$) 회피.`, "warn")}

${note(`방법 2의 장점: 다항식 전개·계수비교 대신 <strong>선형 대수방정식</strong>이라 차수가 커지거나 <strong>다입력</strong>일 때 컴퓨터로 풀기 쉽다. 방법 1은 단일입력 손계산용.`, "tip")}

<h2>4. Feedforward gain — 정상상태 추종</h2>
${defCard("Feedforward gain $p$", `
$\\mathbf u = r - K\\mathbf x$만 쓰면 폐루프 DC gain이 1이 아니라서 $y(\\infty)\\ne r$. 그래서
$$\\mathbf u = pr - K\\mathbf x$$
로 ${term("feedforward-gain")} $p$를 붙이고
$$p = \\frac{1}{G_{cl}(0)},\\qquad G_{cl}(s)=C(sI-(A-BK))^{-1}B$$
로 잡으면 폐루프 DC gain이 1이 되어 $y(\\infty)=r$ (step 추종).
`)}

${concept("최종값 정리로 $y(\\infty)$ 확인", `
${term("final-value-theorem")}: step 입력 $r/s$에 대해<br>
$y(\\infty)=\\lim_{s\\to0}s\\cdot Y(s)=\\lim_{s\\to0}s\\cdot p\\,G_{cl}(s)\\cdot\\frac{r}{s}=p\\,G_{cl}(0)\\,r$<br><br>
$p=1/G_{cl}(0)$이면 $y(\\infty)=r$. 단 폐루프가 안정($A-BK$의 극이 LHP)이어야 최종값 정리가 유효하다.
`)}

${note(`<strong>입력 saturation 주의 — 에일러론 ±15° 비유.</strong> $K$를 너무 크게 잡으면 극을 멀리 왼쪽으로 보내 빨라지지만, 초기 입력 $u$가 폭발한다. 비행기 에일러론은 물리적으로 ±15°밖에 못 꺾는데 제어기가 +60°를 명령하면 포화(saturation)돼 설계대로 안 움직인다. 그래서 $K$는 무작정 크게 못 잡는다. (반면 ${term("state-estimator", "observer")}의 $L$은 소프트웨어 계산이라 크게 잡아도 OK — Ch8 observer 페이지 참고.)`, "warn")}

<h2>5. 체크</h2>
${mcQuiz(
  "$\\{A,B\\}$가 controllable일 때 state feedback $u=r-Kx$로 할 수 있는 것은?",
  ["$A-BK$의 eigenvalue를 임의의 위치로 배치", "$B$를 바꿔 입력 채널 추가", "관측 안 되는 상태 추정", "전달함수의 zero를 임의로 배치"],
  0,
  "controllable ⟺ 폐루프 극 임의배치. zero는 $C,B$ 구조라 state feedback으로 자유롭게 못 옮긴다(극만)."
)}

${mcQuiz(
  "Lyapunov 방법에서 $F$의 eigenvalue 선택 시 반드시 피해야 하는 것은?",
  ["$F$를 대각행렬로", "$F$의 eigenvalue가 $A$의 eigenvalue와 겹치는 것", "$F$를 stable하게", "$F$를 2×2로"],
  1,
  "$A$와 $F$가 공통 eigenvalue면 Sylvester 방정식 $AT-TF=B\\bar K$가 유일해를 못 가진다. 겹치면 살짝 옮긴다."
)}

${mcQuiz(
  "feedforward gain $p$를 $1/G_{cl}(0)$로 잡는 이유는?",
  ["폐루프를 안정화", "극을 더 왼쪽으로", "정상상태에서 $y(\\infty)=r$ (DC gain을 1로)", "saturation 방지"],
  2,
  "$y(\\infty)=p\\,G_{cl}(0)\\,r$. $p=1/G_{cl}(0)$이면 DC gain 1 → step 추종. 안정화는 $K$의 몫."
)}
`);
