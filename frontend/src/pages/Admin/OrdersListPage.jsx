import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import ScreenLoader from '../../components/ScreenLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrdersListPage = () => {
  const {data: orders, isLoading, error } = useGetOrdersQuery();

  return <>
  <h1>Orders</h1>
  {isLoading ? (
    <ScreenLoader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>USER</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.user && order.user.name}</td>
            <td>{order.createdAt.substring(0,10)}</td>
            <td>${order.TotalPrice}</td>
            <td>
            { order.isPaid ? (
              order.paidAt.substring(0,10)
            ) : (
              <FaTimes style={{ color:'red' }} />
            )}
            </td>
            <td>
            { order.isDelivered ? (
              order.deliveredAt.substring(0,10)
            ) : (
              <FaTimes style={{ color:'red' }} />
            )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )}
  </>
  
}

export default OrdersListPage;