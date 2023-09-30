"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import { getUserInfo } from "@/services/auth.services";

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
      <h1>this is manage department route</h1>
    </div>
  );
};

export default ManageDepartmentRoute;
