/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa6';
import { format } from 'date-fns';
import Breadcrumb from '../../../../components/Breadcrumb';
import PageHeading from '../../../../components/PageHeading';
import Table from '../../../../components/Table';
import Loading from '../../../../components/Loading';
import SuccessPill from '../../../../components/SuccessPill';
import DangerPill from '../../../../components/DangerPill';
import { useAffiliates } from '../hooks/useAffiliates';
import { useDeleteAffiliate } from '../hooks/useDeleteAffiliate';
import { useToggleAffiliateStatus } from '../hooks/useToggleAffiliateStatus';
import { useSeedAffiliates } from '../hooks/useSeedAffiliates';

export default function Affiliates() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { affiliates, pagination, isLoadingAffiliates, isErrorAffiliates } = useAffiliates();
  const { deleteAffiliate, isDeletingAffiliate } = useDeleteAffiliate();
  const { toggleAffiliateStatus, isTogglingAffiliateStatus } = useToggleAffiliateStatus();
  const { seedAffiliates, isSeedingAffiliates } = useSeedAffiliates();

  const currentPage = parseInt(searchParams.get('page'), 10) || 1;
  const limit = parseInt(searchParams.get('limit'), 10) || 20;
  const search = searchParams.get('q') || '';
  const isActive = searchParams.get('isActive') || 'all';
  const sort = searchParams.get('sort') || 'newest';

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);

    if (value === '' || value === 'all' || value === null || value === undefined) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    if (key !== 'page') {
      next.set('page', '1');
    }

    setSearchParams(next);
  };

  const handlePageChange = (newPage) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(newPage));
    next.set('limit', String(limit));
    setSearchParams(next);
  };

  const handleDelete = (affiliate) => {
    confirmAlert({
      title: 'Confirm delete',
      message: `Delete affiliate ${affiliate.name}? This action cannot be undone.`,
      buttons: [
        {
          label: 'Delete',
          onClick: () => deleteAffiliate(affiliate._id),
        },
        {
          label: 'Cancel',
          onClick: () => toast.error('Delete cancelled'),
        },
      ],
    });
  };

  return (
    <>
      <Helmet>
        <title>Affiliates</title>
      </Helmet>

      <div className="flex items-center justify-between gap-4">
        <div>
          <Breadcrumb
            paths={[
              { label: 'Home', href: '/' },
              { label: 'Affiliates', href: '/affiliates' },
            ]}
          />
          <PageHeading mb="15px">Affiliates</PageHeading>
        </div>

        <button
          type="button"
          disabled={isSeedingAffiliates}
          className="bg-white text-sm px-4 py-2 rounded-md border border-gray-200 cursor-pointer disabled:opacity-50"
          onClick={() => seedAffiliates()}
        >
          {isSeedingAffiliates ? 'Seeding...' : 'Seed 5 Test Affiliates'}
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by name, email, affiliate ID"
          className="w-full max-w-[420px] bg-white text-[14px] py-2 px-4 rounded-md shadow-sm outline-0"
          value={search}
          onChange={(e) => setParam('q', e.target.value)}
        />

        <div className="flex items-center gap-2">
          <select
            className="w-[180px] bg-white text-[14px] py-2 px-3 rounded-md shadow-sm outline-0"
            value={isActive}
            onChange={(e) => setParam('isActive', e.target.value)}
          >
            <option value="all">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <select
            className="w-[180px] bg-white text-[14px] py-2 px-3 rounded-md shadow-sm outline-0"
            value={sort}
            onChange={(e) => setParam('sort', e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name_asc">Name A-Z</option>
            <option value="name_desc">Name Z-A</option>
          </select>
        </div>
      </div>

      {isLoadingAffiliates && <Loading />}
      {isErrorAffiliates && <p>Error loading affiliates</p>}

      {!isLoadingAffiliates && !isErrorAffiliates && (
        <Table $columntemplate="1.5fr 1fr 0.9fr 0.9fr 1.2fr 1.7fr">
          <Table.Head>
            <Table.Heading textAlign="left">Name</Table.Heading>
            <Table.Heading textAlign="center">Affiliate ID</Table.Heading>
            <Table.Heading textAlign="center">Commission %</Table.Heading>
            <Table.Heading textAlign="center">Active</Table.Heading>
            <Table.Heading textAlign="center">Created At</Table.Heading>
            <Table.Heading textAlign="center">Actions</Table.Heading>
          </Table.Head>

          {affiliates.map((affiliate) => (
            <Table.Row key={affiliate._id}>
              <Table.Item textAlign="left">{affiliate.name}</Table.Item>
              <Table.Item textAlign="center">{affiliate.affiliateId}</Table.Item>
              <Table.Item textAlign="center">{affiliate.commissionPercent}</Table.Item>
              <Table.Item textAlign="center">
                {affiliate.isActive ? <SuccessPill>ACTIVE</SuccessPill> : <DangerPill>INACTIVE</DangerPill>}
              </Table.Item>
              <Table.Item textAlign="center">
                {affiliate.createdAt ? format(new Date(affiliate.createdAt), 'dd MMM yyyy') : '-'}
              </Table.Item>
              <Table.Item textAlign="center">
                <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <Link to={`/affiliates/${affiliate._id}`} className="text-xs text-blue-700 hover:underline">
                    View/Edit
                  </Link>
                  <button
                    type="button"
                    className="text-xs text-orange-700 hover:underline cursor-pointer"
                    disabled={isTogglingAffiliateStatus}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleAffiliateStatus({ id: affiliate._id, isActive: !affiliate.isActive });
                    }}
                  >
                    {affiliate.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    type="button"
                    className="text-xs text-red-700 hover:underline cursor-pointer"
                    disabled={isDeletingAffiliate}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(affiliate);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </Table.Item>
            </Table.Row>
          ))}

          <Table.Footer>
            <div className="flex justify-between items-center">
              <div>
                {pagination ? (
                  <p>
                    Showing {pagination.total > 0 ? (currentPage - 1) * limit + 1 : 0} -{' '}
                    {pagination.total > 0 ? Math.min(currentPage * limit, pagination.total) : 0} of {pagination.total} results
                  </p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={!pagination?.hasPrevPage}>
                  Previous
                </PageButton>
                <span className="font-extralight">
                  {currentPage} / {pagination?.totalPages || 1}
                </span>
                <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={!pagination?.hasNextPage}>
                  Next
                </PageButton>
              </div>
            </div>
          </Table.Footer>
        </Table>
      )}

      <Link
        className="absolute bottom-10 right-10 bg-primary-600 hover:bg-primary-700 cursor-pointer duration-300 p-4 text-white text-2xl rounded-full"
        to="/affiliates/create"
      >
        <FaPlus />
      </Link>
    </>
  );
}

function PageButton({ children, onClick, disabled }) {
  return (
    <button className="bg-transparent border-0 cursor-pointer disabled:opacity-50" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
