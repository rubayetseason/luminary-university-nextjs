"use client";

import { ReactElement, ReactNode, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

//type for default values
type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

//type for formProps
type FormProps = {
  children?: ReactElement | ReactNode;
  submitHandler: SubmitHandler<any>;
} & FormConfig;

const Form = ({
  children,
  submitHandler,
  defaultValues,
  resolver,
}: FormProps) => {
  const formConfig: FormConfig = {};

  //if defaultValues is found, then add it to the formConfig object
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  //if resolver is found, then add it to the formConfig object
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  //add the formConfig to useForm
  //useForm gives (handleSubmit, reset) many props, taken in variable called methods
  const methods = useForm<FormProps>(formConfig);

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: any) => {
    submitHandler(data);
    reset();
  };

  useEffect(() => reset(defaultValues), [reset, defaultValues, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
