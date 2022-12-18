import COLORS from '@theme/colors';

export default function styles(theme) {
  return {
    a: {
      textDecoration: 'none',
    },
    '.cursor': {
      cursor: 'pointer',
    },
    '.lineClamp1': {
      display: '-webkit-box',
      WebkitLineClamp: '1',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    '.lineClamp2': {
      display: '-webkit-box',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    '.lineClamp3': {
      display: '-webkit-box',
      WebkitLineClamp: '3',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    '.sticky': {
      position: 'sticky',
      top: '0',
      zIndex: '99',
    },
    '.MuiSvg': {
      path: {
        fill: theme.palette.primary.main,
      },
    },
    '.logo': {
      width: '160px',
    },
  };
}
