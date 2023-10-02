"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { getUserInfo } from "@/services/auth.services";
import styles from "./createAdmin.module.css";
import { Button } from "antd";
import FormSelectField from "@/components/forms/FromSelect";
import {
  bloodGroupOptions,
  departmentOptions,
  genderOptions,
} from "@/constants/formOptions";
import UploadImage from "@/components/forms/uploadImage";
import FormDatePicker from "@/components/forms/DatePicker";

const CreateAdminRoute = () => {
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
            label: `manage admin`,
            link: `/${role}/admin`,
          },
          {
            label: `create admin`,
            link: `/${role}/admin/create-admin`,
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
              Admin Information
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
                  name="admin.name.firstName"
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
                  name="admin.name.middleName"
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
                  name="admin.name.lastName"
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
                  name="admin.gender"
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
                  size="large"
                  name="admin.managementDepartment"
                  options={departmentOptions}
                  label="Department"
                  placeholder="Select department role"
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage></UploadImage>
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
                  name="admin.email"
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
                  name="admin.contactNo"
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
                  name="admin.emergencyContactNo"
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
                  name="admin.dateOfBirth"
                  label="Date of birth"
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
                  name="admin.bloodGroup"
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
                  name="admin.designation"
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
                  name="admin.presentAddress"
                  label="Present address"
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
                  name="admin.permanentAddress"
                  label="Permanent address"
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

export default CreateAdminRoute;
