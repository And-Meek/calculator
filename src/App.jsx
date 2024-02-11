import { useState } from 'react';
import './App.css';
import style from './App.module.css';

export const App = () => {
	const currentYear = new Date().getFullYear();
	// const NUMS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
	// const OPERATORS = ['+', '-', '=', 'C'];

	const NUMS = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '=', '0', 'C'];

	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [isResult, setIsResult] = useState(false);

	const isNumber = (event) => {
		return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(
			event.target.innerText,
		);
	};

	const isOperator = (event) => {
		return ['+', '-'].includes(event.target.innerText);
	};

	const onClick = (event) => {
		const { innerText } = event.target;

		if ((operand1 + operator + operand2).length < 10) {
			if (operator === '' && isNumber(event)) {
				setOperand1(operand1 + innerText);
			}
			if (operand1 !== '' && isOperator(event) && operand2 === '') {
				console.log(event);
				console.log(innerText);
				setOperator(innerText);
				setIsResult(false);
			}
			if (operator !== '' && isNumber(event)) {
				console.log(event);
				console.log(innerText);
				setOperand2(operand2 + Number(innerText));
			}
			if (operand2 !== '' && innerText === '=') {
				setIsResult(true);
				if (operator === '+') {
					setOperand1(Number(operand1) + Number(operand2));
				}
				if (operator === '-') {
					setOperand1(Number(operand1) - Number(operand2));
				}
				setOperator('');
				setOperand2('');
			}
		}
		if (innerText === 'C') {
			setOperand1('');
			setOperator('');
			setOperand2('');
			setIsResult(false);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<div className={style.calc}>
					<div className={`${style.screen} ${isResult ? style.isResult : false}`}>
						{operand1 !== '' ? operand1 + operator + operand2 : 0}
					</div>
					<div className={style.buttonsAndOperands}>
						<div className={style.buttons}>
							{NUMS.map((item) => (
								<button
									onClick={onClick}
									key={item}
									className={`${style.numButton}
										${['+', '-', '=', 'C'].includes(item) ? style.operators : style.numbers}`}
								>
									{item}
								</button>
							))}
						</div>
					</div>
				</div>
				<p>{currentYear}</p>
			</header>
		</div>
	);
};
