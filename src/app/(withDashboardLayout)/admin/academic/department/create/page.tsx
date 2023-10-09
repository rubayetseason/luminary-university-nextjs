"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormSelectField, { SelectOptions } from "@/components/forms/FromSelect";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useAddAcademicDepartmentMutation } from "@/redux/api/academic/departmentApi";
import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";
import { Button, message } from "antd";

const CreateAcademicDepartmentPage = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const { data } = useAcademicFacultiesQuery({
    limit: 100,
    page: 1,
  });
  const academicFaculties = data?.academicFaculties;
  const acFacultiesOptions = academicFaculties?.map((faculty) => {
    return {
      label: faculty?.title,
      value: faculty?.id,
    };
  });

  const onSubmit = async (data: any) => {
    message.loading("Creating...");
    try {
      const res = await addAcademicDepartment(data);
      if (!!res) {
        message.success("Academic department created successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const base = "admin";

  return (
    <div>
      <BreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "department", link: `/${base}/academic/department` },
        ]}
      />
      <h1 style={{ margin: "10px 0px" }}>Create Academic Department</h1>
      <Form submitHandler={onSubmit}>
        <div style={{ margin: "10px 0px" }}>
          <FormInput name="title" label="Department Name" />
        </div>
        <div>
          <FormSelectField
            size="large"
            name="academicFacultyId"
            options={acFacultiesOptions as SelectOptions[]}
            label="Academic Faculty"
            placeholder="Select"
          />
        </div>

        <Button type="primary" htmlType="submit" style={{ margin: "10px 0px" }}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateAcademicDepartmentPage;
