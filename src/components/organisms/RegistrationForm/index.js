import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Container from '@components/atoms/GridContainer';
import Item from '@components/atoms/GridItem';
import { useForm, Controller } from 'react-hook-form';
import { EMAIL_PATTERN } from '@constants/regex';
import makeRequestWith from '@utils/apiService/client';
import { ROUTES } from '@constants';
import { useRouter } from 'next/router';
import { formattedAmount } from '@services/global';
import COLORS from '@theme/colors';
import { PAYMENT_MERCHENT_SCRIPT } from '@constants/global';
import ModalWithBlurredBg from '@organisms/Modal';
import EntryPass from '@components/molecules/EntryPass';

const BATCH = Array(52)
  .fill()
  .map((element, index) => index + 1970);

const PAYMENT_DETAILS = {
  name: 'Event',
  description: 'Alumni',
  callback_url: `http://${window.location.host}`,
  notes: {
    address: 'Razorpay Corporate Office',
  },
  theme: {
    color: COLORS.primary.main,
  },
};

const RegisterForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [modalData, setModalData] = useState({ enable: false });
  const [plan, setPlan] = useState({});
  const [membership, setMembership] = useState(false);
  const router = useRouter();
  const { handleSubmit, control, reset, getValues } = useForm();

  const handlePayment = async (userDetails, order) => {
    if (order) {
      const options = {
        // ...result.order,
        ...PAYMENT_DETAILS,
        order_id: order.orderId,
        key: order.keyId,
        amount: order.amount,
        handler: paymentSuccess,
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: `+91${userDetails.mobileNumber}`,
        },
      };
      // eslint-disable-next-line no-undef
      var rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', paymentFailure);
      rzp1.open();
    }
  };

  const paymentSuccess = async (response) => {
    if (response) {
      setModalData({
        enable: true,
        title: 'Entry Pass',
        children: <EntryPass />,
      });
    }
  };

  const paymentFailure = (response) => {
    setPaymentError(true);
  };

  const onSubmitRegistration = async (data) => {
    setPaymentError(false);
    const result = await makeRequestWith({
      method: 'POST',
      url: ROUTES.REGISTER,
      data: {
        name: data.name,
        email: data.email,
        batch: data.batch,
        mobileNumber: data.mobileNumber,
        countryCode: '91',
        joinMembership: data.joinMembership ?? false,
      },
    });

    if (result) {
      handlePayment(result.member, result.order);
    }
  };

  const onSubmitVerification = async ({ mobileNumber }) => {
    const result = await makeRequestWith({
      method: 'POST',
      url: ROUTES.VERIFY,
      data: { countryCode: '91', mobileNumber },
    });

    if (result) {
      if (!result.isRegistered) setShowForm(true);
      reset({
        batch: result.member?.batch,
        mobileNumber,
        name: result.member?.name,
        email: result.member?.email,
        isMember: result.isMember,
        isRegistered: result.isRegistered,
        registrationId: result.member?._id,
      });
    }
  };

  useEffect(() => {
    async function fetchPlan() {
      const response = await makeRequestWith({
        url: ROUTES.PLAN,
      });

      if (response?.plans) {
        setPlan(response.plans.reduce((acc, itm) => ({ ...acc, [itm.type]: itm }), {}));
      }
    }

    fetchPlan();
  }, []);

  const formData = getValues();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (showForm) {
      return handleSubmit(onSubmitRegistration)();
    } else {
      return handleSubmit(onSubmitVerification)();
    }
  };

  const handleEventEmail = async () => {
    const result = await makeRequestWith({
      method: 'POST',
      url: ROUTES.SENT_EMAIL,
      data: { registrationId: formData.registrationId },
    });

    if (result) {
      paymentSuccess(result);
    }
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Script src={PAYMENT_MERCHENT_SCRIPT} />
      {paymentError && (
        <Box component={Paper} sx={{ mb: 2 }}>
          <Alert severity="error">
            <AlertTitle>Payment Status</AlertTitle>
            Something went wrong. Please try again
          </Alert>
        </Box>
      )}
      {formData.isRegistered && (
        <Box component={Paper} sx={{ mb: 2, '.MuiAlert-action': { alignItems: 'center' } }}>
          <Alert
            severity="info"
            action={
              <Button
                color="inherit"
                size="small"
                variant="text"
                onClick={handleEventEmail}
                sx={{ p: 0.5, m: 0 }}
              >
                GET PASS
              </Button>
            }
          >
            <AlertTitle>Registration Status</AlertTitle>
            You are already registered for the event
          </Alert>
        </Box>
      )}
      {formData.isMember && !formData.isRegistered && (
        <Box component={Paper} sx={{ mb: 2 }}>
          <Alert severity="info">
            <AlertTitle>Membership Status</AlertTitle>
            You are already a member — To register for an event, fill the below form and proceed
            with the registration.
          </Alert>
        </Box>
      )}
      {!formData.isMember && !formData.isRegistered && showForm && (
        <Box component={Paper} sx={{ mb: 2 }}>
          <Alert severity="info">
            <AlertTitle>Membership Status</AlertTitle>
            You are not a registered member — To register for an event, fill the below form and
            proceed with the registration.
          </Alert>
        </Box>
      )}
      <Box component={Paper} sx={{ p: 4 }}>
        <Container justifyContent="center">
          <Item xs={12}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Alumni Event
            </Typography>
          </Item>
          {!showForm && (
            <Item xs={12}>
              <Typography sx={{ mb: 2 }}>Check your membership status</Typography>
            </Item>
          )}
          <Item xs={12}>
            <Controller
              name="mobileNumber"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: 'Required',
                },
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Incorrect Value',
                },
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <TextField
                    {...field}
                    disabled={showForm}
                    error={Boolean(error)}
                    label="Mobile Number"
                    helperText={error?.message}
                  />
                );
              }}
            />
            {showForm ? (
              <>
                <Item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: { value: true, message: 'Required' },
                    }}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <TextField
                          {...field}
                          error={Boolean(error)}
                          label="Name"
                          helperText={error?.message}
                        />
                      );
                    }}
                  />
                </Item>
                <Item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: { value: true, message: 'Required' },
                      pattern: {
                        message: 'Incorrect email address',
                        value: EMAIL_PATTERN,
                      },
                    }}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <TextField
                          {...field}
                          error={Boolean(error)}
                          label="Email"
                          helperText={error?.message}
                        />
                      );
                    }}
                  />
                </Item>
                <Item xs={12}>
                  <Controller
                    name="batch"
                    defaultValue={''}
                    control={control}
                    rules={{ required: 'Required' }}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl error={Boolean(error)}>
                        <InputLabel id="demo-simple-select-error-label">Batch</InputLabel>
                        <Select {...field} label="Batch">
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {BATCH.map((itm) => {
                            return (
                              <MenuItem key={itm} value={itm}>
                                {itm}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        {Boolean(error) && <FormHelperText>Required</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Item>
                <Divider />
                <Box sx={{ my: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Payment Details
                  </Typography>
                  {formData.isMember ? (
                    <Typography>You are a member. Please continue to pay the amount</Typography>
                  ) : (
                    <Box>
                      <Controller
                        name="joinMembership"
                        defaultValue={false}
                        control={control}
                        render={({ field }) => (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormGroup {...field}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    onChange={(e) => {
                                      setMembership(e.target.checked);
                                      field.onChange(e.target.checked);
                                    }}
                                    value={membership}
                                    checked={field.value}
                                  />
                                }
                                label={`Join Membership in ${formattedAmount(
                                  plan['MEMBERSHIP']?.amount,
                                  {
                                    currency: 'INR',
                                  },
                                )} only`}
                              />
                            </FormGroup>
                          </Box>
                        )}
                      />
                    </Box>
                  )}
                </Box>
              </>
            ) : null}
            <Item xs={12}>
              {!showForm ? (
                <Button variant="contained" color="primary" type="submit">
                  Verify
                </Button>
              ) : (
                <>
                  {formData.isMember ? (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                    >{`Proceed To Continue (${formattedAmount(plan['MEMBER'].amount, {
                      currency: 'INR',
                    })})`}</Button>
                  ) : (
                    <Button variant="contained" color="primary" type="submit">
                      {`Register & Proceed (${formattedAmount(
                        formData.joinMembership
                          ? plan['MEMBERSHIP'].amount
                          : plan['NON_MEMBER'].amount,
                        {
                          currency: 'INR',
                        },
                      )})`}
                    </Button>
                  )}
                </>
              )}
            </Item>
            {showForm && (
              <Item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => router.reload()}
                >
                  Reset
                </Button>
              </Item>
            )}
          </Item>
        </Container>
      </Box>
      <ModalWithBlurredBg
        {...modalData}
        modalStatus={(status) => setModalData({ enable: status })}
      />
    </Box>
  );
};

export default RegisterForm;
