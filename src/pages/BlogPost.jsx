import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks/useBlogBySlug';
import { Helmet } from 'react-helmet-async';
import PrimarySection from '../components/PrimarySection';
import Container from '../components/Container';
import Breadcrumb from '../components/Breadcrumb';

export default function BlogPost() {
  const { slug } = useParams();
  const { blog, isLoadingBlog, isErrorBlog } = useBlog(slug);

  if (isLoadingBlog) return <p>...Loading</p>;

  const {
    author,
    content,
    coverImageUrl,
    createdAt,
    excerpt,
    metaDescription,
    metaTitle,
    publishedAt,
    readingTime,
    slug: postSlug,
    status,
    tags,
    title,
    updatedAt,
  } = blog;

  const pageData = {
    meta: {
      title: `${metaTitle} | Blog | My Dummy Ticket`,
      description: metaDescription,
      canonical: `https://www.mydummyticket.ae/blog/${blog?.slug}`,
    },
    blogPost: {
      title,
      content,
      excerpt,
      coverImageUrl,
      author,
      createdAt,
      publishedAt,
      slug,
    },
  };

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
          <div className="grid grid-cols-1 lg:grid-cols-[6fr_6fr] gap-10 items-center font-outfit">
            <div>
              <Breadcrumb
                paths={[
                  { label: 'Home', path: '/' },
                  { label: 'Blog', path: '/blog' },
                  {
                    label: `${pageData?.blogPost?.title}`,
                    path: `/blog/${pageData?.blogPost?.slug}`,
                  },
                ]}
              />
              <h1 className="text-4xl leading-12 my-5">{pageData?.blogPost?.title}</h1>
              <p className="font-light text-gray-600">{pageData?.blogPost?.excerpt}</p>
            </div>
            <div className="bg-gray-100 aspect-[16/10] rounded-3xl overflow-hidden">
              <img
                src={pageData?.blogPost?.coverImageUrl}
                className="object-cover object-center"
                alt={pageData?.blogPost?.title}
              />
            </div>
          </div>
        </Container>
      </PrimarySection>
      <PrimarySection className="py-10 lg:py-15">
        <Container>
          <div
            dangerouslySetInnerHTML={{ __html: pageData?.blogPost?.content }}
            className="font-outfit blog_post max-w-full lg:max-w-220"
          />
        </Container>
      </PrimarySection>
    </>
  );
}
