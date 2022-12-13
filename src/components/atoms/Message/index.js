import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MESSAGE_ID = 'app-message';
const NOTIFICATION_EVENT_ID = 'siteNotification';

export default function Message() {
  const [msgData, setMsgData] = useState({});
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  function settingMessage({ detail }) {
    setMsgData(detail);
  }

  const initiateNotificationEvent = () => {
    new CustomEvent(NOTIFICATION_EVENT_ID);
    document.addEventListener(NOTIFICATION_EVENT_ID, settingMessage);
  };

  const removeNotificationEvent = () => {
    document.removeEventListener(NOTIFICATION_EVENT_ID, settingMessage);
  };

  useEffect(() => {
    const section = document.createElement('section');
    section.setAttribute('className', MESSAGE_ID);
    section.setAttribute('id', MESSAGE_ID);
    document.body.appendChild(section);
    initiateNotificationEvent();

    return () => {
      const elem = document.getElementById(MESSAGE_ID);
      elem.parentNode.removeChild(elem);
      removeNotificationEvent();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { vertical, horizontal, open } = state;
  useEffect(() => {
    setState((prevState) => ({ ...prevState, open: true }));
  }, [msgData]);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <React.Fragment>
      {state.open &&
        msgData.message &&
        createPortal(
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            sx={{ zIndex: '9999' }}
          >
            <Alert
              severity={msgData.type}
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ width: '100%', color: 'common.white' }}
            >
              {msgData.message}
            </Alert>
          </Snackbar>,
          document.getElementById(MESSAGE_ID),
        )}
    </React.Fragment>
  );
}
