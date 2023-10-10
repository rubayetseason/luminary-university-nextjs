"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useAddDepartmentMutation } from "@/redux/api/manageDepartmentApi";
import { getUserInfo } from "@/services/auth.services";
import { Button, message } from "antd";

const CreateDepartmentPage = () => {
  const { role } = getUserInfo() as any;

  //rtkQuery work
  const [addDepartment] = useAddDepartmentMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating department...");
    try {
      console.log(data);
      await addDepartment(data);
      message.success("Department created successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  return (
    <div>
      <BreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: `department`,
            link: `/${role}/department`,
          },
          {
            label: `create department`,
            link: `/${role}/department/create-department`,
          },
        ]}
      />
      <h1>Create Department</h1>
      <Form submitHandler={onSubmit}>
        <div style={{ margin: "10px 0" }}>
          <FormInput name="title" label="Department Title" />
        </div>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateDepartmentPage;
