"use client";
import StepperForm from "@/components/forms/StepperForm";
import BasicInfo from "@/components/studentForm/BasicInfo";
import GuardianInfo from "@/components/studentForm/GuardianInfo";
import LocalGuardianInfo from "@/components/studentForm/LocalGuardianInfo";
import StudentInfo from "@/components/studentForm/StudentInfo";

const CreateStudentRoute = () => {
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

  const handleStudentSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "10px" }}>Create student</h1>
      <StepperForm
        submitHandler={(value) => handleStudentSubmit(value)}
        steps={steps}
      ></StepperForm>
    </div>
  );
};

export default CreateStudentRoute;
