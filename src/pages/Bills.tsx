import React, { useState } from "react";
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

const Bills = () => {
  // Sample bills data
  const [bills, setBills] = useState([
    { id: 1, customer: "John Doe", amount: "$200", date: "2025-01-27" },
    { id: 2, customer: "Jane Smith", amount: "$350", date: "2025-01-26" },
    { id: 3, customer: "Sam Wilson", amount: "$120", date: "2025-01-25" },
  ]);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Modal state
  const [open, setOpen] = useState(false);

  // New bill form state
  const [newBill, setNewBill] = useState({
    customer: "",
    amount: "",
    date: "",
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
  const handleClose = () => setOpen(false);

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBill({ ...newBill, [name]: value });
  };

  // Handle Add Bill
  const handleAddBill = () => {
    const newId = bills.length ? bills[bills.length - 1].id + 1 : 1;
    setBills([...bills, { id: newId, ...newBill }]);
    setNewBill({ customer: "", amount: "", date: "" }); // Reset form
    handleClose(); // Close modal
  };

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
        <Typography variant="h6">Bills</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Bill
        </Button>
      </Box>

      {/* Bills Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bill ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.id}</TableCell>
                  <TableCell>{bill.customer}</TableCell>
                  <TableCell>{bill.amount}</TableCell>
                  <TableCell>{bill.date}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={bills.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Add Bill Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Bill</DialogTitle>
        <DialogContent>
          <TextField
            label="Customer"
            name="customer"
            value={newBill.customer}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            name="amount"
            value={newBill.amount}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={newBill.date}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddBill} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Bills;
