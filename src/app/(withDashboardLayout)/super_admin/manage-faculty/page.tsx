"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import { getUserInfo } from "@/services/auth.services";
import { Button } from "antd";
import Link from "next/link";

const ManageFacultyRoute = () => {
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
            label: `manage faculty`,
            link: `/${role}/manage-faculty`,
          },
        ]}
      />
      <h1 style={{ margin: "10px 0" }}>Create faculty</h1>
      <Link href="/super_admin/manage-faculty/create-faculty">
        <Button type="primary">Create faculty</Button>
      </Link>
    </div>
  );
};

export default ManageFacultyRoute;
