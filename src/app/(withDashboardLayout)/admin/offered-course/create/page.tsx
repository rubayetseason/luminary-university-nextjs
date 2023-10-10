"use client";

import AcademicDepartmentField from "@/components/forms/AcademicDepartmentOptions";
import Form from "@/components/forms/Form";
import FormSelectField, { SelectOptions } from "@/components/forms/FromSelect";
import OfferedCoursesField from "@/components/forms/OfferedCoursesField";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useAddOfferedCourseMutation } from "@/redux/api/offeredCourseApi";
import { useSemesterRegistrationsQuery } from "@/redux/api/semesterRegistrationApi";
import { Button, message } from "antd";

const CreateOfferedCoursePage = () => {
  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const { data, isLoading } = useSemesterRegistrationsQuery({
    limit: 10,
    page: 1,
  });

  const semesterRegistrations = data?.semesterRegistrations;
  const semesterRegistrationsOptions = semesterRegistrations?.map(
    (semester: any) => {
      return {
        label: semester?.academicSemester?.title,
        value: semester?.id,
      };
    }
  );

  const onSubmit = async (data: any) => {
    message.loading("Creating...");
    try {
      const res = await addOfferedCourse(data).unwrap();
      if (res) {
        message.success("Offered course created successfully");
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
          { label: "offered-course", link: `/${base}/offered-course` },
        ]}
      />
      <h1>Create Course</h1>
      <Form submitHandler={onSubmit}>
        <div style={{ margin: "10px 0px" }}>
          <FormSelectField
            options={semesterRegistrationsOptions as SelectOptions[]}
            name="semesterRegistrationId"
            label="Semester registration"
          />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <AcademicDepartmentField
            name="academicDepartmentId"
            label="Academic department"
          ></AcademicDepartmentField>
        </div>
        <div style={{ margin: "10px 0px" }}>
          <OfferedCoursesField name="courseIds" label="Courses" />
        </div>

        <Button type="primary" htmlType="submit" style={{ margin: "10px 0px" }}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateOfferedCoursePage;
