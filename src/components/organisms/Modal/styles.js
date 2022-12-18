const styles = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
    backdropFilter: 'blur(5px)',
    zIndex: (theme) => theme.zIndex.tooltip + 1,
    alignItems: {
      sm: 'center',
    },
    iframe: {
      width: '100%',
      height: '100%',
    },
  },
  modalBody: {
    position: 'absolute',
    width: {
      xs: 'calc(100% - 1.5rem)',
      sm: '36rem',
    },
    borderRadius: '1rem',
    maxHeight: '90vh',
    bottom: {
      xs: '1rem',
      sm: 'unset',
    },
    overflow: 'auto',
    p: 2.5,
  },
  fullModalBody: {
    width: '100%',
    height: '100vh',
    backgroundColor: 'white.0',
    overflow: 'auto',
    p: 0,
    maxHeight: '100vh',
  },
};

export default styles;
