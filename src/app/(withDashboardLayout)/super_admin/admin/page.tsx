"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import { getUserInfo } from "@/services/auth.services";

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
      <h1>this is manage admin route</h1>
    </div>
  );
};

export default ManageAdminRoute;
