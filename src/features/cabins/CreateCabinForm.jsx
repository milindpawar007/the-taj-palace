import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import FormRow from "../../ui/FormRow";



function CreateCabinForm() {

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('New Cabin added successfully!');
      reset();
    },
    onError: (err) => toast.error(`Failed to add the cabin: ${err.message}`)
  });


  const onSubmit = (data) => {
    mutate(data)
  }
  const onError = (error) => {
    //console.log(error)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>

        <Input
          type='text'
          id='name'
          disabled={isPending}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>



      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isPending}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isPending}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isPending}

          {...register('discount', {
            required: "Can't be empty, make it at least 0",
            validate: (value) =>
              getValues().regularPrice >= value ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        disabled={isPending}
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isPending}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'


        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>

        <Button disabled={isPending}>{isPending ? "Adding..." : "Add Cabin"}</Button>

      </FormRow>
    </Form >
  );
}

export default CreateCabinForm;
