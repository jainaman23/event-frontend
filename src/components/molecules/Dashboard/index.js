import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Container from '@atoms/GridContainer';
import Item from '@atoms/GridItem';
import CreateTable from '@components/molecules/CreateTable';
import makeRequestWith from '@utils/apiService/client';
import TableBtn from '@atoms/TableActionButton';
import ModalWithBlurredBg from '@organisms/Modal';
import ConfirmDialog from '@components/molecules/ConfirmDialog';
import { PAGES_ROUTE, ROUTES } from '@constants/routes';
import EntryPass from '../EntryPass';
import { toPng } from 'html-to-image';
import { getCookie } from '@services/storage';

const CORDINATOR_ONE = 'coordinator.one@mhsosa.in';

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

const cordinatorDetails = parseJwt(getCookie('token'));

const heads = [
  // { id: 'srNo', label: 'Sr No', minWidth: 15 },
  {
    id: '',
    label: 'Name',
    minWidth: 15,
    format: (itm) => (
      <>
        <Box sx={{ m: 0 }}>{itm.name}</Box>
        <Box sx={{ m: 0 }}>{itm.email}</Box>
      </>
    ),
  },
];

if (cordinatorDetails.email === CORDINATOR_ONE) {
  heads.push({ id: 'mobileNumber', label: 'Mobile No', width: 10 });
}

heads.push({ id: 'batch', label: 'Batch', width: 10 });
heads.push({ id: 'paymentStatus', label: 'Payment', width: 10 });
heads.push({
  label: 'Entry Time',
  minWidth: 150,
  format: (itm) =>
    itm.isAttended ? new Date(itm.updatedAt).toLocaleTimeString('en-US', { hour12: true }) : '',
});
heads.push({ id: 'actions', label: 'Actions', minWidth: 150 });
if (cordinatorDetails.email === CORDINATOR_ONE) {
  heads.push({ id: '', label: 'Check', minWidth: 150, format: () => <Checkbox /> });
}

const Listing = () => {
  const [rows, setRows] = useState([]);
  const [allData, setAllData] = useState([]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [modalData, setModalData] = useState({ enable: false });
  const router = useRouter();

  const handleApprove = React.useCallback(
    async (data) => {
      const result = await makeRequestWith({
        method: 'PATCH',
        url: ROUTES.APPROVE,
        data: { registrationId: data, isAttended: true },
      });

      if (result && result.user) {
        setModalData({ enable: false });
        setRows(
          rows.map((itm, index) => {
            itm.srNo = index + 1;
            if (itm._id === result.user._id) {
              result.user.srNo = index + 1;
              return result.user;
            }
            return itm;
          }),
        );
      }
    },
    [rows],
  );

  const handleDelete = React.useCallback(
    async (data) => {
      setModalData({
        enable: true,
        title: 'Confirm',
        children: (
          <ConfirmDialog
            dialogText="Are you sure want to approve?"
            onAccept={() => handleApprove(data)}
            onCancel={() => setModalData({ enable: false })}
          />
        ),
      });
    },
    [handleApprove],
  );

  const handleDownloadClick = () => {
    const svg = document.getElementById('QRCode');
    toPng(svg)
      .then(function (dataUrl) {
        const img = new Image();
        img.src = dataUrl;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const pngFile = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.download = 'entry-pass';
          downloadLink.href = `${pngFile}`;
          downloadLink.click();
        };
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };

  const handleShowCode = React.useCallback(async (data) => {
    setModalData({
      enable: true,
      title: 'Entry Pass',
      children: (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Container rowSpacing={{ xs: 2 }} flexDirection="column" alignItems="center">
            <Item>
              <EntryPass registerName={data.name} registrationId={data._id} />
            </Item>
            <Item>
              <Button onClick={handleDownloadClick}>Download Ticket</Button>
            </Item>
          </Container>
        </Box>
      ),
    });
  }, []);

  const resultsWithActions = rows.map((itm, index) => {
    const item = itm;
    item.srNo = index + 1;
    item.actions = [];

    item.actions.push(
      <TableBtn
        onClick={() => handleDelete(item._id)}
        key={`edit-${item._id}`}
        disabled={item.isAttended}
      >
        {item.isAttended ? 'APPROVED' : 'APPROVE'}
      </TableBtn>,
    );

    if (cordinatorDetails.email === CORDINATOR_ONE) {
      item.actions.push(
        <TableBtn onClick={() => handleShowCode(item)} key={`qr-${item._id}`}>
          QRCode
        </TableBtn>,
      );
    }

    return item;
  });

  useEffect(() => {
    async function fetchEvents() {
      const result = await makeRequestWith({
        url: ROUTES.USERS,
      });

      if (result) {
        setRows(result.users);
        setAllData(result.users);
      }
    }

    fetchEvents();
  }, []);

  const handleQRCode = () => {
    router.push(PAGES_ROUTE.VERIFICATION);
  };

  const handleMobileNumber = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleData = (e) => {
    if (e.target.value === 'all') {
      setRows(allData);
    } else {
      setRows(allData.filter((itm) => String(itm.isAttended) === e.target.value));
    }
  };

  return (
    <Container>
      <Button onClick={handleQRCode}>Approve QRCode</Button>
      <TextField label="Search Mobile No." variant="outlined" onChange={handleMobileNumber} />
      <FormControl onChange={handleData}>
        <FormLabel id="demo-radio-buttons-group-label">Filter</FormLabel>
        <RadioGroup defaultValue="all">
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="true" control={<Radio />} label="Show Approved Only" />
          <FormControlLabel value="false" control={<Radio />} label="Show Not Approved Only" />
        </RadioGroup>
      </FormControl>
      <Item xs={12} sx={{ overflow: 'auto' }}>
        <CreateTable
          heads={heads}
          rows={resultsWithActions.filter((itm) => itm.mobileNumber?.startsWith(mobileNumber))}
        />
      </Item>
      <ModalWithBlurredBg
        {...modalData}
        modalStatus={(status) => setModalData({ enable: status })}
      />
    </Container>
  );
};

export default Listing;
