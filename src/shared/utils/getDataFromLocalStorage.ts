import type { HistoryCalculated } from '../ui/list_calculated_values/listCalculatedValues';

export const getHistoryFromLocalStorage = (): HistoryCalculated[] | null => {
	try {
		const historyJSON = localStorage.getItem('history');
		if (!historyJSON) {
			localStorage.setItem('history', JSON.stringify([]));
			return [];
		}
		const parsedHistory = JSON.parse(historyJSON);
		return parsedHistory;
	} catch (error) {
		console.log('Ошибка при парсинге истории вычислений', error);
		return null;
	}
};

export const setHistoryInLocalStorage = (data: HistoryCalculated): void => {
	const history = getHistoryFromLocalStorage();
	let result = [];
	if (!history) {
		result.push(data);
	} else {
		history.unshift(data);
		result = history;
	}
	localStorage.setItem('history', JSON.stringify(result));
};
