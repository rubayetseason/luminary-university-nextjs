"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useAddBuildingMutation } from "@/redux/api/buildingApi";
import { getUserInfo } from "@/services/auth.services";
import { Button, message } from "antd";

const CreateBuildingPage = () => {
  const { role } = getUserInfo() as any;

  const [addBuilding] = useAddBuildingMutation();
  const onSubmit = async (data: any) => {
    message.loading("Creating...");
    try {
      const res = await addBuilding(data).unwrap();
      if (res?.id) {
        message.success("Building created successfully");
      }
    } catch (err: any) {
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
            label: `building`,
            link: `/${role}/building`,
          },
        ]}
      />
      <h1>Create Building</h1>
      <Form submitHandler={onSubmit}>
        <div style={{ margin: "10px 0" }}>
          <FormInput name="title" label="Building Title" />
        </div>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateBuildingPage;
