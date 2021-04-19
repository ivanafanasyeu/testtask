import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Grid2d = (arr, key) => {
  return (
    <section style={{ border: "1px solid black", width: "fit-content" }}>
      {arr.map((r, i) => {
        return (
          <div key={`${key}_row_${r}${i}`} style={{ display: "flex" }}>
            {r.map((c, i) => (
              <div
                key={`${key}_col_${r}${i}`}
                style={{
                  width: "1rem",
                  height: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
};

const DrawElem = () => {
  const container = useRef(null);
  const [step1, setStep1] = useState(undefined);
  const [step2, setStep2] = useState(undefined);
  const [step3, setStep3] = useState(undefined);
  const [step4, setStep4] = useState(undefined);

  useEffect(() => {
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
    const floodFill = function (image, sr, sc, newColor) {
      const currentColor = image[sr][sc];
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

        image[row][col] = newColor;
      }

      return image;
    };

    const c = canvas(20, 4);
    line(1, 2, 6, 2);
    setStep1(copy(c));
    line(6, 3, 6, 4, copy(c));
    setStep2(copy(c));
    rectangle(16, 1, 20, 3);
    setStep3(copy(c));
    floodFill(c, 3, 10, "o");
    setStep4(copy(c));

    // SECOND:
    // const c = canvas(230, 100);
    // line(10, 20, 60, 20);
    // setStep1(copy(c));
    // line(60, 30, 60, 50, copy(c));
    // setStep2(copy(c));
    // rectangle(60, 10, 200, 30);
    // setStep3(copy(c));
    // floodFill(c, 30, 100, "0");
    // setStep4(copy(c));
  }, []);

  return (
    <div>
      <h1>Drawing</h1>
      <div
        ref={container}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          rowGap: "12px",
          height: "fit-content",
        }}
      >
        {step1 ? Grid2d(step1, "step1") : null}
        {step2 ? Grid2d(step2, "step2") : null}
        {step3 ? Grid2d(step3, "step3") : null}
        {step4 ? Grid2d(step4, "step4") : null}
      </div>
    </div>
  );
};

ReactDOM.render(<DrawElem />, document.getElementById("root"));
