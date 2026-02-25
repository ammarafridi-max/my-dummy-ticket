import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { Edit3, Save, Send, Trash } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useBlog } from '../../../hooks/blog/useBlog';
import { useUpdateBlog } from '../../../hooks/blog/useUpdateBlog';
import { usePublishBlog } from '../../../hooks/blog/usePublishBlog';
import { useDeleteBlog } from '../../../hooks/blog/useDeleteBlog';
import BlogForm from './BlogForm';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Loading from '../../../components/Loading';
import ActionButtons from '../../../components/ActionButtons';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';

function toDateTimeLocal(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function UpdateBlogPost() {
  const editorRef = useRef(null);
  const { id } = useParams();
  const { blog, isErrorBlog, isLoadingBlog } = useBlog(id);
  const { updateBlog, isUpdatingBlog } = useUpdateBlog();
  const { publishBlog, isPublishingBlog } = usePublishBlog();
  const { deleteBlog, isDeletingBlog } = useDeleteBlog();
  const { isAdmin } = useAuth();

  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      metaTitle: '',
      metaDescription: '',
      title: '',
      slug: '',
      excerpt: '',
      status: 'draft',
      scheduledAt: '',
      tags: [],
      content: '',
    },
  });

  function buildFormData(data, { status } = {}) {
    const editorContent = editorRef.current ? editorRef.current.getContent() : '';
    const formData = new FormData();
    const finalStatus = status || data.status || 'draft';

    formData.append('metaTitle', data.metaTitle || '');
    formData.append('metaDescription', data.metaDescription || '');
    formData.append('title', data.title || '');
    formData.append('slug', data.slug || '');
    formData.append('excerpt', data.excerpt || '');
    formData.append('content', editorContent);

    formData.append('status', finalStatus);
    if (finalStatus === 'scheduled') {
      formData.append('scheduledAt', data.scheduledAt || '');
    }

    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag) => formData.append('tags', tag));
    }

    if (data.coverImage && data.coverImage[0]) {
      formData.append('newCoverImage', data.coverImage[0]);
    }

    return formData;
  }

  const handleEdit = handleSubmit((data) => {
    const formData = buildFormData(data);
    updateBlog({ id, blogData: formData });
  });

  const handleSaveDraft = handleSubmit((data) => {
    const formData = buildFormData(data, { status: 'draft' });
    updateBlog({ id, blogData: formData });
  });

  const handlePublish = () => publishBlog({ id });
  const handleDelete = () => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this blog? This action cannot be undone.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => deleteBlog(id),
        },
        {
          label: 'Cancel',
          onClick: () => toast.error('Delete cancelled'),
        },
      ],
    });
  };

  useEffect(() => {
    if (blog) {
      reset({
        metaTitle: blog.metaTitle || '',
        metaDescription: blog.metaDescription || '',
        title: blog.title || '',
        slug: blog.slug || '',
        excerpt: blog.excerpt || '',
        status: blog.status || 'draft',
        scheduledAt: toDateTimeLocal(blog.scheduledAt),
        tags: blog.tags || [],
      });
    }
  }, [blog, reset]);

  if (isLoadingBlog) return <Loading />;

  if (isErrorBlog) return <p>Could not load blog data</p>;
  if (!blog) return <p>Blog post not found</p>;

  return (
    <>
      <Helmet>
        <title>{`${blog?.title}`} | Blogs</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Blogs', href: '/blogs' },
          { label: `${blog?.title}`, href: `/blogs/${blog?._id}` },
        ]}
      />
      <div className="flex items-center justify-between gap-4">
        <PageHeading>{blog?.title}</PageHeading>
        {isAdmin && (
          <ActionButtons
            actions={[
              {
                text: 'Save Changes',
                icon: Edit3,
                onClick: handleEdit,
                disabled: isUpdatingBlog || isPublishingBlog || isDeletingBlog,
              },
              ...(blog?.status === 'published'
                ? [
                    {
                      text: 'Move to Draft',
                      icon: Save,
                      onClick: handleSaveDraft,
                      disabled: isUpdatingBlog || isPublishingBlog || isDeletingBlog,
                    },
                  ]
                : [
                    {
                      text: 'Publish',
                      icon: Send,
                      onClick: handlePublish,
                      disabled: isUpdatingBlog || isPublishingBlog || isDeletingBlog,
                    },
                  ]),
              {
                text: 'Delete',
                icon: Trash,
                onClick: handleDelete,
                disabled: isUpdatingBlog || isPublishingBlog || isDeletingBlog,
              },
            ]}
          />
        )}
      </div>
      <BlogForm
        blog={blog}
        register={register}
        onSubmit={handleEdit}
        handleSubmit={handleSubmit}
        control={control}
        watch={watch}
        isLoading={isUpdatingBlog}
        editorRef={editorRef}
        readOnly={!isAdmin}
      />
    </>
  );
}
