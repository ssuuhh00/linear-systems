registerPage("ch8-tracking", "Robust Tracking & 적분제어", () => `
<h1>Ch 8 — Robust Tracking & Disturbance Rejection</h1>
<p class="lead">${tag("개념+계산", "exam")} regulation/tracking/servo 구분 + 적분제어로 augment + Theorem 8.5.</p>

${profMemo(`<strong>여기서 외울 키 포인트 하나.</strong> 적분제어로 augment한 시스템의 특성방정식은 $s\\bar D(s)+K_a\\bar N(s)$ 꼴이다 — 교수님이 "이거 기억해야 된다"고 콕 집은 부분. 그리고 ${term("robust-tracking", "robust")}가 "강인"인 이유: 플랜트 파라미터가 변해도 추종이 유지된다는 것. 적분기가 그걸 보장한다.`)}

<h2>1. Regulation vs Tracking vs Servomechanism</h2>
<table>
  <tr><th>종류</th><th>목표</th><th>레퍼런스</th></tr>
  <tr><td>${term("regulation", "Regulation")}</td><td>상태/에러를 0으로 유지</td><td>$r=0$ (외란·초기치를 0으로)</td></tr>
  <tr><td>${term("tracking", "Tracking")}</td><td>특정 신호 따라가기</td><td>step 같은 한 종류</td></tr>
  <tr><td>${term("servomechanism", "Servomechanism")}</td><td>여러 종류 신호 추종</td><td>step·ramp·sinusoid 등</td></tr>
</table>

${concept("녹취 비유 — 주인이 여럿", `
<strong>Regulation</strong>은 "가만히 있어" — 흔들려도 제자리로. 주인이 0 하나야.<br>
<strong>Tracking</strong>은 "이 한 가지 명령(step)을 따라와". 주인이 한 명.<br>
<strong>Servomechanism</strong>은 "step이든 ramp든 사인파든 뭐가 와도 따라와" — <strong>주인이 여럿</strong>이라 제어기 안에 그 신호들을 만들어내는 ${term("internal-model-principle", "internal model")}을 심어야 한다. 종류가 많을수록 제어기가 그만큼 똑똑해야 함.
`)}

<h2>2. 외란 + 적분제어로 augment</h2>
${defCard("외란이 있는 플랜트", `
플랜트에 외란(disturbance) $w$가 들어온다:
$$\\dot{\\mathbf x}=A\\mathbf x+B\\mathbf u+B w,\\qquad y=C\\mathbf x$$
($w$가 $B$ 채널로 입력과 같이 들어오는 경우.) 그냥 state feedback만 쓰면 $w$ 때문에 정상상태 에러가 남는다. → ${term("disturbance-rejection", "외란을 제거")}하려면 적분기가 필요.
`)}

${defCard("에러를 상태로 augment — 적분제어", `
에러 $r-y$의 적분을 새 상태 $x_a$로 추가:
$$\\dot{x}_a = r - y = r - C\\mathbf x$$
제어법칙도 확장:
$$\\mathbf u = -K\\mathbf x + K_a x_a$$
이게 ${term("integral-control", "적분제어")}. 적분기 $1/s$가 ${term("internal-model-principle", "internal model")}의 가장 단순한 형태(step용).
`)}

${concept("왜 적분기가 에러를 0으로 만드나", `
정상상태($\\dot x_a=0$)에선 $\\dot x_a=r-y=0$, 즉 $y=r$이 <strong>강제</strong>된다. 적분기는 에러가 조금이라도 남으면 $x_a$를 계속 키워서 입력을 밀어붙여, 결국 에러가 0이 될 때까지 멈추지 않아.<br><br>
$w$가 들어와도 마찬가지 — 적분기가 그만큼 $u$를 보정해 상쇄한다. 그래서 외란이 step이면 정상상태에서 완전히 제거돼.
`)}

${concept("증강 시스템 행렬 (2차 플랜트 → 3차)", `
$\\begin{bmatrix}\\dot{\\mathbf x}\\\\\\dot x_a\\end{bmatrix}=\\begin{bmatrix}A & 0\\\\-C & 0\\end{bmatrix}\\begin{bmatrix}\\mathbf x\\\\x_a\\end{bmatrix}+\\begin{bmatrix}B\\\\0\\end{bmatrix}\\mathbf u+\\begin{bmatrix}0\\\\1\\end{bmatrix}r$<br><br>
이걸 $A_a,B_a$로 보고 $\\bar K=[-K\\ \\ K_a]$로 ${term("pole-placement", "극배치")} 하면 끝. 핵심은 이 증강 플랜트 $\\{A_a,B_a\\}$가 controllable이어야 극을 배치할 수 있다는 것 → Theorem 8.5.
`)}

<h2>3. Theorem 8.5 — 증강 플랜트의 controllability</h2>
${defCard("Theorem 8.5", `
원 플랜트 $\\{A,B\\}$가 ${term("controllability", "controllable")}이고, <strong>플랜트가 $s=0$에 zero가 없으면</strong> ($C(sI-A)^{-1}B$의 분자 $N(s)$가 $s=0$에서 0이 아님), 증강 플랜트 $\\{A_a,B_a\\}$도 controllable이다.
$$\\Rightarrow\\ \\text{증강 시스템의 극을 임의 배치 가능}$$
`)}

${profMemo(`<strong>"no zero at $s=0$" 조건이 왜 추가되나.</strong> 만약 플랜트가 $s=0$에 zero를 가지면, 그 zero가 적분기의 극 $s=0$과 약분(${term("pole-zero-cancellation", "pole-zero cancellation")})돼 적분기 mode가 controllable하지 않게 된다. 그러면 적분제어가 작동을 안 해 추종 실패. 그래서 "원 플랜트 controllable + $s=0$에 zero 없음" 이 두 조건이 세트. 시험에 조건 두 개 다 쓰는 거 잊지 마.`)}

${defCard("증강 특성방정식 — 외워둘 형태", `
플랜트 $G(s)=\\dfrac{\\bar N(s)}{\\bar D(s)}$일 때, 적분제어 증강 시스템의 폐루프 특성방정식은
$$s\\,\\bar D(s) + K_a\\,\\bar N(s)\\ (\\cdots) \\;=\\; \\Delta_d(s)$$
형태로 나온다 (적분기의 $s$가 $\\bar D$에 곱해짐). 원하는 극의 $\\Delta_d(s)$와 계수 비교해서 $K, K_a$를 푼다.
`)}

<h2>4. 왜 "robust(강인)"인가</h2>
${concept("녹취 비유 — 자동차 연료·탑승인원으로 변하는 파라미터", `
자동차 크루즈 컨트롤을 생각해봐. 연료가 줄거나 탑승 인원이 바뀌면 차의 질량·관성이 변한다 → 플랜트 파라미터 $A,B$가 슬금슬금 변하는 거야.<br><br>
순수 feedforward gain $p$만 쓰면 $p=1/G_{cl}(0)$로 딱 맞춰놨는데 $G_{cl}(0)$이 변하면 추종이 틀어진다 (정상상태 에러 발생).<br><br>
<strong>적분기</strong>는 다르다. 파라미터가 변해도 "에러가 0이 될 때까지 민다"는 원리는 안 변해. 그래서 정확한 $p$ 값을 몰라도, 모델이 좀 틀려도 $y\\to r$이 유지된다. 이게 ${term("robust-tracking", "robust tracking")} — 모델 오차에 강인하다는 뜻.
`)}

${note(`정리하면: <strong>feedforward gain $p$는 모델을 정확히 알아야</strong> 추종이 맞고, <strong>적분제어는 모델이 틀려도</strong> (파라미터 변동·외란) 정상상태 추종/외란제거가 유지된다. 그래서 실무에선 적분제어가 표준 (PID의 I항).`, "tip")}

<h2>5. 체크</h2>
${mcQuiz(
  "step뿐 아니라 ramp·sinusoid 등 여러 종류 레퍼런스를 추종하는 제어는?",
  ["Regulation", "Tracking", "Servomechanism", "Stabilization"],
  2,
  "여러 신호 추종 = servomechanism (주인이 여럿). 각 신호의 mode를 internal model로 제어기에 심는다."
)}

${mcQuiz(
  "적분제어로 augment한 시스템에서 극을 임의 배치하려면 (Theorem 8.5) 필요한 조건은?",
  ["플랜트가 observable", "원 플랜트 controllable & 플랜트가 $s=0$에 zero가 없음", "플랜트가 stable", "$C=I$"],
  1,
  "controllable이어야 배치 가능하고, $s=0$에 zero가 있으면 적분기 극과 약분돼 적분제어가 무력화된다."
)}
`);
