"use client";
import BreadCrumb from "@/components/ui/BreadCrumb";
import ReusableTable from "@/components/ui/ReusableTable";
import { useDebounced } from "@/hooks/hooks";
import {
  useDeleteOfferedCourseMutation,
  useOfferedCoursesQuery,
} from "@/redux/api/offeredCourseApi";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const OfferedCoursePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteOfferedCourse] = useDeleteOfferedCourseMutation();

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
  const { data, isLoading } = useOfferedCoursesQuery({ ...query });

  const offeredCourses = data?.offeredCourses;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting...");
    try {
      const res = await deleteOfferedCourse(id);
      if (res) {
        message.success("Offered course deleted successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Course",
      dataIndex: "course",
      render: function (data: any) {
        return <>{data?.title}</>;
      },
    },
    {
      title: "Academic department",
      dataIndex: "academicDepartment",
      render: function (data: any) {
        return <>{data?.title}</>;
      },
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

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

  return (
    <div>
      <BreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "offered-course",
            link: "/admin/offered-course",
          },
        ]}
      />

      <h1 style={{ margin: "10px 0" }}>Offered course list</h1>
      <Link href="/admin/offered-course/create">
        <Button type="primary">Create offered course</Button>
      </Link>

      <ReusableTable
        loading={isLoading}
        columns={columns}
        dataSource={offeredCourses}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default OfferedCoursePage;
