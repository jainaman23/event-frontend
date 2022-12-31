import React, { useState, useEffect } from 'react';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Container from '@atoms/GridContainer';
import Item from '@atoms/GridItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import styles from './styles';

const ModalWithBlurredBg = React.forwardRef(
  (
    {
      enable,
      modalStatus,
      title,
      description,
      children,
      close = true,
      height,
      stickyHeader = false,
      fullScreen = false,
      containerStyle,
      modalStyle,
      onBackdropClick = false,
    },
    ref,
  ) => {
    const [isOpen, setModalOpen] = useState(false);
    useEffect(() => {
      setModalOpen(enable);
    }, [enable]);

    const handleClose = () => {
      if (modalStatus) {
        modalStatus(!isOpen);
      }
      setModalOpen(!isOpen);
    };

    const getModalStyle = (mode) => {
      return {
        ...styles[mode],
        background: modalStyle?.backgroundColor || 'white',
      };
    };

    return (
      <Modal
        open={isOpen}
        onClose={() => onBackdropClick && handleClose()}
        sx={styles.modal}
        ref={ref}
      >
        <Container
          sx={fullScreen ? getModalStyle('fullModalBody') : getModalStyle('modalBody')}
          height={height}
        >
          <Item
            xs={12}
            sx={{
              position: stickyHeader ? 'sticky' : 'initial',
              zIndex: 99,
              top: 0,
            }}
          >
            <Container
              justifyContent="space-between"
              sx={{ flexDirection: fullScreen ? 'row-reverse' : 'row', minHeight: '2.5rem' }}
            >
              {title && (
                <Item sx={{ textAlign: modalStyle?.textAlign ?? 'start', flexGrow: 1 }}>
                  <Typography variant="h5" sx={{ color: modalStyle?.textColor }}>
                    {title}
                  </Typography>
                </Item>
              )}
              {close && (
                <Item
                  sx={{
                    maxWidth: '16px',
                    position: 'absolute',
                    top: '20px',
                    right: '24px',
                    zIndex: '200',
                  }}
                >
                  <IconButton onClick={handleClose} sx={{ p: 0 }}>
                    <IoMdClose color={modalStyle?.iconColor || '#06251c'} size={25} />
                  </IconButton>
                </Item>
              )}
              <Divider sx={{ mb: 2 }} />
            </Container>
            {description && (
              <Item xs={12} sx={{ mt: 2 }}>
                <Typography variant="body2">{description}</Typography>
              </Item>
            )}
          </Item>
          <Item xs={12} sx={containerStyle}>
            {children}
          </Item>
        </Container>
      </Modal>
    );
  },
);

ModalWithBlurredBg.displayName = 'ModalWithBlurredBg';

ModalWithBlurredBg.defaultProps = {
  close: true,
};

export default ModalWithBlurredBg;
