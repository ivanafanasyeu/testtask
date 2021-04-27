import React, { useRef, useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import text from "./input-2.txt";

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
                  fontWeight: c === "x" && "bold",
                  color: c === "x" && "red",
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
  const [c, setC] = useState(undefined);

  useEffect(() => {
    const getText = async () => {
      const r = await fetch(text);
      const d = await r.text();
      const operations = d
        .replace(/\r\n/g, "\r")
        .replace(/\n/g, "\r")
        .split(/\r/);
      // Будем считать что всегда первая строка это canvas

      const canvas = (rows, cols) => {
        return new Array(cols).fill("").map((o, i) => new Array(rows).fill(""));
      };
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
        console.log(image);
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

      const c = canvas(
        +operations[0].split(" ")[1],
        +operations[0].split(" ")[2]
      );

      const doAction = (str, image) => {
        let a = str.split(" ");
        switch (a[0]) {
          case "L":
            return line(+a[1], +a[2], +a[3], +a[4]);
          case "R":
            return rectangle(+a[1], +a[2], +a[3], +a[4]);
          case "B":
            return floodFill(image, +a[2], +a[1], a[3]);
          default:
            break;
        }
      };

      for (let i = 1; i <= operations.length - 1; i++) {
        doAction(operations[i], c);
      }

      setC(c);
    };

    getText();
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
        {c ? Grid2d(c, "c") : null}
      </div>
    </div>
  );
};

ReactDOM.render(<DrawElem />, document.getElementById("root"));
