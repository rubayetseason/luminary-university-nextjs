"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import { getUserInfo } from "@/services/auth.services";
import { Button } from "antd";
import Link from "next/link";

const ManageDepartmentRoute = () => {
  const { role } = getUserInfo() as any;
  return (
    <div>
      <BreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: `department`,
            link: `/${role}/department`,
          },
        ]}
      />
      <h1 style={{ margin: "10px 0" }}>Create department</h1>
      <Link href="/super_admin/department/create-department">
        <Button type="primary">Create admin</Button>
      </Link>
    </div>
  );
};

export default ManageDepartmentRoute;
