"use client";

import { ReactElement, ReactNode } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

//type for default values
type FormConfig = {
  defaultValues?: Record<string, any>;
};

//type for formProps
type FormProps = {
  children?: ReactElement | ReactNode;
  submitHandler: SubmitHandler<any>;
} & FormConfig;

const Form = ({ children, submitHandler, defaultValues }: FormProps) => {
  const formConfig: FormConfig = {};

  //if defaultValues is found, then add it to the formConfig object
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  //add the formConfig to useForm
  //useForm gives (handleSubmit, reset) many props, taken in variable called methods
  const methods = useForm<FormProps>(formConfig);

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: any) => {
    submitHandler(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
