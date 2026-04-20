registerPage("ch3-rank", "Rank · Null Space · 일반해", () => `
<h1>Ch 3.2 — Rank, Null Space, 일반해</h1>
<p class="lead">${tag("시험빈출", "exam")} 족보 2015 #3, 과제 3.8에 그대로 출제됨. $A\\mathbf{x} = \\mathbf{b}$의 일반해 구하기.</p>

<h2>1. Rank (계수)</h2>
${defCard("Rank of $A$", `
행렬 $A$의 <strong>독립인 열(또는 행)의 최대 개수</strong>.
<br>$A$가 $m \\times n$ 행렬이면 $\\text{rank}(A) \\le \\min(m, n)$.
<br><br>구하는 법: 가우스 소거 → 0이 아닌 행(=pivot 행)의 개수.
`)}

${note(`<strong>핵심:</strong> rank는 "정보의 양"이라고 생각해. 행렬이 담고 있는 독립적인 방향의 개수.`)}

${collapse("실생활 비유: 설문조사", `
100명에게 5개 질문(만족도, 가격, 디자인, 품질, 구매의향). <br>
$100 \\times 5$ 행렬. <strong>Rank가 5</strong>면 → 모든 질문이 독립적인 정보를 줌.<br>
<strong>Rank가 3</strong>이면 → 사실 5개 질문 중 2개는 다른 3개로 표현 가능 (예: "구매의향 = 0.5×만족도 + 0.5×품질"). 즉 <em>중복 질문</em>.<br><br>
PCA(주성분 분석)의 핵심이 이거. 큰 데이터의 "진짜 차원"을 찾는 게 rank 분석.
`)}

${collapse("이미지 처리에서: 저랭크 근사", `
사진 한 장은 $m \\times n$ 픽셀 행렬. 보통 rank가 거의 full ($\\min(m,n)$).<br>
하지만 rank를 강제로 낮추면 (예: SVD로 top-$k$ 만 남김) → 사진이 압축됨.<br>
이게 JPEG, 영상 압축의 기본 아이디어.
`)}

${collapse("예시", `
$A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 0 & 1 & 1 \\end{bmatrix}$
<br>둘째 행 = 첫 행의 2배. 그러므로 독립 행은 2개.
$$\\text{rank}(A) = 2$$
`)}

<h2>2. Null Space (영공간)</h2>
${defCard("Null Space $N(A)$", `
$A\\mathbf{x} = \\mathbf{0}$ 을 만족하는 모든 $\\mathbf{x}$의 집합.
<br>차원: $\\dim N(A) = n - \\text{rank}(A)$ (이를 <strong>nullity</strong>라 부름)
`)}

${defCard("Rank-Nullity Theorem (계수-영공간 정리)", `
$$\\boxed{\\text{rank}(A) + \\text{nullity}(A) = n}$$
$A$의 열 개수 $n$. 시험에서 매우 자주 사용.
`)}

<h2>3. $A\\mathbf{x} = \\mathbf{b}$ 의 일반해 (General Solution)</h2>

${note(`<strong>일반해 = 특수해(particular) + 동차해(homogeneous)</strong><br>
$$\\mathbf{x} = \\mathbf{x}_p + \\mathbf{x}_h$$
- $\\mathbf{x}_p$: $A\\mathbf{x}_p = \\mathbf{b}$ 만족하는 아무 한 해<br>
- $\\mathbf{x}_h \\in N(A)$: $A\\mathbf{x}_h = \\mathbf{0}$의 모든 해 (자유 파라미터 포함)`, "tip")}

${walkthrough("과제 3.8 / 족보 2015 #3 풀이", [
  {
    title: "문제 셋업",
    body: `$A\\mathbf{x} = \\mathbf{b}$, $A = \\begin{bmatrix} 1 & 2 & 3 & 4 \\\\ 0 & -1 & -2 & 2 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$, $\\mathbf{b} = \\begin{bmatrix} 3 \\\\ 2 \\\\ 1 \\end{bmatrix}$. <br>"How many parameters do you have?" 도 함께 묻는다.`
  },
  {
    title: "Rank 확인",
    body: `이미 row echelon 형태. 0이 아닌 행이 3개 → $\\text{rank}(A) = 3$. <br>열 개수 $n = 4$. 그러므로 $\\text{nullity} = 4 - 3 = 1$. <br><strong>자유 파라미터 1개</strong>.`
  },
  {
    title: "Particular solution $\\mathbf{x}_p$ 찾기",
    body: `자유 변수를 0으로 놓으면 편해. 어느 열이 자유인지 보자. Pivot은 1열, 2열, 4열 → <strong>3열이 자유</strong>. <br>$x_3 = 0$으로 두면:<br>3행: $x_4 = 1$<br>2행: $-x_2 + 2x_4 = 2 \\Rightarrow x_2 = 0$<br>1행: $x_1 + 0 + 0 + 4 = 3 \\Rightarrow x_1 = -1$<br>$$\\mathbf{x}_p = \\begin{bmatrix}-1\\\\0\\\\0\\\\1\\end{bmatrix}$$`
  },
  {
    title: "Homogeneous solution $\\mathbf{x}_h$ — null space",
    body: `$A\\mathbf{x} = \\mathbf{0}$ 풀기. 자유변수 $x_3 = t$로 두면:<br>3행: $x_4 = 0$<br>2행: $-x_2 - 2t + 0 = 0 \\Rightarrow x_2 = -2t$<br>1행: $x_1 - 4t + 3t + 0 = 0 \\Rightarrow x_1 = t$<br>$$\\mathbf{x}_h = t\\begin{bmatrix}1\\\\-2\\\\1\\\\0\\end{bmatrix}$$`
  },
  {
    title: "최종 일반해",
    body: `$$\\mathbf{x} = \\mathbf{x}_p + \\mathbf{x}_h = \\begin{bmatrix}-1\\\\0\\\\0\\\\1\\end{bmatrix} + t\\begin{bmatrix}1\\\\-2\\\\1\\\\0\\end{bmatrix}, \\quad t \\in \\mathbb{R}$$ <strong>파라미터 개수: 1개</strong> (= nullity).`
  }
])}

<h2>4. 해의 존재성</h2>
<table>
  <tr><th>조건</th><th>해의 상황</th></tr>
  <tr><td>$\\text{rank}(A) = \\text{rank}([A|\\mathbf{b}])$ 이고 $= n$</td><td>유일한 해</td></tr>
  <tr><td>$\\text{rank}(A) = \\text{rank}([A|\\mathbf{b}])$ 이고 $< n$</td><td>해가 무수히 많음 (자유변수 $n - \\text{rank}$ 개)</td></tr>
  <tr><td>$\\text{rank}(A) < \\text{rank}([A|\\mathbf{b}])$</td><td>해 없음 (inconsistent)</td></tr>
</table>

${mcQuiz(
  "$A$가 $3 \\times 5$ 행렬이고 $\\text{rank}(A) = 3$ 이면 $A\\mathbf{x} = \\mathbf{b}$ 의 해는?",
  ["존재하지 않을 수 있음", "유일한 해", "2개의 자유변수를 가지는 무한 많은 해", "3개의 자유변수"],
  2,
  "$\\text{rank}(A) = 3 = m$ 이라 항상 해가 존재 (행이 다 독립이라 row echelon 끝까지 0행이 없음). 자유변수 = $n - \\text{rank} = 5 - 3 = 2$."
)}

${mcQuiz(
  "정사각행렬 $A$가 invertible 일 동치 조건이 <strong>아닌</strong> 것은?",
  ["$\\det(A) \\neq 0$", "rank가 full ($n$)", "$N(A) = \\{\\mathbf{0}\\}$", "$A$의 모든 entry가 0이 아님"],
  3,
  "Entry 자체와는 무관. 나머지 셋은 모두 동치 (invertible matrix theorem)."
)}

${note(`<strong>시험 팁:</strong> rank/null/일반해 문제는 계산 실수가 절반. 가우스 소거를 한 단계씩 깔끔히 적고, 자유변수 → particular → homogeneous 순으로 적으면 부분점수도 잘 받아.`, "tip")}
`);
