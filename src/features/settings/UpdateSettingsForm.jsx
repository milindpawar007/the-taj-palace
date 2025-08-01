import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSetting } from './useSetting';
import Spinner from '../../ui/Spinner'

function UpdateSettingsForm() {
  const { isLoading, settings: { minBookingLength, maxBookingLength, maxGuestPerBooking, breakfastPrice } = {} } = useSetting();

  if (isLoading) return <Spinner />
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' defaultValue={minBookingLength} id='min-nights' />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' defaultValue={maxBookingLength} id='max-nights' />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' defaultValue={maxGuestPerBooking} id='max-guests' />
      </FormRow>
      <FormRow label='Breakfast price'>

        <Input type='number' defaultValue={breakfastPrice} id='breakfast-price' />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
