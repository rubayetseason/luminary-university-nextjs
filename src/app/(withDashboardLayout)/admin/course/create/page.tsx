"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useAddCourseMutation, useCoursesQuery } from "@/redux/api/courseApi";
import { Button, message } from "antd";

const CreateCoursePage = () => {
  const [addCourse] = useAddCourseMutation();

  const { data, isLoading } = useCoursesQuery({ limit: 10, page: 1 });

  const courses = data?.courses;
  //   const coursesOptions = courses?.map((course) => {
  //     return {
  //       label: course?.title,
  //       value: course?.id,
  //     };
  //   });

  const onSubmit = async (data: any) => {
    data.credits = parseInt(data?.credits);

    // const coursePreRequisitesOptions = data?.coursePreRequisites?.map(
    //   (id: string) => {
    //     return {
    //       courseId: id,
    //     };
    //   }
    // );

    // data.coursePreRequisites = coursePreRequisitesOptions;

    message.loading("Creating...");
    try {
      const res = await addCourse(data).unwrap();
      if (res?.id) {
        message.success("Course created successfully");
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
          { label: "course", link: `/${base}/course` },
        ]}
      />
      <h1>Create Course</h1>
      <Form submitHandler={onSubmit}>
        <div style={{ margin: "10px 0px" }}>
          <FormInput name="title" label="Course title" />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <FormInput name="code" label="Course code" />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <FormInput name="credits" label="Course credits" />
        </div>

        <Button type="primary" htmlType="submit" style={{ margin: "10px 0px" }}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateCoursePage;
