"use client";
import banner from "../assets/Computer login-bro.png";
import Image from "next/image";
import Form from "@/components/forms/Form";
import styles from "./page.module.css";
import FormInput from "@/components/forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { Button } from "antd";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { getUserInfo, storeUserInfo } from "@/services/auth.services";

type FormValues = {
  id: string;
  password: string;
};

export default function Home() {
  console.log(getUserInfo());

  const [userLogin] = useUserLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      storeUserInfo({ accessToken: res?.data?.accessToken });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.child}>
        <div className={styles.imgDiv}>
          <Image className={styles.image} src={banner} alt="login_image" />
        </div>
      </div>
      <div className={styles.child}>
        <h1 className={styles.uniName}>Welcome to Luminary University</h1>
        <h2 className={styles.title}>Login to your account</h2>
        <Form submitHandler={onSubmit}>
          <div className={styles.formField}>
            <FormInput
              name="id"
              type="text"
              size="large"
              label="User ID"
              placeholder="Enter your ID here"
            />
          </div>
          <div
            className={styles.formField}
            style={{
              margin: "15px 0px",
            }}
          >
            <FormInput
              name="password"
              type="password"
              size="large"
              label="User password"
              placeholder="Enter your password here"
            />
          </div>
          <div className={styles.btn}>
            <Button type="primary" size="large" htmlType="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
