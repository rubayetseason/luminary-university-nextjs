"use client";
import { useDebounced } from "@/hooks/hooks";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { Button, Input, message } from "antd";
import BreadCrumb from "@/components/ui/BreadCrumb";
import ReusableTable from "@/components/ui/ReusableTable";
import {
  useAcademicFacultiesQuery,
  useDeleteAcademicFacultyMutation,
} from "@/redux/api/academic/facultyApi";

const AcademicFacultyPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [deleteAcademicFaculty] = useDeleteAcademicFacultyMutation();

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
  const { data, isLoading } = useAcademicFacultiesQuery({ ...query });

  const academicFaculties = data?.academicFaculties;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      //   console.log(data);
      const res = await deleteAcademicFaculty(id);
      if (res) {
        message.success("Academic faculty deleted successfully");
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
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button onClick={() => deleteHandler(data?.id)} type="primary" danger>
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
    // console.log(order, field);
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
            label: "faculties",
            link: "/admin/academic/faculty",
          },
        ]}
      />

      {/* title bar */}
      <h1 style={{ margin: "10px 0" }}>Faculty list</h1>
      <Link href="/admin/academic/faculty/create">
        <Button type="primary">Create Faculty</Button>
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
        dataSource={academicFaculties}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
        scroll={{ x: 400 }}
      />
    </div>
  );
};

export default AcademicFacultyPage;
