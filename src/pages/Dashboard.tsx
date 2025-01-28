import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const Dashboard = () => {
  // Mock data
  const totalCustomers = 50;
  const totalBills = 200;
  const totalRevenue = 5000;
  const recentBills = [
    { id: 1, customer: "John Doe", amount: "$200", date: "2025-01-27" },
    { id: 2, customer: "Jane Smith", amount: "$350", date: "2025-01-26" },
    { id: 3, customer: "Sam Wilson", amount: "$120", date: "2025-01-25" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Dashboard Summary */}
      <Grid container spacing={3}>
        {/* Total Customers */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PeopleIcon fontSize="large" color="primary" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Total Customers
                </Typography>
              </Box>
              <Typography variant="h4">{totalCustomers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Bills */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <ReceiptIcon fontSize="large" color="secondary" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Total Bills
                </Typography>
              </Box>
              <Typography variant="h4">{totalBills}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Revenue */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <MonetizationOnIcon fontSize="large" color="success" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Total Revenue
                </Typography>
              </Box>
              <Typography variant="h4">${totalRevenue}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Bills */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Bills
        </Typography>
        <TableContainer component={Paper}>
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
              {recentBills.map((bill) => (
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
      </Box>
    </Box>
  );
};

export default Dashboard;
