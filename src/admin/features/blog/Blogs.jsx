import { Helmet } from 'react-helmet-async';
import { FaCopy, FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useAdminBlogs } from '../../../hooks/blog/useAdminBlogs';
import { useDuplicateBlog } from '../../../hooks/blog/useDuplicateBlog';
import Loading from '../../../components/Loading';
import WarningPill from '../../../components/WarningPill';
import SuccessPill from '../../../components/SuccessPill';
import NeutralPill from '../../../components/NeutralPill';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Table from '../../../components/Table';
import { useAuth } from '../../../context/AuthContext';

export default function Blogs() {
  const { blogs, isLoadingBlogs, isErrorBlogs } = useAdminBlogs();
  const { duplicateBlog, isDuplicatingBlog } = useDuplicateBlog();
  const { isAdmin } = useAuth();

  return (
    <>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Blogs', href: '/blogs' },
        ]}
      />
      <div className="mb-4 flex items-center justify-between gap-3">
        <PageHeading>Blogs</PageHeading>
        {isAdmin && (
          <Link
            className="inline-flex items-center gap-2 rounded-lg border border-accent-500 bg-accent-500 px-4 py-2 text-sm text-white transition-colors hover:bg-accent-600"
            to="/blogs/create"
          >
            <FaPlus />
            Create Blog Post
          </Link>
        )}
      </div>
      {isLoadingBlogs && <Loading />}
      {isErrorBlogs && <p>Error loading blogs</p>}
      {blogs && (
        <Table $columntemplate="8fr 2fr 2fr">
          <Table.Head>
            <Table.Heading>Title</Table.Heading>
            <Table.Heading textAlign="left">Tags</Table.Heading>
            <Table.Heading textAlign="center">Status</Table.Heading>
          </Table.Head>
          {blogs?.map(blog => (
            <Table.Row key={blog?._id} href={`/blogs/${blog?._id}`}>
              <Table.Item>
                <span className="text-[17px] mb-1">{blog?.title}</span>
                <span className="font-light text-gray-500">
                  Created at {format(blog.createdAt, 'dd MMM yyyy')} by {blog?.author?.name}
                </span>
                <span className="mt-2">
                  <Table.DuplicateLink
                    isDuplicating={isDuplicatingBlog}
                    onClick={() => duplicateBlog(blog?._id)}
                  >
                    <FaCopy />
                  </Table.DuplicateLink>
                </span>
              </Table.Item>
              <Table.Item>{blog?.tags?.join(', ') || '-'}</Table.Item>
              <Table.Item>
                {blog?.status === 'draft' && (
                  <WarningPill>{blog?.status?.toUpperCase()}</WarningPill>
                )}
                {blog?.status === 'scheduled' && (
                  <NeutralPill>{blog?.status?.toUpperCase()}</NeutralPill>
                )}
                {blog?.status === 'published' && (
                  <SuccessPill>{blog?.status?.toUpperCase()}</SuccessPill>
                )}
              </Table.Item>
            </Table.Row>
          ))}
        </Table>
      )}
    </>
  );
}
