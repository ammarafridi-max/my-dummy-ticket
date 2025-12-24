export const faqArray = [
  {
    question: 'What is a {keyword}?',
    answer:
      'A {keyword} is a genuine booking issued on airline systems with a valid PNR, commonly used to demonstrate confirmed travel plans for trip-planning purposes.',
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
    question: 'Do {keyword}s work for Schengen applications?',
    answer:
      'Yes. Our {keyword}s meet documentation requirements requested by embassies and application centers, including VFS. They provide verified proof of travel intent and itinerary, increasing your chances of approval.',
  },
  {
    question: 'Will my application get rejected due to {keyword}s?',
    answer:
      'Not at all. {keyword}s are completely fine and accepted by VFS and embassies. They will improve your chances of getting your application approved.',
  },
  {
    question: 'I need hotel reservations too. Can you provide that?',
    answer:
      "Yes, we do. We specialize in all kinds of travel documentation and assistance, which means that we provide flight reservations, hotel reservations, travel insurance, trip itinerary and all other related documents needed to get your applications approved. Please send us an email with the trip details and we'll be happy to make you a hotel reservation.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      "We accept multiple payment methods. You can choose to pay on our website through Stripe's secure Checkout application or transfer money through a payment link (available on request).",
  },
  {
    question: 'Is the {keyword} suitable for all travel applications?',
    answer:
      'Yes, our {keyword}s are suitable and acceptable for all kinds of travel applications, including but not limited to Schengen, Turkey, Canada, Thailand, UAE, and UK.',
  },
  {
    question: 'What additional services do you offer?',
    answer:
      'Besides {keyword}s, we also offer hotel reservations, travel insurance (genuine and official), travel documentation assistance, and airport transfer arrangement.',
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can contact us by sending us an email us at info@mydummyticket.ae',
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: 'No, we do not offer any refunds or money-back guarantee.',
  },
];

export function formatFaqArray(arr, keyword = 'dummy ticket') {
  const newFaqs = arr.map(arr => {
    const question = arr.question.replaceAll('{keyword}', keyword);
    const answer = arr.answer.replaceAll('{keyword}', keyword);
    return { question, answer };
  });

  return newFaqs;
}
