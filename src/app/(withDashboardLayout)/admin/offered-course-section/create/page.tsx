"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormSelectField, { SelectOptions } from "@/components/forms/FromSelect";
import SemesterRegistrationField from "@/components/forms/SemesterRegistrationField";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useAddOfferedCourseSectionMutation } from "@/redux/api/courseSectionApi";
import { useOfferedCoursesQuery } from "@/redux/api/offeredCourseApi";
import { Button, message } from "antd";
import { useState } from "react";
import styles from "./createSection.module.css";
import FormDynamicFields from "@/components/forms/FormDynamicFields";
import AcademicDepartmentIDOptions from "@/components/forms/AcademicDepartmentIDOptions";

const CreateOfferedCourseSectionPage = () => {
  const [addOfferedCourseSection] = useAddOfferedCourseSectionMutation();

  const [acDepartmentId, setAcDepartmentId] = useState<string>();
  const [semesterRegistrationId, setSemesterRegistrationId] =
    useState<string>();

  const query: Record<string, any> = {};

  if (!!acDepartmentId) {
    query["academicDepartmentId"] = acDepartmentId;
  }
  if (!!semesterRegistrationId) {
    query["semesterRegistrationId"] = semesterRegistrationId;
  }
  const { data, isLoading } = useOfferedCoursesQuery({
    limit: 10,
    page: 1,
    ...query,
  });

  const offeredCourses = data?.offeredCourses;
  const offeredCoursesOptions = offeredCourses?.map((offCourse) => {
    // console.log(offCourse?.course?.id);
    return {
      label: offCourse?.course?.title,
      value: offCourse?.id,
    };
  });

  const onSubmit = async (data: any) => {
    data.maxCapacity = parseInt(data?.maxCapacity);
    console.log(data);
    message.loading("Creating...");
    try {
      const res = await addOfferedCourseSection(data).unwrap();
      if (res?.id) {
        message.success("Offered Course created successfully");
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
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "course-sections",
            link: "/admin/offered-course-section",
          },
        ]}
      />
      <h1>Create Course Section</h1>

      <Form submitHandler={onSubmit}>
        <div className={styles.parentDiv}>
          <div>
            <div style={{ margin: "10px 0px" }}>
              <SemesterRegistrationField
                name="semesterRegistration"
                label="Semester Registration"
                onChange={(el) => setSemesterRegistrationId(el)}
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <AcademicDepartmentIDOptions
                name="academicDepartment"
                label="Academic Department"
                onChange={(el) => setAcDepartmentId(el)}
              ></AcademicDepartmentIDOptions>
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                options={offeredCoursesOptions as SelectOptions[]}
                name="offeredCourseId"
                label="Offered Course"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput label="Section" name="title" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput label="Max Capacity" name="maxCapacity" />
            </div>
          </div>
          <div>
            <div>
              <h3 style={{ textAlign: "center", paddingBottom: "10px" }}>
                Choose class schedule
              </h3>
            </div>
            <div>
              {" "}
              <FormDynamicFields />
            </div>
          </div>
        </div>

        <Button type="primary" htmlType="submit" style={{ margin: "10px 0px" }}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateOfferedCourseSectionPage;
