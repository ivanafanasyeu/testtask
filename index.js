import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Grid2d = (arr, key) => {
	return (
		<section style={{ border: '1px solid black', width: 'fit-content' }}>
			{arr.map((r, i) => {
				return (
					<div key={`${key}_row_${r}${i}`} style={{ display: 'flex' }}>
						{r.map((c, i) => (
							<div
								key={`${key}_col_${r}${i}`}
								style={{
									width: '1rem',
									height: '1rem',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
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
		// 1. Создаём canvas
		const canvas = (rows, cols) =>
			new Array(cols).fill('').map((o, i) => new Array(rows).fill(''));
		// 2. Функция построения линии
		const line = (x1, y1, x2, y2) => {
			if (y1 === y2) {
				for (let i = x1; i <= x2; i++) {
					c[y1 - 1][i - 1] = 'x';
				}
			} else {
				for (let i = y1; i <= y2; i++) {
					c[i - 1][x1 - 1] = 'x';
				}
			}
		};
		// 3. Функция построения прямоугольника
		const rectangle = (x1, y1, x2, y2) => {
			for (let i = x1; i <= x2 - 1; i++) {
				c[y1 - 1][i - 1] = 'x';
				c[y2 - 1][i - 1] = 'x';
			}

			for (let i = y1; i <= y2; i++) {
				c[i - 1][x1 - 1] = 'x';
				c[i - 1][x2 - 1] = 'x';
			}
		};
		// 4. fill
		const fill = (x, y, color, W, H) => {
			if (
				x - 1 >= 0 &&
				x - 1 < W &&
				y - 1 >= 0 &&
				y - 1 < H &&
				c[y - 1][x - 1] !== 'x' &&
				c[y - 1][x - 1] !== color
			) {
				c[y - 1][x - 1] = color;

				fill(x + 1, y, color, W, H, c);
				fill(x - 1, y, color, W, H, c);
				fill(x, y + 1, color, W, H, c);
				fill(x, y - 1, color, W, H, c);
			}
		};

		const copy = (arr) => JSON.parse(JSON.stringify(arr));

		const c = canvas(20, 4);
		line(1, 2, 6, 2);
		console.log(copy(c));
		setStep1(copy(c));
		line(6, 3, 6, 4, copy(c));
		console.log(copy(c));
		setStep2(copy(c));
		rectangle(16, 1, 20, 3);
		console.log(copy(c));
		setStep3(copy(c));
		fill(10, 3, 'o', 20, 4);
		console.log(copy(c));
		setStep4(copy(c));
		// const c = canvas(230, 100);
		// line(10, 20, 60, 20);
		// console.log(copy(c));
		// setStep1(copy(c));
		// line(60, 30, 60, 50, copy(c));
		// console.log(copy(c));
		// setStep2(copy(c));
		// console.log(copy(c));
		// rectangle(60, 10, 200, 30);
		// console.log(copy(c));
		// setStep3(copy(c));
		// fill(120, 35, 'o', 230, 100);
		// console.log(copy(c));
		// setStep4(copy(c));
	}, []);

	return (
		<div>
			<h1>Drawing</h1>
			<div
				ref={container}
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr',
					rowGap: '12px',
					height: 'fit-content',
				}}
			>
				{step1 ? Grid2d(step1, 'step1') : null}
				{step2 ? Grid2d(step2, 'step2') : null}
				{step3 ? Grid2d(step3, 'step3') : null}
				{step4 ? Grid2d(step4, 'step4') : null}
			</div>
		</div>
	);
};

ReactDOM.render(<DrawElem />, document.getElementById('root'));
