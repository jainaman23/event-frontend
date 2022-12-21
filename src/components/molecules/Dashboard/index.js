import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Container from '@atoms/GridContainer';
import Item from '@atoms/GridItem';
import CreateTable from '@components/molecules/CreateTable';
import makeRequestWith from '@utils/apiService/client';
import TableBtn from '@atoms/TableActionButton';
import ModalWithBlurredBg from '@organisms/Modal';
import ConfirmDialog from '@components/molecules/ConfirmDialog';
import { PAGES_ROUTE, ROUTES } from '@constants/routes';

const heads = [
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'email', label: 'Email', width: 100 },
  { id: 'mobileNumber', label: 'Mobile No', width: 100 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];

const Listing = () => {
  const [rows, setRows] = useState([]);
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
          rows.map((itm) => {
            if (itm._id === result.user._id) {
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

  const resultsWithActions = rows.map((itm) => {
    const item = itm;
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

    return item;
  });

  useEffect(() => {
    async function fetchEvents() {
      const result = await makeRequestWith({
        url: ROUTES.USERS,
      });

      if (result) {
        setRows(result.users);
      }
    }

    fetchEvents();
  }, []);

  const handleQRCode = () => {
    router.push(PAGES_ROUTE.VERIFICATION);
  };

  return (
    <Container>
      <Button onClick={handleQRCode}>Approve QRCode</Button>
      <Item xs={12}>
        <CreateTable heads={heads} rows={resultsWithActions} />
      </Item>
      <ModalWithBlurredBg
        {...modalData}
        modalStatus={(status) => setModalData({ enable: status })}
      />
    </Container>
  );
};

export default Listing;
