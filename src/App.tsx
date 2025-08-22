import './App.css';
import './theme.css';
import { Container } from './shared/container/Container';
import { supportedThemes, ThemeContext, type Themes } from './ThemeContext';
import { useEffect, useState } from 'react';
import { getTheme, StorageKey } from './shared/utils/getThem';
import DarkModeIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';

function App() {
	const [theme, setTheme] = useState<Themes>(getTheme);

	useEffect(() => {
		localStorage.setItem(StorageKey, theme);
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	const handleSwitchTheme = () => {
		if (theme === 'dark') {
			setTheme('light');
		} else {
			setTheme('dark');
		}
	};

	const icon = theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />
	return (
		<ThemeContext.Provider value={{ theme, setTheme, supportedThemes }}>
			<button onClick={handleSwitchTheme} style={{background: 'none'}}>
			{icon}
			</button>
			<Container />
		</ThemeContext.Provider>
	);
}

export default App;
