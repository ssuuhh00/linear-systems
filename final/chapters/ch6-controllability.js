registerPage("ch6-controllability", "Controllability", () => `
<h1>Ch 6 — Controllability (가제어성)</h1>
<p class="lead">${tag("시험빈출", "exam")} 2×2 / 3×3 시스템의 가제어성 판정은 매년 단골이야. 판정 3종(행렬·Gramian·PBH)을 손에 익혀두자.</p>

${profMemo(`<strong>시험 패턴:</strong> 작은 $A,B$ 주고 "controllable한가? 판정하라"가 핵심. 대부분 ${term("controllability-matrix", "가제어성 행렬")} $\\mathcal C$의 rank(단일입력이면 $\\det$)만 보면 끝나. PBH는 "어떤 mode가 안 움직이나?"를 콕 집어내는 게 장점이라 개념 단답으로도 나올 수 있어. Gramian은 계산보다 "nonsingular면 controllable"이라는 의미를 알면 충분.`)}

<h2>1. 직관 — 핸들로 차를 원하는 곳에 댈 수 있나?</h2>
${defCard("Controllability (가제어성)", `
$\\dot{\\mathbf x}=A\\mathbf x+B\\mathbf u$에서, 임의의 초기상태 $\\mathbf x_0$를 임의의 목표상태 $\\mathbf x_1$으로 <strong>유한시간 안에</strong> 옮기는 입력 $\\mathbf u(t)$가 존재하면 ${term("controllability", "controllable")}.
`)}

${note(`<strong>핵심 직관:</strong> 입력 $\\mathbf u$는 "핸들". 핸들이 모든 상태에 영향을 줄 수 있어야 원하는 곳으로 차를 몰 수 있어. 핸들이 없는(또는 일부 바퀴에만 연결된) 차라면, 아무리 운전해도 못 가는 영역이 생겨. 그게 uncontrollable.`)}

${concept("교수님 비유 — 부산→서울, 인천 들렀다 와도 됨", `
가제어성은 <strong>경로·입력 크기에 제약이 없어</strong>. 부산에서 서울 가는데 인천 찍고 빙 돌아가도 상관없어. <strong>유한시간 안에 도달만 하면</strong> controllable이야.<br><br>
그래서 "얼마나 빨리/효율적으로 가나"는 가제어성이 따지는 게 아니야. <strong>갈 수 있나/없나(존재성)</strong>만 본다. 빨리 가는 건 최적제어(optimal control)의 영역.
`)}

<h2>2. 판정법 ① — 가제어성 행렬 (가장 많이 씀)</h2>
${defCard("Controllability Matrix", `
$$\\mathcal C=[\\,B\\ \\ AB\\ \\ A^2B\\ \\cdots\\ A^{n-1}B\\,]$$
$\\rho(\\mathcal C)=n$ ⟺ controllable. ($n$은 상태 차원, ${term("rank")} 판정)
`)}

${note(`단일입력($\\mathbf B$가 열벡터 1개)이면 $\\mathcal C$는 $n\\times n$ <strong>정방행렬</strong>이라, $\\det(\\mathcal C)\\ne0$ 하나만 보면 돼. 이게 손계산에서 제일 빠른 길.`, "tip")}

<h2>3. 판정법 ② — Gramian이 nonsingular</h2>
${defCard("Controllability Gramian", `
$$W_c(t)=\\int_0^t e^{A\\tau}BB^Te^{A^T\\tau}\\,d\\tau$$
어떤 $t>0$에서 $W_c(t)$가 nonsingular(${term("controllability-gramian", "양정부호")}) ⟺ controllable.
`)}

${concept("왜 Gramian의 inverse가 필요할까?", `
$\\mathbf x_0\\to\\mathbf x_1$로 보내는 입력을 실제로 구성하려면
$$\\mathbf u(\\tau)=-B^Te^{A^T(t_1-\\tau)}W_c^{-1}(t_1)\\,[\\,\\cdots\\,]$$
처럼 <strong>$W_c^{-1}$가 들어가</strong>. 그래서 $W_c$가 nonsingular라야 입력을 만들 수 있고, 곧 controllable이야.<br><br>
$A$가 stable이면 $W_c=\\int_0^\\infty(\\cdots)$가 Lyapunov 방정식 $AW_c+W_cA^T=-BB^T$의 해로 나와서, 적분 없이도 구할 수 있어.
`)}

<h2>4. 판정법 ③ — PBH test (mode를 콕 집는다)</h2>
${defCard("PBH (Popov-Belevitch-Hautus) Test", `
$A$의 <strong>모든 eigenvalue $\\lambda$</strong>에 대해
$$\\rho([\\,A-\\lambda I\\ \\ B\\,])=n$$
이면 controllable. 어떤 $\\lambda$에서 rank가 떨어지면, <strong>그 $\\lambda$에 해당하는 mode가 uncontrollable</strong>이야. ${term("pbh-test", "PBH")}
`)}

${note(`<strong>PBH의 장점:</strong> $\\mathcal C$ 방식은 "controllable인가 아닌가"만 알려주지만, PBH는 <strong>어느 mode($\\lambda$)가 입력과 안 닿아 있는지</strong>까지 알려줘. Stabilizable 판정(다음 페이지)에서 이게 결정적이야 — unstable한 $\\lambda$만 골라 체크하면 되거든.`, "tip")}

<h2>5. 판정법 비교</h2>
<table>
  <tr><th>방법</th><th>본질</th><th>장점 / 단점</th></tr>
  <tr><td>$\\mathcal C$ rank</td><td>$[B\\ AB\\cdots]$ full rank?</td><td>손계산 빠름(특히 단일입력 $\\det$) / mode별 정보 없음</td></tr>
  <tr><td>Gramian $W_c$</td><td>$W_c\\succ0$?</td><td>입력 구성 공식과 직결 / 적분·계산 무거움</td></tr>
  <tr><td>PBH</td><td>$\\rho([A-\\lambda I\\ B])=n$?</td><td>uncontrollable mode를 콕 집음 / eigenvalue 먼저 필요</td></tr>
</table>

<h2>6. Similarity transform에 불변</h2>
${defCard("닮음변환 불변성", `
${term("similarity-transform", "닮음변환")} $\\bar A=PAP^{-1},\\ \\bar B=PB$ ($P$ nonsingular)를 해도 controllability는 <strong>안 바뀐다</strong>.
`)}
${note(`$\\bar{\\mathcal C}=[\\bar B\\ \\bar A\\bar B\\cdots]=P[B\\ AB\\cdots]=P\\mathcal C$. nonsingular $P$를 곱해도 rank가 보존되니까 $\\rho(\\bar{\\mathcal C})=\\rho(\\mathcal C)$. 좌표(상태변수 조합)만 바꾼 거라 시스템의 본질인 가제어성은 그대로야.`)}

<h2>7. 워크스루 — 2×2 가제어성 판정</h2>
${walkthrough("$\\dot{\\mathbf x}=\\begin{bmatrix}1 & 1 \\\\ 0 & 2\\end{bmatrix}\\mathbf x+\\begin{bmatrix}1 \\\\ 1\\end{bmatrix}u$가 controllable?", [
  {
    title: "$AB$ 계산",
    body: `$n=2$이니 $\\mathcal C=[\\,B\\ \\ AB\\,]$.<br>
    $AB=\\begin{bmatrix}1&1\\\\0&2\\end{bmatrix}\\begin{bmatrix}1\\\\1\\end{bmatrix}=\\begin{bmatrix}1+1\\\\0+2\\end{bmatrix}=\\begin{bmatrix}2\\\\2\\end{bmatrix}$`
  },
  {
    title: "가제어성 행렬 세우기",
    body: `$$\\mathcal C=[\\,B\\ \\ AB\\,]=\\begin{bmatrix}1 & 2\\\\ 1 & 2\\end{bmatrix}$$
    단일입력 → $2\\times2$ 정방행렬이라 $\\det$만 보면 돼.`
  },
  {
    title: "determinant로 판정",
    body: `$\\det(\\mathcal C)=1\\cdot2-2\\cdot1=0$.<br>
    $\\det=0$ → $\\rho(\\mathcal C)=1<2=n$ → <strong>NOT controllable</strong>.`
  },
  {
    title: "PBH로 어떤 mode인지 확인",
    body: `$A$의 eigenvalue: 상삼각이라 $\\lambda=1,2$.<br>
    $\\lambda=2$에서 $[A-2I\\ \\ B]=\\begin{bmatrix}-1 & 1 & 1\\\\ 0 & 0 & 1\\end{bmatrix}$ → rank 2 ✓<br>
    $\\lambda=1$에서 $[A-I\\ \\ B]=\\begin{bmatrix}0 & 1 & 1\\\\ 0 & 1 & 1\\end{bmatrix}$ → 두 행이 같음, rank 1 ✗<br>
    $\\Rightarrow$ <strong>$\\lambda=1$ mode가 uncontrollable</strong>. PBH가 범인을 콕 집어냈어.`
  }
])}

<h2>8. 워크스루 — 3×3 (rank로 판정)</h2>
${walkthrough("$A=\\begin{bmatrix}0&1&0\\\\0&0&1\\\\0&0&0\\end{bmatrix},\\ B=\\begin{bmatrix}0\\\\0\\\\1\\end{bmatrix}$ (적분기 3단 연결)", [
  {
    title: "$AB,\\ A^2B$ 계산",
    body: `$AB=\\begin{bmatrix}0&1&0\\\\0&0&1\\\\0&0&0\\end{bmatrix}\\begin{bmatrix}0\\\\0\\\\1\\end{bmatrix}=\\begin{bmatrix}0\\\\1\\\\0\\end{bmatrix}$,
    $A^2B=A(AB)=\\begin{bmatrix}1\\\\0\\\\0\\end{bmatrix}$`
  },
  {
    title: "가제어성 행렬",
    body: `$$\\mathcal C=[\\,B\\ AB\\ A^2B\\,]=\\begin{bmatrix}0&0&1\\\\0&1&0\\\\1&0&0\\end{bmatrix}$$
    반대 대각선에 1이 늘어선 형태.`
  },
  {
    title: "rank 판정",
    body: `$\\det(\\mathcal C)=-1\\ne0$ → full rank 3 → <strong>controllable</strong> ✓<br>
    적분기를 직렬로 연결한 표준형(controllable canonical form 비슷)은 항상 controllable이야.`
  }
])}

<h2>9. 체크</h2>
${mcQuiz(
  "단일입력 $n\\times n$ 시스템에서 controllable의 가장 빠른 판정은?",
  ["$A$의 eigenvalue가 모두 LHP인지 본다", "$\\mathcal C=[B\\ AB\\cdots A^{n-1}B]$의 $\\det\\ne0$인지 본다", "$B$가 영벡터가 아닌지만 본다", "$C(sI-A)^{-1}B$를 계산한다"],
  1,
  "단일입력이면 $\\mathcal C$가 정방행렬이라 $\\det\\ne0$ ⟺ full rank ⟺ controllable. eigenvalue 위치는 안정도, 전달함수는 입출력 관계라 별개야."
)}

${mcQuiz(
  "PBH test가 $\\mathcal C$ rank 판정보다 나은 점은?",
  ["계산이 항상 더 빠르다", "안정도까지 동시에 알려준다", "어떤 eigenvalue(mode)가 uncontrollable한지 콕 집어준다", "$B$가 없어도 쓸 수 있다"],
  2,
  "PBH는 각 $\\lambda$마다 $\\rho([A-\\lambda I\\ B])$를 보므로, rank가 떨어지는 그 $\\lambda$가 바로 uncontrollable mode야. Stabilizable 판정의 핵심 도구."
)}

${mcQuiz(
  "닮음변환 $\\bar A=PAP^{-1},\\ \\bar B=PB$를 하면 controllability는?",
  ["전혀 보존되지 않는다", "$P$에 따라 바뀔 수 있다", "항상 보존된다 ($\\bar{\\mathcal C}=P\\mathcal C$, rank 불변)", "$A$가 stable일 때만 보존된다"],
  2,
  "$\\bar{\\mathcal C}=P\\mathcal C$이고 nonsingular $P$는 rank를 보존하므로 $\\rho(\\bar{\\mathcal C})=\\rho(\\mathcal C)$. 좌표만 바꾼 거라 본질은 불변."
)}

${note(`<strong>정리:</strong> ① $\\mathcal C$ rank(단일입력은 $\\det$) — 손계산 1순위. ② Gramian — 입력 구성·의미. ③ PBH — mode 진단. 셋 다 같은 결론을 주지만 쓰임새가 달라. 다음은 ${term("observability", "가관측성")}과 ${term("duality", "쌍대성")}!`, "tip")}
`);
