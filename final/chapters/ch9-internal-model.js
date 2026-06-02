registerPage("ch9-internal-model", "Robust Tracking & Internal Model", () => `
<h1>Ch 9 — Robust Tracking & Internal Model Principle</h1>
<p class="lead">${tag("출제 가능", "exam")} ${tag("개념+설계", "concept")} 교수님이 "이거 기억해야 된다"고 강조한 부분. 앞 페이지 극배치에 <strong>적분기(internal model)</strong>를 더하는 이야기야.</p>

${profMemo(`핵심 메시지: <strong>극배치만으론 정상상태 추종이 안 된다</strong>(DC gain≠1, 게다가 플랜트가 조금만 변해도 어긋남). 해결책은 레퍼런스/외란의 unstable mode를 제어기 분모에 박아넣는 것 = ${term("internal-model-principle", "Internal Model Principle")}. step이면 $\\phi(s)=s$(적분기). PID의 I가 바로 이거. 시험엔 ① 개념 단답(왜 robust한가, $\\phi$는 뭔가) ② 적분기 포함 제어기 설계가 나올 수 있어.`)}

<h2>1. 왜 robust가 필요한가 — 수치 직관</h2>
${note(`앞 페이지 예제에서 극은 $\\{-1,-2,-3\\}$으로 잘 박았는데 폐루프 DC gain이 4였어. feedforward gain $p=1/4$를 곱해서 억지로 1로 맞췄다고 하자. 그런데 <strong>플랜트 파라미터가 살짝 변하면</strong>(부품 노화·온도 변화) 그 정밀하게 맞춘 gain이 어긋나.`, "info")}

${concept("플랜트 변동 → 추종오차 발생 (인상적 예제)", `
설계는 nominal 플랜트에 맞춰 DC gain $=1$이 되도록 했어. 그런데 실제 플랜트가 변동돼서 폐루프 DC gain이 예컨대
$$\\left.\\frac{N(s)B(s)}{F(s)}\\right|_{s=0}\\approx 0.7875$$
가 됐다고 하자. step 입력 $r=1$을 주면 정상상태 $y(\\infty)\\approx0.7875$ → <strong>약 21% 추종오차</strong>가 그대로 남아.<br><br>
feedforward gain은 "정확한 플랜트 값"을 알아야 하는데 그게 변하면 무용지물. <strong>플랜트가 변해도 오차 0</strong>이 되게 하는 게 robust tracking이고, 그 비결이 적분기야.`, {open: true})}

${note(`<strong>적분기가 robust한 이유:</strong> 제어기에 $\\frac1s$가 있으면, 오차 $e=r-y$가 조금이라도 남는 한 적분값 $\\int e\\,dt$가 계속 쌓여서 입력을 밀어붙여. 정상상태($\\dot{}=0$)가 되려면 반드시 $e=0$이어야만 해. 이건 플랜트 값을 몰라도 성립 — 그래서 <strong>파라미터 변동에 강인</strong>.`, "tip")}

<h2>2. Internal Model Principle</h2>
${defCard("$\\phi(s)$ — 추종/제거할 신호의 모델", `
레퍼런스 $r$과 ${term("disturbance-rejection", "외란")} $w$의 <strong>unstable pole들의 최소공배수(LCM)</strong>를 $\\phi(s)$라 하자.<br>
<table>
<tr><th>신호</th><th>Laplace</th><th>$\\phi(s)$</th></tr>
<tr><td>step (상수)</td><td>$1/s$</td><td>$s$ (적분기)</td></tr>
<tr><td>ramp</td><td>$1/s^2$</td><td>$s^2$</td></tr>
<tr><td>$\\sin\\omega t$</td><td>$\\omega/(s^2+\\omega^2)$</td><td>$s^2+\\omega^2$</td></tr>
</table>`)}

${defCard("Internal Model Principle", `
${term("robust-tracking", "강인 추종")}/외란제거가 되려면 <strong>$\\phi(s)$를 제어기 분모에 포함</strong>시켜라:
$$C(s)=\\frac{B(s)}{A(s)\\,\\phi(s)}.$$
"제어기 안에 추종할 신호의 모델(internal model)을 갖고 있어야 그 신호를 완벽히 따라간다." ${term("integral-control", "적분제어")}($\\phi=s$)가 가장 단순한 형태고, PID의 I항이 바로 이거야.`)}

${concept("Corollary 9.3 — 성립 조건 (시험 포인트)", `
$\\phi(s)$를 넣어 robust tracking이 되려면:
<ol>
<li><strong>$\\phi(s)$의 근이 $N(s)$의 zero가 아닐 것.</strong> — 만약 겹치면 그 mode가 ${term("pole-zero-cancellation", "약분")}돼서 internal model이 무력화되고 추종 실패.</li>
<li>$N(s),D(s)$가 ${term("coprime", "coprime")}일 것 (극배치 자체의 전제).</li>
</ol>
직관: 적분기 극 $s=0$이 플랜트의 zero($N(0)=0$)와 겹치면, 플랜트가 그 신호를 못 통과시켜서 적분기가 일을 못 해.`, {open: true})}

<h2>3. 두 가지 구현법</h2>
${defCard("방법 ① — $\\phi$ 분리", `
일반 극배치로 $B/A$를 구한 뒤 분모에 $\\phi$를 곱해 $C=\\dfrac{B}{A}\\cdot\\dfrac1\\phi$ 형태로 둔다. $\\phi$ 차수만큼 폐루프 차수가 늘어나니 그만큼 원하는 극을 더 정해줘야 해.`)}

${defCard("방법 ② — 제어기 차수 1 높이고 $a_0=0$ 강제", `
제어기 차수를 $m=n$으로 한 단계 올려 free parameter를 하나 더 만든 뒤, $A(s)$의 상수항 $a_0=0$으로 <strong>강제</strong>해. 그러면 $A(s)=s(a_1+a_2s+\\cdots)$ 가 되어 <strong>적분기 $\\phi=s$가 자연스럽게 포함</strong>돼.<br>
$a_0=0$을 박으면 미지수가 하나 줄어 $S_m$이 한 열 축소(예: $6\\times6\\to6\\times5$)돼서 오히려 푸는 게 더 쉬워져.`)}

${note(`step 추종(=적분기 $\\phi=s$)에선 방법 ②가 깔끔해. $a_0=0$ 한 줄 추가하고 나머진 똑같이 계수 비교 연립.`, "tip")}

${concept("Ch8 적분제어(augmented state)와 같은 이야기", `
Ch8에서 에러를 상태로 augment했던 거 기억나? $\\dot x_a=r-y=r-Cx$ 로 적분기 상태를 추가하고 $u=-Kx+K_a x_a$ 했었지. 그게 바로 상태공간 버전의 internal model이야.<br><br>
<ul>
<li>$\\dot x_a=\\int(r-y)\\,dt$ → 라플라스로 $\\dfrac1s$ → $\\phi(s)=s$가 제어기 분모에 들어간 것과 정확히 같음.</li>
<li>Ch8의 조건 "플랜트가 $s=0$에 zero 없을 것"(Theorem 8.5) = 여기 Corollary 9.3의 "$\\phi=s$의 근이 $N$의 zero 아닐 것"($N(0)\\ne0$)과 동일.</li>
</ul>
상태공간(Ch8)이든 전달함수(Ch9)든, <strong>적분기를 루프 안에 넣는다</strong>는 본질은 똑같아.`)}

${note(`<strong>외란 제거(disturbance rejection)도 같은 원리.</strong> 플랜트 입력단에 상수 외란 $w$(step)가 들어오면 그 unstable mode도 $1/s$. 제어기 분모의 적분기 $\\phi=s$가 $r$ 추종과 $w$ 제거를 <strong>동시에</strong> 해결해. 그래서 internal model 하나로 추종+외란제거 두 마리 토끼를 잡아.`, "info")}

<h2>4. ⭐ 예제 — step 추종 PI 제어기</h2>
<p>간단한 플랜트 $G(s)=\\dfrac1{s+1}$ ($n=1$)에 step을 정확히 추종시켜 보자. 적분기를 넣으면 제어기는 PI 형태가 돼.</p>

${walkthrough("$G=\\dfrac1{s+1}$ 에 적분기 넣어 step 추종 ($\\phi=s$)", [
  {
    title: "왜 적분기가 필요한지 먼저 확인",
    body: `적분기 없이 단순 상수 제어기 $C=k$만 쓰면 폐루프 $r\\to y$ DC gain은
    $$\\left.\\frac{kG}{1+kG}\\right|_{s=0}=\\frac{k}{1+k}\\ne1.$$
    아무리 $k$를 키워도 1에 가까워질 뿐 정확히 1은 안 돼 (게다가 $k$ 크면 saturation). → 적분기가 답.`
  },
  {
    title: "적분기 포함 제어기 형태",
    body: `$\\phi(s)=s$를 분모에 박은 PI 제어기:
    $$C(s)=\\frac{B(s)}{A(s)}=\\frac{b_0+b_1s}{s}.$$
    즉 $A(s)=a_1 s$ (상수항 $a_0=0$ → 적분기 포함), $B(s)=b_0+b_1s$. $N=1,\\ D=s+1$.`
  },
  {
    title: "$F=DA+NB$ 전개",
    body: `폐루프 차수 = $1+1=2$. 극을 $\\{-2,-3\\}$로 잡으면 $F=(s+2)(s+3)=s^2+5s+6$.<br>
    $$F=DA+NB=(s+1)(a_1 s)+(1)(b_0+b_1s)$$
    $$=a_1 s^2+a_1 s+b_0+b_1 s=a_1 s^2+(a_1+b_1)s+b_0.$$`
  },
  {
    title: "계수 비교 → 풀기",
    body: `$s^2$: $a_1=1$.<br>
    $s^1$: $a_1+b_1=5\\Rightarrow b_1=4$.<br>
    $s^0$: $b_0=6$.<br><br>
    $$\\boxed{C(s)=\\frac{4s+6}{s}=4+\\frac{6}{s}}\\quad(\\text{PI: }K_P=4,\\ K_I=6)$$`
  },
  {
    title: "tracking 검산 — 이번엔 정확히 1",
    body: `폐루프 DC gain:
    $$\\left.\\frac{N(s)B(s)}{F(s)}\\right|_{s=0}=\\frac{N(0)B(0)}{F(0)}=\\frac{1\\cdot 6}{6}=1.\\ ✓$$
    적분기 덕분에 정확히 $y(\\infty)=r$. 게다가 플랜트 $\\frac1{s+1}$의 "1"이나 "+1"이 변동돼도 — 분모에 $s$가 살아있는 한 — 정상상태 오차는 0으로 유지돼. 이게 <strong>robust</strong>.`
  }
])}

${note(`<strong>왜 분자 $B$엔 $\\phi$를 안 넣나?</strong> $\\phi$는 제어기 <strong>분모</strong>에만 들어가야 적분기 극 $s=0$이 살아남아. 분자에 $s$가 있으면 약분돼서 internal model이 사라져 — Corollary 9.3의 "약분 금지"가 이거야.`, "warn")}

<h2>5. 시험 직전 체크</h2>
${mcQuiz(
  "$\\sin 3t$ 형태의 레퍼런스를 정확히 추종하려면 제어기 분모에 넣어야 할 $\\phi(s)$는?",
  ["$s$", "$s^2$", "$s^2+9$", "$s+3$"],
  2,
  "$\\sin\\omega t$의 Laplace 극은 $s=\\pm j\\omega$, 즉 분모 $s^2+\\omega^2$. $\\omega=3$이면 $\\phi=s^2+9$. 이걸 제어기 분모에 넣어야 그 주파수를 오차 없이 추종해."
)}

${mcQuiz(
  "적분제어가 플랜트 파라미터 변동에 강인(robust)한 근본 이유는?",
  [
    "적분기가 노이즈를 필터링해서",
    "정상상태($\\dot{}=0$)가 되려면 적분기 입력 $e=r-y$가 반드시 0이어야 하므로",
    "DC gain을 크게 만들어서",
    "극을 RHP로 옮겨서"
  ],
  1,
  "적분기 출력이 일정해지려면 그 입력(오차)이 0이어야만 해. 이 조건은 플랜트의 정확한 값을 몰라도 성립하므로 파라미터가 변해도 오차가 0으로 유지돼."
)}
`);
