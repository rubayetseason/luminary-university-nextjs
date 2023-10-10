"use client";

import { getUserInfo } from "@/services/auth.services";
import styles from "./createFaculty.module.css";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Form from "@/components/forms/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@/components/forms/FormInput";
import { Button } from "antd";
import FormSelectField from "@/components/forms/FromSelect";
import {
  bloodGroupOptions,
  acDepartmentOptions,
  genderOptions,
} from "@/constants/formOptions";
import FormDatePicker from "@/components/forms/DatePicker";
import UploadImage from "@/components/forms/uploadImage";
import { facultySchema } from "@/schemas/facultySchema";

const CreateFacultyRoute = () => {
  const { role } = getUserInfo() as any;

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
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
            label: `manage faculty`,
            link: `/${role}/manage-faculty`,
          },
          {
            label: `create faculty`,
            link: `/${role}/manage-faculty/create-faculty`,
          },
        ]}
      />
      <div style={{ marginTop: "10px" }}>
        <Form submitHandler={onSubmit} resolver={yupResolver(facultySchema)}>
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
              Faculty Information
            </p>
            <div className={styles.parentDiv}>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                {" "}
                <FormInput
                  type="text"
                  name="faculty.name.firstName"
                  size="large"
                  label="First Name"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                {" "}
                <FormInput
                  type="text"
                  name="faculty.name.middleName"
                  size="large"
                  label="Middle Name"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                {" "}
                <FormInput
                  type="text"
                  name="faculty.name.lastName"
                  size="large"
                  label="Last Name"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                {" "}
                <FormInput
                  type="password"
                  name="password"
                  size="large"
                  label="Password"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="faculty.gender"
                  options={genderOptions}
                  label="Gender"
                  placeholder="Select gender"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  name="faculty.academicFaculty"
                  label="Academic Faculty"
                  options={acDepartmentOptions}
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="file"></UploadImage>
              </div>
            </div>
          </div>
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
              Basic Information
            </p>
            <div className={styles.parentDiv}>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                {" "}
                <FormInput
                  type="email"
                  name="faculty.email"
                  size="large"
                  label="Email Address"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                {" "}
                <FormInput
                  type="text"
                  name="faculty.contactNo"
                  size="large"
                  label="Contact No."
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                {" "}
                <FormInput
                  type="text"
                  name="faculty.emergencyContactNo"
                  size="large"
                  label="Emergency Contact No."
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                {" "}
                <FormDatePicker
                  name="faculty.dateOfBirth"
                  label="Date of Birth"
                  size="large"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="faculty.bloodGroup"
                  options={bloodGroupOptions}
                  label="Blood Group"
                  placeholder="Select"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="faculty.designation"
                  size="large"
                  label="Designation"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="faculty.presentAddress"
                  label="Present Address"
                  size="large"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="faculty.permanentAddress"
                  label="Permanent Address"
                  size="large"
                />
              </div>
            </div>
          </div>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateFacultyRoute;
