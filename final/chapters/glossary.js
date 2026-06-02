// Central glossary for Linear Systems — 기말 (Ch6~9).
// Keys are kebab-case. Entries: { term, ko, short, definition, related, cat }.
// cat: "prereq" (선행 복습) | "core" (기말 핵심)
// `short` is hover/preview; `definition` is HTML+KaTeX in the right panel.

window.GLOSSARY = {
  // ================= 선행 복습 =================
  "eigenvalue": {
    term: "Eigenvalue", ko: "고유값", cat: "prereq",
    short: "$A\\mathbf v=\\lambda\\mathbf v$를 만족하는 $\\lambda$. $\\det(\\lambda I-A)=0$의 근.",
    definition: `<p>$\\det(\\lambda I - A)=0$ (특성방정식)의 근. 시스템의 <strong>mode</strong>를 결정 — $e^{\\lambda t}$의 지수.</p>
      <p>실부 $\\text{Re}(\\lambda)<0$이면 그 mode는 감쇠(안정), $>0$이면 발산.</p>`,
    related: ["characteristic-polynomial", "rank", "similarity-transform"]
  },
  "rank": {
    term: "Rank", ko: "계수", cat: "prereq",
    short: "행렬의 독립인 열(또는 행)의 개수.",
    definition: `<p>행렬의 1차독립인 열(=행)의 최대 개수. $n\\times n$ 행렬이 <strong>full rank $n$</strong> ⟺ nonsingular ⟺ $\\det\\ne0$ ⟺ 역행렬 존재.</p>
      <p>가제어성·가관측성 판정의 핵심: 판정행렬이 full rank인지 본다.</p>`,
    related: ["nullspace", "eigenvalue"]
  },
  "nullspace": {
    term: "Null Space", ko: "영공간", cat: "prereq",
    short: "$A\\mathbf x=\\mathbf 0$의 해 집합. $\\dim N(A)=n-\\rho(A)$.",
    definition: `<p>$A\\mathbf x=\\mathbf 0$을 만족하는 $\\mathbf x$의 집합. 차원(nullity) $=n-\\rho(A)$ (rank-nullity 정리).</p>`,
    related: ["rank"]
  },
  "similarity-transform": {
    term: "Similarity Transform", ko: "닮음변환", cat: "prereq",
    short: "$\\bar A=PAP^{-1}$. 상태변수 $\\bar{\\mathbf x}=P\\mathbf x$로 좌표를 바꾸는 것.",
    definition: `<p>nonsingular $P$로 $\\bar A=PAP^{-1},\\ \\bar B=PB,\\ \\bar C=CP^{-1}$. 상태변수의 조합만 바꿀 뿐 시스템의 본질(eigenvalue, 전달함수, 가제어/가관측성)은 <strong>불변</strong>.</p>`,
    related: ["eigenvalue", "controllability"]
  },
  "characteristic-polynomial": {
    term: "Characteristic Polynomial", ko: "특성다항식", cat: "prereq",
    short: "$\\Delta(s)=\\det(sI-A)$. 근이 eigenvalue.",
    definition: `<p>$\\Delta(s)=\\det(sI-A)$. 그 근이 $A$의 eigenvalue이자 시스템의 pole. 극배치(pole placement)는 이 다항식을 원하는 것으로 만드는 일.</p>`,
    related: ["eigenvalue", "pole-placement"]
  },
  "transfer-function": {
    term: "Transfer Function", ko: "전달함수", cat: "prereq",
    short: "$G(s)=C(sI-A)^{-1}B+D=\\dfrac{N(s)}{D(s)}$.",
    definition: `<p>입력→출력의 라플라스 비. 상태공간에서 $G(s)=C(sI-A)^{-1}B+D$. 분자 $N(s)$의 근=zero, 분모 $D(s)$의 근=pole.</p>`,
    related: ["pole-zero-cancellation", "coprime", "bibo-stability"]
  },
  "final-value-theorem": {
    term: "Final Value Theorem", ko: "최종값 정리", cat: "prereq",
    short: "$x(\\infty)=\\lim_{s\\to0}sX(s)$ (극이 LHP일 때).",
    definition: `<p>$\\displaystyle\\lim_{t\\to\\infty}x(t)=\\lim_{s\\to0}sX(s)$ — 단, $sX(s)$의 극이 모두 좌반면에 있을 때만 유효.</p>
      <p>초기값: $x(0^+)=\\lim_{s\\to\\infty}sX(s)$. step 입력 $=a/s$. 정상상태 추종(tracking) 확인에 사용.</p>`,
    related: ["tracking", "feedforward-gain"]
  },
  "bibo-stability": {
    term: "BIBO Stability", ko: "유계입력-유계출력 안정", cat: "prereq",
    short: "유계 입력 → 유계 출력. 전달함수 모든 pole이 LHP.",
    definition: `<p>Bounded Input → Bounded Output. 전달함수의 모든 pole이 좌반면(LHP, $\\text{Re}<0$)에 있을 때 성립.</p>`,
    related: ["transfer-function", "total-stability"]
  },

  // ================= Ch6 핵심 =================
  "controllability": {
    term: "Controllability", ko: "가제어성", cat: "core",
    short: "입력 $u$로 상태를 임의의 곳으로 유한시간에 옮길 수 있나?",
    definition: `<p>임의의 초기상태 $\\mathbf x_0$를 임의의 목표상태 $\\mathbf x_1$으로 <strong>유한시간 안에</strong> 옮기는 입력 $\\mathbf u$가 존재하면 그 상태(시스템)는 controllable.</p>
      <p>판정: ① 가제어성 행렬 $\\mathcal C=[B\\ AB\\cdots A^{n-1}B]$가 rank $n$, ② Gramian $W_c\\succ0$, ③ PBH: 모든 $\\lambda$에서 $\\rho([A-\\lambda I\\ B])=n$.</p>
      <p>입력 크기 제한 없음, 경로 무관 — 유한시간에 갈 수만 있으면 됨.</p>`,
    related: ["controllability-matrix", "controllability-gramian", "pbh-test", "observability", "stabilizable"]
  },
  "controllability-matrix": {
    term: "Controllability Matrix", ko: "가제어성 행렬", cat: "core",
    short: "$\\mathcal C=[\\,B\\ AB\\ A^2B\\ \\cdots\\ A^{n-1}B\\,]$.",
    definition: `<p>$$\\mathcal C=[\\,B\\ \\ AB\\ \\ A^2B\\ \\cdots\\ A^{n-1}B\\,]$$</p>
      <p>$\\rho(\\mathcal C)=n$ ⟺ controllable. 단일입력이면 $n\\times n$ 정방행렬이라 $\\det\\ne0$만 보면 됨.</p>`,
    related: ["controllability", "controllability-index"]
  },
  "controllability-gramian": {
    term: "Controllability Gramian", ko: "가제어성 그래미안", cat: "core",
    short: "$W_c(t)=\\int_0^t e^{A\\tau}BB^Te^{A^T\\tau}d\\tau$. nonsingular ⟺ controllable.",
    definition: `<p>$$W_c(t)=\\int_0^t e^{A\\tau}BB^Te^{A^T\\tau}\\,d\\tau$$</p>
      <p>어떤 $t>0$에서 $W_c(t)\\succ0$(nonsingular)이면 controllable. $\\mathbf x_0\\to\\mathbf x_1$ 보내는 입력 $\\mathbf u(t)=-B^Te^{A^T(t_1-t)}W_c^{-1}(\\cdots)$ 구성에 inverse가 필요.</p>
      <p>$A$가 stable이면 $W_c=\\int_0^\\infty\\cdots$가 Lyapunov 방정식 $AW_c+W_cA^T=-BB^T$의 해.</p>`,
    related: ["controllability", "lyapunov-equation"]
  },
  "pbh-test": {
    term: "PBH Test", ko: "PBH 판정법", cat: "core",
    short: "모든 eigenvalue $\\lambda$에서 $\\rho([A-\\lambda I\\ B])=n$ ⟺ controllable.",
    definition: `<p>Popov-Belevitch-Hautus. 각 eigenvalue $\\lambda$마다 $$\\rho([\\,A-\\lambda I\\ \\ B\\,])=n$$ 이면 controllable.</p>
      <p>장점: <strong>어떤 mode(eigenvalue)가 uncontrollable한지 콕 집어낸다.</strong> 가관측성은 $\\rho\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix}=n$.</p>`,
    related: ["controllability", "observability", "stabilizable"]
  },
  "controllability-index": {
    term: "Controllability Index", ko: "가제어성 지수", cat: "core",
    short: "$[B\\ AB\\cdots A^{\\mu-1}B]$가 rank $n$ 되는 최소 $\\mu$.",
    definition: `<p>$[\\,B\\ AB\\cdots A^{\\mu-1}B\\,]$가 처음으로 rank $n$이 되는 최소 차수 $\\mu$. 다입력이면 $A^{n-1}B$까지 안 가도 됨.</p>
      <p>$\\mu\\le n-p+1$ ($p=\\rho(B)$). 닮음변환·열 순서 바꿔도 불변.</p>`,
    related: ["controllability-matrix", "controllability"]
  },
  "observability": {
    term: "Observability", ko: "가관측성", cat: "core",
    short: "출력 $y$만 보고 초기상태 $\\mathbf x_0$를 알아낼 수 있나?",
    definition: `<p>유한시간 동안의 입력 $u$와 출력 $y$만으로 초기상태 $\\mathbf x_0$를 <strong>유일하게</strong> 결정할 수 있으면 observable. (초기치 알면 입력으로 전구간 상태 결정.)</p>
      <p>판정: 가관측성 행렬 $\\mathcal O=[C;CA;\\cdots;CA^{n-1}]$가 rank $n$. PBH: 모든 $\\lambda$에서 $\\rho\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix}=n$.</p>`,
    related: ["observability-matrix", "duality", "controllability", "detectable", "state-estimator"]
  },
  "observability-matrix": {
    term: "Observability Matrix", ko: "가관측성 행렬", cat: "core",
    short: "$\\mathcal O=[\\,C;\\ CA;\\ \\cdots;\\ CA^{n-1}\\,]$ (세로로 쌓음).",
    definition: `<p>$$\\mathcal O=\\begin{bmatrix}C\\\\CA\\\\CA^2\\\\\\vdots\\\\CA^{n-1}\\end{bmatrix},\\qquad \\rho(\\mathcal O)=n\\ \\Leftrightarrow\\ \\text{observable}$$</p>`,
    related: ["observability", "duality"]
  },
  "duality": {
    term: "Duality", ko: "쌍대성", cat: "core",
    short: "$\\{A,B\\}$ controllable ⟺ $\\{A^T,B^T\\}$ observable.",
    definition: `<p>$\\{A,B\\}$가 controllable ⟺ $\\{A^T,B^T\\}$가 observable. 마찬가지로 $\\{A,C\\}$ observable ⟺ $\\{A^T,C^T\\}$ controllable.</p>
      <p>→ 가관측성 문제를 전치해서 가제어성 결과로 그대로 푼다. Observer 설계 = 전치한 state feedback.</p>`,
    related: ["controllability", "observability", "state-estimator"]
  },
  "stabilizable": {
    term: "Stabilizable", ko: "안정화가능", cat: "core",
    short: "unstable mode가 모두 controllable (안정화만 가능하면 OK).",
    definition: `<p>controllable이 아니어도, <strong>unstable한 mode(eigenvalue가 RHP)들이 전부 controllable</strong>이면 stabilizable. state feedback으로 그 mode들을 LHP로 옮겨 안정화 가능.</p>
      <p>PBH: $\\text{Re}(\\lambda)\\ge0$인 $\\lambda$에 대해서만 $\\rho([A-\\lambda I\\ B])=n$이면 됨.</p>`,
    related: ["controllability", "detectable", "state-feedback", "pbh-test"]
  },
  "detectable": {
    term: "Detectable", ko: "검출가능", cat: "core",
    short: "unstable mode가 모두 observable.",
    definition: `<p>observable이 아니어도, <strong>unstable한 mode들이 전부 observable</strong>이면 detectable. observer로 그 상태를 추정해 안정한 추정오차를 만들 수 있음.</p>
      <p>stabilizable의 쌍대 개념.</p>`,
    related: ["observability", "stabilizable", "state-estimator"]
  },

  // ================= Ch7 핵심 =================
  "minimal-realization": {
    term: "Minimal Realization", ko: "최소실현", cat: "core",
    short: "$G(s)$를 실현하는 최소 차수 $(A,B,C,D)$. ⟺ controllable & observable.",
    definition: `<p>전달함수 $G(s)$를 실현하는 상태공간 중 <strong>차수가 가장 작은</strong> 것. $(A,B,C,D)$가 minimal ⟺ $\\{A,B\\}$ controllable <strong>그리고</strong> $\\{A,C\\}$ observable.</p>
      <p>최소 차수 = $G(s)$를 기약분수로 줄였을 때 분모 차수.</p>`,
    related: ["coprime", "controllability", "observability", "pole-zero-cancellation"]
  },
  "coprime": {
    term: "Coprime", ko: "서로소", cat: "core",
    short: "두 다항식 $N(s),D(s)$가 공통근이 없음.",
    definition: `<p>$N(s)$와 $D(s)$가 <strong>공통근(common root)이 없음</strong> = 약분되는 pole-zero가 없음.</p>
      <p>판정: 공통인수 없음 ⟺ Sylvester resultant $\\ne0$ ⟺ <strong>Bezout 항등식</strong> $A(s)N(s)+B(s)D(s)=1$을 만족하는 다항식 $A,B$ 존재.</p>`,
    related: ["minimal-realization", "sylvester-resultant", "bezout", "pole-zero-cancellation"]
  },
  "bezout": {
    term: "Bezout Identity", ko: "베주 항등식", cat: "core",
    short: "$A(s)N(s)+B(s)D(s)=1$ 해 존재 ⟺ $N,D$ coprime.",
    definition: `<p>$A(s)N(s)+B(s)D(s)=1$을 만족하는 다항식 $A(s),B(s)$가 존재 ⟺ $N(s),D(s)$가 coprime. 극배치 제어기 존재성의 근거.</p>`,
    related: ["coprime", "sylvester-resultant", "pole-placement"]
  },
  "sylvester-resultant": {
    term: "Sylvester Resultant Matrix", ko: "실베스터 종결식 행렬", cat: "core",
    short: "$D,N$ 계수를 한 칸씩 shift해 쌓은 행렬. 제어기 계수 연립방정식의 계수행렬.",
    definition: `<p>$D(s),N(s)$의 계수를 한 칸씩 밀어가며 배열한 행렬 $S_m$. 극배치 $D A+N B=F$를 $S_m\\,[\\text{제어기 계수}]=[F\\text{ 계수}]$ 연립방정식으로 바꿔 푼다.</p>
      <p>$S_m$이 full column rank ⟺ 해 존재 ⟺ 제어기 차수 $m\\ge n-1$. $D,N$ coprime이면 $m=n-1$에서 유일해.</p>`,
    related: ["coprime", "pole-placement", "coprime-fraction"]
  },

  // ================= Ch8 핵심 =================
  "state-feedback": {
    term: "State Feedback", ko: "상태궤환", cat: "core",
    short: "$\\mathbf u=r-K\\mathbf x$. 상태를 측정해 입력으로 되먹임.",
    definition: `<p>$\\mathbf u=r-K\\mathbf x$ → 폐루프 $\\dot{\\mathbf x}=(A-BK)\\mathbf x+Br$. $\\{A,B\\}$ controllable이면 $A-BK$의 eigenvalue를 <strong>임의로 배치</strong> 가능.</p>`,
    related: ["pole-placement", "feedforward-gain", "lyapunov-equation", "state-estimator", "stabilizable"]
  },
  "pole-placement": {
    term: "Pole Placement", ko: "극배치", cat: "core",
    short: "feedback gain으로 폐루프 eigenvalue를 원하는 위치로.",
    definition: `<p>$\\det(sI-(A-BK))$를 원하는 특성다항식 $\\Delta_d(s)$와 같게 만드는 $K$를 구함. 계수 비교로 연립, 또는 Lyapunov 방정식 / coprime fraction(Ch9) 방법.</p>`,
    related: ["state-feedback", "characteristic-polynomial", "lyapunov-equation", "coprime-fraction"]
  },
  "feedforward-gain": {
    term: "Feedforward Gain", ko: "전향이득", cat: "core",
    short: "$u=pr-Kx$의 $p$. 폐루프 DC gain을 1로 맞춤.",
    definition: `<p>$u=pr-Kx$에서 $p=1/G_{cl}(0)$로 잡아 $y(\\infty)=r$ (정상상태 추종) 만족. $G_{cl}(0)$은 최종값 정리로 계산.</p>`,
    related: ["tracking", "final-value-theorem", "state-feedback"]
  },
  "regulation": {
    term: "Regulation", ko: "레귤레이션", cat: "core",
    short: "명령 $r=0$. 상태/에러를 0으로 유지.",
    definition: `<p>레퍼런스가 0인 경우. 외란·초기치를 0으로 되돌리는 것이 목표.</p>`,
    related: ["tracking", "servomechanism", "state-feedback"]
  },
  "tracking": {
    term: "Tracking", ko: "추종", cat: "core",
    short: "특정 입력(step 등)을 출력이 따라가게.",
    definition: `<p>$y(t)\\to r(t)$가 되도록. 보통 step 같은 특정 신호 추종. 임의의 여러 신호 추종은 <strong>servomechanism</strong>.</p>`,
    related: ["regulation", "servomechanism", "robust-tracking", "feedforward-gain"]
  },
  "servomechanism": {
    term: "Servomechanism", ko: "서보메커니즘", cat: "core",
    short: "임의의 여러 종류 입력을 추종 (주인이 여럿).",
    definition: `<p>step뿐 아니라 ramp·sinusoid 등 여러 종류의 레퍼런스를 추종하는 제어. internal model을 통해 구현.</p>`,
    related: ["tracking", "internal-model-principle"]
  },
  "robust-tracking": {
    term: "Robust Tracking", ko: "강인 추종", cat: "core",
    short: "플랜트 파라미터가 변해도 추종 유지. 적분제어/internal model.",
    definition: `<p>플랜트 파라미터가 변동돼도 정상상태 추종오차가 0이 되도록. 핵심은 레퍼런스/외란의 unstable mode를 제어기 안에 넣는 것(internal model). step이면 적분기 $1/s$.</p>`,
    related: ["tracking", "disturbance-rejection", "integral-control", "internal-model-principle"]
  },
  "disturbance-rejection": {
    term: "Disturbance Rejection", ko: "외란 제거", cat: "core",
    short: "외란 $w$의 영향을 출력에서 제거.",
    definition: `<p>플랜트에 들어오는 외란 $w$가 출력에 미치는 영향을 정상상태에서 0으로. 외란의 unstable mode를 제어기 분모에 포함시켜 제거(internal model).</p>`,
    related: ["robust-tracking", "internal-model-principle", "integral-control"]
  },
  "integral-control": {
    term: "Integral Control", ko: "적분 제어", cat: "core",
    short: "에러를 적분해 더함. augmented state $\\dot x_a=r-y$.",
    definition: `<p>에러의 적분 $x_a=\\int(r-y)\\,dt$를 상태로 추가($\\dot x_a=r-Cx$). $u=Kx+K_ax_a$. step 추종·외란제거의 표준 도구 (internal model의 가장 단순한 형태 $1/s$).</p>`,
    related: ["robust-tracking", "internal-model-principle", "state-feedback"]
  },
  "lyapunov-equation": {
    term: "Lyapunov / Sylvester Equation", ko: "리아프노프·실베스터 방정식", cat: "core",
    short: "$AT-TF=B\\bar K$. 풀어서 $K=\\bar K T^{-1}$로 극배치.",
    definition: `<p>극배치의 또 다른 방법. 원하는 eigenvalue를 가진 $F$를 정하고 $AT-TF=B\\bar K$ (Sylvester 방정식)를 풀어 $T$ → $K=\\bar K T^{-1}$. 그러면 $A-BK=TFT^{-1}$.</p>
      <p>조건: $F$의 eigenvalue가 $A$와 겹치면 안 됨. $\\{A,B\\}$ ctrb & $\\{A,F\\}$ obsv는 $T$ nonsingular의 <strong>necessary</strong> 조건(sufficient 아님).</p>`,
    related: ["pole-placement", "state-feedback", "controllability-gramian"]
  },
  "state-estimator": {
    term: "State Estimator (Observer)", ko: "상태추정기(관측기)", cat: "core",
    short: "$\\dot{\\hat x}=(A-LC)\\hat x+Bu+Ly$. 출력으로 상태 추정.",
    definition: `<p>$\\dot{\\hat{\\mathbf x}}=(A-LC)\\hat{\\mathbf x}+Bu+Ly$. 추정오차 $e=x-\\hat x$는 $\\dot e=(A-LC)e$ — <strong>입력·상태와 무관</strong>. $\\{A,C\\}$ observable이면 $A-LC$ eigenvalue 임의배치 → $e\\to0$.</p>
      <p>estimator pole은 제어 pole보다 훨씬 왼쪽에(빨리 수렴). $L$ 크게 잡아도 비용 없음(소프트웨어).</p>`,
    related: ["observability", "duality", "separation-principle", "reduced-order-estimator", "detectable"]
  },
  "reduced-order-estimator": {
    term: "Reduced-order Estimator", ko: "축소차수 추정기", cat: "core",
    short: "출력 $q$개면 차원 $n-q$만 추정.",
    definition: `<p>출력 $y$로 이미 알 수 있는 $q$개 상태를 빼고 나머지 $n-q$개만 추정. $F$는 $(n-q)$차 stable, eigenvalue가 $A$와 안 겹쳐야 함.</p>`,
    related: ["state-estimator", "observability"]
  },
  "separation-principle": {
    term: "Separation Principle", ko: "분리 원리", cat: "core",
    short: "추정상태로 궤환해도 제어 pole과 estimator pole이 분리.",
    definition: `<p>$\\hat{\\mathbf x}$로 state feedback해도 폐루프 eigenvalue = <strong>{제어용 $A-BK$ pole} ∪ {estimator $A-LC$ pole}</strong>. 둘을 독립적으로 설계 가능. $r\\to y$ 전달함수는 estimator가 없는 것과 동일.</p>`,
    related: ["state-estimator", "state-feedback", "pole-placement"]
  },

  // ================= Ch9 핵심 =================
  "coprime-fraction": {
    term: "Coprime Fraction Design", ko: "서로소분수 설계", cat: "core",
    short: "$G=\\frac{N}{D},\\ C=\\frac{B}{A}$로 폐루프 특성식 $DA+NB=F$.",
    definition: `<p>플랜트 $G=\\frac{N(s)}{D(s)}$, 제어기 $C=\\frac{B(s)}{A(s)}$. 폐루프 특성다항식 $$F(s)=D(s)A(s)+N(s)B(s)$$ 를 원하는 극의 다항식과 같게. Sylvester 행렬로 $A,B$ 계수 풀이.</p>`,
    related: ["sylvester-resultant", "coprime", "pole-placement", "internal-model-principle"]
  },
  "internal-model-principle": {
    term: "Internal Model Principle", ko: "내부모델 원리", cat: "core",
    short: "레퍼런스/외란의 unstable mode를 제어기 안에 포함시켜라.",
    definition: `<p>레퍼런스 $r$·외란 $w$의 unstable pole들의 LCM $\\phi(s)$를 제어기 분모에 포함시키면 그 신호를 추종/제거할 수 있다. step이면 $\\phi=s$ (적분기), $\\sin\\omega t$면 $\\phi=s^2+\\omega^2$.</p>
      <p>조건: $\\phi(s)$의 근이 $N(s)$의 zero가 아닐 것(약분 금지). PID의 적분기가 이 원리.</p>`,
    related: ["robust-tracking", "integral-control", "coprime-fraction", "servomechanism"]
  },
  "model-matching": {
    term: "Model Matching", ko: "모델 매칭", cat: "core",
    short: "$r\\to y$ 전달함수를 원하는 모델 $G_o(s)$와 같게 (pole+zero 모두).",
    definition: `<p>극배치가 pole만 맞춘다면, model matching은 <strong>pole과 zero 모두</strong>를 목표모델 $G_o(s)$에 맞춤. $G_o=1$이면 best possible(명령 그대로 추종).</p>`,
    related: ["pole-placement", "implementable", "coprime-fraction"]
  },
  "implementable": {
    term: "Implementable Transfer Function", ko: "구현가능 전달함수", cat: "core",
    short: "proper + 플랜트 통과 + total stable. 3조건.",
    definition: `<p>목표 전달함수 $G_o(s)$가 실제 구현 가능하려면: ① <strong>proper</strong>(분모차수≥분자차수), ② $r\\to y$가 반드시 <strong>플랜트를 통과</strong>(옆으로 새지 않음), ③ <strong>total stability</strong>.</p>`,
    related: ["model-matching", "well-posed", "total-stability", "proper"]
  },
  "well-posed": {
    term: "Well-posedness", ko: "적절성", cat: "core",
    short: "모든 input-output pair 전달함수가 proper. 조건 $G(\\infty)C(\\infty)\\ne-1$.",
    definition: `<p>폐루프의 모든 입력→출력 전달함수가 proper. 조건: $1+G(\\infty)C(\\infty)\\ne0$. $G$가 strictly proper면 $G(\\infty)=0$이라 무조건 well-posed.</p>`,
    related: ["proper", "total-stability", "implementable"]
  },
  "total-stability": {
    term: "Total Stability", ko: "전체 안정성", cat: "core",
    short: "모든 입출력쌍 BIBO + unstable pole-zero cancellation 없음.",
    definition: `<p>$r\\to y$뿐 아니라 모든 입력(noise 포함)→모든 출력 전달함수가 BIBO stable. 핵심: 제어기와 플랜트 사이에 <strong>unstable pole-zero cancellation이 없을 것</strong>. 약분된 unstable mode는 noise를 통해 발산.</p>`,
    related: ["bibo-stability", "pole-zero-cancellation", "well-posed", "implementable"]
  },
  "pole-zero-cancellation": {
    term: "Pole-Zero Cancellation", ko: "극-영점 상쇄", cat: "core",
    short: "분모 pole과 분자 zero가 약분. unstable한 게 약분되면 위험.",
    definition: `<p>전달함수에서 같은 위치의 pole과 zero가 약분. <strong>unstable한($\\text{Re}\\ge0$) pole-zero가 약분</strong>되면 겉보기엔 안정해도 내부적으로 그 mode가 살아 있어 noise/외란에 발산 → total stability 깨짐.</p>`,
    related: ["total-stability", "minimal-realization", "coprime"]
  },
  "mason-gain": {
    term: "Mason's Gain Rule", ko: "메이슨 이득 공식", cat: "core",
    short: "$T=\\frac{\\sum P_k\\Delta_k}{\\Delta}$. 블록선도 전달함수.",
    definition: `<p>$$T=\\frac{\\sum_k P_k\\Delta_k}{\\Delta},\\quad \\Delta=1-\\sum L_i+\\sum L_iL_j-\\cdots$$ $P_k$=forward path 이득, $L$=loop 이득, $\\Delta_k$=$P_k$에 안 닿는 loop만 남긴 $\\Delta$.</p>`,
    related: ["transfer-function"]
  },
  "proper": {
    term: "Proper", ko: "프로퍼", cat: "core",
    short: "분모차수 ≥ 분자차수. strictly proper면 >.",
    definition: `<p>전달함수의 분모 차수 ≥ 분자 차수면 proper(현실적 — 미분기 불필요). 분모 > 분자면 strictly proper. 분자 > 분모(improper)는 미분이 필요해 noise에 취약.</p>`,
    related: ["well-posed", "implementable"]
  },
};

