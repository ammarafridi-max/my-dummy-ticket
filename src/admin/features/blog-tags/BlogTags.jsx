import { Helmet } from 'react-helmet-async';
import { confirmAlert } from 'react-confirm-alert';
import { FaCopy } from 'react-icons/fa6';
import Breadcrumb from '../../../components/Breadcrumb';
import Loading from '../../../components/Loading';
import PageHeading from '../../../components/PageHeading';
import PrimaryLink from '../../../components/PrimaryLink';
import Table from '../../../components/Table';
import { useBlogTags } from '../../../hooks/blog-tags/useBlogTags';
import { useDeleteBlogTag } from '../../../hooks/blog-tags/useDeleteBlogTag';
import { useDuplicateBlogTag } from '../../../hooks/blog-tags/useDuplicateBlogTag';

export default function BlogTags() {
  const { tags, isLoadingBlogTags } = useBlogTags();
  const { deleteBlogTag, isDeletingBlogTag } = useDeleteBlogTag();
  const { duplicateBlogTag, isDuplicatingBlogTag } = useDuplicateBlogTag();

  if (isLoadingBlogTags) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Blog Tags</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', path: '/' },
          { label: 'Blog Tags', path: '/blog-tags' },
        ]}
      />

      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <PageHeading>Blog Tags</PageHeading>
        <PrimaryLink to="/blog-tags/create" size="small">
          + Create Tag
        </PrimaryLink>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <Table $columntemplate="1.5fr_2fr_2fr_1fr">
          <Table.Head>
            <Table.Heading textAlign="left">Name</Table.Heading>
            <Table.Heading textAlign="left">Description</Table.Heading>
            <Table.Heading textAlign="left">Meta Title</Table.Heading>
            <Table.Heading textAlign="center">Actions</Table.Heading>
          </Table.Head>

          {(tags || []).map((tag) => (
            <Table.Row key={tag._id} href={`/blog-tags/${tag._id}`}>
              <Table.Item textAlign="left">{tag.name}</Table.Item>
              <Table.Item textAlign="left">{tag.description || '-'}</Table.Item>
              <Table.Item textAlign="left">{tag.metaTitle || '-'}</Table.Item>
              <Table.Item textAlign="center">
                <div className="flex items-center justify-center gap-2">
                  <Table.DuplicateLink
                    isDuplicating={isDuplicatingBlogTag}
                    onClick={() => duplicateBlogTag(tag._id)}
                  >
                    <FaCopy />
                  </Table.DuplicateLink>
                  <Table.DeleteLink
                    isDeleting={isDeletingBlogTag}
                    onClick={() =>
                      confirmAlert({
                        title: 'Delete Tag',
                        message: `Are you sure you want to delete "${tag.name}"?`,
                        buttons: [
                          { label: 'Delete', onClick: () => deleteBlogTag(tag._id) },
                          { label: 'Cancel', onClick: () => {} },
                        ],
                      })
                    }
                  >
                    Delete
                  </Table.DeleteLink>
                </div>
              </Table.Item>
            </Table.Row>
          ))}
        </Table>
      </div>
    </>
  );
}
