import { useForm } from 'react-hook-form';
import { useUpdateMyPassword } from '../../../hooks/account/useUpdateMyPassword';
import FormRow from '../../../components/FormElements/FormRow';
import Label from '../../../components/FormElements/Label';
import Input from '../../../components/FormElements/Input';
import SectionHeading from '../../../components/SectionHeading';
import PrimaryButton from '../../../components/PrimaryButton';
import LinkButton from '../../../components/LinkButton';

export default function PasswordForm() {
  const { updatePassword, isUpdating } = useUpdateMyPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  function onSubmit(data) {
    const { passwordCurrent, password, passwordConfirm } = data;
    updatePassword({ passwordCurrent, password, passwordConfirm });
  }

  return (
    <>
      <div className="mt-20">
        <SectionHeading fontSize="28px" mb="40px">
          Update Your Password
        </SectionHeading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <Label>Current Password</Label>
            <Input
              type="password"
              {...register('passwordCurrent', {
                required: 'Current password is required',
              })}
            />
            <p>{errors?.passwordCurrent?.message}</p>
          </FormRow>
          <FormRow>
            <Label>New Password</Label>
            <Input
              type="password"
              {...register('password', {
                required: 'New password is required',
              })}
            />
            <p>{errors?.password?.message}</p>
          </FormRow>
          <FormRow>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              {...register('passwordConfirm', {
                required: 'Password confirm is required',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />
            <p>{errors?.passwordConfirm?.message}</p>
          </FormRow>
          <div className="flex items-center gap-2.5">
            <PrimaryButton type="submit" disabled={isUpdating}>
              Update
            </PrimaryButton>
            <LinkButton type="button">Forgot Password?</LinkButton>
          </div>
        </form>
      </div>
    </>
  );
}
