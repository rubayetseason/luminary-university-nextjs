"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import ReusableTable from "@/components/ui/ReusableTable";
import {
  useDeleteDepartmentMutation,
  useDepartmentsQuery,
} from "@/redux/api/manageDepartmentApi";
import { getUserInfo } from "@/services/auth.services";
import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useDebounced } from "@/hooks/hooks";

const ManageDepartmentRoute = () => {
  const { role } = getUserInfo() as any;
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting...");
      await deleteDepartment(id);
      message.success("Department deleted successfully");
    } catch (err: any) {
      message.error(err.message);
    }
  };

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

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 1000,
  });

  if (debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useDepartmentsQuery({ ...query });

  const departments = data?.departments;
  const meta = data?.meta;

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
  ];

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
      <Link href="/admin/department/create-department">
        <Button type="primary">Create department</Button>
      </Link>
      <div style={{ margin: "10px 0px" }}>
        {/* search field */}
        <Input
          type="text"
          size="middle"
          placeholder="Search..."
          style={{ width: "60%" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>

        {(sortBy || sortOrder || searchTerm) && (
          <Button onClick={resetFilters} danger style={{ margin: "0px 5px" }}>
            <ReloadOutlined />
          </Button>
        )}
      </div>
      {/* department table */}
      <div>
        <ReusableTable
          loading={isLoading}
          columns={columns}
          dataSource={departments}
          pageSize={size}
          totalPages={meta?.total}
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
