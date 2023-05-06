const theme = {
  palette: {
    primary: '#004FC4',
    secondary: '#6600CC',
    success: '#05A660',
    error: '#E53535',
    warning: '#E57A00',
    info: '#00B7C4',
    background: '#15161c',
    text: '#E4E4EB',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    lineHeight: 24,
  },
  spacing: 4,
};

export type Theme = typeof theme;

export default theme;
