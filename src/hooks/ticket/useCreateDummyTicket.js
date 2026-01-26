import { useMutation } from "@tanstack/react-query";
import { createDummyTicketApi } from "../../services/apiTickets";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { trackFlightFormSubmission } from "../../lib/analytics";

export function useCreateDummyTicket(){
  const navigate = useNavigate();

  const { mutate: createDummyTicket, isPending: isCreatingDummyTicket } = useMutation({
    mutationFn: ({ 
      type,
      from,
      to,
      departureDate,
      returnDate,
      quantity,
      passengers,
      email,
      phoneNumber,
      message,
      ticketValidity,
      ticketDelivery,
      flightDetails,
      paymentStatus = 'UNPAID'
    }) =>
      createDummyTicketApi({
        type,
        from,
        to,
        departureDate,
        returnDate,
        quantity,
        passengers,
        email,
        phoneNumber,
        message,
        ticketValidity,
        ticketDelivery,
        flightDetails,
        paymentStatus,
      }),

    onSuccess: (data, variables) => {
      trackFlightFormSubmission({
        passengers: variables.passengers,
        email: variables.email,
        phoneNumber: variables.phoneNumber,
        ticketValidity: variables.ticketValidity,
        flightDetails: variables.flightDetails,
      });

      localStorage.setItem('SESSION_ID', data.sessionId);
      navigate('/booking/review-details');
    },

    onError: err => {
      toast.error(err.message);
    },
  });

  return { createDummyTicket, isCreatingDummyTicket };
}
