"use client";

import AcademicSemesterField from "@/components/forms/AcademicSemesterOptions";
import FormDatePicker from "@/components/forms/DatePicker";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FromSelect";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { semesterRegistrationStatus } from "@/constants/formOptions";
import {
  useSemesterRegistrationQuery,
  useUpdateSemesterRegistrationsMutation,
} from "@/redux/api/semesterRegistrationApi";
import { Button, message } from "antd";
import dayjs from "dayjs";

const EditSemesterRegistration = ({ params }: { params: any }) => {
  const { id } = params;

  const { data, isLoading } = useSemesterRegistrationQuery(id);

  const [updateSemesterRegistration] = useUpdateSemesterRegistrationsMutation();

  const updateOnSubmit = async (values: any) => {
    const tempObject = { ...values };
    tempObject["startDate"] = dayjs(tempObject["startDate"]).toISOString();
    tempObject["endDate"] = dayjs(tempObject["endDate"]).toISOString();
    tempObject["minCredit"] = Number(tempObject["minCredit"]);
    tempObject["maxCredit"] = Number(tempObject["maxCredit"]);
    message.loading("Updating...");
    try {
      const res = await updateSemesterRegistration({
        id,
        body: tempObject,
      }).unwrap();
      if (res?.id) {
        message.success("Updated semester registration successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const statusOptions = semesterRegistrationStatus
    ?.map((status) => {
      return {
        label: status,
        value: status,
        disabled: false,
      };
    })
    .map((el) => {
      if (data?.status === "UPCOMING") {
        if (el.value === "ENDED") {
          el.disabled = true;
        }
      } else if (data?.status === "ONGOING") {
        if (el.value === "UPCOMING") {
          el.disabled = true;
        }
      } else if (data?.status === "ENDED") {
        if (el.value === "UPCOMING" || el.value === "ONGOING") {
          el.disabled = true;
        }
      }
      return el;
    });

  const defaultValues = {
    startDate: data?.startDate || "",
    endDate: data?.endDate || "",
    academicSemesterId: data?.academicSemester?.id || "",
    minCredit: data?.minCredit || "",
    maxCredit: data?.maxCredit || "",
    status: data?.status || "",
  };

  return (
    <>
      <BreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "semester-registration",
            link: "/admin/semester-registration",
          },
        ]}
      />

      <h1 style={{ margin: "10px 0" }}>Update semester registration</h1>

      <Form submitHandler={updateOnSubmit} defaultValues={defaultValues}>
        <div style={{ margin: "10px 0px" }}>
          <FormDatePicker name="startDate" label="start date" />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <FormDatePicker name="endDate" label="end date" />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <AcademicSemesterField
            name="academicSemesterId"
            label="Academic semester"
          />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <FormInput type="number" name="minCredit" label="min credit" />
        </div>

        <div style={{ margin: "10px 0px" }}>
          <FormInput type="number" name="maxCredit" label="max credit" />
        </div>

        <div style={{ margin: "10px 0px" }}>
          <FormSelectField
            options={statusOptions}
            name="status"
            label="status"
          />
        </div>

        <Button htmlType="submit">Update</Button>
      </Form>
    </>
  );
};

export default EditSemesterRegistration;
