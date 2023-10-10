"use client";
import BreadCrumb from "@/components/ui/BreadCrumb";
import ReusableTable from "@/components/ui/ReusableTable";
import { useDebounced } from "@/hooks/hooks";
import { useDeleteRoomMutation, useRoomsQuery } from "@/redux/api/roomApi";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const RoomPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteRoom] = useDeleteRoomMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 1000,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isLoading } = useRoomsQuery({ ...query });

  const rooms = data?.rooms;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting...");
    try {
      const res = await deleteRoom(id);
      if (res) {
        message.success("Room Deleted successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Room No",
      dataIndex: "roomNumber",
      sorter: true,
    },
    {
      title: "Floor",
      dataIndex: "floor",
      sorter: true,
    },
    {
      title: "Building",
      dataIndex: "building",
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
            label: "room",
            link: "/admin/room",
          },
        ]}
      />

      {/* title bar */}
      <h1 style={{ margin: "10px 0" }}>Room list</h1>
      <Link href="/admin/room/create">
        <Button type="primary">Create Room</Button>
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
        dataSource={rooms}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
        scroll={{ x: 500 }}
      />
    </div>
  );
};

export default RoomPage;
