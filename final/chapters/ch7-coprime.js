registerPage("ch7-coprime", "Minimal Realization & Coprimeness", () => `
<h1>Ch 7 — Minimal Realization & Coprimeness (최소실현·서로소)</h1>
<p class="lead">${tag("출제 유력", "exam")} ${tag("개념", "concept")} coprimeness 판정은 족보 단골(15점 패턴)이고, minimal realization 차수 묻기도 자주 나와. 무엇보다 <strong>Ch9 극배치의 해 존재 조건이 바로 coprime</strong>이라 여기서 개념을 확실히 잡고 가야 돼.</p>

${profMemo(`이 단원은 계산이 무겁지 않아. "공통근 있냐 없냐" 그 한 가지를 다양한 방법으로 확인하는 게 전부야. 대신 <strong>왜</strong> 공통근이 중요한지를 묻는 서술/개념 문제가 잘 나와 — pole-zero cancellation → not minimal → Ch9 total stability 깨짐, 이 연결고리를 한 문장으로 말할 수 있으면 끝.`)}

<h2>1. Minimal Realization (최소실현)</h2>

${defCard("Minimal Realization 정의", `
전달함수 $G(s)$를 실현(realize)하는 상태공간 $(A,B,C,D)$는 무수히 많아. 그중 <strong>상태변수 개수(=차수, $A$의 크기)가 가장 작은</strong> 것을 ${term("minimal-realization")}이라고 불러.
$$G(s) = C(sI-A)^{-1}B + D \\quad\\text{를 실현하는 최소 차수 } (A,B,C,D)$$
`)}

${defCard("핵심 정리 — Minimal ⟺ controllable & observable", `
$(A,B,C,D)$가 minimal realization이다
$$\\Longleftrightarrow \\quad \\{A,B\\}\\text{ 가 } controllable \\;\\textbf{AND}\\; \\{A,C\\}\\text{ 가 } observable.$$
즉 가제어성(${term("controllability")})과 가관측성(${term("observability")})을 <strong>동시에</strong> 만족해야 minimal.
`)}

${note(`<strong>왜 둘 다 필요?</strong> controllable이 아니면 입력이 못 건드리는 mode가 있고, observable이 아니면 출력에 안 비치는 mode가 있어. 둘 중 하나라도 빠진 mode는 입력→출력($G(s)$)에 안 나타나니까, 그냥 빼버려도 같은 $G(s)$를 만들 수 있어. → 차수를 줄일 여지가 남아있다 = minimal 아님.`, "info")}

${defCard("최소 차수 = 기약분수 분모 차수", `
스칼라(SISO) 전달함수면 계산이 아주 간단해. $G(s)=\\dfrac{N(s)}{D(s)}$를 <strong>약분 끝까지 한(기약분수, irreducible)</strong> 형태로 줄였을 때, 그 <strong>분모의 차수</strong>가 곧 minimal realization의 차수야.
$$\\deg(\\text{minimal}) = \\deg\\big(D_{\\text{기약}}(s)\\big)$$
`)}

${concept("왜 \"기약분수 분모 차수\"가 controllable & observable과 같은 말일까?", `
SISO에서 $G=\\dfrac{N}{D}$를 controllable canonical form으로 실현하면 그 차수는 $\\deg D$야. 이 실현은 항상 controllable이고, 약분되는 인수($N,D$의 공통근)가 없을 때 비로소 observable도 돼.<br><br>
공통근 $s=p$가 있으면 그 $p$가 바로 "uncontrollable이거나 unobservable한 mode"로 나타나서 입출력에 안 비치고, 약분하면 사라져. 그래서 <strong>약분이 다 끝난(=공통근 없는=coprime) 상태의 분모 차수</strong>가 minimal 차수가 되는 거야. → coprime 개념이 자연스럽게 등장.
`)}

${note(`<strong>위험 신호: pole-zero cancellation.</strong> $N$과 $D$가 공통근을 가지면(=약분되면) 그건 ${term("pole-zero-cancellation")}이 있다는 뜻 → 그 realization은 minimal이 아니야. 특히 <strong>unstable한(Re≥0) pole-zero가 약분</strong>되면 Ch9의 ${term("total-stability")}까지 깨져. 겉보기엔 안정해 보여도 noise를 통해 그 mode가 발산하거든.`, "warn")}

<h2>2. Coprime (서로소)</h2>

${defCard("Coprime 정의", `
두 다항식 $N(s)$와 $D(s)$가 <strong>공통근(common root)이 하나도 없으면</strong> ${term("coprime")}(서로소)이라고 해. 같은 말로 "공통인수(common factor)가 상수뿐", "약분되는 게 없다"는 뜻이야.
$$N(s),\\,D(s)\\text{ coprime} \\iff \\text{공통근 없음} \\iff \\dfrac{N}{D}\\text{가 이미 기약분수}.$$
`)}

${note(`<strong>한 줄 직관:</strong> coprime = "약분 안 됨". 약분되는 게 없으니 $\\frac{N}{D}$는 더 줄일 수 없는 기약분수고, 그래서 그 분모 차수가 곧 minimal 차수가 돼.`, "info")}

<h3>판정법 3가지</h3>
<table>
  <tr><th>방법</th><th>아이디어</th><th>언제 쓰나</th></tr>
  <tr><td>① 공통인수 직접 확인</td><td>$N,D$를 인수분해해서 같은 근 있나 본다</td><td>손계산 2~3차, 시험 기본</td></tr>
  <tr><td>② Sylvester resultant</td><td>${term("sylvester-resultant")} $\\ne 0$ ⟺ coprime</td><td>인수분해 귀찮을 때, 기계적 판정</td></tr>
  <tr><td>③ ${term("bezout", "Bezout 항등식")}</td><td>$A(s)N(s)+B(s)D(s)=1$ 해 존재 ⟺ coprime</td><td>이론적 근거, Ch9 극배치 연결</td></tr>
</table>

${defCard("방법 ① 공통인수 직접 확인", `
$N(s)=0$의 근들과 $D(s)=0$의 근들을 구해서 <strong>겹치는 근이 있나</strong> 본다. 하나도 안 겹치면 coprime, 하나라도 겹치면 not coprime(약분됨).<br>
예: $N=s+1$의 근 $\\{-1\\}$, $D=(s+2)(s+3)$의 근 $\\{-2,-3\\}$ → 안 겹침 → <strong>coprime</strong>.
`)}

${defCard("방법 ② Sylvester Resultant", `
$D(s),N(s)$의 계수를 한 칸씩 밀어가며 쌓은 정방행렬 ${term("sylvester-resultant")}의 행렬식(resultant)을 계산해.
$$\\text{Resultant}(N,D)\\ne 0 \\iff N,D\\text{ coprime}.$$
resultant가 $0$이면 공통근이 있다(=약분된다)는 뜻. 인수분해가 어려운 고차에서 "근을 안 구하고" 판정할 수 있는 게 장점.
`)}

${collapse("Sylvester resultant 작은 예시 펼쳐보기", `
$N(s)=s+1$ (계수 $[1,1]$), $D(s)=s+2$ (계수 $[1,2]$)에 대한 $2\\times2$ Sylvester 행렬:
$$S=\\begin{bmatrix} 1 & 2 \\\\ 1 & 1 \\end{bmatrix},\\qquad \\det S = 1\\cdot1 - 2\\cdot1 = -1 \\ne 0.$$
$0$이 아니므로 $s+1$과 $s+2$는 <strong>coprime</strong>(공통근 없음, 실제로 근이 $-1$과 $-2$로 다름) — ① 방법과 결론 일치.<br><br>
반대로 $N=D=s+1$이면 행렬이 $\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$, $\\det=0$ → 공통근 있음(둘 다 $-1$) → not coprime. 검산 끝.
`)}

${defCard("방법 ③ Bezout 항등식", `
$N(s),D(s)$가 coprime ⟺ 어떤 다항식 $A(s),B(s)$가 존재해서
$$A(s)\\,N(s) + B(s)\\,D(s) = 1$$
을 만족시킬 수 있어. 이게 ${term("bezout", "Bezout(베주) 항등식")}이야.
`)}

${note(`<strong>Bezout 직관 — \"coprime이면 1을 만들 수 있다\".</strong> 정수로 비유하면 $\\gcd(N,D)=1$일 때만 $aN+bD=1$ 정수해가 있는 거랑 똑같아 (예: $\\gcd(3,5)=1$이니 $2\\cdot3+(-1)\\cdot5=1$). 다항식판도 마찬가지 — 공통근이 없어야 두 다항식을 적절히 섞어서 "상수 1"까지 깎아낼 수 있어. 공통근 $p$가 있으면 $s=p$에서 좌변 $=0$이라 절대 $1$이 못 돼.`, "tip")}

${concept("Bezout이 Ch9 극배치 해 존재성의 근거인 이유 (예고)", `
${term("coprime-fraction", "Coprime fraction 설계")}(Ch9)에서 폐루프 특성다항식을 원하는 $F(s)$로 만들려면 제어기 계수 $A(s),B(s)$를
$$D(s)A(s) + N(s)B(s) = F(s)$$
로 풀어야 해. Bezout은 우변이 $1$인 특수 경우($F=1$)인데, $N,D$가 coprime이면 우변을 <strong>임의의 $F(s)$</strong>로 바꿔도 항상 해가 존재함이 보장돼(${term("sylvester-resultant")}가 full rank). <br><br>
즉 <strong>"플랜트의 $N,D$가 coprime ⟹ 원하는 극을 항상 배치할 수 있다"</strong>가 Ch9의 핵심 정리고, 그 뿌리가 여기 Bezout이야. 반대로 unstable한 pole-zero가 약분되면(not coprime) 극배치가 막히거나 total stability가 깨져.`)}

<h2>3. Walkthrough 1 — Coprimeness 판정 (족보 p3-4)</h2>

${note(`족보 p3-4 문제: $G(s)=\\dfrac{1}{s+1}$, $H(s)=\\dfrac{(s+3)(s+4)}{(s+1)(s+2)}$. "이 둘이 coprime인지 확인하라." 핵심은 <strong>무엇과 무엇의 공통근</strong>을 보는지 정확히 잡는 거야.`, "info")}

${walkthrough("G와 H의 coprimeness 확인", [
  {
    title: "무엇끼리 비교할지 정한다",
    body: `coprime은 <strong>두 다항식</strong> 사이의 성질이야. 보통 이 문제에선 "직렬로 연결된 두 블록 사이에 약분되는 인수(공통근)가 있나"를 본다. <br><br>
    $G=\\dfrac{N_G}{D_G}=\\dfrac{1}{s+1}$ → $N_G=1,\\ D_G=s+1$.<br>
    $H=\\dfrac{N_H}{D_H}=\\dfrac{(s+3)(s+4)}{(s+1)(s+2)}$ → $N_H=(s+3)(s+4),\\ D_H=(s+1)(s+2)$.`
  },
  {
    title: "각 다항식의 근(roots)을 나열",
    body: `$N_G=1$: 근 없음 (상수).<br>
    $D_G=s+1$: 근 $\\{-1\\}$.<br>
    $N_H=(s+3)(s+4)$: 근 $\\{-3,\\,-4\\}$.<br>
    $D_H=(s+1)(s+2)$: 근 $\\{-1,\\,-2\\}$.`
  },
  {
    title: "주의 — \"공통근\"을 어디서 찾아야 하나",
    body: `함정: $D_G=s+1$과 $D_H=(s+1)(s+2)$는 둘 다 $s=-1$을 근으로 가져. 하지만 이건 <strong>분모끼리</strong>의 공유라 약분 대상이 아니야(분자×분모로 만나야 cancellation).<br><br>
    직렬 연결 $G\\cdot H$의 약분은 <strong>한쪽 분자와 다른 쪽 분모</strong>가 같은 근을 가질 때 일어나:<br>
    • $N_G=1$ vs $D_H=(s+1)(s+2)$ → $N_G$엔 근이 없으니 공유 불가.<br>
    • $N_H=(s+3)(s+4)$ vs $D_G=s+1$ → 근 $\\{-3,-4\\}$ vs $\\{-1\\}$, 겹치지 않음.`
  },
  {
    title: "결론 — no common root → coprime",
    body: `분자 쪽 근 $\\{-3,-4\\}$ 어느 것도 분모 쪽 근 $\\{-1,-2\\}$와 겹치지 않아. 즉 약분되는 pole-zero가 없어.<br>
    $$\\therefore\\ \\text{공통근 없음} \\Rightarrow \\textbf{coprime}.$$
    특히 unstable한($\\text{Re}\\ge0$) 공통근은 더더욱 없으니 ${term("total-stability")} 관점에서도 안전. ("no (unstable) common zero → coprime" 결론.)`
  },
]
)}

${note(`<strong>시험 답안 팁:</strong> "근을 나열 → 분자근과 분모근이 안 겹침 → 공통근 없음 → coprime" 이 4줄이면 만점. $s=-1$이 분모끼리 겹친다고 해서 "약분된다"고 쓰면 감점이야 — 분자·분모가 만나야 약분이지.`, "tip")}

<h2>4. Walkthrough 2 — Minimal Realization 차수 구하기</h2>

${note(`전형적 문제: 주어진 $G(s)$의 minimal realization 차수를 구하라. 비법은 <strong>약분 → 기약분수 → 분모 차수</strong> 단 세 단계.`, "info")}

${walkthrough("G(s)=(s+1)/((s+1)(s+2))의 minimal 차수", [
  {
    title: "원래 형태와 겉보기 차수",
    body: `$$G(s)=\\frac{s+1}{(s+1)(s+2)}=\\frac{s+1}{s^2+3s+2}.$$
    분모를 전개하면 $s^2+3s+2$ → <strong>겉보기 차수 2</strong>. 하지만 이게 minimal이라고 단정하면 안 돼. 먼저 약분되는지 확인!`
  },
  {
    title: "공통인수(공통근) 찾기",
    body: `$N=s+1$의 근 $\\{-1\\}$, $D=(s+1)(s+2)$의 근 $\\{-1,-2\\}$.<br>
    $s=-1$이 <strong>분자·분모에 동시에</strong> 존재 → 공통근! → 이건 ${term("pole-zero-cancellation")}이 있다는 뜻이고, 따라서 원래 2차 실현은 <strong>minimal이 아니다</strong>.`
  },
  {
    title: "약분해서 기약분수로",
    body: `공통인수 $(s+1)$을 약분:
    $$G(s)=\\frac{\\cancel{(s+1)}}{\\cancel{(s+1)}(s+2)}=\\frac{1}{s+2}.$$
    이제 분자 $1$(근 없음)과 분모 $s+2$(근 $-2$)는 공통근이 없어 → <strong>coprime, 기약분수 완성</strong>.`
  },
  {
    title: "결론 — 분모 차수 = minimal 차수",
    body: `기약분수 $\\dfrac{1}{s+2}$의 분모 $s+2$는 1차.
    $$\\therefore\\ \\deg(\\text{minimal realization}) = 1.$$
    겉보기 2차였지만 약분 가능한 mode($s=-1$) 하나가 uncontrollable-or-unobservable이라 빠지고, <strong>최소 차수는 1</strong>. 1차 실현 예: $A=-2,\\ B=1,\\ C=1,\\ D=0$ → $G=C(sI-A)^{-1}B=\\dfrac{1}{s+2}$ ✓`
  },
]
)}

${concept("한 번 더 — 약분 안 되는 경우 차수", `
$G(s)=\\dfrac{s+1}{(s+2)(s+3)}$이면? 분자근 $\\{-1\\}$, 분모근 $\\{-2,-3\\}$ → 안 겹침 → 이미 coprime/기약분수.<br>
분모 $(s+2)(s+3)=s^2+5s+6$은 2차 → <strong>minimal 차수 = 2</strong>. 약분할 게 없으니 겉보기 차수가 그대로 minimal 차수야.`)}

<h2>5. 큰 그림 — 왜 이게 Ch9로 이어지나</h2>

${defCard("연결고리 정리", `
<strong>coprime / minimal</strong> → <strong>pole-zero cancellation 없음</strong> → <strong>total stability 안전</strong> → <strong>극배치 해 존재</strong>.<br><br>
• not coprime(약분됨) ⟹ realization not minimal.<br>
• 특히 <strong>unstable</strong> pole-zero가 약분 ⟹ ${term("total-stability")} 깨짐(noise로 발산).<br>
• $N,D$ coprime ⟹ ${term("bezout")}/${term("sylvester-resultant")}로 ${term("pole-placement", "극배치")} 해가 항상 존재(${term("coprime-fraction")}, Ch9).`
)}

${profMemo(`개념 문제 대비 한 문장: <strong>"$N$과 $D$가 coprime이어야 minimal realization이 되고, 그래야 Ch9에서 unstable pole-zero cancellation 없이 원하는 극을 안정적으로 배치할 수 있다."</strong> 이거 말로 설명할 수 있으면 이 단원은 졸업.`)}

<h2>6. 체크 퀴즈</h2>

${mcQuiz(
  "$G(s)=\\dfrac{s+2}{(s+2)(s-1)}$의 minimal realization 차수는?",
  ["2", "1", "3", "0"],
  1,
  "분자근 $\\{-2\\}$, 분모근 $\\{-2,1\\}$ → $s=-2$가 공통근이라 약분됨. $G=\\dfrac{1}{s-1}$ → 기약분수 분모 $s-1$은 1차. 따라서 minimal 차수 = <strong>1</strong>. (덤: 약분된 게 $s=-2$로 stable이라 그나마 total stability엔 문제 없지만, minimal이 아닌 건 분명.)"
)}

${mcQuiz(
  "$N(s)=s+3$, $D(s)=s^2+5s+6$이 coprime인지 판정하면?",
  [
    "coprime이다 (공통근 없음)",
    "coprime 아니다 ($s=-3$이 공통근)",
    "coprime 아니다 ($s=-2$가 공통근)",
    "판정 불가"
  ],
  1,
  "$D=s^2+5s+6=(s+2)(s+3)$, 근 $\\{-2,-3\\}$. $N=s+3$의 근 $\\{-3\\}$. $s=-3$이 양쪽에 공통 → 약분됨 → <strong>coprime 아님</strong>. (Sylvester로 봐도 resultant $=0$.)"
)}

${mcQuiz(
  "$(A,B,C,D)$가 minimal realization일 필요충분조건은?",
  [
    "$\\{A,B\\}$ controllable만 하면 된다",
    "$\\{A,C\\}$ observable만 하면 된다",
    "$\\{A,B\\}$ controllable 그리고 $\\{A,C\\}$ observable",
    "$A$가 stable이기만 하면 된다"
  ],
  2,
  "minimal ⟺ controllable <strong>AND</strong> observable. 둘 중 하나라도 빠지면 입출력에 안 비치는 mode가 있어 차수를 더 줄일 수 있다 = minimal 아님."
)}

${mcQuiz(
  "다항식 $N,D$에 대해 Bezout 항등식 $A(s)N(s)+B(s)D(s)=1$의 해 $A,B$가 존재한다는 것은?",
  [
    "$N,D$가 coprime이라는 뜻",
    "$N,D$가 공통근을 가진다는 뜻",
    "$N=D$라는 뜻",
    "항상 성립하므로 아무 정보도 없다"
  ],
  0,
  "Bezout 항등식의 해 존재 ⟺ $N,D$ coprime. 공통근 $p$가 있으면 $s=p$에서 좌변이 $0$이 되어 절대 $1$이 될 수 없어. 이게 Ch9 극배치 해 존재성($DA+NB=F$)의 근거야."
)}
`);
