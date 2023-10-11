"use client";
import BreadCrumb from "@/components/ui/BreadCrumb";
import ReusableTable from "@/components/ui/ReusableTable";
import { useDebounced } from "@/hooks/hooks";
import { useOfferedCourseSectionsQuery } from "@/redux/api/courseSectionApi";
import { ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { useState } from "react";

const OfferedCourseSectionPage = () => {
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
  const { data, isLoading } = useOfferedCourseSectionsQuery({ ...query });

  const offeredCourseSections = data?.offeredCourseSections;
  const meta = data?.meta;

  const columns = [
    {
      title: "Offered courses",
      dataIndex: "offeredCourse",
      sorter: true,
      render: function (data: any) {
        return <>{data?.course?.title}</>;
      },
    },
    {
      title: "Section",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: "Max capacity",
      dataIndex: "maxCapacity",
      sorter: true,
    },
    {
      title: "Currently enrolled student",
      dataIndex: "currentlyEnrolledStudent",
      sorter: true,
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
            label: "admin",
            link: "/admin",
          },
          {
            label: "course-sections",
            link: "/admin/offered-course-section",
          },
        ]}
      />

      <h1 style={{ margin: "10px 0" }}>Offered course section list</h1>
      <Link href="/admin/offered-course-section/create">
        <Button type="primary">Create section</Button>
      </Link>

      <ReusableTable
        loading={isLoading}
        columns={columns}
        dataSource={offeredCourseSections}
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

export default OfferedCourseSectionPage;
