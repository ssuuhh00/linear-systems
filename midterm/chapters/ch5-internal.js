registerPage("ch5-internal", "Internal Stability · Lyapunov", () => `
<h1>Ch 5 — Internal Stability & Lyapunov</h1>
<p class="lead">${tag("개념출제", "concept")} 과제 5.10, 5.13, 5.18, 5.19. 정의 위주로 묻거나 Lyapunov 방정식 증명형.</p>

<h2>1. 세 가지 stability 구분</h2>
<table>
  <tr><th>종류</th><th>의미</th><th>조건 (LTI)</th></tr>
  <tr><td>Marginally stable<br>(Lyapunov sense)</td><td>해가 유계로 머문다</td><td>모든 $\\lambda$가 $\\text{Re}(\\lambda) \\le 0$ 이고, 허수축 위 $\\lambda$는 단순(simple)</td></tr>
  <tr><td>Asymptotically stable</td><td>$t\\to\\infty$ 일 때 0으로</td><td>모든 $\\lambda$가 $\\text{Re}(\\lambda) < 0$</td></tr>
  <tr><td>Unstable</td><td>적어도 하나 발산</td><td>위 둘 다 아닌 경우</td></tr>
</table>

${note(`<strong>핵심:</strong> Asymptotically stable ⊂ Marginally stable. <br>
Asymptotic은 "강한 안정 (모두 0으로)", marginal은 "약한 안정 (안 터지긴 함)".`)}

${collapse("실생활 비유: 그릇 vs 평지 vs 언덕", `
공을 굴렸을 때:<br><br>
🥣 <strong>그릇 안</strong> → 마찰로 결국 바닥에 멈춤. <strong>Asymptotically stable</strong>.<br>
🛹 <strong>평지</strong> → 어디든 가만히 있음. 굴러가도 멈추지 않지만 발산도 안 함. <strong>Marginally stable</strong>.<br>
⛰️ <strong>언덕 꼭대기</strong> → 살짝만 건드려도 굴러내려감. <strong>Unstable</strong>.<br><br>
시스템론에서 eigenvalue가 LHP면 그릇, 허수축이면 평지, RHP면 언덕.
`)}

${collapse("물리적 예시: 진자 vs 거꾸로 진자", `
<strong>일반 진자</strong> (아래로 매달림): 마찰 없으면 영원히 진동 → marginal stable. 마찰 있으면 천천히 멈춤 → asymptotic stable.<br><br>
<strong>거꾸로 진자</strong> (위로 세움): 살짝만 건드려도 떨어짐 → unstable. <br><br>
세그웨이, 로켓, 드론 — 본질적으로 unstable인 시스템에 제어기를 더해 stable로 만드는 것.
`)}

<h2>2. Discrete-time 버전</h2>
<table>
  <tr><th>종류</th><th>조건 (LTI discrete)</th></tr>
  <tr><td>Marginally stable</td><td>모든 $|\\lambda| \\le 1$, $|\\lambda|=1$ 인 것은 단순</td></tr>
  <tr><td>Asymptotically stable</td><td>모든 $|\\lambda| < 1$</td></tr>
</table>

<h2>3. 워크스루: 과제 5.10</h2>
${walkthrough("$\\dot{\\mathbf{x}} = \\begin{bmatrix}-1 & 0 & 1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0\\end{bmatrix}\\mathbf{x}$ 의 안정도", [
  {
    title: "Eigenvalue 구하기",
    body: `삼각행렬은 아니지만 cofactor expansion으로:<br>
    $\\det(\\lambda I - A) = \\det\\begin{bmatrix}\\lambda+1 & 0 & -1 \\\\ 0 & \\lambda & 0 \\\\ 0 & 0 & \\lambda\\end{bmatrix}$<br>
    상삼각이라 대각곱: $(\\lambda+1) \\cdot \\lambda \\cdot \\lambda = \\lambda^2(\\lambda+1)$<br>
    Eigenvalues: $\\lambda = -1, 0, 0$.`
  },
  {
    title: "$\\lambda = 0$의 중복도 분석",
    body: `$\\lambda = 0$ 이 algebraic multiplicity 2. <br>
    Asymptotic stable 인지: $\\text{Re}(0) = 0$ 이므로 asymptotic 아님.<br>
    Marginal stable 인지: $\\lambda = 0$ 이 simple 한지 확인. <br>
    Geometric multiplicity = $\\dim N(A - 0 \\cdot I) = \\dim N(A) = n - \\text{rank}(A)$.<br>
    $\\text{rank}(A)$: 1행 = $[-1, 0, 1]$, 2/3행 = 0. → rank = 1. → nullity = 3 - 1 = 2 ≥ 2 = (algebraic mult.).`
  },
  {
    title: "결론",
    body: `Geometric mult. = algebraic mult. = 2 → $\\lambda = 0$ 의 Jordan block 모두 1×1 → simple.<br>
    그러므로 <strong>marginally stable</strong>, but <strong>not asymptotically stable</strong>.`
  }
])}

${note(`<strong>중요한 검증법:</strong> $\\lambda = 0$ 이 중복일 때, $A^k$ ($k$ 큰 값) 가 발산하지 않는지 확인. 만약 Jordan block이 2x2 면 $tA$ 같은 항이 생겨서 $t \\to \\infty$일 때 $\\mathbf{x}(t) \\to \\infty$ 발산.`, "warn")}

<h2>4. Lyapunov Equation (과제 5.18, 5.19)</h2>
${defCard("Lyapunov Equation (continuous)", `
$$A^T M + M A = -N$$
- $N$ 이 양의 정부호(positive definite) 대칭행렬이면<br>
- 유일한 양의 정부호 대칭해 $M$ 이 존재 ⇔ <strong>$A$의 모든 eigenvalue가 LHP (asymptotically stable)</strong>
`)}

${defCard("Discrete Lyapunov Equation", `
$$M - A^T M A = N$$
- 유일한 양의 정부호 $M$ 이 존재 ⇔ <strong>모든 eigenvalue가 단위원 내부 ($|\\lambda| < 1$)</strong>
`)}

${note(`이 정리들의 의의: 시스템 stability를 <em>eigenvalue 직접 계산 없이</em> 행렬 방정식 풀이로 판정 가능. 큰 시스템·비선형·robust analysis 에서 핵심 도구.`, "tip")}

${collapse("Lyapunov의 직관: \"에너지 함수\"", `
$V(\\mathbf{x}) = \\mathbf{x}^T M \\mathbf{x}$ 를 시스템의 "에너지"로 보자 ($M$이 양정부호이면 항상 ≥ 0).<br><br>
시간에 따른 에너지 변화율:<br>
$\\dot V = \\dot{\\mathbf{x}}^T M \\mathbf{x} + \\mathbf{x}^T M \\dot{\\mathbf{x}} = \\mathbf{x}^T(A^T M + MA)\\mathbf{x}$<br><br>
$A^T M + MA = -N$ ($N > 0$) 이라면 → $\\dot V = -\\mathbf{x}^T N \\mathbf{x} < 0$ (상태가 0이 아닐 때).<br><br>
<strong>해석:</strong> 에너지가 항상 감소 → 결국 상태가 0으로 수렴. 즉 stable!<br><br>
<strong>물리적 비유:</strong> 마찰 있는 진자의 운동에너지 + 위치에너지 = $V$. 마찰로 에너지 계속 빠짐 → 결국 정지. 이게 Lyapunov 정리의 본질.
`)}

<h2>5. 과제 5.18 — 일반화된 Lyapunov</h2>
${defCard("$A$의 모든 $\\lambda$ 가 $\\text{Re}(\\lambda) < -\\mu < 0$ ⇔ ", `
임의의 양정부호 대칭 $N$에 대해
$$A'M + MA + 2\\mu M = -N$$
가 유일한 양정부호 대칭 해 $M$을 가짐.
`)}

${collapse("증명 스케치", `
변수치환 $\\tilde A = A + \\mu I$ 도입. 그러면:
$\\tilde A' M + M \\tilde A = (A' + \\mu I)M + M(A + \\mu I) = A'M + MA + 2\\mu M$<br>
표준 Lyapunov가 $\\tilde A$에 대해 $\\tilde A'M + M\\tilde A = -N$ 형태. <br>
표준 정리: 유일한 양정부호 $M$ 존재 ⇔ $\\tilde A$의 모든 eigenvalue가 LHP.<br>
$\\tilde A$의 eigenvalue = $\\lambda + \\mu$ (원래 $A$ eigenvalue 에 $\\mu$ 더한 것).<br>
$\\text{Re}(\\lambda + \\mu) < 0 \\Leftrightarrow \\text{Re}(\\lambda) < -\\mu$ ✓
`)}

<h2>6. 과제 5.19 — Discrete 일반화</h2>
${defCard("$A$의 모든 $\\lambda$가 $|\\lambda| < \\rho$ ⇔ ", `
임의의 양정부호 대칭 $N$에 대해
$$\\rho^2 M - A'MA = \\rho^2 N$$
가 유일한 양정부호 대칭 해 $M$을 가짐.
`)}

${collapse("증명 스케치", `
양변을 $\\rho^2$로 나누면 $M - (A/\\rho)' M (A/\\rho) = N$.<br>
$\\tilde A = A/\\rho$ 의 표준 discrete Lyapunov.<br>
$\\tilde A$의 eigenvalue = $\\lambda/\\rho$.<br>
표준 정리: $|\\lambda/\\rho| < 1 \\Leftrightarrow |\\lambda| < \\rho$ ✓
`)}

<h2>7. Stabilizable & Detectable (족보 2017 — 참고)</h2>
${defCard("Stabilizable", `
Unstable mode (eigenvalue Re ≥ 0)들이 모두 controllable 한 것. <br>
즉 state feedback $u = Fx$ 로 unstable 부분을 안정화할 수 있음.
`)}
${defCard("Detectable", `
Unstable mode들이 모두 observable 한 것. <br>
즉 출력 $y$로부터 unstable 상태를 추정 가능.
`)}

${note(`이 둘은 보통 final 시험 범위. 중간엔 정의 정도만 알아두면 충분.`)}

<h2>체크</h2>
${mcQuiz(
  "$A$가 eigenvalue $-1, -2, 0$ 을 갖고 $\\lambda=0$ 이 simple하면?",
  ["Asymptotically stable", "Marginally stable but not asymptotically", "Unstable"],
  1,
  "$\\text{Re}(0) = 0$ 이라 asymptotic 아님. 0이 simple이라 marginal stable."
)}

${mcQuiz(
  "$A$가 eigenvalue $-1, j, -j$ (모두 simple)?",
  ["Asymptotically stable", "Marginally stable", "Unstable"],
  1,
  "$\\pm j$ 는 허수축 위에 있고 simple → marginal stable. (Asymptotic은 아님 — sinusoidal mode가 안 사라짐.)"
)}

${mcQuiz(
  "Discrete-time $A$의 eigenvalue가 $0.5, 0.9, 1$ (1이 simple) 이면?",
  ["Asymptotically stable", "Marginally stable", "Unstable"],
  1,
  "$|1| = 1$ 이지만 simple이라 marginal. Asymptotic 아님. ($|\\lambda| < 1$ 필요)"
)}

${note(`<strong>중간 시험 범위 마무리.</strong> 이제 모의고사 도전!`, "tip")}
`);
