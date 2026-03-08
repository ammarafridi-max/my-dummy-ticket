import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import BlogTagForm from './BlogTagForm';
import { useCreateBlogTag } from '../../../hooks/blog-tags/useCreateBlogTag';

export default function CreateBlogTag() {
  const { register, handleSubmit } = useForm();
  const { createBlogTag, isCreatingBlogTag } = useCreateBlogTag();

  function onSubmit(data) {
    createBlogTag({
      name: data.name || '',
      description: data.description || '',
      metaTitle: data.metaTitle || '',
      metaDescription: data.metaDescription || '',
    });
  }

  return (
    <>
      <Helmet>
        <title>Create Blog Tag</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', path: '/' },
          { label: 'Blog Tags', path: '/blog-tags' },
          { label: 'Create Tag', path: '/blog-tags/create' },
        ]}
      />
      <PageHeading>Create Blog Tag</PageHeading>

      <BlogTagForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isCreatingBlogTag}
      />
    </>
  );
}
