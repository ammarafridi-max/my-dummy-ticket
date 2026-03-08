import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useBlogTags } from '../../../hooks/blog-tags/useBlogTags';
import Loading from '../../../components/Loading';
import PrimarySection from '../../../components/PrimarySection';
import Container from '../../../components/Container';
import PageHero from '../../../components/Sections/PageHero';

const pageData = {
  meta: {
    title: 'Blog Tags | My Dummy Ticket',
    description:
      'Browse blog categories to find published posts about visas, dummy tickets, travel insurance, and related topics.',
    canonical: 'https://www.mydummyticket.ae/blog/tags',
  },
  breadcrumb: [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Tags', path: '/blog/tags' },
  ],
};

export default function BlogTags() {
  const { tags, isLoadingBlogTags } = useBlogTags();

  if (isLoadingBlogTags) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{pageData.meta.title}</title>
        <link rel="canonical" href={pageData.meta.canonical} />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={pageData.meta.description} />
      </Helmet>

      <PageHero
        title="Blog Tags"
        subtitle="Explore topics and read the latest published posts under each tag."
        paths={pageData.breadcrumb}
      />

      <PrimarySection className="py-10 lg:py-14">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(tags || []).map((tag) => (
              <Link
                key={tag._id}
                to={`/blog/tag/${tag._id}`}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-medium text-gray-900">{tag.name}</h2>
                <p className="mt-2 text-sm font-light text-gray-600 line-clamp-3">
                  {tag.description || 'Read all posts under this tag.'}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </PrimarySection>
    </>
  );
}
