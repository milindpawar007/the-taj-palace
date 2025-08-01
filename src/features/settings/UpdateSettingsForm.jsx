import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSetting } from './useSetting';
import Spinner from '../../ui/Spinner'
import useEditSetting from './useEditSetting';

function UpdateSettingsForm() {
  const { isLoading, settings: { minBookingLength, maxBookingLength, maxGuestPerBooking, breakfastPrice } = {} } = useSetting();
  const { editSetting, isEditing } = useEditSetting();
  const handelEdit = (e, field) => {
    const { value } = e.target;
    if (!value) return;

    editSetting({ [field]: value })
  }
  if (isLoading) return <Spinner />
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' defaultValue={minBookingLength} id='min-nights' disabled={isEditing} onBlur={(e) => { handelEdit(e, "minBookingLength") }} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' defaultValue={maxBookingLength} id='max-nights' disabled={isEditing} onBlur={(e) => { handelEdit(e, "maxBookingLength") }} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' defaultValue={maxGuestPerBooking} id='max-guests' disabled={isEditing} onBlur={(e) => { handelEdit(e, "maxGuestPerBooking") }} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' defaultValue={breakfastPrice} id='breakfast-price' disabled={isEditing} onBlur={(e) => { handelEdit(e, "breakfastPrice") }} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
