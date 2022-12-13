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
    '.rbc-toolbar': {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      backgroundColor: '#fff',
      padding: '14px',
    },

    '.rbc-calendar': {
      padding: '1rem',

      '.rbc-events-container .rbc-event': {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        maxWidth: '300px',
        boxShadow: theme.shadows[1],
        border: 'none',
        padding: 12,

        '&:before': {
          content: '""',
          position: 'absolute',
          left: 0,
          width: '5px',
          height: '100%',
          background: theme.palette.primary.main,
          top: 0,
          flexFlow: 'column',
        },

        '.rbc-event-label': {
          fontWeight: 500,
          marginBottom: '12px',
        },
      },
      '.rbc-day-slot, .rbc-day-bg': {
        backgroundColor: theme.palette.grey[50],
      },
      '.rbc-today': {
        backgroundColor: theme.palette.grey[100],
      },
      '.rbc-label': {
        color: theme.palette.grey[600],
        fontWeight: 500,
      },
      '.rbc-current-time-indicator': {
        backgroundColor: theme.palette.primary.main,
        height: '2px',
        '&:before': {
          content: '""',
          position: 'absolute',
          left: 0,
          width: '10px',
          height: '10px',
          background: theme.palette.primary.main,
          top: '-4px',
          flexFlow: 'column',
          borderRadius: '50%',
        },
      },
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
