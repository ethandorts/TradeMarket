import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaTimes, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import ScreenLoader from '../../components/ScreenLoader';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/userApiSlice';

const ListUsersPage = () => {
  const {data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [DeleteUser, {isLoading: deletingUser }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        try {
            await DeleteUser(id);
            toast.success('User deleted');
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
  }

  return <>
  <h1>Users</h1>
  {deletingUser && <ScreenLoader />}
  {isLoading ? (
    <ScreenLoader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>ADMIN</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
            <td>
            { user.isAdmin ? (
               <FaCheck style={{ color:'green' }} />
            ) : (
              <FaTimes style={{ color:'red' }} />
            )}
            </td>
            <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                <Button variant='light' className='btn-sm'>
                    <FaEdit />
                </Button>
                </LinkContainer>
                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                    <FaTrash style={{color: 'white'}} />
                </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )}
  </>
  
}

export default ListUsersPage;