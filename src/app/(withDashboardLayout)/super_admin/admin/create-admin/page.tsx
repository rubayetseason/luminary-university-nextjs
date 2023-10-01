"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { getUserInfo } from "@/services/auth.services";
import styles from "./createAdmin.module.css";

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
              border: "1px solid #d9d9d9",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
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
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateAdminRoute;
