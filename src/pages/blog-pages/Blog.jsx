import { Helmet } from 'react-helmet-async';
import PrimarySection from '../../components/PrimarySection';
import Container from '../../components/Container';
import PageTitle from '../../components/PageTitle';
import Breadcrumb from '../../components/Breadcrumb';
import { useBlogs } from '../../hooks/useBlogs';
import Loading from '../../components/Loading';
import BlogCard from '../../components/BlogCard';

const pageData = {
  meta: {
    title: 'Blog | My Dummy Ticket',
    description:
      'Dummy tickets are flight reservations travelers use for various purposes, including visa applications. Book yours with My Dummy Ticket. Starting from AED 49.',
    canonical: 'https://www.mydummyticket.ae/blog',
  },
  breadcrumb: [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
  ],
  sections: {
    hero: {
      title: 'Blog',
      subtitle:
        'Our blog covers everything you need to know about dummy tickets, including how they work, when to use them, and why they are commonly required for visa and immigration purposes. We also share tips, updates, and best practices to help you avoid mistakes and apply with confidence.',
    },
  },
};

export default function Blog() {
  const { blogs, isLoadingBlogs, isErrorBlogs } = useBlogs();

  if (isLoadingBlogs) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{pageData.meta.title}</title>
        <link rel="canonical" href={pageData.meta.canonical} />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={pageData.meta.description} />
      </Helmet>
      <PrimarySection className="py-10 lg:py-15 bg-gray-50">
        <Container>
          <div className="flex flex-col lg:items-center lg:justify-center lg:text-center lg:max-w-200 lg:mx-auto">
            <Breadcrumb paths={pageData?.breadcrumb} />
            <PageTitle className="mt-3 mb-5">{pageData?.sections?.hero?.title}</PageTitle>
            <p className="font-extralight text-sm lg:text-lg">
              {pageData?.sections?.hero?.subtitle}
            </p>
          </div>
        </Container>
      </PrimarySection>
      <PrimarySection>
        <Container>
          <div className="flex items-start gap-7 lg:grid lg:grid-cols-3 lg:gap-7 py-10 lg:py-15">
            {blogs?.map((post, i) => (
              <BlogCard key={i} blog={post} />
            ))}
          </div>
        </Container>
      </PrimarySection>
    </>
  );
}
