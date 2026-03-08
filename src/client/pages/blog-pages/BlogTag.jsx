import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useBlogTag } from '../../../hooks/blog-tags/useBlogTag';
import { useBlogsByTag } from '../../../hooks/blog/useBlogsByTag';
import PrimarySection from '../../../components/PrimarySection';
import Container from '../../../components/Container';
import Loading from '../../../components/Loading';
import BlogCard from '../../../components/BlogCard';
import PageHero from '../../../components/Sections/PageHero';

export default function BlogTag() {
  const { id } = useParams();
  const { tag, isLoadingBlogTag, isErrorBlogTag } = useBlogTag(id);
  const { blogs, isLoadingBlogsByTag } = useBlogsByTag(tag?.name);

  if (isLoadingBlogTag || isLoadingBlogsByTag) return <Loading />;

  if (isErrorBlogTag || !tag) {
    return (
      <PrimarySection className="py-10 bg-gray-50">
        <Container>
          <p className="text-center text-gray-600">We couldn’t find that blog tag.</p>
        </Container>
      </PrimarySection>
    );
  }

  const title = tag.metaTitle || `${tag.name} | Blog Tag | My Dummy Ticket`;
  const description =
    tag.metaDescription ||
    tag.description ||
    `Explore published blog posts under the ${tag.name} tag.`;
  const canonical = `https://www.mydummyticket.ae/blog/tag/${tag._id}`;

  const breadcrumb = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Tags', path: '/blog/tags' },
    { label: tag.name, path: `/blog/tag/${tag._id}` },
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={description} />
      </Helmet>

      <PageHero title={tag.name} subtitle={tag.description || 'Published posts under this tag.'} paths={breadcrumb} />

      <PrimarySection className="py-10 lg:py-14">
        <Container>
          {blogs.length === 0 ? (
            <p className="text-gray-600">No published posts found for this tag yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {blogs.map((post, index) => (
                <BlogCard key={post._id || index} blog={post} />
              ))}
            </div>
          )}
        </Container>
      </PrimarySection>
    </>
  );
}
