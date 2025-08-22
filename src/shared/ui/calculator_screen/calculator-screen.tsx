import styles from './calculator-screen.module.css';
import { formatNumberForScreen } from './formatValueForScreen';

interface CalculatorScreenProps {
	value: string;
	expression: string;
}

export const CalculatorScreen = ({
	value,
	expression,
}: CalculatorScreenProps) => {
	const formatValue = formatNumberForScreen(value);

	return (
		<div className={styles.calculator_screen}>
			<div className={styles.calculator_screen_expression}>{expression}</div>
			<p className={styles.calculator_screen_value}>{formatValue}</p>
		</div>
	);
};
