import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useQuery } from '@tanstack/react-query'
import {getOrdersApi} from '../API/orders'
import Loader from './Loader'

function Row({order}) {
  console.log(order);
  
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.shippingAddress.city}
        </TableCell>
        <TableCell align="right">{order.isDelivered?<span className='text-green-500'>Delivered</span>:<span className='text-red-500'>Pending</span>}</TableCell>
        <TableCell align="right">{order.paymentMethodType}</TableCell>
        <TableCell align="right">{order.totalOrderPrice} EGP</TableCell>
        <TableCell align="right">#{order.id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h4" gutterBottom component="div" sx={{fontWeight:'bold'}}>
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight:'bold'}}>Product image</TableCell>
                    <TableCell sx={{fontWeight:'bold'}}>Customer</TableCell>
                    <TableCell sx={{fontWeight:'bold'}}>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order?.cartItems?.map((product)=>(
                    <TableRow key={product.product._id}>
                      <TableCell><img src={product.product.imageCover} alt="product image" className='w-[100px] object-cover'/></TableCell>
                      <TableCell>{product.product.title}</TableCell>
                      <TableCell>{product.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className='py-5 flex flex-col gap-3'>
                <p className='text-xl'><span className='font-bold'>Phone:</span> {order.shippingAddress.phone}</p>
                <p className='text-xl'><span className='font-bold'>Address:</span> {order.shippingAddress.details}</p>
                <p className='text-xl'><span className='font-bold'>Ordered at:</span> {new Date(order.createdAt).toISOString().split('T')[0]}</p>
                <p className='text-xl'><span className='font-bold'>Shipping price:</span> {order.shippingPrice} EGP</p>
                <p className='text-xl'><span className='font-bold'>Paid:</span> {order.isPaid?<span className='text-green-500 font-bold uppercase'>yes</span>:<span className='text-red-500 font-bold uppercase'>no</span>}</p>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Orders() {


  let {data, isLoading, isError, error} = useQuery({
    queryKey: ['getOrders'],
    queryFn: getOrdersApi
  })

  console.log(data);
  
  if (isLoading)
    return <Loader></Loader>
    
  return (
    <div className='py-10'>
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{fontWeight:'bold'}}>City</TableCell>
            <TableCell align="right" sx={{fontWeight:'bold'}}>Status</TableCell>
            <TableCell align="right" sx={{fontWeight:'bold'}}>Payment method</TableCell>
            <TableCell align="right" sx={{fontWeight:'bold'}}>Total price</TableCell>
            <TableCell align="right" sx={{fontWeight:'bold'}}>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data?.map((order)=>{
            return <Row key={order.id} order={order}></Row>
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
