import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Box, Button, Card, Checkbox, Dialog, Popover, Table, TableContainer, TableHead, TablePagination, TextField, TableCell, TableRow } from '@mui/material';
import Iconify from 'src/components/iconify';
import styled from '@emotion/styled';
import Scrollbar from 'src/components/scrollbar';
import TableData from '../table-data';
import axios from 'axios';

const columns = [
  {
    id: "Name",
    headerName: "Name",
  },
  {
    id: "Owner",
    headerName: "Type",
  },
  {
    id: "File Size",
    headerName: "Path",
  },
  {
    id: " ",
    headerName: " ",
  }
];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ProductsView() {
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleRowPerPageChange = (event) => {
    setPage(0);
    setRowPerPage(parseInt(event.target.value, 10));
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/favorites")
      setData(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 5, mt: 2 }}
      >
        <Typography variant="h4">Starred 👋</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            aria-describedby={id}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClick}
          >
            Create
          </Button>
          <Dialog onClose={handleClose} open={open}>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorReference="anchorPosition"
              anchorPosition={{ top: 400, left: 800 }}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
            >
              <Box component="form" sx={{ px: 3, py: 3, width: 600 }}>
                <Typography>Add Classification List</Typography>
                <TextField required id="outlined-required" label="Name of file" fullWidth />
                <br />
                <br />
                <Typography>Description</Typography>
                <TextField required id="outlined-required" label="Description of file" fullWidth />
              </Box>
            </Popover>
          </Dialog>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<Iconify icon="eva:upload-fill" />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        </Stack>
      </Stack>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"><Checkbox /></TableCell>
                  {columns.map((name) => (
                    <TableCell key={name.id}><Typography variant="h6">{name.headerName}</Typography></TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {data && data.map((data1) => (
                <TableData key={data1._id} id={data1._id} name={data1.name} owner={data1.type} size={data1.path} />
              ))}
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowPerPage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleRowPerPageChange}
          />
        </Scrollbar>
      </Card>
    </Container>
  );
}
