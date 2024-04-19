import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
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
import { PAGES_ROUTE, ROUTES } from '@constants';
import { useRouter } from 'next/router';
import { formattedAmount } from '@services/global';
import COLORS from '@theme/colors';
import PAYMENT_MERCHENT_SCRIPT from '@constants/global';
import ModalWithBlurredBg from '@organisms/Modal';
import NextImage from 'next/image';
import RegistrationClosed from '@components/molecules/RegistrationClosed';

const BATCH = Array(63)
  .fill()
  .map((element, index) => index + 1960);

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
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [isRegistrationClosed, setRegistrationClosed] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [modalData, setModalData] = useState({ enable: false });
  const [plan, setPlan] = useState({});
  const [membership, setMembership] = useState('MEMBERSHIP');
  const { handleSubmit, control, reset, getValues } = useForm();

  const MEMBERSHIP_FEES = Number(plan?.['MEMBERSHIP']?.amount);
  const EVENT_FEES = Number(plan?.['NON_MEMBER']?.amount);
  const MEMBER_EVENT_FEES = Number(plan?.['MEMBER']?.amount);
  const MEMBER_FEES = Number(plan?.['NEW_MEMBER']?.amount);
  const MEMBERSHIP_AMOUNT = formattedAmount(MEMBERSHIP_FEES, { currency: 'INR' });
  const EVENT_AMOUNT = formattedAmount(EVENT_FEES, { currency: 'INR' });
  const MEMBER_EVENT_AMOUNT = formattedAmount(MEMBER_EVENT_FEES, {
    currency: 'INR',
  });
  const MEMBER_AMOUNT = formattedAmount(MEMBER_FEES, {
    currency: 'INR',
  });

  const MEMBERSHIP_REGISTER = `Join with Lifetime Membership at ${MEMBERSHIP_AMOUNT} (${MEMBER_AMOUNT} + ${MEMBER_EVENT_AMOUNT} for Event Entry)`;
  const EVENT_REGISTER = `Just want to register for event at ${EVENT_AMOUNT}`;
  const MEMBER_REGISTER = `Just want to become Life Member at ${MEMBER_AMOUNT}`;

  const handlePayment = async (userDetails, order) => {
    if (order) {
      const options = {
        // ...result.order,
        ...PAYMENT_DETAILS,
        order_id: order.orderId,
        key: order.keyId,
        amount: order.amount,
        handler: (response) => paymentSuccess(response, order, userDetails),
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

  const paymentSuccess = async (response, order, userDetails) => {
    if (response && order?.registrationId) {
      sessionStorage.setItem('registrationId', order.registrationId);
      sessionStorage.setItem('registerName', userDetails.name);
      sessionStorage.setItem('registerType', userDetails.registrationType);
      router.push(PAGES_ROUTE.PAYMENT_SUCCESS);
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
      notification: false,
      data: {
        name: data.name,
        email: data.email,
        batch: data.batch,
        mobileNumber: data.mobileNumber,
        countryCode: '91',
        joinMembership: data.registrationType === 'MEMBERSHIP',
        registrationType: data.isMember ? 'MEMBER' : membership,
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
      notification: false,
    });

    if (result) {
      if (!result.isRegistered) setShowForm(true);
      reset({
        batch: result.member?.batch,
        mobileNumber,
        name: result.member?.name,
        email: result.member?.email,
        isMember: result?.isMember,
        isRegistered: result.isRegistered,
        registrationId: result.member?._id,
        registrationType: result.member?.registrationType,
      });
    }
  };

  useEffect(() => {
    sessionStorage.clear();
    // setRegistrationClosed(true);
    // setModalData({
    //   enable: true,
    //   close: false,
    //   children: <RegistrationClosed />,
    // });
  }, []);

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
    if (!isRegistrationClosed) {
      e.preventDefault();
      if (showForm) {
        return handleSubmit(onSubmitRegistration)();
      } else {
        return handleSubmit(onSubmitVerification)();
      }
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

  const AMOUNT_TABLE = {
    MEMBERSHIP: MEMBERSHIP_AMOUNT,
    EVENT: EVENT_AMOUNT,
    NEW_MEMBER: MEMBER_AMOUNT,
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
          <Alert severity="info">
            <AlertTitle>Registration Status</AlertTitle>
            You are already registered for the event
            <Box sx={{ width: '100%', mt: 1 }}>
              <Button
                color="inherit"
                size="small"
                variant="text"
                onClick={handleEventEmail}
                sx={{ p: 0.5, m: 0 }}
              >
                GET ENTRY PASS
              </Button>
            </Box>
          </Alert>
        </Box>
      )}
      {formData.isMember && !formData.isRegistered && (
        <Box component={Paper} sx={{ mb: 2 }}>
          <Alert severity="info">
            <AlertTitle>Membership Status</AlertTitle>
            You are already a lifetime member — To register for an event, fill the below form and
            proceed with the registration.
          </Alert>
        </Box>
      )}
      {!formData.isMember && !formData.isRegistered && showForm && (
        <Box component={Paper} sx={{ mb: 2 }}>
          <Alert severity="info">
            <AlertTitle>Membership Status</AlertTitle>
            <p>
              You are not a lifetime member — To register for an event, fill the below form and
              proceed with the registration.
            </p>
            <p>
              If you have any query please{' '}
              <a href="https://wa.me/+919460706000" target="_blank" rel="noreferrer">
                Click here to contact
              </a>{' '}
              on Whatsapp.
            </p>
          </Alert>
        </Box>
      )}
      <Box component={Paper} sx={{ p: 4 }}>
        <Container justifyContent="center">
          <Item xs={12}>
            <NextImage src="https://mhsosa.in/img/logo.png" width={108} height={106} alt="" />
          </Item>
          <Item xs={12}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Registration Form
            </Typography>
          </Item>
          {!showForm && (
            <Item xs={12}>
              <Typography sx={{ mb: 2 }}>
                यदि आपने lifetime membership ले रखी है तो कृपया अपना रजिस्टर्ड फोन नंबर डाले अन्यथा
                अपना फोन नंबर डाल कर रजिस्ट्रेशन प्रोसेस में आगे बढ़े।
              </Typography>
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
                    autoComplete="off"
                    helperText={
                      error?.message ??
                      '10 डिजिट का मोबाइल नंबर डाले, "+91", "0" या country कोड नहीं डाले '
                    }
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
                          autoComplete="off"
                          helperText={error?.message}
                          disabled={formData.isMember}
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
                          autoComplete="off"
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
                      <FormControl error={Boolean(error)} disabled={formData.isMember}>
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
                    <Typography>
                      You are a lifetime member. Please continue to pay the amount
                    </Typography>
                  ) : (
                    <Box>
                      {/* <Controller
                        name="joinMembership"
                        defaultValue={false}
                        control={control}
                        render={({ field }) => (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              whiteSpace: 'break-spaces',
                            }}
                          >
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
                                label={`Join with Lifetime Membership at ${MEMBERSHIP_FEES_FORMATTED} (${formattedAmount(
                                  Number(MEMBERSHIP_FEES) - Number(EVENT_FEES),
                                  { currency: 'INR' },
                                )} + ${EVENT_FEES_FORMATTED} for Event Entry)`}
                              />
                            </FormGroup>
                          </Box>
                        )}
                      /> */}
                      <Controller
                        name="registrationType"
                        defaultValue={false}
                        control={control}
                        render={({ field }) => (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              whiteSpace: 'break-spaces',
                            }}
                          >
                            <FormControl>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={membership}
                                name="radio-buttons-group"
                                value={membership}
                                onChange={(e, value) => {
                                  field.onChange(value);
                                  setMembership(value);
                                }}
                              >
                                <FormControlLabel
                                  value="MEMBERSHIP"
                                  control={<Radio />}
                                  label={MEMBERSHIP_REGISTER}
                                />
                                <FormControlLabel
                                  value="EVENT"
                                  control={<Radio />}
                                  label={EVENT_REGISTER}
                                />
                                <FormControlLabel
                                  value="NEW_MEMBER"
                                  control={<Radio />}
                                  label={MEMBER_REGISTER}
                                />
                              </RadioGroup>
                            </FormControl>
                          </Box>
                        )}
                      />
                    </Box>
                  )}
                </Box>
              </>
            ) : null}
            {!isRegistrationClosed && (
              <Item xs={12}>
                {!showForm ? (
                  <Button variant="contained" color="primary" type="submit">
                    Next
                  </Button>
                ) : (
                  <>
                    {formData.isMember ? (
                      <Button variant="contained" color="primary" type="submit">
                        {`Proceed To Continue (${formattedAmount(plan['MEMBER'].amount, {
                          currency: 'INR',
                        })})`}
                      </Button>
                    ) : (
                      <Button variant="contained" color="primary" type="submit">
                        {`Proceed & Pay(${AMOUNT_TABLE[membership]})`}
                      </Button>
                    )}
                  </>
                )}
              </Item>
            )}
            {showForm && !isRegistrationClosed && (
              <Item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => router.reload()}
                >
                  Back
                </Button>
              </Item>
            )}
          </Item>
          <Item>
            <b>Note: </b>If you have any query please{' '}
            <a href="https://wa.me/+919460706000" target="_blank" rel="noreferrer">
              Click here to contact
            </a>{' '}
            on Whatsapp.
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
