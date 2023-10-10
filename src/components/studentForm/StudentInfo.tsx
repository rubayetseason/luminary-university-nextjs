"use client";
import { acSemesterOptions, genderOptions } from "@/constants/formOptions";
import FormInput from "../forms/FormInput";
import FormSelectField from "../forms/FromSelect";
import styles from "./formInfo.module.css";
import UploadImage from "../forms/uploadImage";
import AcademicFacultyField from "../forms/AcademicFacultyOptions";
import AcademicDepartmentField from "../forms/AcademicDepartmentOptions";
import AcademicSemesterField from "../forms/AcademicSemesterOptions";

const StudentInfo = () => {
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
            <AcademicSemesterField
              name="student.academicSemester"
              label="Semester"
            ></AcademicSemesterField>
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <AcademicFacultyField
              name="student.academicFaculty"
              label="Academic Faculty"
            ></AcademicFacultyField>
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <AcademicDepartmentField
              name="student.academicDepartment"
              label="Academic Department"
            ></AcademicDepartmentField>
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
            <UploadImage name="file"></UploadImage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
