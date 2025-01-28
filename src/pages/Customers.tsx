/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import axios from "axios";

const CustomerList = () => {
  // Sample data
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210" },
  ]);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Modal state
  const [open, setOpen] = useState(false);

  const [clientId, setClientId] = useState<string | null>(null);

  // New customer form state
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Handle Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Modal Handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    getCustomerList();
  };

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  async function saveNewCustomer(payload){
    try {
      const response = await axios.post("http://localhost:5000/api/customers/create", payload);
      if(response){
        toast.success("Customer added Successfully")
      }
    }
    catch(err:any){
      toast.error("Error while saving Customer");
    }
  }

  // Handle Form Submission
  const handleAddCustomer = async () => {
    const payload = {
      clientId: clientId,
      name: 'Abhishek',
      email: 'tes42341@gmail.com',
      phone: '123434324',
      address: 'A-23 Abhilasha society',
      billingInfo: null,
    }
    await saveNewCustomer(payload);
    setNewCustomer({ name: "", email: "", phone: "" }); // Reset form
    handleClose(); // Close modal
  };

  async function getCustomerList(){
    const clientId = localStorage.getItem('clientId');
    if(clientId){
      setClientId(clientId);
      try {
        const response:any = await axios.get("http://localhost:5000/api/customers/" + clientId);
        console.log(response);
        setCustomers(response.data.customers);
        toast.success("Customer Data Fetched Successfully");
      }
      catch (err:any){
        toast.error("Error in fetching customer list");
      }
    }
  }

  useEffect(() => {
    getCustomerList();
  }, [])

  return (
    <Paper sx={{ p: 2, position: "relative" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Customer List</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Customer
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={customers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Add Customer Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newCustomer.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newCustomer.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={newCustomer.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddCustomer} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CustomerList;
