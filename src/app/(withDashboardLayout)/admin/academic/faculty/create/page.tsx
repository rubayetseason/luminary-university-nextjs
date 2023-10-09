"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useAddAcademicFacultyMutation } from "@/redux/api/academic/facultyApi";
import { getUserInfo } from "@/services/auth.services";
import { Button, message } from "antd";

const CreateFacultyPage = () => {
  const { role } = getUserInfo() as any;

  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating faculty...");
    try {
      console.log(data);
      const res = await addAcademicFaculty(data);
      if (res) {
        message.success("Academic faculty created successfully");
      }
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
            label: "admin",
            link: "/admin",
          },
          {
            label: "faculties",
            link: "/admin/academic/faculty",
          },
          {
            label: "create",
            link: "/admin/academic/faculty/create",
          },
        ]}
      />
      <h1>Create Faculty</h1>
      <Form submitHandler={onSubmit}>
        <div style={{ margin: "10px 0" }}>
          <FormInput name="title" label="Faculty Title" />
        </div>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateFacultyPage;
