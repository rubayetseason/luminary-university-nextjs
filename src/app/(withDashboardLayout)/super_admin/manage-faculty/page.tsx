"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import { getUserInfo } from "@/services/auth.services";

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
      <h1>this is manage faculty route</h1>
    </div>
  );
};

export default ManageFacultyRoute;
