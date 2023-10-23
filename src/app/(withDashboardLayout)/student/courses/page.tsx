"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import ReusableTable from "@/components/ui/ReusableTable";
import { useMyCoursesQuery } from "@/redux/api/studentApi";
import { Button, Input } from "antd";

import { useState } from "react";

const StudentCoursesPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useMyCoursesQuery({ ...query });

  const myCourses = data?.myCourses;
  const meta = data?.meta;

  const columns = [
    {
      title: "Course name",
      dataIndex: "course",
      render: function (data: any) {
        return <>{data?.title}</>;
      },
    },
    {
      title: "Code",
      dataIndex: "course",
      render: function (data: any) {
        return <>{data?.code}</>;
      },
    },
    {
      title: "Credit",
      dataIndex: "course",
      render: function (data: any) {
        return <>{data?.credits}</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      render: function (data: string) {
        return <>{!data ? <>-</> : data}</>;
      },
    },
    {
      title: "Points",
      dataIndex: "point",
    },
    {
      title: "Total marks",
      dataIndex: "totalMarks",
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

  return (
    <div>
      <BreadCrumb
        items={[
          {
            label: "student",
            link: "/student",
          },
          {
            label: "courses",
            link: "/student/courses",
          },
        ]}
      />
      <h1 style={{ margin: "10px 0" }}>My Courses</h1>

      <ReusableTable
        loading={isLoading}
        columns={columns}
        dataSource={myCourses}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
        scroll={{ x: 1300 }}
      />
    </div>
  );
};

export default StudentCoursesPage;
