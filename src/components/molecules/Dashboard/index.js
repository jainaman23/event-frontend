import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Container from '@atoms/GridContainer';
import Item from '@atoms/GridItem';
import CreateTable from '@components/molecules/CreateTable';
import makeRequestWith from '@utils/apiService/client';
import TableBtn from '@atoms/TableActionButton';
import { ROUTES, DASHBOARD_ROUTES } from '@constants/routes';

const heads = [
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'email', label: 'Email', width: 100 },
  { id: 'mobileNumber', label: 'Mobile No', width: 100 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];

const EmployeeListing = () => {
  const [rows, setRows] = useState([]);
  const router = useRouter();

  const handleEdit = async (data) => {
    router.push(`${DASHBOARD_ROUTES.EDIT_EMPLOYEES}/${data}`);
  };

  const resultsWithActions = rows.map((itm) => {
    const item = itm;
    item.actions = [];

    item.actions.push(
      <TableBtn
        onClick={() => handleEdit(item._id)}
        key={`edit-${item._id}`}
        disabled={item.isLocked}
      >
        APPROVE
      </TableBtn>,
    );

    return item;
  });

  useEffect(() => {
    async function fetchEvents() {
      const result = await makeRequestWith({
        url: ROUTES.EMPLOYEES,
      });

      if (result) {
        setRows(result.employees);
      }
    }

    fetchEvents();
  }, []);

  return (
    <Container>
      <Item xs={12}>
        <CreateTable heads={heads} rows={resultsWithActions} />
      </Item>
    </Container>
  );
};

export default EmployeeListing;
