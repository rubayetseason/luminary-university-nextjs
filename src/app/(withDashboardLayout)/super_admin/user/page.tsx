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
      <h1>this is manage user route</h1>
    </div>
  );
};

export default ManageUserRoute;
