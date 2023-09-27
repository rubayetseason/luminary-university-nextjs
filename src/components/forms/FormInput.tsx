"use client";
import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";

//an interface for input field of properties it can have
interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
}

const FormInput = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
}: IInput) => {
  const { control } = useFormContext();

  return (
    <>
      <p style={{marginBottom: '4px'}}>{label ? label : null}</p>
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Input
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          )
        }
      />
    </>
  );
};

export default FormInput;
