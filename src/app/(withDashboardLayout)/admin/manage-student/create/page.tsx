"use client";

import StepperForm from "@/components/forms/StepperForm";
import BasicInfo from "@/components/studentForm/BasicInfo";
import GuardianInfo from "@/components/studentForm/GuardianInfo";
import LocalGuardianInfo from "@/components/studentForm/LocalGuardianInfo";
import StudentInfo from "@/components/studentForm/StudentInfo";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useAddStudentWithFormDataMutation } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.services";
import { message } from "antd";

const CreateStudentRoute = () => {
  const { role } = getUserInfo() as any;

  const steps = [
    {
      title: "Student Information",
      content: <StudentInfo />,
    },
    {
      title: "Basic Information",
      content: <BasicInfo />,
    },
    {
      title: "Guardian Information",
      content: <GuardianInfo />,
    },
    {
      title: "Local Guardian Information",
      content: <LocalGuardianInfo />,
    },
  ];

  const [addStudentWithFormData] = useAddStudentWithFormDataMutation();

  const handleStudentSubmit = async (values: any) => {
    const obj = { ...values };

    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating...");
    try {
      const res = await addStudentWithFormData(formData);
      console.log(res);

      if (!!res) {
        message.success("Student created successfully");
      }
    } catch (err: any) {
      console.error(err.message);
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
            label: `manage student`,
            link: `/${role}/manage-student`,
          },
        ]}
      />
      <h1 style={{ margin: "10px 0px" }}>Create student</h1>
      <StepperForm
        persistKey="student-create-form"
        submitHandler={(value) => handleStudentSubmit(value)}
        steps={steps}
      ></StepperForm>
    </div>
  );
};

export default CreateStudentRoute;
