import { Link, useParams } from 'react-router-dom';
import { useBlog } from '../../../hooks/blog/useBlogBySlug';
import { useBlogs } from '../../../hooks/blog/useBlogs';
import { useBlogTags } from '../../../hooks/blog-tags/useBlogTags';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import { LuDot } from 'react-icons/lu';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from 'react-icons/fa6';
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
  const { tags: allBlogTags = [] } = useBlogTags();
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
    tags,
    updatedAt,
  } = blog;

  const recentPosts = (blogs || [])
    .filter((item) => item?._id !== blog?._id)
    .sort((a, b) => {
      const aDate = new Date(a?.publishedAt || a?.createdAt || 0).getTime();
      const bDate = new Date(b?.publishedAt || b?.createdAt || 0).getTime();
      return bDate - aDate;
    })
    .slice(0, 3);

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

  const shareUrl = pageData.meta.canonical;
  const shareText = `${pageData.blogPost.title} - ${shareUrl}`;

  async function handleShare(channel) {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}`,
      instagram: 'https://www.instagram.com/',
      tiktok: 'https://www.tiktok.com/',
    };

    if ((channel === 'instagram' || channel === 'tiktok') && navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareText);
      } catch (error) {
        void error;
      }
    }

    window.open(shareLinks[channel], '_blank', 'noopener,noreferrer');
  }

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

      <PrimarySection className="pt-20 pb-20 lg:pt-30 lg:pb-12">
        <Container className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-15">
          <div>
            <div className="bg-gray-100 aspect-[16/8] rounded-3xl overflow-hidden mb-10">
              <img
                src={pageData?.blogPost?.coverImageUrl}
                className="object-cover object-center"
                alt={pageData?.blogPost?.title}
              />
            </div>

            <div className="mb-10">
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
              <h1 className="text-2xl lg:text-4xl font-medium leading-9 lg:leading-12 mb-4">
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
                <LuDot className="text-lg" />
                {Array.isArray(tags) && tags.length > 0 ? (
                  <span className="flex items-center gap-1 flex-wrap">
                    {tags.map((tagName, index) => {
                      const tagObj = allBlogTags.find(
                        (tag) => String(tag.name).toLowerCase() === String(tagName).toLowerCase(),
                      );
                      return (
                        <span key={`${tagName}-${index}`} className="inline-flex items-center gap-1">
                          {index > 0 && <span>,</span>}
                          {tagObj ? (
                            <Link
                              className="text-primary-700 hover:underline"
                              to={`/blog/tag/${tagObj.slug || tagObj._id}`}
                            >
                              {tagName}
                            </Link>
                          ) : (
                            <span>{tagName}</span>
                          )}
                        </span>
                      );
                    })}
                  </span>
                ) : (
                  <span>General</span>
                )}
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: pageData?.blogPost?.content }}
              className="font-outfit blog_post"
            />
          </div>
          <div className="sticky top-24 self-start h-fit">
            <h2 className="font-normal mb-5">Recently Published Posts:</h2>
            {isLoadingBlogs ? (
              <p>Loading...</p>
            ) : (
              <div className="flex flex-col gap-6">
                {recentPosts.map((b) => (
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

            <div className="mt-10 rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-900 mb-3">Share this post</p>
              <div className="flex items-center gap-2 flex-wrap">
                <ShareButton label="Facebook" onClick={() => handleShare('facebook')}>
                  <FaFacebookF />
                </ShareButton>
                <ShareButton label="Instagram" onClick={() => handleShare('instagram')}>
                  <FaInstagram />
                </ShareButton>
                <ShareButton label="TikTok" onClick={() => handleShare('tiktok')}>
                  <FaTiktok />
                </ShareButton>
                <ShareButton label="LinkedIn" onClick={() => handleShare('linkedin')}>
                  <FaLinkedinIn />
                </ShareButton>
                <ShareButton label="WhatsApp" onClick={() => handleShare('whatsapp')}>
                  <FaWhatsapp />
                </ShareButton>
              </div>
            </div>
          </div>
        </Container>
      </PrimarySection>
    </>
  );
}

function ShareButton({ children, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition-colors hover:bg-gray-100"
    >
      {children}
    </button>
  );
}
