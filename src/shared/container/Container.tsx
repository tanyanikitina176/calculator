import { useRef, useState, type ReactNode } from 'react';
import styles from './container.module.css';
import { CalculatorScreen } from '../ui/calculator_screen/calculator-screen';
import { Button } from '../ui/button/button';
import {
	buttonDeleteIcon,
	BUTTONS_TEXT,
	type calcButton,
} from '../lib/constants/constants';
import { evaluate } from 'mathjs';
import ListIcon from '@mui/icons-material/FormatListBulleted';
import {
	ListCalculatedValues,
	type HistoryCalculated,
} from '../ui/list_calculated_values/listCalculatedValues';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import { setHistoryInLocalStorage } from '../utils/getDataFromLocalStorage';

const modificatedExpression = (value: string): string => {
	let expression = value
		.toString()
		.replace(/×/g, '*')
		.replace(/÷/g, '/')
		.replace(/,/g, '.');

	//A + B% = A + (A*B/100)
	expression = expression.replace(
		/(\d+(?:\.\d+)?)\s*([\+\-])\s*(\d+(?:\.\d+)?)%/g,
		(_, a, op, b) => `${a}${op}(${a}*${b}/100)`
	);

	//A * B% = A * (B/100)
	expression = expression.replace(
		/(\d+(?:\.\d+)?)\s*\*\s*(\d+(?:\.\d+)?)%/g,
		(_, a, b) => `${a}*(${b}/100)`
	);

	//A / B% = A / (B/100)
	expression = expression.replace(
		/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)%/g,
		(_, a, b) => `${a}/(${b}/100)`
	);
	//A% = A/100
	expression = expression.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

	return expression.toString();
};

const calculateExpression = (value: string) => {
	const expression = modificatedExpression(value);
	try {
		return evaluate(expression);
	} catch (e) {
		console.error('Ошибка:', e);
		return NaN;
	}
};

export const Container = () => {
	const [value, setValue] = useState<string>('0');
	const [isOpenListCalculatedValues, setIsOpenListCalculatedValues] =
		useState<boolean>(false);
	const [expression, setExpression] = useState<string>('');
	const [history, setHistory] = useState<HistoryCalculated[]>([]);
	const [isClearedAfterEquals, setIsClearedAfterEquals] = useState(false);
	const [buttonTextDelete, setButtonTextDelete] = useState<string | ReactNode>(
		'AC'
	);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleClickValuesList = () => {
		setIsOpenListCalculatedValues(!isOpenListCalculatedValues);
	};

	const clearValue = () => {
		if (isClearedAfterEquals) {
			setValue('0');
			setIsClearedAfterEquals(false);
		} else {
			value.length != 1 ? setValue((prev) => prev.slice(0, -1)) : setValue('0');
		}
	};

	const clearExpression = () => {
		setExpression('');
	};

	const handleClickButton = ({ buttonText, id, isSpecial }: calcButton) => {
		if (id === 'equals') {
			const calculatedValue = calculateExpression(value);
			setExpression(value);
			setValue(calculatedValue.toString());
			setHistory((prev) => [
				{ value: calculatedValue.toString(), expression: value },
				...prev,
			]);
			setHistoryInLocalStorage({value: calculatedValue.toString(), expression: value})
			setButtonTextDelete('AC');
			setIsClearedAfterEquals(true);
			return;
		}
		if (typeof buttonText === 'number' || buttonText === ',') {
			if (isClearedAfterEquals) {
				buttonText === ',' ? setValue('0,') : setValue(buttonText.toString());
				setExpression('');
				setIsClearedAfterEquals(false);
				setButtonTextDelete(buttonDeleteIcon);
				return;
			}
			setValue((prev) => {
				const lastCharIsSpecial = BUTTONS_TEXT.some(
					(button) => button.buttonText === prev.slice(-1)
				);
				if (prev.slice(-1) === ',' && buttonText === ',') return prev;
				if (lastCharIsSpecial && buttonText === ',') return prev + '0,';
				if (prev === '0' && buttonText === ',') return '0,';
				return prev === '0'
					? buttonText.toString()
					: prev + buttonText.toString();
			});
			setButtonTextDelete(buttonDeleteIcon);
			return;
		}
		if (isSpecial) {
			setValue((prev) => {
				const lastCharIsEqual = BUTTONS_TEXT.some(
					(button) => button.buttonText === prev.slice(-1)
				);
				return lastCharIsEqual
					? prev.slice(0, -1) + buttonText!.toString()
					: prev + buttonText;
			});
			setButtonTextDelete(buttonDeleteIcon);
			return;
		}
		if (id === 'plus/minus') {
			setValue(`(-${value})`);
		}
		if (id === 'percent') {
			setValue((prev) => prev + '%');
		}
		if (id === 'clear') {
			clearValue();
			clearExpression();
		}
	};
	return (
		<div className={styles.container} ref={containerRef}>
			<button className={styles.listIcon} onClick={handleClickValuesList}>
				<ListIcon />
			</button>
			{isOpenListCalculatedValues && (
				<div
					onClick={() => setIsOpenListCalculatedValues(false)}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0,0,0,0.6)',
						zIndex: 3,
					}}
				/>
			)}
			<Slide
				direction='up'
				in={isOpenListCalculatedValues}
				mountOnEnter
				unmountOnExit
				timeout={400}
				container={containerRef.current}
			>
				<Paper
					sx={{
						position: 'absolute',
						bottom: 0,
						width: '100%',
						overflowY: 'auto',
						zIndex: 3,
						maxHeight: '50%',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
				>
					<Button
						extraClass={styles.button_history}
						onClick={() => setIsOpenListCalculatedValues(false)}
					>
						Готово
					</Button>
					<ListCalculatedValues history={history} />
					<Paper
						sx={{
							backgroundColor: 'var(--background-primary)',
							display: 'flex',
							justifyContent: 'space-between',
							width: '100%',
							maxWidth: '275px',
							padding: '20px 3px',
							borderRadius: 'initial',
						}}
					>
						<Button extraClass={styles.button_history}>Править</Button>
						<Button
							extraClass={`${styles.button_history} 
														${styles.button_history_clean}`}
						>
							Очистить
						</Button>
					</Paper>
				</Paper>
			</Slide>

			<CalculatorScreen value={value} expression={expression} />
			{BUTTONS_TEXT.map((button: calcButton, index) => {
				return (
					<Button
						key={index}
						isSpecial={button.isSpecial}
						onClick={() => handleClickButton({ ...button })}
					>
						{button.id === 'clear' ? buttonTextDelete : button.buttonText}
					</Button>
				);
			})}
		</div>
	);
};
