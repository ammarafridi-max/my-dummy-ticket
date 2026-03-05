import { useParams } from 'react-router-dom';
import { useBlog } from '../../../hooks/blog/useBlogBySlug';
import { useBlogs } from '../../../hooks/blog/useBlogs';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import { LuDot } from 'react-icons/lu';
import PageProgressBar from 'page-progressbar-react';
import PrimarySection from '../../../components/PrimarySection';
import Loading from '../../../components/Loading';
import Container from '../../../components/Container';
import Breadcrumb from '../../../components/Breadcrumb';
import {
  buildBlogPosting,
  buildGraph,
  buildOrganization,
  buildWebPage,
  buildWebsite,
} from '../../../lib/schema';

export default function BlogPost() {
  const { slug } = useParams();
  const { blogs, isLoadingBlogs } = useBlogs();
  const { blog, isLoadingBlog, isErrorBlog } = useBlog(slug);

  if (isLoadingBlog) return <Loading />;

  if (isErrorBlog || !blog) {
    return (
      <>
        <Helmet>
          <title>Blog Post Not Found</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <PrimarySection className="py-10 bg-gray-50">
          <Container>
            <p className="text-center text-gray-600">We couldn’t find that blog post.</p>
          </Container>
        </PrimarySection>
      </>
    );
  }

  const {
    author,
    content,
    coverImageUrl,
    createdAt,
    excerpt,
    metaDescription,
    metaTitle,
    publishedAt,
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
      updatedAt,
      slug,
    },
  };

  const schema = buildGraph([
    buildOrganization(),
    buildWebsite(),
    buildWebPage({
      canonical: pageData.meta.canonical,
      title: pageData.meta.title,
      description: pageData.meta.description,
    }),
    buildBlogPosting({
      canonical: pageData.meta.canonical,
      title: pageData.blogPost.title,
      description: pageData.blogPost.excerpt || pageData.meta.description,
      image: pageData.blogPost.coverImageUrl,
      datePublished: pageData.blogPost.publishedAt,
      dateModified: pageData.blogPost.updatedAt,
      authorName: pageData.blogPost.author?.name,
    }),
  ]);

  return (
    <>
      <Helmet>
        <title>{pageData.meta.title}</title>
        <link rel="canonical" href={pageData.meta.canonical} />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={pageData.meta.description} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <PageProgressBar color="#1e60a6" height={4} />
      <PrimarySection className="relative overflow-hidden bg-[linear-gradient(160deg,#f5fbfb_0%,#eef4ff_52%,#fff9f4_100%)] pt-24 pb-12 md:pt-28 md:pb-14 lg:pt-28 lg:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent-100/50 blur-3xl" />
        </div>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[5.5fr_4.5fr] gap-10 items-center font-outfit">
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
              <h1 className="text-2xl lg:text-4xl font-medium leading-9 lg:leading-12 my-3 lg:my-5">
                {pageData?.blogPost?.title}
              </h1>
              <div className="flex items-center gap-1 font-light text-gray-900/50 text-sm mb-4">
                {pageData?.blogPost?.updatedAt ? (
                  <span>Updated {format(pageData?.blogPost?.updatedAt, 'dd MMM yyyy')}</span>
                ) : (
                  <span>Published {format(pageData?.blogPost?.publishedAt, 'dd MMM yyyy')}</span>
                )}
                <LuDot className="text-lg" />
                <span>{pageData?.blogPost?.author?.name}</span>
              </div>
              <p className="text-sm lg:text-base font-light text-gray-700">
                {pageData?.blogPost?.excerpt}
              </p>
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
      <PrimarySection className="py-10 lg:pt-20 lg:pb-12">
        <Container className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-15">
          <div
            dangerouslySetInnerHTML={{ __html: pageData?.blogPost?.content }}
            className="font-outfit blog_post"
          />
          <div className="sticky top-0">
            <h2 className="font-normal mb-5">Recently Published Posts:</h2>
            {isLoadingBlogs ? (
              <p>Loading...</p>
            ) : (
              <div className="flex flex-col gap-6">
                {blogs
                  ?.filter(b => b._id !== blog._id)
                  .map(b => (
                    <a
                      key={b._id}
                      href={`/blog/${b.slug}`}
                      className="grid grid-cols-[2fr_8fr] items-center overflow-hidden gap-3 cursor-pointer"
                    >
                      <img
                        className="w-full bg-gray-100 aspect-square rounded-md border-0 object-cover object-center"
                        src={b.coverImageUrl}
                      />
                      <div>
                        <h3 className="font-light text-sm leading-5">{b.title}</h3>
                        <p className="font-extralight text-[12px] text-gray-600 mt-1">
                          {format(b.publishedAt, 'dd MMM yyyy')}
                        </p>
                      </div>
                    </a>
                  ))}
              </div>
            )}
          </div>
        </Container>
      </PrimarySection>
    </>
  );
}
