"use client";
import {
  acDepartmentOptions,
  acSemesterOptions,
  facultyOptions,
  genderOptions,
} from "@/constants/formOptions";
import FormInput from "../forms/FormInput";
import FormSelectField from "../forms/FromSelect";
import styles from "./formInfo.module.css";
import UploadImage from "../forms/uploadImage";

const LocalGuardianInfo = () => {
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
          Local Guardian Information
        </p>
        <div className={styles.parentDiv}>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            {" "}
            <FormInput
              name="student.localGuardian.name"
              label="Local Guardian Name"
            />
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            {" "}
            <FormInput
              name="student.localGuardian.occupation"
              label="Local Guardian's Occupation"
            />
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            {" "}
            <FormInput
              name="student.localGuardian.contactNo"
              label="Local Guardian Contact No."
            />
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            {" "}
            <FormInput
              name="student.localGuardian.address"
              label="Local Guardian Address"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalGuardianInfo;
