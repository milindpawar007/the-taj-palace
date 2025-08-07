import styled from "styled-components";
import PropTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import FormRow from "../../ui/FormRow";
import useCreateCabin from "../../hooks/useCreateCabin";
import useEditCabin from "../../hooks/useEditCabins";
import { useEffect } from "react";



function CreateCabinForm({ cabinToedit = {}, onCloseModal }) {

  const { id: editID, ...editValues } = cabinToedit;

  const isEditSession = Boolean(editID)

  const { register, handleSubmit, reset, getValues, formState } = useForm()
  const { errors } = formState;



  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();


  const isWorking = isCreating || isEditing

  const onSubmit = (data) => {

    const image =
      typeof data.image === "string"
        ? data.image
        : data.image && data.image.length > 0
          ? data.image[0]
          : null;
    if (!image) {
      toast.error("Please upload a cabin image.");
      return;
    }
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editID },
        {
          onSuccess: () => {
            reset(); // ✅ Works here
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset(); // ✅ Also works here
            onCloseModal?.();
          },
        }
      );
    }

  }
  const onError = (error) => {
    //console.log(error)
  }

  useEffect(() => {
    if (editID) {
      reset(cabinToedit); // use full object directly
    } else {
      reset();
    }
  }, [editID]);


  return (
    <Form key={isEditSession ? editID : 'new'} onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label='Cabin name' error={errors?.name?.message}>

        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>



      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}

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
        disabled={isWorking}
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isWorking}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'

          {...register('image', { required: isEditSession ? false : 'This field is required' })}

        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="button" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>

        <Button disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Create New Cabin"}</Button>

      </FormRow>
    </Form >
  );
}

CreateCabinForm.propTypes = {
  cabinToedit: PropTypes.object,
  onCloseModal: PropTypes.func
};

export default CreateCabinForm;
