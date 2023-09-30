"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import { getUserInfo } from "@/services/auth.services";
import { Button } from "antd";
import Link from "next/link";

const ManageAdminRoute = () => {
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
            label: `manage admin`,
            link: `/${role}/admin`,
          },
        ]}
      />
      <h1 style={{ margin: "10px 0" }}>Create admin</h1>
      <Link href="/super_admin/admin/create-admin">
        <Button type="primary">Create admin</Button>
      </Link>
    </div>
  );
};

export default ManageAdminRoute;
