import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";
import FormSelectField, { SelectOptions } from "./FromSelect";

type AcademicDepartmentFieldProps = {
  name: string;
  label?: string;
};

const AcademicDepartmentField = ({
  name,
  label,
}: AcademicDepartmentFieldProps) => {
  const { data, isLoading } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });
  const academicDepartments = data?.academicDepartments;
  const acDepartmentOptions = academicDepartments?.map((acDepartment: any) => {
    console.log(acDepartment?.id);
    return {
      label: acDepartment?.title,
      value: acDepartment?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acDepartmentOptions as SelectOptions[]}
    />
  );
};

export default AcademicDepartmentField;
