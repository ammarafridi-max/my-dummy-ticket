import { useQuery } from '@tanstack/react-query';
import { getDummyTicketApi } from '../services/apiTickets';

export function useDummyTicket(sessionId) {
  const {
    data: dummyTicket,
    isLoading: isLoadingDummyTicket,
    isError: isErrorDummyTicket,
  } = useQuery({
    queryKey: ['dummy-ticket', sessionId],
    queryFn: () => getDummyTicketApi(sessionId),
  });

  return { dummyTicket, isLoadingDummyTicket, isErrorDummyTicket };
}
