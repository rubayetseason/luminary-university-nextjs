import { useFacultiesQuery } from "@/redux/api/facultyApi";
import FormSelectField from "./FromSelect";

type FacultyProps = {
  name: string;
  label?: string;
};

const FacultyOptions = ({ name }: FacultyProps) => {
  const { data, isLoading } = useFacultiesQuery({
    limit: 100,
    page: 1,
  });
  const faculties = data?.faculties;
  const facultiesOptions = faculties?.map((faculty: any) => {
    //ts-ignore
    return {
      label: `${faculty?.firstName} ${faculty?.lastName} ${faculty?.middleName}`,
      value: faculty?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label="Faculty"
      options={facultiesOptions as any}
    />
  );
};

export default FacultyOptions;
