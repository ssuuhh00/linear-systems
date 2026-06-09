registerPage("ch6-stabilizable", "Stabilizable · Detectable · Index", () => `
<h1>Ch 6 — Stabilizable · Detectable · Controllability Index</h1>
<p class="lead">${tag("시험빈출", "exam")} 족보 2017 p3-1이 통째로 이 페이지 내용임. "controllable은 아닌데 안정화는 되나?"를 묻는 약화 버전 개념. 끝까지 보면 극배치 $F$까지 구함.</p>

${profMemo(`<strong>족보 직결.</strong> 2017 p3-1은 (1) stabilizable/detectable <em>개념 설명</em> (2) stabilizable 판정 (3) detectable 판정 (4) $u=Fx$로 안정화하는 $F$ 구하기 — 4단 구성임. 아래 tryIt가 그 문제 그대로니 손으로 한 번 따라 풀어볼 것. 판정의 핵심은 <strong>${term("pbh-test", "PBH")}로 unstable한 $\\lambda$만 골라 체크</strong>하는 것!`)}

${recall("이 페이지에 필요한 선행 개념", "stabilizable/detectable은 <strong>unstable한 eigenvalue($\\text{Re}\\ge0$)만</strong> 골라 PBH(rank)로 보는 것. 고유값 부호와 rank가 흐릿하면 복습.", [["ch3-eigen", "고유값 복습"], ["ch3-rank", "Rank 복습"]])}

<h2>1. Stabilizable (안정화가능)</h2>
${defCard("Stabilizable", `
controllable이 아니어도, <strong>unstable한 mode($\\text{Re}(\\lambda)\\ge0$)들이 전부 controllable</strong>이면 ${term("stabilizable", "stabilizable")}임. → ${term("state-feedback", "state feedback")} $u=Fx$로 그 unstable mode들을 LHP로 옮겨 안정화할 수 있음(이미 stable한 mode는 건드릴 필요 없음).
<br><br>
직관: controllable은 "모든 mode를 마음대로 움직임"이라 너무 강한 요구임. 실제 제어 목표는 보통 "안정화"뿐이니, <strong>이미 안정한 mode는 놔두고 위험한(unstable) mode만 잡을 수 있으면</strong> 충분 — 그게 stabilizable.
`)}

<h2>2. Detectable (검출가능)</h2>
${defCard("Detectable", `
observable이 아니어도, <strong>unstable한 mode들이 전부 observable</strong>이면 ${term("detectable", "detectable")}임. → observer로 그 위험한 상태를 추정해 안정한 추정오차를 만들 수 있음. ${term("stabilizable", "stabilizable")}의 <strong>쌍대 개념</strong>.
<br><br>
직관도 같음: 안정해서 알아서 사라질 mode는 굳이 관측 안 해도 되고, <strong>발산할 mode만 출력으로 볼 수 있으면</strong> 추정기로 잡아내니 충분.
`)}

<h2>3. PBH 판정 — unstable한 $\\lambda$만 본다</h2>
${defCard("Stabilizable / Detectable PBH", `
<strong>Stabilizable:</strong> $\\text{Re}(\\lambda)\\ge0$인 $\\lambda$에 대해서만 $\\rho([\\,A-\\lambda I\\ \\ B\\,])=n$.<br>
<strong>Detectable:</strong> $\\text{Re}(\\lambda)\\ge0$인 $\\lambda$에 대해서만 $\\rho\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix}=n$.
<br><br>
controllable의 PBH는 <strong>모든</strong> $\\lambda$를 봤지만, stabilizable은 <strong>위험한($\\text{Re}\\ge0$) $\\lambda$만</strong> 보면 됨. LHP mode는 rank가 떨어져도(uncontrollable) 어차피 안정하니 OK. 그래서 controllable ⟹ stabilizable이지만 역은 아님.
`)}

<h2>4. 포함 관계</h2>
<table>
  <tr><th>강함 → 약함</th><th>의미</th></tr>
  <tr><td>Controllable</td><td>모든 mode를 임의 배치 가능</td></tr>
  <tr><td>⟹ Stabilizable</td><td>unstable mode만 controllable이면 충분 (안정화 OK)</td></tr>
</table>
<p>Observable ⟹ Detectable도 똑같은 포함 관계임. controllable/observable이 안 돼도 stabilizable/detectable이면 제어·추정 설계는 가능함.</p>

<h2>5. ⭐ 족보 2017 p3-1</h2>
${tryIt("", `$$\\dot{\\mathbf x}=\\begin{bmatrix}0 & 1\\\\ 0 & -3\\end{bmatrix}\\mathbf x+\\begin{bmatrix}1\\\\ 0\\end{bmatrix}u,\\qquad y=[\\,0\\ \\ 1\\,]\\mathbf x$$ (1) stabilizable·detectable 개념 설명 (2) stabilizable? (3) detectable? (4) $u=Fx$로 안정화하는 $F$.`, [
  {
    title: "(0) 먼저 eigenvalue (mode 파악)",
    body: `$A=\\begin{bmatrix}0&1\\\\0&-3\\end{bmatrix}$는 상삼각 → $\\lambda=0,\\ -3$.<br>
    <strong>$\\lambda=-3$은 안정(LHP), $\\lambda=0$은 unstable</strong>($\\text{Re}=0\\ge0$). 그래서 판정에서 신경 쓸 mode는 $\\lambda=0$ 하나임.`
  },
  {
    title: "(1) 개념 설명",
    body: `<strong>Stabilizable</strong>: 모든 unstable mode가 controllable이라 state feedback으로 LHP로 옮겨 안정화 가능한 시스템.<br>
    <strong>Detectable</strong>: 모든 unstable mode가 observable이라 observer로 그 상태를 추정해 안정한 오차 동역학을 만들 수 있는 시스템. (둘은 쌍대)`
  },
  {
    title: "(2) Stabilizable 판정 — $\\lambda=0$만 PBH",
    body: `$[\\,A-0\\cdot I\\ \\ B\\,]=\\begin{bmatrix}0 & 1 & 1\\\\ 0 & -3 & 0\\end{bmatrix}$. 2열 $\\begin{bmatrix}1\\\\-3\\end{bmatrix}$, 3열 $\\begin{bmatrix}1\\\\0\\end{bmatrix}$이 독립 → rank 2 $=n$ ✓<br>
    unstable mode $\\lambda=0$이 controllable → <strong>stabilizable</strong>. (전체 controllable은 아님: $AB=\\begin{bmatrix}0\\\\0\\end{bmatrix}$라 $\\mathcal C=\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$ rank 1. 하지만 안 움직이는 건 안정한 $\\lambda=-3$ mode라 상관없음.)`
  },
  {
    title: "(3) Detectable 판정 — $\\lambda=0$만 PBH",
    body: `$\\begin{bmatrix}A-0\\cdot I\\\\ C\\end{bmatrix}=\\begin{bmatrix}0 & 1\\\\ 0 & -3\\\\ 0 & 1\\end{bmatrix}$. 1열이 전부 0 → rank $=1<2=n$ ✗<br>
    unstable mode $\\lambda=0$이 <strong>unobservable</strong> → <strong>NOT detectable</strong>. (출력 $y=x_2$인데 $\\lambda=0$ mode는 $x_1$ 방향이라 $y$에 안 잡힘.)`
  },
  {
    title: "(4) 안정화 $F$ — 극배치",
    body: `$u=Fx,\\ F=[\\,f_1\\ \\ f_2\\,]$이면
    $$A+BF=\\begin{bmatrix}0&1\\\\0&-3\\end{bmatrix}+\\begin{bmatrix}1\\\\0\\end{bmatrix}[f_1\\ f_2]=\\begin{bmatrix}f_1 & 1+f_2\\\\ 0 & -3\\end{bmatrix}$$
    여전히 상삼각 → eigenvalue $=f_1,\\ -3$. $f_1$은 자유롭게 옮기지만 $-3$은 고정($\\lambda=-3$이 uncontrollable). 다행히 $-3$은 이미 stable! $f_1<0$이면 둘 다 LHP — 예: $F=[\\,-1\\ \\ 0\\,]$ → eigenvalue $-1,\\ -3$ → <strong>안정화 완료</strong>.`
  },
  {
    title: "(정리) 이 문제의 교훈",
    body: `stabilizable인데 detectable은 아닐 수 있음(이 예가 그럼). controllable과 observable은 <strong>독립</strong> 성질이라 따로따로 판정해야 함. 그리고 극배치 시 uncontrollable mode($-3$)는 못 옮긴다는 걸 $A+BF$가 상삼각으로 유지되는 데서 확인했음 — 못 움직이는 mode가 stable했기에 stabilizable이 가능했던 것.`
  }
])}

<h2>6. Controllability Index $\\mu$</h2>
${defCard("Controllability Index", `
$[\\,B\\ AB\\cdots A^{\\mu-1}B\\,]$가 처음으로 rank $n$이 되는 <strong>최소 차수 $\\mu$</strong>(${term("controllability-index", "가제어성 지수")}). $\\mu\\le n-p+1,\\ p=\\rho(B)$.
<br><br>
다입력이면 $B$의 열이 여러 개라 $A^{n-1}B$까지 안 가도 일찍 full rank가 됨 — 그 "언제 full rank 되나"가 $\\mu$. 닮음변환·열 순서를 바꿔도 $\\mu$는 불변이고, $p=\\rho(B)$가 클수록(입력이 많을수록) 상한이 작아짐(입력이 많으면 더 빨리 전 상태에 도달).
<br><br>
예: $A=\\begin{bmatrix}0&1&0\\\\0&0&1\\\\0&0&0\\end{bmatrix},\\ B=\\begin{bmatrix}0\\\\0\\\\1\\end{bmatrix}$ ($p=1,\\ n=3$). $[B]$ rank 1, $[B\\ AB]=\\begin{bmatrix}0&0\\\\0&1\\\\1&0\\end{bmatrix}$ rank 2, $[B\\ AB\\ A^2B]$ rank 3 → 처음 full rank가 $A^2B$까지 → <strong>$\\mu=3$</strong>. 상한 $n-p+1=3$과 일치(단일입력은 항상 $\\mu=n$).
`)}

<h2>7. 체크</h2>
${mcQuiz(
  "stabilizable의 PBH 판정에서 체크하는 $\\lambda$는?",
  ["모든 eigenvalue $\\lambda$", "$\\text{Re}(\\lambda)<0$인 $\\lambda$만", "$\\text{Re}(\\lambda)\\ge0$인 $\\lambda$만", "$\\lambda=0$만"],
  2,
  "이미 안정한($\\text{Re}<0$) mode는 놔둬도 되니, unstable한($\\text{Re}\\ge0$) $\\lambda$에 대해서만 $\\rho([A-\\lambda I\\ B])=n$이면 stabilizable."
)}

${mcQuiz(
  "족보 2017 p3-1 시스템($\\lambda=0,-3$)에서 $u=Fx$로 옮길 수 없는 eigenvalue는?",
  ["$\\lambda=0$ (controllable이라 옮김 가능)", "$\\lambda=-3$ (uncontrollable이라 고정)", "둘 다 옮길 수 있다", "둘 다 못 옮긴다"],
  1,
  "$A+BF$가 상삼각으로 유지돼 eigenvalue가 $f_1,\\ -3$. $\\lambda=-3$ mode는 uncontrollable이라 고정되지만, 이미 stable이라 stabilizable엔 문제없음."
)}

${note(`<strong>Ch6 마무리:</strong> controllable/observable(강) ⊃ stabilizable/detectable(약). 판정은 PBH로 위험한 mode만 골라 보면 됨. 다음 Ch7은 이 둘(controllable & observable)을 <strong>동시에</strong> 만족하는 ${term("minimal-realization", "최소실현")}, 이어서 Ch8 상태궤환·관측기 — controllable이면 극 임의배치, stabilizable이면 최소한 안정화 보장!`, "tip")}
`);
