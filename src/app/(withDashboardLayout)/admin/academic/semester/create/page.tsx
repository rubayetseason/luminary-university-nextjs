"use client";

import styles from "./createSemester.module.css";
import Form from "@/components/forms/Form";
import FormSelectField from "@/components/forms/FromSelect";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { Button, message } from "antd";
import { useAddAcademicSemesterMutation } from "@/redux/api/academic/semesterApi";
import { monthOptions } from "@/constants/formOptions";
import FormYearPicker from "@/components/forms/FormYearPicker";

//semester options
const semesterOptions = [
  {
    label: "Autumn",
    value: "Autumn",
  },
  {
    label: "Summer",
    value: "Summer",
  },
  {
    label: "Fall",
    value: "Fall",
  },
];

const CreateSemesterRoute = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit = async (data: any) => {
    if (data?.title == "Autumn") {
      data["code"] = "01";
    } else if (data?.title == "Summer") {
      data["code"] = "02";
    } else data["code"] = "03";

    data.year = parseInt(data.year);

    message.loading("Creating academic semester...");
    try {
      const res = await addAcademicSemester(data);
      if (res) {
        message.success("Academic semester created successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <div>
      <BreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "semester",
            link: "/admin/academic/semester",
          },
        ]}
      />
      <div style={{ marginTop: "10px" }}>
        <Form submitHandler={onSubmit}>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
                textDecoration: "underline",
              }}
            >
              Semester Information
            </p>
            <div className={styles.parentDiv}>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="title"
                  options={semesterOptions}
                  label="Title"
                  placeholder="Select"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="startMonth"
                  options={monthOptions}
                  label="Start Month"
                  placeholder="Select start month"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="endMonth"
                  options={monthOptions}
                  label="End Month"
                  placeholder="Select end month"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                {" "}
                <FormYearPicker name="year" label="Year" picker="year" />
              </div>
            </div>
          </div>
          <Button htmlType="submit" type="primary">
            Create Semester
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateSemesterRoute;
