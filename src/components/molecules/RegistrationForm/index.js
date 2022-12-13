import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Container from '@components/atoms/GridContainer';
import Item from '@components/atoms/GridItem';
import { formattedAmount } from '@services/global';
import { useForm, Controller } from 'react-hook-form';
import { EMAIL_PATTERN } from '@constants/regex';
import makeRequestWith from '@utils/apiService/client';
import { DASHBOARD_ROUTES, ROUTES } from '@constants';
import { useRouter } from 'next/router';

const BATCH = ['2012-2016'];

const RegisterForm = () => {
  const [plan, setPlan] = useState({});
  const router = useRouter();
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmitRegistration = async (data) => {
    const batch = data.batch.split('-');
    const result = await makeRequestWith({
      method: 'POST',
      url: ROUTES.REGISTER,
      data: {
        name: data.name,
        email: data.email,
        batch: { to: batch[1], from: batch[0] },
        mobileNumber: data.mobileNumber,
        countryCode: '91',
        joinMembership: false,
      },
    });

    if (result) {
      router.push(DASHBOARD_ROUTES.PAYMENT);
    }
  };

  const onSubmitVerification = async ({ mobileNumber }) => {
    const result = await makeRequestWith({
      method: 'POST',
      url: ROUTES.VERIFY,
      data: { countryCode: '91', mobileNumber },
    });

    if (result) {
      let batch = '';
      if (result.member?.batch) {
        batch = `${result.member.batch.from}-${result.member.batch.to}`;
      }

      reset({
        batch,
        mobileNumber,
        name: result.member?.name,
        email: result.member?.email,
        isMember: result.isMember,
        isRegistered: result.isRegistered,
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
    if (formData.isMember) {
      return handleSubmit(onSubmitRegistration)();
    } else {
      return handleSubmit(onSubmitVerification)();
    }
  };

  console.log(formData, 'formData', plan);
  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Box component={Paper} sx={{ p: 4 }}>
        <Container justifyContent="center">
          <Item xs={12}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Alumni Event
            </Typography>
          </Item>
          {!formData.isMember && (
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
                required: { value: true, message: 'Required' },
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <TextField
                    {...field}
                    error={Boolean(error)}
                    label="Mobile Number"
                    helperText={error?.message}
                  />
                );
              }}
            />
            {!formData.isRegistered ? (
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
                    <Box>
                      <Typography>
                        Congratulations! You are a member. Please continue to pay the amount
                      </Typography>

                      <Controller
                        name="planId"
                        defaultValue={null}
                        control={control}
                        render={({ field }) => (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Radio {...field} checked={true} />
                            <Typography variant="h6">
                              {/* {formattedAmount(
                                plan.filter((itm) => (itm.type = 'MEMBER'))[0].amount,
                                { currency: 'INR' },
                              )} */}
                            </Typography>
                          </Box>
                        )}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <Controller
                        name="planId"
                        defaultValue={null}
                        control={control}
                        render={({ field }) => (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormControl>
                              <FormLabel id="demo-controlled-radio-buttons-group">
                                Good Feeling! Join us. Please choose a option
                              </FormLabel>
                              <RadioGroup {...field}>
                                <FormControlLabel
                                  value={plan['NON_MEMBER']}
                                  control={<Radio />}
                                  label="Not a member! Pay this time only"
                                />
                                <FormControlLabel
                                  value="male"
                                  control={<Radio />}
                                  label="Want to become a member"
                                />
                              </RadioGroup>
                            </FormControl>
                            <Typography variant="h6">
                              {/* {formattedAmount(
                                plan.filter((itm) => (itm.type = 'NON_MEMBER'))[0].amount,
                                { currency: 'INR' },
                              )} */}
                            </Typography>
                          </Box>
                        )}
                      />
                    </Box>
                  )}
                </Box>
              </>
            ) : null}
            <Item xs={12}>
              {formData.isMember === undefined ? (
                <Button variant="contained" color="primary" type="submit">
                  Verify
                </Button>
              ) : (
                <Button variant="contained" color="primary" type="submit">
                  {formData.isMember ? 'Proceed To Continue' : 'Register & Proceed'}
                </Button>
              )}
            </Item>
          </Item>
        </Container>
      </Box>
    </Box>
  );
};

export default RegisterForm;
