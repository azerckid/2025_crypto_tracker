export interface Theme {
    colors: {
        primary: string;
        surface: string;
        text: string;
        textSecondary: string;
        error: string;
        success: string;
        cardBg: string;
        danger: string;
    };
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    borderRadius: {
        sm: string;
        md: string;
        lg: string;
    };
    shadows: {
        sm: string;
        md: string;
    };
}

export const lightTheme: Theme = {
    colors: {
        primary: '#007AFF',
        surface: '#FFFFFF',
        text: '#000000',
        textSecondary: '#666666',
        error: '#FF3B30',
        success: '#34C759',
        cardBg: '#FFFFFF',
        danger: '#FF3B30'
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px'
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px'
    },
    shadows: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
        md: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }
};

export const darkTheme: Theme = {
    colors: {
        primary: '#0A84FF',
        surface: '#1C1C1E',
        text: '#FFFFFF',
        textSecondary: '#8E8E93',
        error: '#FF453A',
        success: '#32D74B',
        cardBg: '#2C2C2E',
        danger: '#FF453A'
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px'
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px'
    },
    shadows: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.2)',
        md: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }
}; 