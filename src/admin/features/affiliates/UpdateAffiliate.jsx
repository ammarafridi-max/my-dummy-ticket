/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';
import { Tabs } from '../../../components/Tabs';
import SuccessPill from '../../../components/SuccessPill';
import NeutralPill from '../../../components/NeutralPill';
import DangerPill from '../../../components/DangerPill';
import AffiliateForm from './AffiliateForm';
import { useAffiliate } from '../../../hooks/affiliates/useAffiliate';
import { useUpdateAffiliate } from '../../../hooks/affiliates/useUpdateAffiliate';
import { useAffiliateStats } from '../../../hooks/affiliates/useAffiliateStats';
import { useAffiliateTickets } from '../../../hooks/affiliates/useAffiliateTickets';

export default function UpdateAffiliate() {
  const { id } = useParams();
  const [tab, setTab] = useState('profile');
  const [ticketPage, setTicketPage] = useState(1);
  const [ticketStatus, setTicketStatus] = useState('all');
  const [statsStartDate, setStatsStartDate] = useState('');
  const [statsEndDate, setStatsEndDate] = useState('');

  const { affiliate, isLoadingAffiliate } = useAffiliate(id);
  const { updateAffiliate, isUpdatingAffiliate } = useUpdateAffiliate();
  const { stats, isLoadingStats } = useAffiliateStats(id, {
    startDate: statsStartDate,
    endDate: statsEndDate,
  });
  const { tickets, pagination, isLoadingAffiliateTickets } = useAffiliateTickets(id, {
    page: ticketPage,
    limit: 10,
    paymentStatus: ticketStatus === 'all' ? '' : ticketStatus,
  });

  const { register, handleSubmit, reset } = useForm();
  const paidRevenueAmount = Number(stats?.paidRevenue?.amount || 0);
  const affiliateCommissionPercent = Number(affiliate?.commissionPercent || 0);
  const totalCommissionAmount = Number(((paidRevenueAmount * affiliateCommissionPercent) / 100).toFixed(2));

  useEffect(() => {
    if (!affiliate) return;

    reset({
      name: affiliate.name || '',
      email: affiliate.email || '',
      commissionPercent: affiliate.commissionPercent ?? 25,
      isActive: affiliate.isActive ? 'true' : 'false',
    });
  }, [affiliate, reset]);

  useEffect(() => {
    setTicketPage(1);
  }, [ticketStatus]);

  function onSubmit(values) {
    const payload = {
      name: values.name?.trim(),
      email: values.email?.trim().toLowerCase(),
      commissionPercent: Number(values.commissionPercent),
      isActive: values.isActive === 'true',
    };

    updateAffiliate({ id, payload });
  }

  if (isLoadingAffiliate) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Update Affiliate</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Affiliates', href: '/affiliates' },
          { label: 'Update Affiliate', href: `/affiliates/${id}` },
        ]}
      />
      <PageHeading>Update Affiliate</PageHeading>

      <Tabs
        items={[
          { label: 'Affiliate Data', value: 'profile' },
          { label: 'Referred Tickets', value: 'tickets' },
        ]}
        activeValue={tab}
        onChange={setTab}
      />

      {tab === 'profile' && (
        <AffiliateForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isLoading={isUpdatingAffiliate}
          isEdit
          affiliateId={affiliate?.affiliateId}
        />
      )}

      {tab === 'tickets' && (
        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                <input
                  type="date"
                  className="w-[180px] bg-white text-[14px] py-2 px-3 rounded-md border border-gray-200 outline-0"
                  value={statsStartDate}
                  onChange={(e) => setStatsStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Date</label>
                <input
                  type="date"
                  className="w-[180px] bg-white text-[14px] py-2 px-3 rounded-md border border-gray-200 outline-0"
                  value={statsEndDate}
                  onChange={(e) => setStatsEndDate(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="h-[40px] px-4 rounded-md border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setStatsStartDate('');
                  setStatsEndDate('');
                }}
              >
                Clear Range
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <StatCard label="Total Tickets" value={isLoadingStats ? '...' : stats?.totalTickets || 0} />
            <StatCard label="Paid" value={isLoadingStats ? '...' : stats?.paidTickets || 0} />
            <StatCard
              label="Paid Revenue"
              value={isLoadingStats ? '...' : `${stats?.paidRevenue?.currency || 'USD'} ${stats?.paidRevenue?.amount || 0}`}
            />
            <StatCard
              label="Total Commission"
              value={isLoadingStats ? '...' : `${stats?.paidRevenue?.currency || 'USD'} ${totalCommissionAmount}`}
            />
          </div>

          <div className="flex items-center justify-end">
            <select
              className="w-[180px] bg-white text-[14px] py-2 px-3 rounded-md shadow-sm outline-0"
              value={ticketStatus}
              onChange={(e) => setTicketStatus(e.target.value)}
            >
              <option value="all">All Payments</option>
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>

          {isLoadingAffiliateTickets ? (
            <Loading />
          ) : (
            <Table $columntemplate="1.2fr 1.7fr 1.2fr 1fr 1fr 1.2fr">
              <Table.Head>
                <Table.Heading>Session</Table.Heading>
                <Table.Heading textAlign="left">Passenger</Table.Heading>
                <Table.Heading>Route</Table.Heading>
                <Table.Heading>Payment</Table.Heading>
                <Table.Heading>Status</Table.Heading>
                <Table.Heading>Date</Table.Heading>
              </Table.Head>

              {tickets.map((ticket) => {
                const leadPassenger = `${ticket?.passengers?.[0]?.title || ''} ${ticket?.passengers?.[0]?.firstName || ''} ${ticket?.passengers?.[0]?.lastName || ''}`.trim();

                return (
                  <Table.Row key={ticket._id} href={`/dummy-tickets/${ticket.sessionId}`}>
                    <Table.Item>{ticket.sessionId?.slice(0, 8)}</Table.Item>
                    <Table.Item textAlign="left">{leadPassenger || '-'}</Table.Item>
                    <Table.Item>
                      {ticket.from} - {ticket.to}
                    </Table.Item>
                    <Table.Item>
                      {ticket.paymentStatus === 'PAID' && <SuccessPill>PAID</SuccessPill>}
                      {ticket.paymentStatus === 'UNPAID' && <NeutralPill>UNPAID</NeutralPill>}
                      {ticket.paymentStatus === 'REFUNDED' && <DangerPill>REFUNDED</DangerPill>}
                    </Table.Item>
                    <Table.Item>{ticket.orderStatus || '-'}</Table.Item>
                    <Table.Item>{ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString('en-GB') : '-'}</Table.Item>
                  </Table.Row>
                );
              })}

              <Table.Footer>
                <div className="flex justify-between items-center">
                  <p>
                    Showing {pagination?.total > 0 ? (ticketPage - 1) * 10 + 1 : 0} -{' '}
                    {pagination?.total > 0 ? Math.min(ticketPage * 10, pagination.total) : 0} of {pagination?.total || 0}
                  </p>

                  <div className="flex items-center gap-3">
                    <PageButton onClick={() => setTicketPage((p) => p - 1)} disabled={!pagination?.hasPrevPage}>
                      Previous
                    </PageButton>
                    <span className="font-extralight">
                      {ticketPage} / {pagination?.totalPages || 1}
                    </span>
                    <PageButton onClick={() => setTicketPage((p) => p + 1)} disabled={!pagination?.hasNextPage}>
                      Next
                    </PageButton>
                  </div>
                </div>
              </Table.Footer>
            </Table>
          )}
        </div>
      )}
    </>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
      <p className="text-gray-500 text-[12px] uppercase tracking-wide">{label}</p>
      <p className="text-xl font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function PageButton({ children, onClick, disabled }) {
  return (
    <button className="bg-transparent border-0 cursor-pointer disabled:opacity-50" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
