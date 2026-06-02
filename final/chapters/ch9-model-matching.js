registerPage("ch9-model-matching", "Model Matching · Total Stability", () => `
<h1>Ch 9 — Model Matching · Implementable · Total Stability</h1>
<p class="lead">${tag("개념 정의 출제 유력", "exam")} ${tag("Ch9 개념", "concept")} 0528 강의에서 정의를 꼼꼼히 설명한 부분. <strong>단답·정의 문제로 나오기 좋아</strong>. 비유까지 같이 외워두면 헷갈릴 일 없어.</p>

${profMemo(`이 페이지는 계산보다 <strong>정의를 정확히 쓰는 게</strong> 점수. well-posed / total stability / implementable 3조건 — 이 셋의 정의와 차이를 구분해서 쓸 수 있어야 해. 교수님 비유("조종간 착하면 비행기 착", "군대 안 왔는데 보고만 한 격")가 그대로 정답 키워드가 되니까 같이 기억해.`)}

<h2>1. Model Matching이란</h2>
${defCard("Model Matching", `
${term("pole-placement", "극배치")}는 <strong>극(pole)만</strong> 원하는 데로 옮겼어. ${term("model-matching", "Model Matching")}은 한 발 더 나가서 $r\\to y$ 전달함수의 <strong>극과 영점(zero) 둘 다</strong>를 목표모델 $G_o(s)$와 똑같게 만드는 거야:
$$\\frac{y(s)}{r(s)}=G_o(s).$$`)}

${note(`<strong>"조종간 착하면 비행기 착"</strong> — 가장 이상적인 목표는 $G_o(s)=1$. 명령 $r$을 출력 $y$가 시간지연·왜곡 없이 그대로 따라가는 best possible 응답이야. (물론 $r$과 $y$는 단위·power level이 다를 수 있어 — 조종간 각도 vs 비행기 자세.)`, "info")}

<h2>2. Implementable Transfer Function — 3조건</h2>
<p>아무 $G_o(s)$나 실제로 만들 수 있는 건 아니야. ${term("implementable", "구현가능")}하려면 다음 3가지를 모두 만족해야 해.</p>

${defCard("① Proper", `
$G_o(s)$가 ${term("proper", "proper")}여야 함 — <strong>분모 차수 ≥ 분자 차수</strong>.<br>
improper(분자>분모)면 미분기가 필요한데, 미분은 고주파 noise를 증폭해서 현실에서 못 써.`)}

${defCard("② No leakage — 반드시 플랜트를 통과", `
$r\\to y$ 신호는 <strong>반드시 플랜트 $G$를 거쳐</strong> 나와야 해. 제어기가 출력을 직접 만들어내듯 옆으로 새면(leakage) 안 됨.<br>
즉 $G_o(s)$는 $\\dfrac{y}{r}=G\\cdot(\\text{something})$ 꼴이어야 하고, <strong>플랜트의 zero를 $G_o$가 물려받아야</strong> 해 ($G$의 zero는 제어기가 못 없앰).`)}

${note(`<strong>"군대 안 왔는데 보고만 한 격 / 눈 가리고 아웅"</strong> — 실제로는 플랜트(군대)를 거치지 않았는데 출력만 그럴싸하게 만든 가짜 응답. 종이 위에선 $G_o$가 멀쩡해 보여도 물리적으로 구현 불가능해.`, "warn")}

${defCard("③ Total Stability", `
모든 입출력쌍 전달함수가 안정해야 함 (아래 4번에서 상세). $r\\to y$만 안정해 보이는 걸로는 부족.`)}

<h2>3. Well-posedness</h2>
${defCard("Well-posed", `
폐루프의 <strong>모든 input-output pair 전달함수가 proper</strong>일 것 — ${term("well-posed", "Well-posedness")}.<br>
조건: $$1+G(\\infty)C(\\infty)\\ne0,\\quad\\text{즉}\\quad G(\\infty)C(\\infty)\\ne-1.$$
$G(s)$가 strictly proper면 $G(\\infty)=0$이라 이 조건이 <strong>자동으로 만족</strong>돼 (현실 플랜트는 대부분 strictly proper라 거의 신경 안 써도 됨).`)}

${concept("왜 $G(\\infty)C(\\infty)=-1$이면 안 되나", `
폐루프 분모는 $1+GC$ 꼴이야. $s\\to\\infty$에서 $1+G(\\infty)C(\\infty)=0$이면, 어떤 입출력 전달함수의 분모 최고차항이 사라져서 분자 차수가 분모를 넘어 <strong>improper(미분기 필요)</strong>가 돼버려. 그래서 well-posed가 깨져.`)}

<h2>4. Total Stability</h2>
${defCard("Total Stability", `
${term("total-stability", "Total Stability")}: <strong>$r\\to y$뿐 아니라 모든 입력(noise·외란 포함)에서 모든 출력까지, 전부 ${term("bibo-stability", "BIBO stable")}</strong>.<br>
핵심 판정: 제어기와 플랜트 사이에 <strong>unstable한 ${term("pole-zero-cancellation", "pole-zero cancellation")}이 없을 것</strong>.`)}

${concept("왜 unstable 약분이 치명적인가 — Fig 9.3 예제", `
플랜트에 unstable pole $s=2$가 있다고 하자 (예: $G=\\dfrac1{s-2}$). 제어기에서 $s-2$를 zero로 만들어 약분시키면, $r\\to y$ 전달함수에선 $s-2$가 사라져서 <strong>안정해 보여</strong>.<br><br>
그런데 그 약분된 mode $e^{2t}$는 사라진 게 아니라 시스템 내부에 <strong>여전히 살아있어</strong>. noise나 외란이 그 지점을 건드리면(noise→$y$ 전달함수엔 $s-2$가 그대로 남아있음) $e^{2t}$가 발산해서 시스템이 폭발해.<br><br>
$$\\frac{y}{r}\\ \\text{안정해 보임}\\quad\\text{but}\\quad \\frac{y}{n_{noise}}\\ \\text{에 }(s-2)\\text{ 살아있음}\\Rightarrow\\text{발산}$$
→ <strong>unstable mode는 절대 약분으로 숨기면 안 됨.</strong> stable한($\\text{Re}<0$) pole-zero 약분은 괜찮아 (mode가 알아서 감쇠하니까).`, {open: true})}

${note(`정리: <strong>well-posed</strong>는 "모든 입출력쌍이 proper(미분기 없음)", <strong>total stability</strong>는 "모든 입출력쌍이 BIBO 안정 + unstable 약분 없음". well-posed는 $s\\to\\infty$(고주파) 이야기, total stability는 극 위치($s$-평면) 이야기야.`, "tip")}

<h2>5. Implementable 판정 연습</h2>
<p>플랜트 $G(s)=\\dfrac{s-2}{(s+1)(s+3)}$ (RHP zero $s=2$ 보유, non-minimum phase). 아래 목표모델들이 implementable한지 따져보자.</p>

${defCard("판정 예", `
<table>
<tr><th>목표 $G_o(s)$</th><th>판정</th><th>이유</th></tr>
<tr><td>$G_o=\\dfrac1{s+2}$</td><td><strong>불가 ✗</strong></td><td>플랜트의 RHP zero $s=2$를 $G_o$가 안 물려받음 → 그 zero를 제어기가 약분해야 하는데 그건 unstable 약분 → total stability 위반</td></tr>
<tr><td>$G_o=\\dfrac{s-2}{(s+4)^2}$</td><td><strong>가능 ✓</strong></td><td>플랜트의 $s-2$ zero를 그대로 보유(no leakage), proper, 약분 불필요</td></tr>
<tr><td>$G_o=\\dfrac{(s-2)(s+5)}{s+4}$</td><td><strong>불가 ✗</strong></td><td>분자차수=2 &gt; 분모차수=1 → improper (미분기 필요)</td></tr>
</table>`)}

${note(`<strong>철칙:</strong> 플랜트의 <strong>RHP zero는 목표모델이 반드시 그대로 가져가야</strong> 해. 없애려고 약분하면 unstable pole-zero cancellation이 되어 total stability가 깨져. ($G_o=1$이 항상 가능한 건 minimum phase 플랜트일 때 이야기.)`, "warn")}

<h2>6. 한눈에 비교</h2>
${defCard("극배치 vs Model Matching", `
<table>
<tr><th></th><th>극배치 (Pole Placement)</th><th>Model Matching</th></tr>
<tr><td>맞추는 것</td><td>극(pole)만</td><td>극 + 영점 (전달함수 전체 $G_o$)</td></tr>
<tr><td>자유도</td><td>극 위치 선택</td><td>$G_o$ 전체 형상 선택</td></tr>
<tr><td>추종</td><td>DC gain 따로 보정 필요</td><td>$G_o=1$이면 완벽 추종</td></tr>
<tr><td>제약</td><td>$N,D$ coprime, $m\\ge n-1$</td><td>+ implementable 3조건</td></tr>
</table>`)}

<h2>7. 시험 직전 체크</h2>
${mcQuiz(
  "다음 중 implementable transfer function의 3조건이 아닌 것은?",
  [
    "proper (분모차수 ≥ 분자차수)",
    "$r\\to y$가 플랜트를 통과 (no leakage)",
    "total stability (모든 입출력쌍 BIBO + unstable 약분 없음)",
    "플랜트가 minimum phase (RHP zero 없음)일 것"
  ],
  3,
  "3조건은 ① proper ② no leakage(플랜트 통과) ③ total stability. minimum phase는 조건이 아니야 — non-minimum phase여도 그 RHP zero를 $G_o$가 물려받기만 하면 구현 가능."
)}

${mcQuiz(
  "$G(s)=\\dfrac1{s-2}$를 제어기에서 $s-2$ zero로 약분해 폐루프 $r\\to y$를 안정하게 만들었다. 이 설계의 문제는?",
  [
    "well-posed가 깨진다",
    "unstable pole-zero cancellation → total stability가 깨져 noise/외란에 발산",
    "proper 조건 위반",
    "문제 없음 — $r\\to y$가 안정하므로 OK"
  ],
  1,
  "약분된 $s=2$ mode($e^{2t}$)가 내부에 살아있어 noise→$y$ 경로로 발산해. $r\\to y$만 안정해 보이는 건 함정. unstable mode는 약분으로 숨기면 안 돼."
)}

${mcQuiz(
  "플랜트 $G(s)$가 strictly proper일 때 well-posedness는?",
  [
    "절대 만족 안 됨",
    "$G(\\infty)=0$이라 $1+G(\\infty)C(\\infty)=1\\ne0$ → 자동 만족",
    "$C(s)$도 strictly proper여야만 만족",
    "total stability와 동일한 조건"
  ],
  1,
  "strictly proper면 $G(\\infty)=0$. 그러면 $1+G(\\infty)C(\\infty)=1\\ne0$이라 well-posed 조건이 무조건 성립해."
)}
`);
