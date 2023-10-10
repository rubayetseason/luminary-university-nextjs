"use client";

import AcademicSemesterField from "@/components/forms/AcademicSemesterOptions";
import FormDatePicker from "@/components/forms/DatePicker";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useAddSemesterRegistrationsMutation } from "@/redux/api/semesterRegistrationApi";
import { Button, message } from "antd";

const CreateSemesterRegistrationPage = () => {
  const [addSemesterRegistrations] = useAddSemesterRegistrationsMutation();
  const onSubmit = async (data: any) => {
    data.minCredit = parseInt(data?.minCredit);
    data.maxCredit = parseInt(data?.maxCredit);

    message.loading("Creating...");
    try {
      const res = await addSemesterRegistrations(data).unwrap();
      if (res?.id) {
        message.success("Semester registration successfully created");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  const base = "admin";
  return (
    <div>
      <BreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          {
            label: "semester-registration",
            link: `/${base}/semester-registration`,
          },
        ]}
      />
      <h1>Create Semester Registration</h1>
      <Form submitHandler={onSubmit}>
        <div style={{ margin: "10px 0px" }}>
          <FormDatePicker name="startDate" label="Start Date" size="large" />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <FormDatePicker name="endDate" label="End Date" size="large" />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <AcademicSemesterField
            name="academicSemesterId"
            label="Academic Semester"
          ></AcademicSemesterField>
        </div>
        <div style={{ margin: "10px 0px" }}>
          <FormInput name="minCredit" label="Min Credit" type="number" />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <FormInput name="maxCredit" label="Max Credit" type="number" />
        </div>

        <Button type="primary" htmlType="submit" style={{ margin: "10px 0px" }}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateSemesterRegistrationPage;
