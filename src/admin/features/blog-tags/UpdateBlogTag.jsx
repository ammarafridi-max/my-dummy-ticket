import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';
import Loading from '../../../components/Loading';
import PageHeading from '../../../components/PageHeading';
import BlogTagForm from './BlogTagForm';
import { useBlogTag } from '../../../hooks/blog-tags/useBlogTag';
import { useUpdateBlogTag } from '../../../hooks/blog-tags/useUpdateBlogTag';

export default function UpdateBlogTag() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const { tag, isLoadingBlogTag } = useBlogTag(id);
  const { updateBlogTag, isUpdatingBlogTag } = useUpdateBlogTag();

  useEffect(() => {
    if (!tag) return;
    reset({
      name: tag.name || '',
      description: tag.description || '',
      metaTitle: tag.metaTitle || '',
      metaDescription: tag.metaDescription || '',
    });
  }, [tag, reset]);

  function onSubmit(data) {
    updateBlogTag({
      id,
      tagData: {
        name: data.name || '',
        description: data.description || '',
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || '',
      },
    });
  }

  if (isLoadingBlogTag) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Update Blog Tag</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', path: '/' },
          { label: 'Blog Tags', path: '/blog-tags' },
          { label: 'Update Tag', path: `/blog-tags/${id}` },
        ]}
      />
      <PageHeading>Update Blog Tag</PageHeading>

      <BlogTagForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isUpdatingBlogTag}
        isEditing
      />
    </>
  );
}
