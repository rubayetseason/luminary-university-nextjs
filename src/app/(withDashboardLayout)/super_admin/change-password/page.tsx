"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { getUserInfo } from "@/services/auth.services";
import { Button } from "antd";

const ChangePasswordRoute = () => {
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
            label: `change password`,
            link: `/${role}/change-password`,
          },
        ]}
      />
      <div
        style={{ margin: "100px 0", display: "flex", justifyContent: "center" }}
      >
        <Form submitHandler={onSubmit}>
          <h2 style={{ marginBottom: "10px" }}>Reset Password</h2>
          <div style={{ margin: "5px 0" }}>
            <FormInput
              name="oldPassword"
              label="Old password"
              type="password"
            />
          </div>
          <div style={{ margin: "5px 0" }}>
            <FormInput
              name="newPassword"
              label="New password"
              type="password"
            />
          </div>
          <Button type="primary" htmlType="submit">
            Change password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordRoute;
