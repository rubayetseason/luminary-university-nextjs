"use client";
import { useDebounced } from "@/hooks/hooks";
import {
  useDeleteSemesterRegistrationsMutation,
  useSemesterRegistrationsQuery,
  useStartNewSemesterMutation,
} from "@/redux/api/semesterRegistrationApi";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Button, Input, Tooltip, message } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Link from "next/link";
import ReusableTable from "@/components/ui/ReusableTable";

const SemesterRegistrationPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteSemesterRegistrations] =
    useDeleteSemesterRegistrationsMutation();

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
  const { data, isLoading } = useSemesterRegistrationsQuery({ ...query });

  const semesterRegistrations = data?.semesterRegistrations;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting...");
    try {
      const res = await deleteSemesterRegistrations(id);
      if (res) {
        message.success("Semester registration deleted successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const [startNewSemester] = useStartNewSemesterMutation();
  const handleStartSemester = async (id: string) => {
    try {
      const res = await startNewSemester(id).unwrap();
      message.success(res);
    } catch (err: any) {
      message.error(err?.message);
    }
  };

  const columns = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
    },
    {
      title: "Academic semester",
      dataIndex: "academicSemester",
      sorter: true,
      render: function (data: any) {
        return <>{data?.title}</>;
      },
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/semester-registration/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            {data?.status === "ENDED" && (
              <Tooltip title="Start Semester" placement="bottom">
                <Button
                  type="primary"
                  onClick={() => handleStartSemester(data?.id)}
                  style={{
                    margin: "0px 5px",
                  }}
                >
                  <PlayCircleOutlined />
                </Button>
              </Tooltip>
            )}
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
            label: "semester-registration",
            link: "/admin/semester-registration",
          },
        ]}
      />

      <h1 style={{ margin: "10px 0" }}>Semester registration list</h1>
      <Link href="/admin/semester-registration/create">
        <Button type="primary">Create semester registration</Button>
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
        dataSource={semesterRegistrations}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default SemesterRegistrationPage;
