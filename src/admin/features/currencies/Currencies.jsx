import { Helmet } from 'react-helmet-async';
import { confirmAlert } from 'react-confirm-alert';
import Breadcrumb from '../../../components/Breadcrumb';
import Loading from '../../../components/Loading';
import PageHeading from '../../../components/PageHeading';
import PrimaryLink from '../../../components/PrimaryLink';
import Table from '../../../components/Table';
import { useCurrencies } from '../../../hooks/currencies/useCurrencies';
import { useDeleteCurrency } from '../../../hooks/currencies/useDeleteCurrency';

export default function Currencies() {
  const { currencies, isLoadingCurrencies } = useCurrencies();
  const { deleteCurrency, isDeletingCurrency } = useDeleteCurrency();

  if (isLoadingCurrencies) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Currencies</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', path: '/' },
          { label: 'Currencies', path: '/currencies' },
        ]}
      />

      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <PageHeading>Currencies</PageHeading>
        <PrimaryLink to="/currencies/create" size="small">
          + Create Currency
        </PrimaryLink>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <Table $columntemplate="2fr_2fr_1fr_1fr_1fr">
          <Table.Head>
            <Table.Heading textAlign="left">Code</Table.Heading>
            <Table.Heading textAlign="left">Name</Table.Heading>
            <Table.Heading textAlign="center">Symbol</Table.Heading>
            <Table.Heading textAlign="center">Rate</Table.Heading>
            <Table.Heading textAlign="center">Actions</Table.Heading>
          </Table.Head>

          {(currencies || []).map((item) => (
            <Table.Row key={item._id} href={`/currencies/${item.code}`}>
              <Table.Item textAlign="left">{item.code}</Table.Item>
              <Table.Item textAlign="left">{item.name}</Table.Item>
              <Table.Item textAlign="center">{item.symbol}</Table.Item>
              <Table.Item textAlign="center">{item.rate}</Table.Item>
              <Table.Item textAlign="center">
                {!item.isBaseCurrency && (
                  <Table.DeleteLink
                    isDeleting={isDeletingCurrency}
                    onClick={() =>
                      confirmAlert({
                        title: 'Delete Currency',
                        message: `Are you sure you want to delete ${item.code}?`,
                        buttons: [
                          { label: 'Delete', onClick: () => deleteCurrency(item.code) },
                          { label: 'Cancel', onClick: () => {} },
                        ],
                      })
                    }
                  >
                    Delete
                  </Table.DeleteLink>
                )}
              </Table.Item>
            </Table.Row>
          ))}
        </Table>
      </div>
    </>
  );
}
