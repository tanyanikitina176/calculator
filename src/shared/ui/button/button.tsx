import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './button.module.css';

interface ButtonProps {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	extraClass?: string;
	children: ReactNode;
	isSpecial?: boolean;
}

export const Button = ({
	children,
	onClick,
	isSpecial,
	extraClass = '',
}: ButtonProps) => {
	const className = clsx(styles.button, {
		[styles.button_special]: isSpecial,
	}, extraClass);
	return (
		<button onClick={onClick} className={className}>
			{children}
		</button>
	);
};
