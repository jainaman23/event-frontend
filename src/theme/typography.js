import COLORS from './colors';

export const TYPOGRAPHY = {
  fontFamily: ['Poppins', 'sans-serif'].join(','),
  h1: {
    fontSize: '2.5rem', // 40px
    fontWeight: 500,
    lineHeight: '1.5',
    marginBottom: '1rem',
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    '@media(max-width:900px)': {
      fontSize: '2.25rem',
    },
  },
  h2: {
    fontSize: '2.25rem', // 36px
    fontWeight: 500,
    lineHeight: '1.5',
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    '@media(max-width:900px)': {
      fontSize: '2rem',
    },
  },
  h3: {
    fontSize: '2rem', // 32px
    fontWeight: 500,
    lineHeight: '1.5',
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    '@media(max-width:900px)': {
      fontSize: '1.75rem',
    },
  },
  h4: {
    fontSize: '1.75rem', // 28px
    fontWeight: 500,
    lineHeight: '1.25',
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    '@media(max-width:900px)': {
      fontSize: '1.5rem',
    },
  },
  h5: {
    fontSize: '1.5rem', // 24px
    fontWeight: 500,
    lineHeight: '1.25',
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    '@media(max-width:900px)': {
      fontSize: '1.25rem',
    },
  },
  h6: {
    fontSize: '1.25rem', // 20px
    fontWeight: 500,
    lineHeight: '1.25',
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    '@media(max-width:900px)': {
      fontSize: '1rem',
    },
  },
  subtitle1: {
    fontSize: '1.125rem', // 18px
    fontWeight: 500,
    lineHeight: 1.429,
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    '@media(max-width:900px)': {
      fontSize: '1rem',
    },
  },
  subtitle2: {
    fontSize: '1rem', // 16px
    fontWeight: 500,
    lineHeight: 1.429,
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    '@media(max-width:900px)': {
      fontSize: '0.875rem',
    },
  },
  body1: {
    fontSize: '1rem', // 16px
    lineHeight: 1.429,
    fontWeight: 400,
    '@media(max-width:900px)': {
      fontSize: '0.875rem',
    },
  },
  body2: {
    fontSize: '0.875rem', // 14px
    fontWeight: 400,
    lineHeight: 1.429,
    '@media(max-width:900px)': {
      fontSize: '0.75rem',
    },
  },
  caption: {
    fontSize: '0.75rem', // 12px
    fontWeight: 400,
    lineHeight: 1.429,
    color: COLORS.grey,
  },
  overline: {
    fontSize: '0.625rem', // 10px
    fontWeight: 400,
    lineHeight: 1.429,
  },
};

export default TYPOGRAPHY;
