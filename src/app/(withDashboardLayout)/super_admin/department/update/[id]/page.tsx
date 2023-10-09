"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/BreadCrumb";
import {
  useDepartmentQuery,
  useUpdateDepartmentMutation,
} from "@/redux/api/manageDepartmentApi";
import { getUserInfo } from "@/services/auth.services";
import { Button, message } from "antd";

type IdProps = {
  params: any;
};

const EditDepartmentPage = ({ params }: IdProps) => {
  const { id } = params;

  //get entire department data through useDepartmentQuery hook which takes the id as parameter
  const { data, isLoading } = useDepartmentQuery(id);
  const [updateDepartment] = useUpdateDepartmentMutation();

  const onSubmit = async (values: { title: string }) => {
    message.loading("Updating...");
    try {
      await updateDepartment({ id, body: values });
      message.success("Department updated successfully");
    } catch (err: any) {
      message.error(err.message);
    }
  };

  // @ts-ignore
  const defaultValues = {
    title: data?.title || "",
  };

  const { role } = getUserInfo() as any;

  return (
    <div>
      <BreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: `department`,
            link: `/${role}/department`,
          },
          {
            label: `edit`,
            link: ``,
          },
        ]}
      />
      <h2>Update Department</h2>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div style={{ margin: "10px 0" }}>
          <FormInput name="title" label="Title" />
        </div>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditDepartmentPage;
