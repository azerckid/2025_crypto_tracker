import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            background: string;
            surface: string;
            text: string;
            textSecondary: string;
            border: string;
            error: string;
            success: string;
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
            lg: string;
        };
    }
} 