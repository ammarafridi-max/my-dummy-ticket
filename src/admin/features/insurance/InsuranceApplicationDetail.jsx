import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetInsuranceApplication } from '../../../hooks/insurance/useGetInsuranceApplication';
import { useAdminDownloadInsurancePolicy } from '../../../hooks/insurance/useAdminDownloadInsurancePolicy';
import { useDeleteInsuranceApplication } from '../../../hooks/insurance/useDeleteInsuranceApplication';
import { convertToDubaiTime } from '../../../utils/dubaiDateTime';
import { convertToDubaiDate } from '../../../utils/dubaiDateTime';
import { formatDate } from '../../../utils/formatDate';
import { capitalCase } from 'change-case';
import { confirmAlert } from 'react-confirm-alert';
import { MdWhatsapp } from 'react-icons/md';
import { Trash, Undo } from 'lucide-react';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import SectionHeading from '../../../components/SectionHeading';
import Loading from '../../../components/Loading';
import PrimaryButton from '../../../components/PrimaryButton';
import ActionButtons from '../../../components/ActionButtons';
import { Tabs } from '../../../components/Tabs';
import SuccessPill from '../../../components/SuccessPill';
import NeutralPill from '../../../components/NeutralPill';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';
import { formatAmount } from '../../../utils/currency';

export default function InsuranceApplicationDetail() {
  const { sessionId } = useParams();
  const { application, isLoadingApplication } = useGetInsuranceApplication(sessionId);
  const { deleteInsuranceApplication, isDeleting } = useDeleteInsuranceApplication();
  const [activeTab, setActiveTab] = useState('information');
  const { isAdmin } = useAuth();

  if (isLoadingApplication) return <Loading />;

  function handleShareWhatsApp() {
    if (!application) return;

    const startDate = application?.startDate
      ? formatDate(application.startDate)
      : '-';
    const endDate = application?.endDate
      ? formatDate(application.endDate)
      : '-';

    const passengers = application?.passengers?.length
      ? application.passengers.map(
          (p, i) => `Passenger ${i + 1}: ${p.firstName} ${p.lastName} • ${p.nationality}`
        )
      : ['Passengers: -'];

    const message = `
Insurance Application
Name: ${application?.leadPassenger || '-'}
Email: ${application?.email || '-'}
Mobile: ${application?.mobile?.code || ''}-${application?.mobile?.digits || ''}

Journey: ${capitalCase(application?.journeyType || '')}
Region: ${application?.region?.name || '-'}
Dates: ${startDate} → ${endDate}

${passengers.join('\n')}

Policy #: ${application?.policyNumber || 'Pending'}
Payment: ${application?.paymentStatus || '-'}
${isAdmin ? `Amount: ${application?.amountPaid?.currency || ''} ${formatAmount(application?.amountPaid?.amount)}` : ''}
    `.trim();

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = url;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <div>
          <Breadcrumb
            paths={[
              { label: 'Home', href: '/' },
              { label: 'Insurance Applications', href: '/insurance' },
              {
                label: capitalCase(application?.leadPassenger),
                href: `/insurance/${sessionId}`,
              },
            ]}
          />
          <PageHeading>{capitalCase(application?.leadPassenger)}</PageHeading>
        </div>
        <div>
          <ActionButtons
            actions={[
              { text: 'Share on WhatsApp', icon: MdWhatsapp, onClick: handleShareWhatsApp },
              ...(isAdmin
                ? [
                    {
                      text: 'Delete',
                      icon: Trash,
                      loading: isDeleting,
                      onClick: () => {
                        confirmAlert({
                          title: 'Confirm to delete',
                          message: 'Are you sure you want to delete this insurance application?',
                          buttons: [
                            {
                              label: 'Delete',
                              onClick: () => deleteInsuranceApplication(sessionId),
                            },
                            {
                              label: 'Cancel',
                              onClick: () => toast.error('Delete cancelled'),
                            },
                          ],
                        });
                      },
                    },
                    {
                      text: 'Refund',
                      icon: Undo,
                      onClick: () => toast.error('Refund not implemented yet'),
                    },
                  ]
                : []),
            ]}
          />
        </div>
      </div>

      <Tabs
        items={[
          { label: 'Information', value: 'information' },
          { label: 'Documents', value: 'documents' },
        ]}
        activeValue={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'information' && (
        <>
          <Overview application={application} isAdmin={isAdmin} />
          <BasicInfo application={application} isAdmin={isAdmin} />
          <TripDetails application={application} />
          <Passengers application={application} />
        </>
      )}

      {activeTab === 'documents' && <Documents policyId={application.policyId} />}
    </div>
  );
}

function Overview({ application, isAdmin }) {
  const totalTravellers =
    Number(application?.quantity?.adults || 0) +
    Number(application?.quantity?.children || 0) +
    Number(application?.quantity?.seniors || 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-1 mb-4">
      <OverviewCard label="Payment Status">
        {application?.paymentStatus === 'PAID' ? (
          <SuccessPill>PAID</SuccessPill>
        ) : (
          <NeutralPill>{application?.paymentStatus || 'UNPAID'}</NeutralPill>
        )}
      </OverviewCard>
      <OverviewCard label="Policy Number" value={application?.policyNumber || 'Pending'} />
      <OverviewCard label="Total Travellers" value={totalTravellers} />
      {isAdmin && (
        <OverviewCard
          label="Amount"
          value={`${application?.amountPaid?.currency || ''} ${formatAmount(application?.amountPaid?.amount)}`.trim()}
        />
      )}
    </div>
  );
}

