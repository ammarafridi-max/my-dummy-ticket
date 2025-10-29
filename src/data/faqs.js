export const faqArray = [
  {
    question: 'What is a {keyword}?',
    answer:
      'A {keyword} is a flight reservation used mostly for visa applications as proof of onward travel. It is a flight reservation with a verifiable PNR. It cannot be used to travel, though.',
  },
  {
    question: 'How can I verify the {keyword}?',
    answer:
      "Our {keyword}s are legitimate flight reservations. They can be verified directly on the airline's website using the airline reservation code (or PNR) and your surname. It's important to note that some airlines do not display reservation information on their website.",
  },
  {
    question: 'How much does a {keyword} cost?',
    answer:
      'The pricing for our {keyword}s (flight reservations) start from AED 49 for both, one way and return {keyword}s, and can go up to AED 79 per person, depending on availability selected.',
  },
  {
    question: 'How long is your {keyword} valid for?',
    answer:
      "Our {keyword}s can be valid for upto 48 hours, 7 days, or 14 days, depending on the availability you've selected.",
  },
  {
    question: 'How long does it take to receive my {keyword}?',
    answer:
      'All of our {keyword}s are created and sent within 10 to 15 minutes of application time. Please note that we send {keyword}s during working hours only (09:00 AM - 09:00 PM). If you need it urgently, please send us an email',
  },
  {
    question: 'Do {keyword}s work for Schengen visas?',
    answer:
      "Absolutely! {keyword}s are flight reservations that allow embassies and VFS to ensure that the traveler has planned their return from the destination they're visiting. It helps gain their confidence and improves the chances of getting your Schengen visa.",
  },
  {
    question: 'Will my visa get rejected due to {keyword}s?',
    answer:
      'Not at all. {keyword}s are completely fine and accepted by VFS and embassies. They will improve your chances of getting your visa approved.',
  },
  {
    question: 'I need hotel reservations too. Can you provide that?',
    answer:
      "Yes, we do. We specialize in all kinds of travel documentation and assistance, which means that we provide flight reservations, hotel reservations, travel insurance, trip itinerary and all other related documents needed to get your visa approved. Please send us an email with the trip details and we'll be happy to make you a hotel reservation.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      "We accept multiple payment methods. You can choose to pay on our website through Stripe's secure Checkout application or transfer money through a payment link (available on request).",
  },
  {
    question: 'Is the {keyword} suitable for all visa applications?',
    answer:
      'Yes, our {keyword}s are suitable and acceptable for all kinds of visa applications, including but not limited to Schengen, Turkey, Canada, Thailand, UAE, and UK visas.',
  },
  {
    question: 'What additional services do you offer?',
    answer:
      'Besides {keyword}s, we also offer dummy hotel bookings, travel insurance (genuine and official), visa assistance, and airport transfer arrangement.',
  },
  {
    question: 'How can I contact customer support?',
    answer:
      'You can contact us by sending us an email us at info@mydummyticket.ae',
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: 'No, we do not offer any refunds or money-back guarantee.',
  },
];

export function formatFaqArray(arr, keyword) {
  const newFaqs = arr.map((arr) => {
    const question = arr.question.replace('{keyword}', keyword);
    const answer = arr.answer.replace('{keyword}', keyword);
    return { question, answer };
  });

  return newFaqs;
}
