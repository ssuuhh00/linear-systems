registerPage("ch9-poleplacement", "Coprime Fraction 극배치", () => `
<h1>Ch 9 — Coprime Fraction 극배치 (Sylvester)</h1>
<p class="lead">${tag("매우 출제 유력", "must")} ${tag("Ch9 핵심", "exam")} 교수님이 0526·0528 두 번 같은 예제로 풀어줬어. <strong>거의 확정으로 나온다고 보고 절차를 손에 익혀.</strong></p>

${profMemo(`<strong>"중학생도 푸는 연립방정식 낸다"</strong>는 게 교수님 워딩. 행렬 만들고($S_m$) 계수 비교해서 연립 푸는 게 전부야. 손계산으로 깔끔히 떨어지게 출제하니까, ① 전달함수 → $N,D$ 계수 뽑기 ② 제어기 차수 $m=n-1$ 정하기 ③ $F=DA+NB$ 전개해서 계수 비교 ④ 연립 풀기 — 이 4단계만 기계적으로 하면 돼. 마지막에 $F(s)$ 전개로 검산까지 하면 만점.`)}

<h2>1. 구조 — 플랜트와 제어기를 분수로</h2>
${defCard("Coprime Fraction 설계", `
플랜트 ${term("transfer-function", "전달함수")}를 분수로: $G(s)=\\dfrac{N(s)}{D(s)}$ &nbsp;(분모 차수 $=n$, ${term("coprime", "coprime")}이라고 가정).<br>
제어기도 분수로: $C(s)=\\dfrac{B(s)}{A(s)}$ &nbsp;(차수 $m$).<br><br>
단위궤환(unity feedback)으로 닫으면 폐루프 ${term("characteristic-polynomial", "특성다항식")}은
$$\\boxed{F(s)=D(s)A(s)+N(s)B(s)}$$
이 $F(s)$를 <strong>우리가 원하는 극의 다항식</strong>과 같게 만드는 $A,B$를 구하는 게 ${term("coprime-fraction", "극배치")}야.`)}

${note(`상태궤환(Ch8)은 상태 $\\mathbf x$를 다 측정해야 했지만, 여기선 <strong>입출력 전달함수만</strong> 가지고 제어기를 설계해. 측정 가능한 $y$만 쓰는 출력궤환이라 현실적이야.`, "info")}

<h2>2. Sylvester resultant matrix — 연립방정식으로 바꾸기</h2>
<p>$F=DA+NB$는 다항식 항등식이야. 양변의 $s$ 차수별 계수를 맞추면 $A,B$의 계수에 대한 <strong>선형 연립방정식</strong>이 돼. 그 계수행렬이 ${term("sylvester-resultant", "Sylvester resultant matrix")} $S_m$.</p>

${defCard("$S_m$ 만드는 법", `
$D(s)=d_0+d_1s+\\cdots+d_ns^n$, $N(s)=n_0+n_1s+\\cdots+n_ns^n$ 라 하자.<br>
$D$ 계수 열과 $N$ 계수 열을 <strong>한 칸씩 아래로 shift</strong>하며 번갈아 쌓아. 제어기 차수가 $m$이면 $A,B$ 각각 $m{+}1$개씩 총 $2(m{+}1)$개 미지수가 나오고, $S_m$은 $(n{+}m{+}1)\\times 2(m{+}1)$ 크기.<br>
$$S_m\\,\\begin{bmatrix}a_0\\\\b_0\\\\a_1\\\\b_1\\\\\\vdots\\end{bmatrix}=\\begin{bmatrix}f_0\\\\f_1\\\\\\vdots\\\\f_{n+m}\\end{bmatrix}\\quad(F\\text{의 계수})$$`)}

${concept("해 존재 조건 (Theorem 9.M) — 차수 조건이 시험 단골", `
$S_m$이 <strong>full column rank</strong>여야 임의의 $F(s)$에 대해 해가 존재해. 이게 성립하는 조건이:
<ul>
<li>제어기 차수 $m \\ge n-1$ &nbsp;(필요한 free parameter 수 확보)</li>
<li>$D(s)$와 $N(s)$가 <strong>coprime</strong></li>
</ul>
이 둘이면 $m=n-1$에서 <strong>유일해</strong>가 나와 (정방 $S_m$, $\\det\\ne0$). $D,N$이 coprime이라는 게 ${term("bezout", "Bezout 항등식")} 존재성과 같은 이야기라, 약분되는 pole-zero가 있으면 ($m=n-1$에선) 못 풀어.`, {open: true})}

${note(`<strong>왜 $m \\ge n-1$?</strong> $F(s)$의 차수가 $n+m$이라 계수가 $n+m+1$개. 미지수는 $2(m+1)$개. 미지수 ≥ 식이려면 $2(m+1)\\ge n+m+1$ → $m\\ge n-1$. 직관: "원하는 극을 다 박으려면 제어기에 다이얼이 충분히 많아야 한다."`, "tip")}

<h2>3. ⭐ 핵심 예제 — $G(s)=\\dfrac{s-2}{s^2-1}$</h2>
<p>교수님이 두 번 푼 바로 그 예제. $n=2$라서 $m=n-1=1$, 제어기는 1차야.</p>

${walkthrough("$G(s)=\\dfrac{s-2}{s^2-1}$ 에 극 $\\{-1,-2,-3\\}$ 배치하기", [
  {
    title: "$N, D$ 계수 뽑기 + 제어기 차수 정하기",
    body: `$$N(s)=s-2=-2+1\\cdot s,\\qquad D(s)=s^2-1=-1+0\\cdot s+1\\cdot s^2$$
    $n=2$ → $m=n-1=1$. 제어기는
    $$A(s)=a_0+a_1s,\\qquad B(s)=b_0+b_1s,\\qquad C(s)=\\frac{B(s)}{A(s)}.$$
    미지수 4개 ($a_0,a_1,b_0,b_1$). 먼저 $N,D$가 coprime인지 확인: $D=0$의 근은 $s=\\pm1$, $N=0$의 근은 $s=2$ → 공통근 없음 → <strong>coprime ✓</strong> → $m=1$에서 유일해 보장.`
  },
  {
    title: "원하는 특성다항식 $F(s)$ 정하기",
    body: `폐루프 차수는 $n+m=3$. 극을 $\\{-1,-2,-3\\}$로 잡으면
    $$F(s)=(s+1)(s+2)(s+3)=s^3+6s^2+11s+6.$$
    즉 계수는 $f_0=6,\\ f_1=11,\\ f_2=6,\\ f_3=1$ ($s^0$부터 $s^3$ 순서).`
  },
  {
    title: "$F=DA+NB$ 전개",
    body: `$$DA=(-1+s^2)(a_0+a_1s)=-a_0-a_1s+a_0s^2+a_1s^3$$
    $$NB=(-2+s)(b_0+b_1s)=-2b_0+(b_0-2b_1)s+b_1s^2$$
    더해서 차수별로 모으면:
    $$F=\\underbrace{(-a_0-2b_0)}_{s^0}+\\underbrace{(-a_1+b_0-2b_1)}_{s^1}\\,s+\\underbrace{(a_0+b_1)}_{s^2}\\,s^2+\\underbrace{a_1}_{s^3}\\,s^3$$`
  },
  {
    title: "계수 비교 → Sylvester 연립",
    body: `위 $F$ 계수 = $\\{6,11,6,1\\}$ 라 놓으면 ($s^0\\!\\to\\!s^3$):
    <br>
    ${matrix([
      ["-1","0","-2","0","a_0","6"],
      ["0","-1","1","-2","a_1","11"],
      ["1","0","0","1","b_0","6"],
      ["0","1","0","0","b_1","1"]
    ])}
    <br>왼쪽 $4\\times4$가 Sylvester 행렬 $S_m$ (가운데 열은 미지수 벡터, 오른쪽은 $F$ 계수). 식으로 쓰면:
    $$\\begin{aligned}
    -a_0-2b_0&=6\\\\
    -a_1+b_0-2b_1&=11\\\\
    a_0+b_1&=6\\\\
    a_1&=1
    \\end{aligned}$$`
  },
  {
    title: "연립 풀기",
    body: `맨 아래부터: $a_1=1$.<br>
    셋째 식: $a_0=6-b_1$.<br>
    첫째 식: $-(6-b_1)-2b_0=6\\Rightarrow b_1-2b_0=12$.<br>
    둘째 식: $-1+b_0-2b_1=11\\Rightarrow b_0-2b_1=12$.<br>
    이 둘을 빼면 $(b_1-2b_0)-(b_0-2b_1)=0\\Rightarrow 3b_1-3b_0=0\\Rightarrow b_1=b_0$.<br>
    $b_0-2b_1=12$에 넣으면 $-b_0=12\\Rightarrow b_0=-12,\\ b_1=-12$.<br>
    그러면 $a_0=6-b_1=6-(-12)=18$.<br><br>
    $$\\boxed{a_0=18,\\quad a_1=1,\\quad b_0=-12,\\quad b_1=-12}$$`
  },
  {
    title: "제어기 + 검산",
    body: `$$\\boxed{C(s)=\\frac{B(s)}{A(s)}=\\frac{-12s-12}{s+18}=\\frac{-12(s+1)}{s+18}}$$
    <strong>검산:</strong> $F=DA+NB$를 직접 전개<br>
    $DA=(s^2-1)(s+18)=s^3+18s^2-s-18$<br>
    $NB=(s-2)(-12s-12)=-12s^2-12s+24s+24=-12s^2+12s+24$<br>
    합 $=s^3+(18-12)s^2+(-1+12)s+(-18+24)=s^3+6s^2+11s+6$ ✓ — 원하던 $(s+1)(s+2)(s+3)$ 그대로.`
  },
  {
    title: "Tracking 확인 (G(0) / DC gain)",
    body: `폐루프 $r\\to y$ 전달함수는 $\\dfrac{N(s)B(s)}{F(s)}$. ${term("final-value-theorem", "최종값 정리")}로 step 정상값 = DC gain:
    $$\\left.\\frac{NB}{F}\\right|_{s=0}=\\frac{N(0)B(0)}{F(0)}=\\frac{(-2)(-12)}{6}=\\frac{24}{6}=4\\ne1.$$
    극은 원하는 대로 갔지만 <strong>DC gain이 1이 아니라서 step을 정확히 추종 못 해</strong>. → 정확 추종하려면 적분기(internal model)를 넣어야 함 (다음 페이지!).`
  }
])}

${note(`극배치는 <strong>안정성(극 위치)만</strong> 보장해. 정상상태 추종(DC gain=1)은 별개 문제라 ${term("feedforward-gain", "전향이득")}을 곱하거나 ${term("internal-model-principle", "internal model")}(적분기)을 추가해야 해.`, "warn")}

<h2>4. Mason's Gain Rule (보조 도구)</h2>
${defCard("Mason 이득 공식", `
블록선도에서 입력→출력 전달함수를 한 방에 구하는 공식 — ${term("mason-gain", "Mason's Gain Rule")}:
$$T=\\frac{\\sum_k P_k\\,\\Delta_k}{\\Delta},\\qquad \\Delta=1-\\sum_i L_i+\\sum_{i,j}L_iL_j-\\cdots$$
<ul>
<li>$P_k$ : $k$번째 forward path(입력→출력)의 이득</li>
<li>$L_i$ : $i$번째 loop의 이득</li>
<li>$\\Delta$ : $1-(\\text{모든 loop 합})+(\\text{서로 안 닿는 loop 2개 곱의 합})-\\cdots$</li>
<li>$\\Delta_k$ : $P_k$에 <strong>닿지 않는(non-touching)</strong> loop만 남긴 $\\Delta$</li>
</ul>`)}

${concept("단순 단위궤환 예 — Mason으로 확인", `
$G$ 앞에 $C$, 출력을 음의 단위궤환하는 표준 루프. forward path는 하나: $P_1=CG$. loop는 하나: $L_1=-CG$ (음궤환).<br>
$\\Delta=1-L_1=1+CG$, $P_1$이 그 loop에 닿으므로 $\\Delta_1=1$.<br>
$$T=\\frac{P_1\\Delta_1}{\\Delta}=\\frac{CG}{1+CG}.$$
익숙한 폐루프 공식이 그대로 나와. 손으로도 빠르게 $\\frac{NB}{DA+NB}$ 같은 식 유도할 때 써.`)}

<h2>5. 시험 직전 체크</h2>
${mcQuiz(
  "플랜트 차수 $n=3$, $N,D$ coprime일 때 임의 극배치를 위한 제어기 최소 차수 $m$은?",
  ["$m=1$", "$m=2$", "$m=3$", "$m=n=3$"],
  1,
  "$m\\ge n-1=2$. coprime이면 $m=n-1=2$에서 $S_m$이 정방·nonsingular라 유일해가 나와."
)}

${mcQuiz(
  "$F(s)=D(s)A(s)+N(s)B(s)$에서 $F$가 의미하는 것은?",
  ["플랜트의 극다항식", "폐루프 특성다항식 (원하는 극)", "제어기 분자", "제어기 분모"],
  1,
  "$F$는 닫힌 루프의 특성다항식이야. 이 $F$를 원하는 극의 곱으로 잡고 $A,B$를 역으로 구하는 게 극배치."
)}

${mcQuiz(
  "Sylvester 행렬 $S_m$이 full column rank가 아니면(=$N,D$가 unstable 공통근으로 약분되면)?",
  ["여전히 항상 유일해", "임의의 $F$에 대해 해가 존재하지 않을 수 있음", "제어기 차수를 낮추면 됨", "Mason 공식을 써야 함"],
  1,
  "rank가 부족하면 어떤 원하는 극(=$F$)은 만들 수 없어. 이게 $D,N$ coprime을 요구하는 이유고, 약분된 unstable mode는 total stability도 깨뜨려(Ch9 마지막 페이지)."
)}

${mcQuiz(
  "위 예제에서 극은 원하는 대로 갔는데 step 추종오차가 남는 근본 이유는?",
  ["제어기가 unstable해서", "폐루프 DC gain $\\tfrac{N(0)B(0)}{F(0)}\\ne1$ 이라서", "Sylvester 행렬이 singular라서", "플랜트가 non-minimum phase라서"],
  1,
  "극배치는 극 위치만 맞춰. DC gain이 1이 아니면 정상상태에서 $y\\ne r$. 적분기(internal model)나 feedforward gain으로 보정해야 해."
)}
`);
