import FormRow from '../../../components/FormElements/FormRow';
import Input from '../../../components/FormElements/Input';
import Label from '../../../components/FormElements/Label';
import Select from '../../../components/FormElements/Select';
import PrimaryButton from '../../../components/PrimaryButton';

export default function CurrencyForm({ register, handleSubmit, onSubmit, isLoading, isEditing = false }) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 px-10 py-6 mt-5 bg-white rounded-lg shadow-md"
    >
      <FormRow>
        <Label>Code</Label>
        <Input
          type="text"
          placeholder="AED"
          disabled={isEditing}
          {...register('code', { required: 'Currency code is required' })}
        />
      </FormRow>

      <FormRow>
        <Label>Name</Label>
        <Input
          type="text"
          placeholder="UAE Dirham"
          {...register('name', { required: 'Currency name is required' })}
        />
      </FormRow>

      <FormRow>
        <Label>Symbol</Label>
        <Input
          type="text"
          placeholder="AED"
          {...register('symbol', { required: 'Currency symbol is required' })}
        />
      </FormRow>

      <FormRow>
        <Label>Rate</Label>
        <Input
          type="number"
          step="0.0001"
          {...register('rate', { valueAsNumber: true })}
        />
      </FormRow>

      <FormRow>
        <Label>Base Currency</Label>
        <Select {...register('isBaseCurrency')}>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </Select>
      </FormRow>

      <div className="flex items-center gap-2.5 mt-5">
        <PrimaryButton type="submit" size="small" disabled={isLoading}>
          {isLoading ? (isEditing ? 'Updating...' : 'Creating...') : isEditing ? 'Update Currency' : 'Create Currency'}
        </PrimaryButton>
      </div>
    </form>
  );
}
