import FormRow from '../../../components/FormElements/FormRow';
import Input from '../../../components/FormElements/Input';
import Label from '../../../components/FormElements/Label';
import Textarea from '../../../components/FormElements/Textarea';
import PrimaryButton from '../../../components/PrimaryButton';

export default function BlogTagForm({ register, handleSubmit, onSubmit, isLoading, isEditing = false }) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 px-10 py-6 mt-5 bg-white rounded-lg shadow-md"
    >
      <FormRow>
        <Label>Name</Label>
        <Input type="text" placeholder="Schengen Visa" {...register('name', { required: true })} />
      </FormRow>

      <FormRow>
        <Label>Description</Label>
        <Textarea rows={3} placeholder="Tag description..." {...register('description')} />
      </FormRow>

      <FormRow>
        <Label>Meta Title</Label>
        <Input type="text" placeholder="Schengen Visa Guide" {...register('metaTitle')} />
      </FormRow>

      <FormRow>
        <Label>Meta Description</Label>
        <Textarea rows={3} placeholder="SEO meta description for this tag..." {...register('metaDescription')} />
      </FormRow>

      <div className="flex items-center gap-2.5 mt-5">
        <PrimaryButton type="submit" size="small" disabled={isLoading}>
          {isLoading ? (isEditing ? 'Updating...' : 'Creating...') : isEditing ? 'Update Tag' : 'Create Tag'}
        </PrimaryButton>
      </div>
    </form>
  );
}
