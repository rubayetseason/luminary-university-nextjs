"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import { getUserInfo } from "@/services/auth.services";

const ChangePasswordRoute = () => {
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
            label: `change password`,
            link: `/${role}/change-password`,
          },
        ]}
      />
      <h1>this is change password</h1>
    </div>
  );
};

export default ChangePasswordRoute;