function BasicInfo({ application, isAdmin }) {
  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6 mt-4 text-sm">
      <Info
        label="Submitted"
        value={`${convertToDubaiDate(application?.createdAt)} ${convertToDubaiTime(application?.createdAt)}`}
      />
      <Info label="Lead Passenger" value={application?.leadPassenger} />
      <Info label="Email" value={application?.email} />
      <Info label="Phone" value={`${application?.mobile?.code}-${application?.mobile?.digits}`} />
      <Info label="Journey" value={capitalCase(application?.journeyType)} />
      <Info label="Region" value={application?.region?.name} />
      <Info
        label="Travel Dates"
        value={`${formatDate(application?.startDate)} → ${formatDate(application?.endDate)}`}
      />
      <Info label="Policy #" value={application?.policyNumber} />
      {isAdmin && (
        <Info
          label="Amount"
          value={`${application?.amountPaid?.currency} ${formatAmount(application?.amountPaid?.amount)}`}
        />
      )}
      <Info label="Payment" value={application?.paymentStatus} />
    </div>
  );
}

function TripDetails({ application }) {
  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-sm mt-4 text-sm">
      <SectionHeading>Trip</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6 mt-2">
        <Info label="Adults" value={application?.quantity?.adults} />
        <Info label="Children" value={application?.quantity?.children} />
        <Info label="Seniors" value={application?.quantity?.seniors} />
        <Info label="Region Desc" value={application?.region?.description} />
      </div>
    </div>
  );
}

function Passengers({ application }) {
  const formatDob = dob => {
    if (!dob) return '-';
    return formatDate(dob);
  };

  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-sm mt-4 text-sm">
      <SectionHeading>Passengers</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        {application?.passengers?.map((p, i) => {
          const fullName = `${p?.title || ''} ${p?.firstName || ''} ${p?.lastName || ''}`.trim();

          return (
            <div key={i} className="border border-gray-200 rounded-lg p-4 bg-gray-50/40">
              <p className="text-sm font-medium text-gray-800 mb-2">Passenger {i + 1}</p>
              <div className="grid grid-cols-1 gap-2">
                <Field label="Name" value={fullName} />
                <Field label="Date of Birth" value={formatDob(p?.dob)} />
                <Field label="Nationality" value={p?.nationality} />
                <Field label="Passport Number" value={p?.passport} />
              </div>
            </div>
          );
        })}
      </div>
      {(!application?.passengers || application.passengers.length === 0) && (
        <p className="text-sm text-gray-500 mt-3">No passengers found for this application.</p>
      )}
    </div>
  );
}

function Documents({ policyId }) {
  const { downloadPolicy } = useAdminDownloadInsurancePolicy();
  const documents = [
    { label: 'Certificate of Insurance', index: 0 },
    { label: 'Policy Wording', index: 1 },
    { label: 'Policy Wording (Arabic)', index: 2 },
    { label: 'Policy Summary', index: 3 },
    { label: 'Policy Tax Invoice', index: 4 },
  ];

  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-sm mt-4 text-sm">
      <SectionHeading>Documents</SectionHeading>
      <p className="text-sm text-gray-500 mb-4">
        Download generated policy files for this application.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {documents.map(doc => (
          <div
            key={doc.index}
            className="border border-gray-200 rounded-lg p-4 flex items-center justify-between gap-3"
          >
            <span className="text-sm text-gray-700">{doc.label}</span>
            <PrimaryButton onClick={() => downloadPolicy({ policyId, index: doc.index })}>
              Download
            </PrimaryButton>
          </div>
        ))}
      </div>
    </div>
  );
}

// function Actions({ application }) {
//   const { deleteInsuranceApplication, isDeleting } = useDeleteInsuranceApplication();

//   return (
//     <div className="bg-white px-6 py-4 rounded-md shadow-sm mt-4">
//       <SectionHeading>Actions</SectionHeading>
//       <div className="flex gap-2 mt-2">
//         <PrimaryButton className="h-9 px-3 text-sm">Send Policy</PrimaryButton>
//         <DeleteButton
//           onClick={() => deleteInsuranceApplication(application?.sessionId)}
//           disabled={isDeleting}
//           className="h-9 px-3 text-sm"
//         >
//           Delete
//         </DeleteButton>
//       </div>
//     </div>
//   );
// }

function Info({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="font-extralight text-sm text-gray-500">{label}</span>
      <span className="font-light text-lg">{value || '-'}</span>
    </div>
  );
}

function OverviewCard({ label, value, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{label}</p>
      {children ? (
        <div>{children}</div>
      ) : (
        <p className="text-lg font-light text-gray-900">{value || '-'}</p>
      )}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-sm text-gray-900 text-right">{value || '-'}</span>
    </div>
  );
}
