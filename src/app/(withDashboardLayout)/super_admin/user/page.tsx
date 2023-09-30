"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import { getUserInfo } from "@/services/auth.services";

const ManageUserRoute = () => {
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
            label: `manage user`,
            link: `/${role}/user`,
          },
        ]}
      />
      <h1>Manage user list</h1>
    </div>
  );
};

export default ManageUserRoute;
