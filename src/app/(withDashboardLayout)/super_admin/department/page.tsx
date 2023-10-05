"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import ReusableTable from "@/components/ui/ReusableTable";
import { useDepartmentsQuery } from "@/redux/api/manageDepartmentApi";
import { getUserInfo } from "@/services/auth.services";
import { Button } from "antd";
import Link from "next/link";
import { useState } from "react";

const ManageDepartmentRoute = () => {
  const { role } = getUserInfo() as any;

  //data fetch
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useDepartmentsQuery({ ...query });
  const { departments, meta } = data;

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
      <h1 style={{ margin: "10px 0" }}>Department list</h1>
      <Link href="/super_admin/department/create-department">
        <Button type="primary">Create department</Button>
      </Link>
      {/* department table */}
      <div>
        <ReusableTable
          loading={isLoading}
          columns={columns}
          dataSource={tableData}
          pageSize={5}
          totalPages={10}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
          scroll={{ x: 400 }}
        ></ReusableTable>
      </div>
    </div>
  );
};

export default ManageDepartmentRoute;
