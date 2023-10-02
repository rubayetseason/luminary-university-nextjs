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
          Student Information
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
              name="student.name.firstName"
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
              name="student.name.middleName"
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
              name="student.name.lastName"
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
              name="student.academicSemester"
              options={acSemesterOptions}
              label="Semester"
              placeholder="Select semester"
            />
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <FormSelectField
              size="large"
              name="student.academicFaculty"
              options={facultyOptions}
              label="Faculty"
              placeholder="Select faculty"
            />
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <FormSelectField
              size="large"
              name="student.academicDepartment"
              options={acDepartmentOptions}
              label="Department"
              placeholder="Select academic department"
            />
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <FormSelectField
              size="large"
              name="student.gender"
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
            <UploadImage></UploadImage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalGuardianInfo;
