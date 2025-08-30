import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useState } from 'react';
import { getHistoryFromLocalStorage } from '../../utils/getDataFromLocalStorage';

export type HistoryCalculated = {
	expression: string;
	value: string;
};

interface ListCalculatedValuesProps {
	onSelectHistory: (history: HistoryCalculated) => void;
	history: HistoryCalculated[];
}

export const ListCalculatedValues = ({onSelectHistory}: ListCalculatedValuesProps ) => {
	const [historyToShow, setHistoryToShow] = useState<HistoryCalculated[]>([]);

	useEffect(() => {
		const historyCalculated = getHistoryFromLocalStorage()
		setHistoryToShow(historyCalculated!);
	}, []);

	const handleItemClick = (history: HistoryCalculated) => {
		onSelectHistory(history);
	}

	return (
		<List sx={{
			height: 'stretch',
			overflowY: 'scroll'
		}}>
			<ListItemButton>
				<ListItemText secondary='Сегодня' />
			</ListItemButton>

			{historyToShow.map((history, index) => (
				<ListItemButton key={index} onClick={() => handleItemClick(history)}>
					<ListItemText
						slotProps={{
							secondary: { sx: { fontSize: '1rem', color: 'black' } },
							primary: { sx: { fontSize: '0.9rem', color: 'gray' } },
						}}
						primary={history.expression}
						secondary={history.value}
						key={index}
					/>
				</ListItemButton>
			))}
		</List>
	);
};
