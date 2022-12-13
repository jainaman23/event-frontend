import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@atoms/GridContainer';
import Item from '@atoms/GridItem';
import ReactMarkdown from 'react-markdown';
import makeRequestWith from '@utils/apiService/client';
import { DASHBOARD_ROUTES, IMAGES, ROUTES } from '@constants';
import { useRouter } from 'next/router';
import { formattedAmount } from '@services/global';
import { useStateValue } from '@utils/redux';
import COLORS from '@theme/colors';
import { PAYMENT_MERCHENT_SCRIPT } from '@constants/global';

const PAYMENT_DETAILS = {
  name: 'Event',
  description: 'Alumni',
  image: IMAGES.LOGO_MINI,
  callback_url: `http://${window.location.host}/register`,
  notes: {
    address: 'Razorpay Corporate Office',
  },
  theme: {
    color: COLORS.primary.main,
  },
};

function PaymentInfo() {
  const [storeData] = useStateValue();
  const [planDetails, setPlanDetails] = useState('');
  const router = useRouter();
  const { subscriptionId } = router.query;

  useEffect(() => {
    async function fetchPlans(id) {
      return await makeRequestWith({ url: `${ROUTES.PLANS}/${id}` });
    }
    fetchPlans(subscriptionId).then((res) => {
      setPlanDetails(res.plan);
    });
  }, [subscriptionId]);

  const handlePayment = async () => {
    const result = await makeRequestWith({
      method: 'POST',
      url: ROUTES.ORDER,
      data: { planId: subscriptionId },
    });

    if (result && result.order) {
      const options = {
        // ...result.order,
        ...PAYMENT_DETAILS,
        order_id: result.order.orderId,
        key: result.order.keyId,
        amount: result.order.amount,
        handler: paymentSuccess,
        prefill: {
          name: storeData.user.name,
          email: storeData.user.email,
          contact: `${storeData.user.countryCode}${storeData.user.mobileNumber}`,
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
      router.push(DASHBOARD_ROUTES.PROFILE);
    }
  };

  const paymentFailure = (response) => {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  };

  return (
    <Box>
      <Script src={PAYMENT_MERCHENT_SCRIPT} />
      <Typography variant="h2">Plan & Billing</Typography>
      <Divider />
      <Container columnSpacing={{ xs: 2 }}>
        <Item xs={12} sm={7}>
          <ReactMarkdown>{planDetails?.features}</ReactMarkdown>
        </Item>
        <Item xs={12} sm={1}>
          <Divider orientation="vertical" />
        </Item>
        <Item xs={12} sm={4}>
          <Container rowSpacing={{ xs: 3 }}>
            <Item xs={12}>
              <Typography variant="h5" sx={{ textAlign: 'left', my: 2 }}>
                Payment
              </Typography>
              <Divider />
            </Item>
            <Item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5" sx={{ textAlign: 'left', fontSize: '1rem' }}>
                {`Plan (${planDetails.name})`}
              </Typography>
              <Typography sx={{ pr: 2, fontWeight: '500', textAlign: 'right' }}>
                {formattedAmount(planDetails.amount, { currency: planDetails.currency })}
              </Typography>
            </Item>
            {planDetails.discount !== 0 && (
              <Item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ textAlign: 'left', fontSize: '1rem' }}>
                  {`Discount (${planDetails.discount}%)`}
                </Typography>
                <Typography sx={{ pr: 2, fontWeight: '500', textAlign: 'right' }}>
                  {`- ${formattedAmount((planDetails.discount * planDetails.amount) / 100, {
                    currency: planDetails.currency,
                  })}`}
                </Typography>
              </Item>
            )}
            <Item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5" sx={{ textAlign: 'left', fontSize: '1rem' }}>
                Total
              </Typography>
              <Typography sx={{ pr: 2, fontWeight: '500', textAlign: 'right' }}>
                {formattedAmount(((100 - planDetails.discount) * planDetails.amount) / 100, {
                  currency: planDetails.currency,
                })}
              </Typography>
            </Item>
            <Item xs={12}>
              <Button type="button" onClick={handlePayment} sx={{ mb: 0 }}>
                Make Payment
              </Button>
            </Item>
          </Container>
        </Item>
      </Container>
    </Box>
  );
}

export default PaymentInfo;
