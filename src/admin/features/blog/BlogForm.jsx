import { capitalCase } from 'change-case';
import { format } from 'date-fns';
import FormRow from '../../../components/FormElements/FormRow';
import Input from '../../../components/FormElements/Input';
import Textarea from '../../../components/FormElements/Textarea';
import Label from '../../../components/FormElements/Label';
import Select from '../../../components/FormElements/Select';
import CheckboxGroup from '../../../components/FormElements/CheckboxGroup';
import UploadFile from '../../../components/FormElements/UploadFile';
import TinyEditor from '../../../components/TinyEditor';
import PrimaryButton from '../../../components/PrimaryButton';

export default function BlogForm({
  blog,
  editorRef,
  register,
  control,
  watch,
  handleSubmit,
  onSubmit,
  isLoading = false,
  readOnly = false,
  showSubmitButton = false,
  submitButtonLabel = 'Save',
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div className="bg-white rounded-xl shadow p-8 space-y-8">
        {blog && (
          <section className="space-y-4">
            <h2 className="text-2xl font-normal text-gray-800 pb-2">Post Overview</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <Info label="Created" value={format(blog.createdAt, 'dd MMM yyyy • hh:mm aa')} />
              <Info label="Updated" value={format(blog.updatedAt, 'dd MMM yyyy • hh:mm aa')} />
              <Info label="Published" value={blog.publishedAt ? format(blog.publishedAt, 'dd MMM yyyy • hh:mm aa') : '-'} />
              <Info label="Scheduled" value={blog.scheduledAt ? format(blog.scheduledAt, 'dd MMM yyyy • hh:mm aa') : '-'} />
              <Info label="Status" value={capitalCase(blog.status || '-')} />
            </div>
          </section>
        )}

        <section className="space-y-4">
          <h2 className="text-2xl font-normal text-gray-800 pb-2">SEO Settings</h2>

          <FormRow>
            <Label>Meta Title</Label>
            <Input type="text" {...register('metaTitle')} readOnly={readOnly} disabled={readOnly} />
          </FormRow>

          <FormRow>
            <Label>Meta Description</Label>
            <Textarea rows={2} {...register('metaDescription')} readOnly={readOnly} disabled={readOnly} />
          </FormRow>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-normal text-gray-800 pb-2">Blog Details</h2>

          <FormRow>
            <Label>Title</Label>
            <Input type="text" {...register('title')} readOnly={readOnly} disabled={readOnly} />
          </FormRow>

          <FormRow>
            <Label>Slug</Label>
            <Input type="text" {...register('slug')} readOnly={readOnly} disabled={readOnly} />
          </FormRow>

          <FormRow>
            <Label>Cover Image</Label>
            <div className="flex flex-col gap-3 w-full">
              {blog?.coverImageUrl && (
                <div className="relative">
                  <img src={blog.coverImageUrl} className="w-full max-h-60 object-cover rounded-lg border" alt="Cover" />
                  <p className="text-xs text-gray-500 mt-1">Upload a new image to replace the current one</p>
                </div>
              )}
              <UploadFile {...register('coverImage')} disabled={readOnly} />
            </div>
          </FormRow>

          <FormRow>
            <Label>Excerpt</Label>
            <Textarea
              rows={3}
              {...register('excerpt')}
              placeholder="A short summary of the blog..."
              readOnly={readOnly}
              disabled={readOnly}
            />
          </FormRow>

          <FormRow>
            <Label>Status</Label>
            <Select {...register('status')} disabled={readOnly}>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
            </Select>
          </FormRow>

          {watch?.('status') === 'scheduled' && (
            <FormRow>
              <Label>Schedule Date & Time</Label>
              <Input type="datetime-local" {...register('scheduledAt')} disabled={readOnly} />
            </FormRow>
          )}

          <FormRow>
            <Label>Tags</Label>
            <CheckboxGroup
              name="tags"
              control={control}
              disabled={readOnly}
              options={[
                { value: 'dummyTicket', label: 'Dummy Ticket' },
                { value: 'schengenVisa', label: 'Schengen Visa' },
                { value: 'usVisa', label: 'US Visa' },
              ]}
            />
          </FormRow>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-normal text-gray-800 pb-2">Content</h2>
          <TinyEditor editorRef={editorRef} initialValue={blog?.content} disabled={readOnly} />
        </section>

        {showSubmitButton && !readOnly && (
          <div className="flex justify-end pt-2">
            <PrimaryButton type="submit" size="large" disabled={isLoading}>
              {submitButtonLabel}
            </PrimaryButton>
          </div>
        )}
      </div>
    </form>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="font-extralight text-sm text-gray-500">{label}</span>
      <span className="font-light text-lg truncate">{value || '-'}</span>
    </div>
  );
}
