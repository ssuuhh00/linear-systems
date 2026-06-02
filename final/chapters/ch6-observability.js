registerPage("ch6-observability", "Observability & 쌍대성", () => `
<h1>Ch 6 — Observability (가관측성) & Duality</h1>
<p class="lead">${tag("시험빈출", "exam")} 가관측성은 가제어성의 "거울상". ${term("duality", "쌍대성")}만 알면 가제어성에서 배운 걸 전치(transpose)해서 그대로 재사용할 수 있어.</p>

${profMemo(`<strong>시험 팁:</strong> 가관측성 판정은 ${term("observability-matrix", "가관측성 행렬")} $\\mathcal O$의 rank만 보면 돼. 2×2면 $\\det\\ne0$ 한 줄로 끝. 그리고 <strong>쌍대성</strong>이 단답 개념으로 자주 나와 — "관측기(observer) 설계 = 전치한 state feedback"이라는 한 문장을 기억해. 가제어성 결과를 $A\\to A^T,\\ B\\to C^T$로 바꿔 끼우기만 하면 돼.`)}

<h2>1. 직관 — 출력만 보고 내부를 역추적</h2>
${defCard("Observability (가관측성)", `
$\\dot{\\mathbf x}=A\\mathbf x,\\ y=C\\mathbf x$에서, 유한시간 동안의 출력 $y(t)$(와 입력 $u$)만으로 초기상태 $\\mathbf x_0$를 <strong>유일하게</strong> 결정할 수 있으면 ${term("observability", "observable")}.<br>
($\\mathbf x_0$를 알면 시스템 방정식으로 전 구간 상태를 다 복원할 수 있어.)
`)}

${note(`<strong>핵심 직관:</strong> 가제어성이 "입력으로 상태를 <em>만들 수</em> 있나"라면, 가관측성은 "출력으로 상태를 <em>알아낼 수</em> 있나". 센서($C$)로 보이지 않는 내부 상태가 있으면 unobservable.`)}

${concept("교수님 비유 — 범죄 현장 증거로 그때 상황 추정", `
형사가 현장에 도착했을 때 직접 사건을 본 건 아니야. 남은 <strong>증거(출력 $y$)</strong>만으로 "범인이 누구였고 어떻게 움직였나(초기상태 $\\mathbf x_0$)"를 역추적하지.<br><br>
증거가 충분하면(observable) 범인을 유일하게 특정할 수 있어. 그런데 결정적 증거가 사라졌다면(unobservable) 서로 다른 두 시나리오가 <strong>같은 증거</strong>를 남겨서 구분 불가 — 그게 가관측성이 깨진 경우야.<br><br>
이 "출력으로 상태 추정" 아이디어가 곧 상태추정기(observer, Ch8)로 이어져.
`)}

<h2>2. 판정법 ① — 가관측성 행렬</h2>
${defCard("Observability Matrix", `
$$\\mathcal O=\\begin{bmatrix}C\\\\CA\\\\CA^2\\\\\\vdots\\\\CA^{n-1}\\end{bmatrix},\\qquad \\rho(\\mathcal O)=n\\ \\Leftrightarrow\\ \\text{observable}$$
가제어성 행렬은 가로로 붙였는데, 가관측성 행렬은 <strong>세로로 쌓아</strong>(transpose 느낌). ${term("observability-matrix")}
`)}

${note(`단일출력($C$가 행벡터 1개)이면 $\\mathcal O$가 $n\\times n$ 정방행렬이라 $\\det(\\mathcal O)\\ne0$ 하나만 보면 돼. 가제어성과 완전히 대칭이지?`, "tip")}

<h2>3. 판정법 ② — PBH</h2>
${defCard("PBH for Observability", `
$A$의 모든 eigenvalue $\\lambda$에 대해
$$\\rho\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix}=n$$
이면 observable. 어떤 $\\lambda$에서 rank가 떨어지면 <strong>그 mode가 unobservable</strong>(출력에 안 나타남). ${term("pbh-test", "PBH")}
`)}

${note(`가제어성 PBH는 $[A-\\lambda I\\ \\ B]$를 <strong>가로</strong>로, 가관측성은 $\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix}$를 <strong>세로</strong>로 붙여. 모양만 봐도 전치 관계가 보이지.`)}

<h2>4. ⭐ Duality (쌍대성) — 핵심 중의 핵심</h2>
${defCard("Duality", `
$$\\{A,B\\}\\ \\text{controllable}\\ \\Longleftrightarrow\\ \\{A^T,B^T\\}\\ \\text{observable}$$
$$\\{A,C\\}\\ \\text{observable}\\ \\Longleftrightarrow\\ \\{A^T,C^T\\}\\ \\text{controllable}$$
${term("duality", "쌍대성")} — 가관측성 문제는 <strong>전치해서 가제어성 결과로 그대로 푼다</strong>.
`)}

${concept("왜 성립할까? — 행렬 전치로 직접 확인", `
가관측성 행렬 $\\mathcal O=\\begin{bmatrix}C\\\\CA\\\\\\vdots\\\\CA^{n-1}\\end{bmatrix}$를 전치하면
$$\\mathcal O^T=[\\,C^T\\ \\ A^TC^T\\ \\cdots\\ (A^T)^{n-1}C^T\\,]$$
이건 정확히 시스템 $\\{A^T,\\,C^T\\}$의 <strong>가제어성 행렬</strong> 모양이야!<br><br>
그리고 $\\rho(\\mathcal O)=\\rho(\\mathcal O^T)$ (전치해도 rank 불변). 그러니
$$\\rho(\\mathcal O)=n\\ \\Leftrightarrow\\ \\{A^T,C^T\\}\\ \\text{controllable}.$$
즉 $\\{A,C\\}$ observable ⟺ $\\{A^T,C^T\\}$ controllable. 깔끔하지?
`)}

${note(`<strong>실전 효과:</strong> 가관측성·관측기(observer) 관련 정리를 따로 증명할 필요가 없어. 가제어성·상태궤환에서 증명한 걸 $A\\to A^T,\\ B\\to C^T,\\ K\\to L^T$로 치환하면 끝. "Observer 설계 = 전치한 state feedback"이 바로 이 얘기.`, "tip")}

<h2>5. 워크스루 — 2×2 가관측성 판정</h2>
${walkthrough("$A=\\begin{bmatrix}0 & 1 \\\\ -2 & -3\\end{bmatrix},\\ C=[1\\ \\ 0]$가 observable?", [
  {
    title: "$CA$ 계산",
    body: `$n=2$이니 $\\mathcal O=\\begin{bmatrix}C\\\\CA\\end{bmatrix}$.<br>
    $CA=[1\\ \\ 0]\\begin{bmatrix}0&1\\\\-2&-3\\end{bmatrix}=[\\,1\\cdot0+0\\cdot(-2)\\ \\ \\ 1\\cdot1+0\\cdot(-3)\\,]=[0\\ \\ 1]$`
  },
  {
    title: "가관측성 행렬 세우기",
    body: `$$\\mathcal O=\\begin{bmatrix}C\\\\CA\\end{bmatrix}=\\begin{bmatrix}1 & 0\\\\ 0 & 1\\end{bmatrix}=I$$
    단일출력 → $2\\times2$ 정방. $\\det$만 보면 돼.`
  },
  {
    title: "determinant로 판정",
    body: `$\\det(\\mathcal O)=1\\cdot1-0\\cdot0=1\\ne0$ → $\\rho(\\mathcal O)=2=n$ → <strong>observable</strong> ✓`
  },
  {
    title: "쌍대성으로 교차검증",
    body: `$\\{A,C\\}$ obsv ⟺ $\\{A^T,C^T\\}$ ctrb. $A^T=\\begin{bmatrix}0&-2\\\\1&-3\\end{bmatrix},\\ C^T=\\begin{bmatrix}1\\\\0\\end{bmatrix}$.<br>
    $A^TC^T=\\begin{bmatrix}0\\\\1\\end{bmatrix}$ → $\\mathcal C'=\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$, $\\det=1\\ne0$ → controllable ✓<br>
    같은 결론! 전치만으로 가제어성 결과를 그대로 빌려 썼어.`
  }
])}

${concept("Unobservable 예시 — 출력에 안 잡히는 mode", `
$A=\\begin{bmatrix}1&0\\\\0&2\\end{bmatrix},\\ C=[1\\ \\ 0]$이면<br>
$CA=[1\\ \\ 0]$ → $\\mathcal O=\\begin{bmatrix}1&0\\\\1&0\\end{bmatrix}$, 두 행이 같아 $\\rho=1<2$ → <strong>unobservable</strong>.<br><br>
대각이라 mode가 분리돼 있는데 $C$가 두 번째 상태($\\lambda=2$)를 전혀 안 보고 있어. PBH로도 $\\lambda=2$에서 $\\begin{bmatrix}A-2I\\\\C\\end{bmatrix}=\\begin{bmatrix}-1&0\\\\0&0\\\\1&0\\end{bmatrix}$ → 2열이 전부 0이라 rank 1. $\\lambda=2$ mode가 출력에 안 나타나는 거지.
`)}

<h2>6. 가제어성 ↔ 가관측성 한눈 대조표</h2>
<table>
  <tr><th></th><th>Controllability</th><th>Observability</th></tr>
  <tr><td>질문</td><td>$u$로 상태를 만들 수 있나</td><td>$y$로 상태를 알 수 있나</td></tr>
  <tr><td>판정행렬</td><td>$[B\\ AB\\cdots A^{n-1}B]$ (가로)</td><td>$[C;CA;\\cdots;CA^{n-1}]$ (세로)</td></tr>
  <tr><td>PBH</td><td>$\\rho([A-\\lambda I\\ B])=n$</td><td>$\\rho\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix}=n$</td></tr>
  <tr><td>쌍대</td><td>$\\{A^T,B^T\\}$ obsv</td><td>$\\{A^T,C^T\\}$ ctrb</td></tr>
</table>

<h2>7. 체크</h2>
${mcQuiz(
  "Duality에 따라 $\\{A,C\\}$가 observable인 것과 동치인 것은?",
  ["$\\{A,C\\}$가 controllable", "$\\{A^T,C^T\\}$가 controllable", "$\\{A^T,C\\}$가 observable", "$\\{A,C^T\\}$가 controllable"],
  1,
  "$\\mathcal O^T=[C^T\\ A^TC^T\\cdots]$가 $\\{A^T,C^T\\}$의 가제어성 행렬이고, 전치는 rank 불변. 그래서 $\\{A,C\\}$ obsv ⟺ $\\{A^T,C^T\\}$ ctrb."
)}

${mcQuiz(
  "단일출력 $n\\times n$ 시스템의 가관측성 판정으로 옳은 것은?",
  ["$\\mathcal O=[C;CA;\\cdots;CA^{n-1}]$의 $\\det\\ne0$", "$C$가 영벡터가 아니면 항상 observable", "$A$가 stable이면 observable", "$CB\\ne0$이면 observable"],
  0,
  "단일출력이면 $\\mathcal O$가 $n\\times n$ 정방이라 $\\det\\ne0$ ⟺ full rank ⟺ observable. 나머지는 충분조건이 아니야."
)}

${mcQuiz(
  "Observer(상태추정기) 설계가 state feedback 설계와 쌍대 관계라는 말의 의미는?",
  ["둘은 전혀 무관하다", "$A\\to A^T,\\ B\\to C^T,\\ K\\to L^T$로 치환하면 같은 문제가 된다", "observer는 controllability만 필요하다", "state feedback은 observability만 필요하다"],
  1,
  "쌍대성 덕에 가제어성/상태궤환의 결과를 전치해서 가관측성/관측기에 그대로 옮길 수 있어. 그래서 따로 증명할 필요가 없지."
)}

${note(`<strong>정리:</strong> 가관측성 = 가제어성의 전치판. $\\mathcal O$ rank로 판정, PBH로 mode 진단, ${term("duality", "쌍대성")}으로 기존 결과 재사용. 다음은 약화된 버전인 ${term("stabilizable", "Stabilizable")}·${term("detectable", "Detectable")}과 ${term("controllability-index", "가제어성 지수")}!`, "tip")}
`);
