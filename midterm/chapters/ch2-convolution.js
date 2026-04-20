registerPage("ch2-convolution", "합성곱(Convolution)", () => `
<h1>Ch 2 — Convolution 합성곱</h1>
<p class="lead">${tag("매년출제", "must")} 족보 2013 #1, 2015 #1, 과제 2.9 — 매번 비슷한 형태. unit step 함수 다루는 법만 익히면 끝.</p>

<h2>1. 정의</h2>
${defCard("Convolution", `
LTI 시스템의 출력 = 입력 $\\times$ 임펄스응답 (합성곱):
$$\\boxed{y(t) = (x * h)(t) = \\int_{-\\infty}^{\\infty} x(\\tau) h(t - \\tau) d\\tau}$$
인과(causal) + 입력이 $t < 0$ 에서 0 이면:
$$y(t) = \\int_0^t x(\\tau) h(t - \\tau) d\\tau$$
`)}

${note(`<strong>직관:</strong> 시스템에 어떤 입력 $x(\\tau)$가 들어왔을 때, 그게 시간 $t - \\tau$ 만큼 지난 뒤 임펄스 응답 $h(t-\\tau)$ 만큼 영향을 주고, 이걸 모든 과거 시간에 대해 적분.`)}

${collapse("실생활 비유 1: 콘서트홀의 잔향(reverb)", `
콘서트홀에서 손뼉 한 번 (= 임펄스 $\\delta(t)$) 치면 → 메아리가 점점 줄면서 들림. 이게 임펄스응답 $h(t)$.<br><br>
이제 가수가 노래를 불러 (= 입력 $x(t)$). 각 순간의 소리가 잔향과 합쳐져서 청중에게 도달 (= 출력 $y(t) = x*h$).<br><br>
<strong>요약:</strong> 입력의 매 순간이 시스템에 "복사된 임펄스응답"을 만들고, 그게 다 더해진 게 출력. 적분이 정확히 이 "다 더하기".
`)}

${collapse("실생활 비유 2: 사진 흐림(blur) 효과", `
원본 사진의 각 픽셀이 주변 픽셀에 블러 효과 (= $h$)를 만들어 퍼지는 것. <br>
픽셀별로 블러 효과를 다 합한 게 흐려진 사진.<br><br>
이미지 처리에선 이걸 <strong>2D convolution</strong>이라 부름. CNN(딥러닝)의 핵심 연산도 이거의 일반화.
`)}

${collapse("왜 $h(t-\\tau)$ 인가? — 인과성과 시간 시프트", `
$\\tau$ 시점에 입력이 들어왔으면, 그 영향은 $\\tau$ 시점부터 시작. <br>
$\\tau$ 후 $\\Delta t$ 시간 지나면 → 임펄스응답이 $h(\\Delta t)$ 만큼 작용.<br>
$t$ 시점의 영향은 $\\Delta t = t - \\tau$ 이므로 $h(t - \\tau)$.<br><br>
인과적 시스템(causal): 현재 출력은 과거 입력에만 의존 → $\\tau \\le t$ → 적분 상한 $t$.
`)}

<h2>2. Unit Step Function</h2>
${defCard("$u(t)$", `
$$u(t) = \\begin{cases} 1, & t \\ge 0 \\\\ 0, & t < 0 \\end{cases}$$
시프트: $u(t - a)$는 $t = a$부터 켜짐.
`)}

${note(`<strong>시험에서 자주 나오는 형태:</strong><br>
$x(t) = u(t) - 2u(t-1) + u(t-3)$ → "0~1초: 1, 1~3초: -1, 3초 이후: 0" 같은 사각파.<br>
$h(t) = u(t) - u(t-2)$ → "0~2초까지만 1인 펄스".`)}

<h2>3. 풀이 핵심: 그래픽 방법</h2>
${note(`<strong>합성곱 풀이 전략:</strong><br>
1. $x(\\tau)$ 와 $h(t - \\tau)$ 를 $\\tau$ 축에 그려라. <br>
2. $h(t-\\tau)$ 는 $h(\\tau)$를 <strong>뒤집고($\\tau \\to -\\tau$) $t$만큼 시프트</strong>.<br>
3. $t$ 값을 0부터 키우면서, 두 그래프가 겹치는 구간을 찾고, 그 구간에서 적분.<br>
4. 겹침 구간이 바뀌는 모든 $t$ 값에서 케이스 나누기.`, "tip")}

<h2>4. 워크스루: 족보 2013 #1</h2>
${walkthrough("$x(t) = u(t) - 2u(t-1) + u(t-3)$, $h(t) = u(t) - u(t-2)$", [
  {
    title: "$x(t)$ 그리기",
    body: `$x(t) = \\begin{cases} 1, & 0 \\le t < 1 \\\\ -1, & 1 \\le t < 3 \\\\ 0, & \\text{else} \\end{cases}$<br><br>
    체크: $u(t)=1, u(t-1)=1$ 이면 $1 - 2 = -1$ ✓ ($t \\in [1,3)$). $u(t-3)$이 켜지면 $1 - 2 + 1 = 0$ ✓.`
  },
  {
    title: "$h(t)$ 그리기",
    body: `$h(t) = \\begin{cases} 1, & 0 \\le t < 2 \\\\ 0, & \\text{else} \\end{cases}$<br>
    너비 2의 사각 펄스.`
  },
  {
    title: "케이스 분석",
    body: `$h(t-\\tau)$는 $\\tau \\in [t-2, t]$ 에서 1.<br>
    $x(\\tau)$는 $[0,1)$ 에서 1, $[1,3)$ 에서 −1.<br>
    겹침이 바뀌는 경계: $t = 0, 1, 2, 3, 4, 5$.<br><br>
    분기:<br>
    • $t < 0$: 안 겹침 → $y = 0$<br>
    • $0 \\le t < 1$: 겹침 $[0, t]$, 모두 $x=1$ → $y = t$<br>
    • $1 \\le t < 2$: 겹침 $[0, t]$. $[0,1)$에서 1, $[1,t]$에서 −1 → $y = 1 \\cdot 1 + (-1)(t-1) = 2 - t$<br>
    • $2 \\le t < 3$: 겹침 $[t-2, t]$. $[t-2, 1)$에서 1, $[1, t]$에서 −1 → $y = (1-(t-2)) - (t-1) = (3-t) - (t-1) = 4 - 2t$<br>
    • $3 \\le t < 4$: 겹침 $[t-2, t]$. $[t-2, 3)$에서 −1, $[3, t]$에서 0 → $y = -(3-(t-2)) = -(5-t) = t - 5$<br>
    • $4 \\le t < 5$: 겹침 $[t-2, 3)$ 부분만 −1 → $y = -(3-(t-2)) = t - 5$<br>
    • $t \\ge 5$: 안 겹침 → $y = 0$`
  },
  {
    title: "최종 답",
    body: `$$y(t) = \\begin{cases} t, & 0 \\le t < 1 \\\\ 2 - t, & 1 \\le t < 2 \\\\ 4 - 2t, & 2 \\le t < 3 \\\\ t - 5, & 3 \\le t < 5 \\\\ 0, & \\text{else} \\end{cases}$$<br>
    검증: 경계에서 연속인지 확인. $t=1$: $1, 1$ ✓. $t=2$: $0, 0$ ✓. $t=3$: $-2, -2$ ✓. $t=5$: $0, 0$ ✓.<br>
    (참고: $4-2t$ 가 $t=3$에서 $-2$, $t-5$ 가 $t=3$에서 $-2$.)`
  }
])}

<h2>5. 자주 쓰는 공식 (외워!)</h2>
<table>
  <tr><th>입력</th><th>임펄스응답</th><th>출력</th></tr>
  <tr><td>$u(t)$</td><td>$h(t)$</td><td>$\\int_0^t h(\\tau) d\\tau$ (step response)</td></tr>
  <tr><td>$\\delta(t)$</td><td>$h(t)$</td><td>$h(t)$</td></tr>
  <tr><td>$e^{-at}u(t)$</td><td>$e^{-bt}u(t)$</td><td>$\\frac{1}{b-a}(e^{-at} - e^{-bt})u(t)$ ($a \\neq b$)</td></tr>
  <tr><td>$u(t)$</td><td>$e^{-at}u(t)$</td><td>$\\frac{1}{a}(1 - e^{-at})u(t)$</td></tr>
</table>

<h2>6. 워크스루 #2: 족보 2015 #1</h2>
${walkthrough("$u(t) = u_s(t) - u_s(t-2)$, $h(t) = e^{-2t} u_s(t)$ — 출력 $y(t)$ 구하기", [
  {
    title: "분석",
    body: `입력 = "0~2초만 1인 사각 펄스". 시프트 성질을 이용:<br>
    $u(t) = u_s(t) - u_s(t-2)$ 이므로 출력도:<br>
    $y(t) = (h * u_s)(t) - (h * u_s)(t-2)$`
  },
  {
    title: "Step response 먼저",
    body: `$s(t) = (h * u_s)(t) = \\int_0^t e^{-2\\tau} d\\tau = \\frac{1}{2}(1 - e^{-2t})$ ($t \\ge 0$)`
  },
  {
    title: "조립",
    body: `$y(t) = s(t) - s(t-2)$<br>
    • $0 \\le t < 2$: $s(t-2) = 0$ → $y(t) = \\frac{1}{2}(1 - e^{-2t})$<br>
    • $t \\ge 2$: $y(t) = \\frac{1}{2}(1 - e^{-2t}) - \\frac{1}{2}(1 - e^{-2(t-2)}) = \\frac{1}{2}(e^{-2(t-2)} - e^{-2t})$<br>
    $\\quad = \\frac{1}{2} e^{-2t}(e^4 - 1)$`
  }
])}

<h2>체크</h2>
${mcQuiz(
  "임펄스응답 $h(t)$가 $0 \\le t < 1$에서 1, 그 외 0 인 시스템에 임펄스 입력 $\\delta(t)$를 가하면 출력은?",
  ["$\\delta(t)$", "$h(t)$ 그 자체", "$u(t)$"],
  1,
  "임펄스 응답의 정의: $\\delta(t)$ 입력 → 출력 = $h(t)$. $\\delta * h = h$."
)}

${mcQuiz(
  "$x(t) = u(t)$ 와 $h(t) = u(t)$ 의 합성곱은?",
  ["$u(t)$", "$t \\cdot u(t)$ (램프)", "$\\delta(t)$", "$2u(t)$"],
  1,
  "$\\int_0^t 1 \\cdot 1 \\, d\\tau = t$ ($t \\ge 0$). 즉 unit ramp $r(t) = t \\cdot u(t)$."
)}

${note(`<strong>시험장 팁:</strong> 케이스 분기 경계를 잘 적어두면 부분점수 만점. 그래프 그리는 데 5분 투자해. 머릿속으로 풀려고 하면 거의 무조건 틀려.`, "tip")}
`);
