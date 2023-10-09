"use client";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";

import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";

import dayjs from "dayjs";
import {
  useAcademicSemestersQuery,
  useDeleteAcademicSemesterMutation,
} from "@/redux/api/academic/semesterApi";
import { useDebounced } from "@/hooks/hooks";
import BreadCrumb from "@/components/ui/BreadCrumb";
import ReusableTable from "@/components/ui/ReusableTable";

const AcademicSemesterPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteAcademicSemester] = useDeleteAcademicSemesterMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 1000,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isLoading } = useAcademicSemestersQuery({ ...query });

  const academicSemesters = data?.academicSemesters;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting...");
    try {
      const res = await deleteAcademicSemester(id);
      if (!!res) {
        message.success("Academic semester deleted successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
      sorter: true,
    },
    {
      title: "Start month",
      dataIndex: "startMonth",
      sorter: true,
    },
    {
      title: "End month",
      dataIndex: "endMonth",
      sorter: true,
    },
    {
      title: "Year",
      dataIndex: "year",
      sorter: true,
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "id",
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
            label: "semester",
            link: "/admin/academic/semester",
          },
        ]}
      />

      {/* title bar */}
      <h1 style={{ margin: "10px 0" }}>Semester list</h1>
      <Link href="/admin/academic/semester/create">
        <Button type="primary">Create Semester</Button>
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

      <ReusableTable
        loading={isLoading}
        columns={columns}
        dataSource={academicSemesters}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default AcademicSemesterPage;
