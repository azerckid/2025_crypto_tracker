import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
    colors: {
        primary: '#007AFF',
        surface: '#F5F5F5',
        text: '#333333',
        textSecondary: '#666666',
        error: '#FF3B30',
        success: '#34C759',
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
    },
    shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
};

export const darkTheme: DefaultTheme = {
    colors: {
        primary: '#0A84FF',
        surface: '#1C1C1E',
        text: '#FFFFFF',
        textSecondary: '#EBEBF5',
        error: '#FF453A',
        success: '#32D74B',
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
    },
    shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.2)',
        md: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
}; 