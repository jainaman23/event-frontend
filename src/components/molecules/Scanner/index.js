import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Paper from '@mui/material/Paper';
import Button from '@mui/lab/LoadingButton';
import makeRequestWith from '../../../utils/apiService/client';
import CandidateDetails from '@molecules/CandidateDetails';
import { ROUTES } from '@constants';

const LoginForm = ({ submitHandler }) => {
  const [userData, setUserData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (registrationId) => {
    const result = await makeRequestWith({ url: `${ROUTES.USERS}/${registrationId}` });
    if (result && result.user) {
      if (result.user?.isAttended) {
        setSuccessMessage('Already Attended the event');
        setUserData(result.user);
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
      {Object.keys(userData).length !== 0 ? (
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
        <Box sx={{ borderRadius: '20px' }}>
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={(result, error) => {
              if (result) {
                onSubmit(result?.text);
              }

              if (error) {
                // eslint-disable-next-line no-console
                console.info(error);
              }
            }}
            style={{ width: '100%' }}
          />
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={handleClick}>
        Reset
      </Button>
    </Box>
  );
};

export default LoginForm;
