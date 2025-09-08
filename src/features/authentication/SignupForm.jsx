import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isloading } = useSignup();

  function onSubmit({ fullName, email, password }) {

    signup(
      { fullName, email, password },
      { onSettled: reset })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" disabled={isloading} {...register("fullName", { required: "this is field is required " })} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" disabled={isloading} {...register("email", { required: "this is field is required ", pattern: { value: /\S+@\S+\.\S+/, message: "Please Provide The Valid Email address" } })} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" disabled={isloading} {...register("password", { required: "this is field is required ", minLength: { value: 8, message: ' Passowrd need to minimum of 8 char' } })} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" disabled={isloading} {...register("passwordConfirm", { required: "this is field is required ", validate: (value) => value === getValues().password || " Password need to match" })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isloading}>
          Cancel
        </Button>
        <Button disabled={isloading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
