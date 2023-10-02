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

const GuardianInfo = () => {
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
          Guardian Information
        </p>
        <div className={styles.parentDiv}>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            {" "}
            <FormInput
              name="student.guardian.fatherName"
              label="Father Name"
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
              name="student.guardian.fatherOccupation"
              label="Father's Occupation"
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
              name="student.guardian.fatherContactNo"
              label="Father Contact No."
              size="large"
            />
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput
              name="student.guardian.motherName"
              label="Mother Name"
              size="large"
            />
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput
              name="student.guardian.motherOccupation"
              label="Mother's Occupation"
              size="large"
            />
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput
              name="student.guardian.motherContactNo"
              label="Mother Contact No."
              size="large"
            />
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput
              name="student.guardian.address"
              label="Address"
              size="large"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianInfo;
