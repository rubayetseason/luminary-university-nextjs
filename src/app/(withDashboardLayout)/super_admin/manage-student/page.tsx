"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import { getUserInfo } from "@/services/auth.services";
import { Button } from "antd";
import Link from "next/link";

const ManageStudentsPage = () => {
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
            label: `manage student`,
            link: `/${role}/manage-student`,
          },
        ]}
      />
      <h1 style={{ margin: "10px 0" }}>Create student</h1>
      <Link href="/super_admin/manage-student/create-student">
        <Button type="primary">Create student</Button>
      </Link>
    </div>
  );
};

export default ManageStudentsPage;
