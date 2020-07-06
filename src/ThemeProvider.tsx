import React, {useState} from 'react';

type Theme = "light" | "dark";
type ThemeContext = {theme: Theme; toggleTheme: () => void};

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
)

export const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("light");
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value = {{ theme, toggleTheme }} >
            {children}
        </ThemeContext.Provider>
    )

}