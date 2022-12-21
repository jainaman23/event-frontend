import COLORS from '@theme/colors';

const style = {
  ocrloader: {
    outlineOffset: '10px',
    position: 'absolute',
    left: '0',
    top: '0',
    right: 0,
    bottom: 0,

    '& span::before': {
      content: '""',
      position: 'absolute',
      top: '5%',
      bottom: '0',
      left: '4%',
      width: '10px',
      height: '90%',
      background: '#18c89b',
      boxShadow: '0 0 50px 10px #18c89b',
      clipPath: 'inset(0)',
      animation: 'x 1s ease-in-out infinite alternate,\n    y 1s   ease-in-out infinite',
    },

    '& p::before': {
      content: '""',
      display: 'inline-block',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: '#18c89b',
      position: 'relative',
      right: '4px',
    },

    '& p': {
      color: '#18c89b',
      position: 'absolute',
      bottom: '0',
      width: '100%',
      fontSize: '16px',
      fontWeight: 600,
      animation: 'blinker 1s linear infinite',
      fontFamily: 'sans-serif',
      textTransform: 'uppercase',
    },

    // Corners
    '&::before, &:after, & em:after,& em:before': {
      borderColor: '#18c89b',
      content: '""',
      position: 'absolute',
      width: '45px',
      height: '46px',
      borderStyle: 'solid',
      borderWidth: '0px',
    },

    '&:before': {
      left: '0',
      top: '0',
      borderLeftWidth: '5px',
      borderTopWidth: '5px',
      borderRadius: '5px 0 0 0',
    },

    '&:after': {
      right: '0',
      top: '0',
      borderRightWidth: '5px',
      borderTopWidth: '5px',
      borderRadius: '0 5px 0 0',
    },

    '& em:before': {
      left: '0',
      bottom: '0',
      borderLeftWidth: '5px',
      borderBottomWidth: '5px',
      borderRadius: '0 0 0 5px',
    },

    '& em:after': {
      right: '0',
      bottom: '0',
      borderRightWidth: '5px',
      borderBottomWidth: '5px',
      borderRadius: '0 0 5px 0',
    },

    '@keyframes move': {
      '0%,\n  100%': { transform: 'translateY(190px)' },
      '50%': { transform: 'translateY(0%)' },
      '75%': { transform: 'translateY(160px)' },
    },
    '@keyframes blinker': { '50%': { opacity: 0 } },
    '@keyframes x': { to: { transform: 'translateX(-100%)', left: '100%' } },
    '@keyframes y': {
      '33%': { clipPath: 'inset(0 0 0 -100px)' },
      '50%': { clipPath: 'inset(0 0 0 0)' },
      '83%': { clipPath: 'inset(0 -100px 0 0)' },
    },
  },
};

export default style;
