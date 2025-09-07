import type { ButtonText } from '../../ui/button/type';
import CalcIcon from '../../../assets/calcIcon.svg?react';
import DeleteIcon from '../../../assets/delete.svg?react';
import PlusAndMinusIcon from '../../../assets/plusAndMinus.svg?react';

export interface calcButton {
	id: string;
	buttonText: ButtonText;
	isSpecial?: boolean;
}

export const buttonDeleteIcon = (
	<DeleteIcon style={{ display: 'block', margin: '0 auto' }} />
);

export const BUTTONS_TEXT: calcButton[] = [
	{
		buttonText: 'АС',
		id: 'clear',
	},
	{
		buttonText: <PlusAndMinusIcon style={{ display: 'block', stroke: 'var(--button-text-color)' }} />,
		id: 'plus/minus',
	},
	{ buttonText: '%', id: 'percent' },
	{ buttonText: '÷', id: 'division', isSpecial: true },
	{ buttonText: 7, id: 'seven' },
	{ buttonText: 8, id: 'eight' },
	{ buttonText: 9, id: 'nine' },
	{ buttonText: '×', id: 'multiplication', isSpecial: true },
	{ buttonText: 4, id: 'four' },
	{ buttonText: 5, id: 'five' },
	{ buttonText: 6, id: 'six' },
	{ buttonText: '-', id: 'subtraction', isSpecial: true },
	{ buttonText: 1, id: 'one' },
	{ buttonText: 2, id: 'two' },
	{ buttonText: 3, id: 'three' },
	{ buttonText: '+', id: 'addition', isSpecial: true },
	{ buttonText: <CalcIcon style={{ display: 'block' }} />, id: 'calc' },
	{ buttonText: 0, id: 'zero' },
	{ buttonText: ',', id: 'comma' },
	{ buttonText: '=', id: 'equals', isSpecial: true },
];
