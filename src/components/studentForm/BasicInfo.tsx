"use client";
import {
  acDepartmentOptions,
  acSemesterOptions,
  bloodGroupOptions,
  facultyOptions,
  genderOptions,
} from "@/constants/formOptions";
import FormInput from "../forms/FormInput";
import FormSelectField from "../forms/FromSelect";
import styles from "./formInfo.module.css";
import UploadImage from "../forms/uploadImage";
import FormDatePicker from "../forms/DatePicker";

const BasicInfo = () => {
  return (
    <div>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            marginTop: "12px",
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
              name="student.email"
              label="Email Address"
              size="large"
            />
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            {" "}
            <FormInput
              name="student.contactNo"
              label="Contact No."
              size="large"
            />
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            {" "}
            <FormInput
              name="student.emergencyContactNo"
              label="Emergency Contact No."
              size="large"
            />
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            {" "}
            <FormDatePicker
              name="student.dateOfBirth"
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
              name="student.bloodGroup"
              label="Blood Group"
              options={bloodGroupOptions}
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
              name="student.presentAddress"
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
              name="student.permanentAddress"
              label="Permanent address"
              size="large"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
