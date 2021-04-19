const copy = (arr) => JSON.parse(JSON.stringify(arr));
// 1. Создаём canvas
const canvas = (rows, cols) =>
  new Array(cols).fill("").map((o, i) => new Array(rows).fill(""));

// 2. Функция построения линии
const line = (x1, y1, x2, y2) => {
  if (y1 === y2) {
    for (let i = x1; i <= x2; i++) {
      c[y1 - 1][i - 1] = "x";
    }
  } else {
    for (let i = y1; i <= y2; i++) {
      c[i - 1][x1 - 1] = "x";
    }
  }
};
// 3. Функция построения прямоугольника
const rectangle = (x1, y1, x2, y2) => {
  line(x1, y1, x2, y1);
  line(x2, y1, x2, y2);
  line(x1, y1, x1, y2);
  line(x1, y2, x2, y2);
};

// 4. fill
// const floodFill = function (image, sr, sc, newColor) {
//   const color = image[sr][sc];
//   if (color === newColor) return image;
//   const queue = [];
//   queue.push([sr, sc]);
//   while (queue.length) {
//     const [x, y] = queue.shift();
//     image[x][y] = newColor;
//     if (x - 1 >= 0 && image[x - 1][y] === color) queue.push([x - 1, y]);
//     if (y - 1 >= 0 && image[x][y - 1] === color) queue.push([x, y - 1]);
//     if (x + 1 < image.length && image[x + 1][y] === color)
//       queue.push([x + 1, y]);
//     if (y + 1 < image[0].length && image[x][y + 1] === color)
//       queue.push([x, y + 1]);
//   }
//   return image;
// };

// let floodFill = (A, row, col, cur, seen = new Set()) => {
//   let M = A.length,
//     N = M ? A[0].length : 0;
//   let pre = A[row][col];
//   let q = [[row, col]];
//   while (q.length) {
//     let [i, j] = q.shift();
//     seen.add(`${i},${j}`);
//     A[i][j] = cur;
//     for (let dir of [
//       [-1, 0],
//       [0, 1],
//       [1, 0],
//       [0, -1],
//     ]) {
//       // clockwise [👆, 👉, 👇, 👈]
//       let u = i + dir[0],
//         v = j + dir[1];
//       if (
//         u < 0 ||
//         u == M ||
//         v < 0 ||
//         v == N ||
//         A[u][v] != pre ||
//         seen.has(`${u},${v}`)
//       )
//         continue;
//       q.push([u, v]);
//     }
//   }
//   return A;
// };

var floodFill = function (image, sr, sc, newColor) {
  const currentColor = image[sr][sc];

  // No change needed
  if (currentColor === newColor) return image;

  const rowLength = image.length - 1;
  const colLength = image[0].length - 1;

  let stack = [[sr, sc]];

  while (stack.length !== 0) {
    let curr = stack.pop();
    let [row, col] = curr;

    if (row > 0 && image[row - 1][col] === currentColor)
      stack.push([row - 1, col]);
    if (row < rowLength && image[row + 1][col] === currentColor)
      stack.push([row + 1, col]);
    if (col > 0 && image[row][col - 1] === currentColor)
      stack.push([row, col - 1]);
    if (col < colLength && image[row][col + 1] === currentColor)
      stack.push([row, col + 1]);

    // Set the color
    image[row][col] = newColor;
  }

  return image;
};

// const c = canvas(20, 4);
// line(1, 2, 6, 2);
// line(6, 3, 6, 4, copy(c));
// rectangle(16, 1, 20, 3);
// floodFill(c, 3, 10, "o");
// console.log(copy(c));

//
// SECOND:
const c = canvas(230, 100);
line(10, 20, 60, 20);
line(60, 30, 60, 50, copy(c));
rectangle(60, 10, 200, 30);
floodFill(c, 30, 100, "0");
console.log(copy(c));
console.log(`STEP: 4`, copy(c));
