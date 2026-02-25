import FormRow from '../../../components/FormElements/FormRow';
import Label from '../../../components/FormElements/Label';
import Input from '../../../components/FormElements/Input';
import Select from '../../../components/FormElements/Select';
import PrimaryButton from '../../../components/PrimaryButton';

function clampPercent(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return '';
  return Math.max(0, Math.min(100, num));
}

export default function AffiliateForm({ register, handleSubmit, onSubmit, isLoading, isEdit = false, affiliateId = null }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-10 py-6 mt-5 bg-white rounded-lg shadow-md">
      <FormRow>
        <Label>Name</Label>
        <Input type="text" {...register('name', { required: 'Name is required' })} />
      </FormRow>

      <FormRow>
        <Label>Email</Label>
        <Input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email',
            },
          })}
        />
      </FormRow>

      {isEdit ? (
        <FormRow>
          <Label>Affiliate ID</Label>
          <Input type="text" value={affiliateId || ''} readOnly />
        </FormRow>
      ) : (
        <p className="text-[13px] text-gray-500 -mt-1">Affiliate ID auto-generated after creation.</p>
      )}

      <FormRow>
        <Label>Commission %</Label>
        <Input
          type="number"
          min={0}
          max={100}
          step="0.01"
          {...register('commissionPercent', {
            required: 'Commission percent is required',
            valueAsNumber: true,
            min: {
              value: 0,
              message: 'Commission cannot be below 0',
            },
            max: {
              value: 100,
              message: 'Commission cannot be above 100',
            },
            setValueAs: clampPercent,
          })}
        />
      </FormRow>

      {isEdit && (
        <FormRow>
          <Label>Active</Label>
          <Select {...register('isActive')}>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </Select>
        </FormRow>
      )}

      <div className="flex items-center gap-2.5 mt-5">
        <PrimaryButton type="submit" disabled={isLoading}>
          {isEdit ? 'Update Affiliate' : 'Create Affiliate'}
        </PrimaryButton>
      </div>
    </form>
  );
}
