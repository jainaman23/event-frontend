import React, { useState, useEffect, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Paper from '@mui/material/Paper';
import Button from '@mui/lab/LoadingButton';
import makeRequestWith from '../../../utils/apiService/client';
import CandidateDetails from '@molecules/CandidateDetails';
import { ROUTES } from '@constants';
import styles from './styles';

const LoginForm = ({ submitHandler }) => {
  const [userData, setUserData] = useState({});
  const [isRecording, setIsRecording] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const ref = useRef(null);

  const onSubmit = async (registrationId) => {
    const result = await makeRequestWith({
      url: `${ROUTES.USERS}/${registrationId}`,
    });
    if (result && result.user) {
      setUserData(result.user);

      if (result.user?.isAttended) {
        setSuccessMessage('Already Attended the event');
      }
    }
  };

  const handleApprove = React.useCallback(async (data) => {
    const result = await makeRequestWith({
      method: 'PATCH',
      url: ROUTES.APPROVE,
      data: { registrationId: data, isAttended: true },
    });

    if (result && result.user) {
      setSuccessMessage('Member verified successfully');
    }
  }, []);

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      setIsRecording(false);
      closeCam();
    }
  }, [userData]);

  const closeCam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    stream.getTracks().forEach(function (track) {
      track.stop();
      // track.enabled = false;
    });
  };

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <Box sx={{ margin: 'auto', textAlign: 'center' }}>
      {successMessage && (
        <Box component={Paper} sx={{ mb: 2 }}>
          <Alert severity="error" sx={{ textAlign: 'left' }}>
            <AlertTitle>Status</AlertTitle>
            {successMessage}
          </Alert>
        </Box>
      )}
      {!isRecording ? (
        <Box sx={{ mb: 1 }}>
          <CandidateDetails details={{ candidate: userData }} />
          {!userData.isAttended && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleApprove(userData._id)}
              sx={{ mt: 2 }}
            >
              Approve
            </Button>
          )}
        </Box>
      ) : (
        <Box sx={{ position: 'relative', mb: 2 }}>
          <Box sx={{ p: 2 }}>
            <QrReader
              constraints={{ facingMode: 'environment' }}
              onResult={(result) => {
                if (result && Object.keys(userData).length === 0) {
                  onSubmit(result?.text);
                }

                // if (error) {
                //   // eslint-disable-next-line no-console
                //   console.error(error.toString());
                // }
              }}
              ref={ref}
              style={{ width: '100%', padding: '30px' }}
            />
          </Box>
          <Box sx={{ borderRadius: '20px', ...styles.ocrloader }}>
            <span></span>
            <p>Scanning</p>
            <em></em>
          </Box>
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={handleClick}>
        Reset
      </Button>
    </Box>
  );
};

export default LoginForm;
