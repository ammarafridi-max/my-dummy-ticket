import { Helmet } from 'react-helmet-async';
import {
  buildBlog,
  buildGraph,
  buildOrganization,
  buildWebPage,
  buildWebsite,
} from '../../../lib/schema';
import { useBlogs } from '../../../hooks/blog/useBlogs';
import PrimarySection from '../../../components/PrimarySection';
import Container from '../../../components/Container';
import Loading from '../../../components/Loading';
import BlogCard from '../../../components/BlogCard';
import PageHero from '../../../components/Sections/PageHero';

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
  const { blogs, isLoadingBlogs } = useBlogs();
  const schema = buildGraph([
    buildOrganization(),
    buildWebsite(),
    buildWebPage({
      canonical: pageData.meta.canonical,
      title: pageData.meta.title,
      description: pageData.meta.description,
    }),
    buildBlog({
      canonical: pageData.meta.canonical,
      title: pageData.meta.title,
      description: pageData.meta.description,
    }),
  ]);

  if (isLoadingBlogs) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{pageData.meta.title}</title>
        <link rel="canonical" href={pageData.meta.canonical} />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={pageData.meta.description} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <PageHero
        title={pageData?.sections?.hero?.title}
        subtitle={pageData?.sections?.hero?.subtitle}
        paths={pageData.breadcrumb}
      />
      <PrimarySection>
        <Container>
          <div className="block items-start gap-7 lg:grid lg:grid-cols-3 lg:gap-7 py-10 lg:py-15">
            {blogs?.map((post, i) => (
              <BlogCard key={i} blog={post} />
            ))}
          </div>
        </Container>
      </PrimarySection>
    </>
  );
}
