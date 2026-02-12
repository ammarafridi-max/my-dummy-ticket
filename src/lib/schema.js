const SITE_URL = 'https://www.mydummyticket.ae';
const SITE_NAME = 'My Dummy Ticket';
const LOGO_URL = `${SITE_URL}/logo.png`;

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;

export const buildOrganization = () => ({
  '@type': 'Organization',
  '@id': organizationId,
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
});

export const buildWebsite = () => ({
  '@type': 'WebSite',
  '@id': websiteId,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@id': organizationId },
});

export const buildWebPage = ({ canonical, title, description }) => ({
  '@type': 'WebPage',
  '@id': `${canonical}#webpage`,
  url: canonical,
  name: title,
  description,
  isPartOf: { '@id': websiteId },
  publisher: { '@id': organizationId },
});

export const buildFAQPage = ({ canonical, title, description, faqs }) => ({
  '@type': 'FAQPage',
  '@id': `${canonical}#faq`,
  url: canonical,
  name: title,
  description,
  mainEntity: (faqs || []).map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const buildBlog = ({ canonical, title, description }) => ({
  '@type': 'Blog',
  '@id': `${canonical}#blog`,
  url: canonical,
  name: title,
  description,
  publisher: { '@id': organizationId },
});

export const buildBlogPosting = ({
  canonical,
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
}) => ({
  '@type': 'BlogPosting',
  '@id': `${canonical}#blogpost`,
  headline: title,
  description,
  image: image ? [image] : undefined,
  author: authorName ? { '@type': 'Person', name: authorName } : undefined,
  datePublished: datePublished || undefined,
  dateModified: dateModified || datePublished || undefined,
  publisher: { '@id': organizationId },
  mainEntityOfPage: { '@id': `${canonical}#webpage` },
});

export const buildService = ({ canonical, name, description, areaServed }) => ({
  '@type': 'Service',
  '@id': `${canonical}#service`,
  name,
  description,
  serviceType: name,
  url: canonical,
  areaServed,
  provider: { '@id': organizationId },
});

export const buildGraph = items => ({
  '@context': 'https://schema.org',
  '@graph': items,
});
