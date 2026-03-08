import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useCreateBlog } from '../../../hooks/blog/useCreateBlog';
import { useRef, useState } from 'react';
import { FaCalendar } from 'react-icons/fa6';
import BlogForm from './BlogForm';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import { useAuth } from '../../../context/AuthContext';
import { useBlogTags } from '../../../hooks/blog-tags/useBlogTags';

export default function CreateBlogPost() {
  const editorRef = useRef(null);
  const { createBlog, isCreatingBlog } = useCreateBlog();
  const { tags } = useBlogTags();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduledAtInput, setScheduledAtInput] = useState('');

  const { handleSubmit, register, control, watch, setValue } = useForm({
    defaultValues: {
      status: 'draft',
      scheduledAt: '',
    },
  });
  const { isAdmin } = useAuth();
  const selectedStatus = watch('status');
  const selectedScheduledAt = watch('scheduledAt');

  if (!isAdmin) {
    return (
      <>
        <Helmet>
          <title>Create Blog Post</title>
        </Helmet>
        <Breadcrumb
          paths={[
            { label: 'Home', href: '/' },
            { label: 'Blogs', href: '/blogs' },
            { label: 'Create Blog Post', href: '/blogs/create' },
          ]}
        />
        <PageHeading>Create Blog Post</PageHeading>
        <p className="mt-6 bg-white p-6 rounded-lg shadow text-sm text-gray-600">
          You do not have permission to create blog posts.
        </p>
      </>
    );
  }

  function onSubmit(data) {
    const formData = new FormData();

    formData.append('metaTitle', data.metaTitle || '');
    formData.append('metaDescription', data.metaDescription || '');
    formData.append('title', data.title || '');
    formData.append('slug', data.slug || '');
    formData.append('excerpt', data.excerpt || '');
    formData.append('status', data.status || 'draft');
    if (data.status === 'scheduled') {
      formData.append('scheduledAt', data.scheduledAt || '');
    }
    formData.append('content', editorRef.current.getContent());

    if (data.tags && data.tags.length > 0) {
      data.tags.forEach(tag => formData.append('tags', tag));
    }

    if (data.coverImage && data.coverImage[0]) {
      formData.append('coverImage', data.coverImage[0]);
    }

    createBlog(formData);
  }

  function handleOpenScheduleModal() {
    setScheduledAtInput(selectedScheduledAt || '');
    setIsScheduleModalOpen(true);
  }

  function handleScheduleApply() {
    if (!scheduledAtInput) return;
    if (new Date(scheduledAtInput) <= new Date()) return;

    setValue('status', 'scheduled');
    setValue('scheduledAt', scheduledAtInput);
    setIsScheduleModalOpen(false);
  }

  return (
    <>
      <Helmet>
        <title>Create Blog Post</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Blogs', href: '/blogs' },
          { label: 'Create Blog Post', href: '/blogs/create' },
        ]}
      />

      <div className="mb-4 flex items-center justify-between gap-3">
        <PageHeading>Create Blog Post</PageHeading>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
          onClick={handleOpenScheduleModal}
        >
          <FaCalendar />
          Schedule
        </button>
      </div>

      <BlogForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        watch={watch}
        isLoading={isCreatingBlog}
        editorRef={editorRef}
        showSubmitButton
        tagOptions={(tags || []).map((tag) => ({ value: tag.name, label: tag.name }))}
        submitButtonLabel={
          isCreatingBlog
            ? 'Creating...'
            : selectedStatus === 'scheduled'
              ? 'Schedule Blog Post'
              : 'Create Blog Post'
        }
      />
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-medium text-gray-900">Schedule Blog Post</h3>
            <p className="mt-1 text-sm font-light text-gray-600">
              Choose when this post should be published.
            </p>
            <div className="mt-4">
              <label
                htmlFor="blog-scheduled-at"
                className="mb-1 block text-sm font-light text-gray-600"
              >
                Publish date and time
              </label>
              <input
                id="blog-scheduled-at"
                type="datetime-local"
                value={scheduledAtInput}
                onChange={e => setScheduledAtInput(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            {scheduledAtInput && new Date(scheduledAtInput) <= new Date() && (
              <p className="mt-2 text-sm text-red-600">Please choose a future date and time.</p>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleScheduleApply}
                disabled={!scheduledAtInput || new Date(scheduledAtInput) <= new Date()}
                className="rounded-lg bg-accent-500 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
