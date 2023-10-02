import StepperForm from "@/components/forms/StepperForm";
import StudentInfo from "@/components/studentForm/StudentInfo";

const CreateStudentRoute = () => {
  const steps = [
    {
      title: "Student Information",
      content: <StudentInfo />,
    },
    {
      title: "Basic Information",
      content: "Second-content",
    },
    {
      title: "Guardian Information",
      content: "Last-content",
    },
    {
      title: "Local Guardian Information",
      content: "Last-content",
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "10px" }}>Create student</h1>
      <StepperForm steps={steps}></StepperForm>
    </div>
  );
};

export default CreateStudentRoute;
