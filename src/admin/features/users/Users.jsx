import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../../hooks/users/useUsers';
import { FaPlus } from 'react-icons/fa6';
import DangerPill from '../../../components/DangerPill';
import SuccessPill from '../../../components/SuccessPill';
import Table from '../../../components/Table';
import PageHeading from '../../../components/PageHeading';
import Breadcrumb from '../../../components/Breadcrumb';
import Loading from '../../../components/Loading';
import { capitalCase } from 'change-case';

export default function Users() {
  const { users, isLoadingUsers } = useUsers();
  const navigate = useNavigate();

  if (isLoadingUsers) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Users', href: '/users' },
        ]}
      />
      <PageHeading>Users</PageHeading>
      <Table $columntemplate="1fr 1fr 1.5fr 1fr 0.5fr">
        <Table.Head>
          <Table.Heading textAlign="left">Name</Table.Heading>
          <Table.Heading textAlign="left">Username</Table.Heading>
          <Table.Heading textAlign="left">Email</Table.Heading>
          <Table.Heading>Role</Table.Heading>
          <Table.Heading>Status</Table.Heading>
        </Table.Head>
        {users?.map((user) => (
          <Table.Row key={user?.username} href={`/users/${user.username}`}>
            <Table.Item textAlign="left">{user.name}</Table.Item>
            <Table.Item textAlign="left">{user.username}</Table.Item>
            <Table.Item textAlign="left">{user.email}</Table.Item>
            <Table.Item textTransform="capitalize">{capitalCase(user.role)}</Table.Item>
            <Table.Item textAlign="center">
              {user.status === 'ACTIVE' ? <SuccessPill>{user.status}</SuccessPill> : <DangerPill>{user.status}</DangerPill>}
            </Table.Item>
          </Table.Row>
        ))}
      </Table>
      <button
        type="button"
        className="absolute bottom-8 right-8 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent-500 bg-accent-500 text-sm text-white transition-colors hover:bg-accent-600 cursor-pointer"
        onClick={() => navigate('/users/create')}
      >
        <FaPlus />
      </button>
    </>
  );
}
