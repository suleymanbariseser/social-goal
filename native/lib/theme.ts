const theme = {
  colors: {
    primary: '#bb86fc',
    secondary: '#03dac6',
    background: '#121212',
    text: '#ffffff',
    border: '#323232',
    success: '#00c853',
    warning: '#ffc107',
    danger: '#ff1744',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    lineHeight: 24,
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
};

export type Theme = typeof theme;

export default theme