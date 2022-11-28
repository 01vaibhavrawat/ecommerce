import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import AddProduct from "../addProduct/AddProduct";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Loader from '../../loader/Loader';
import NoData from '../../noData/NoData';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '../../delete/Delete';
import { error, success } from '../../../App';
import TableHeader from '../tableHeader/TableHeader'


const headCells = [
  {
    disablePadding: true,
    label: '',
  },
  {
    disablePadding: true,
    label: 'Id',
  },
  {
    disablePadding: true,
    label: 'Product name',
  },
  {
    disablePadding: false,
    label: 'Category',
  },
  {
    disablePadding: false,
    label: 'Price',
  },
  {
    disablePadding: false,
    label: 'Image',
  },
];

function EnhancedTableHead(props) {

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >

            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead >
  );
}


export default function Users() {

  const [deleteId, setDeleteId] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense] = React.useState(false);


  const [data, setData] = React.useState([]);


  let rows = data;

  const [showLoader, setShowLoader] = React.useState(true);

  const loadAllProducts = () => {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
              console.log(json);
              setData(json);
              setShowLoader(false);
            })
  }

  React.useEffect(() => {
    loadAllProducts();
  }, [])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const [open, setOpen] = React.useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
    loadAllProducts();
  };

  const [open2, setOpen2] = React.useState(false);
  const handleModalOpen2 = () => {
    setOpen2(true);
  };
  const handleModalClose2 = () => {
    setOpen2(false);
    loadAllProducts();
  };
  const [noData, setNoData] = React.useState(false);


  const deleteFunction = () => {
    setShowLoader(true);
    fetch(`https://fakestoreapi.com/products/${deleteId}`,{
            method:"DELETE"
        })
            .then(res=>{
              if(!res.status == 'ok'){
                error();
                setShowLoader(false);
            }
            res.json();
          })
            .then(json=>{
              console.log(json);
              setShowLoader(false);
              handleModalClose2();
              success("Successfully deleted product");
            })
  }


  return (
    <React.Fragment>

      {showLoader && <Loader />}
      <Modal
        open={open}
        onClose={handleModalClose}
      ><div id="add-user-modal"><AddProduct close={handleModalClose} /></div></Modal>

      <Modal
        open={open2}
        onClose={handleModalClose2}
      ><div id="delete-modal"><Delete deleteFunction={deleteFunction} close={handleModalClose2} /></div>
      </Modal>

      {noData ? <NoData /> : <div id="prod-table">
        <Box sx={{ width: '100%' }}>
          <div id="table-body">
            <Paper sx={{ width: '100%', mb: 2 }}>

              <TableHeader handleModalOpen={handleModalOpen} parent='Products' />

              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  size={'small'}
                >
                  <EnhancedTableHead
                    rowCount={rows.length}
                  />
                  <TableBody id="table-body">
                    {rows.sort()
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {

                        const StyledTableCell = styled(TableCell)(({ theme }) => ({
                          [`&.${tableCellClasses.head}`]: {
                            backgroundColor: theme.palette.common.black,
                            color: theme.palette.common.white,
                          },
                          [`&.${tableCellClasses.body}`]: {
                            fontSize: 14,
                          },
                        }));

                        const StyledTableRow = styled(TableRow)(({ theme }) => ({
                          '&:nth-of-type(odd)': {
                            backgroundColor: theme.palette.action.hover,
                          },
                          // hide last border
                          '&:last-child td, &:last-child th': {
                            border: 0,
                          },
                        }))

                        return (
                          <StyledTableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.rowId}
                          >
                            <StyledTableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                              />
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="left" className='no-padding'>{row.title}</StyledTableCell>
                            <StyledTableCell align="right" className='no-padding'>{row.category}</StyledTableCell>
                            <StyledTableCell align="right" className='no-padding'>{row.price}</StyledTableCell>
                            <StyledTableCell align="right" className='no-padding'>
                              <img src={row.image} height={30} width={50} alt="Products" />
                            </StyledTableCell>
                            <StyledTableCell align="right" ><EditIcon onClick={() => {
                              handleModalOpen();
                            }
                            } /></StyledTableCell>
                            <StyledTableCell align="right"><DeleteIcon onClick={() => {
                              setDeleteId(row.id);
                              handleModalOpen2();
                            }} /></StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </Box>
      </div >}
    </React.Fragment >
  );
}