// ============================================================
// Glossary index page — simple browser for all terms.
// ============================================================
registerPage("glossary-index", "용어 사전 전체", () => {
  const entries = Object.entries(window.GLOSSARY);
  const coreCount = entries.filter(([, v]) => v.cat === "core").length;
  const prereqCount = entries.filter(([, v]) => v.cat === "prereq").length;

  const renderEntry = ([key, v]) => `
    <div class="glossary-entry ${v.cat === "prereq" ? "prereq" : ""}"
         data-key="${key}" data-cat="${v.cat}"
         data-searchable="${(key + " " + (v.term || "") + " " + (v.ko || "") + " " + (v.short || "")).toLowerCase()}"
         onclick="window.openTerm('${key}')">
      <span class="glossary-term">${v.term}</span><span class="glossary-ko">${v.ko || ""}</span>
      <div class="glossary-def">${v.short || ""}</div>
    </div>`;

  return `
    <div class="glossary-wrap">
      <h1>📚 용어 사전 전체</h1>
      <p class="lead">항목을 클릭하면 <strong>우측 패널</strong>에서 자세한 설명이 열려.
      본문의 밑줄 친 용어도 마찬가지 — 페이지 이동 없이 바로 확인 가능.</p>
      <input class="glossary-search" id="gl-search" type="text"
        placeholder="검색 — 영어·한글·설명 어디든 (예: controllable, 가관측, PBH, coprime, observer)"
        oninput="window.glFilter()" />
      <div class="glossary-categories">
        <button class="active" data-gl-cat="all" onclick="window.glCat('all')">전체 (${entries.length})</button>
        <button data-gl-cat="core" onclick="window.glCat('core')">🔷 기말 핵심 (${coreCount})</button>
        <button data-gl-cat="prereq" onclick="window.glCat('prereq')">🌱 선행 복습 (${prereqCount})</button>
      </div>
      <div id="glossary-list">${entries.map(renderEntry).join("")}</div>
    </div>
  `;
});

window.glFilter = function () {
  const q = (document.getElementById("gl-search")?.value || "").trim().toLowerCase();
  const activeCat = document.querySelector(".glossary-categories button.active")?.dataset.glCat || "all";
  document.querySelectorAll(".glossary-entry").forEach(el => {
    const matchCat = activeCat === "all" || el.dataset.cat === activeCat;
    const matchQ = !q || el.dataset.searchable.includes(q);
    el.style.display = matchCat && matchQ ? "" : "none";
  });
};

window.glCat = function (cat) {
  document.querySelectorAll(".glossary-categories button").forEach(b =>
    b.classList.toggle("active", b.dataset.glCat === cat));
  window.glFilter();
};
