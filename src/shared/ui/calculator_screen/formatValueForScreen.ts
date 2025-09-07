export	const formatNumberForScreen = (value: string, maxLength = 13) => {
		const num = Number(value); // преобразуем в число
		if (!isFinite(num)) return value; // если NaN или Infinity — возвращаем как есть
		const str = num.toString();
		// если влезает — возвращаем как есть
		if (str.length <= maxLength) return str;
		// отделяем целую и дробную части
		const [intPart] = str.split('.');
		const intLen = intPart.length;
		// если целая часть уже длиннее maxLength → экспоненциальная запись
		if (intLen >= maxLength) {
			return num.toExponential(maxLength - 5); // например "1.23e+10"
		}
		// сколько знаков остаётся на дробную часть
		const availableDecimals = maxLength - intLen - 1; // -1 под точку
		return num.toFixed(availableDecimals);
	};