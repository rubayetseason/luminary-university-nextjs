"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import ClassSchedule from "@/components/ui/ClassSchedule";
import ReusableTable from "@/components/ui/ReusableTable";
import { useMyCourseSchedulesQuery } from "@/redux/api/studentApi";
import { IOfferedCourseSchedule } from "@/types";

const MyCourseSchedulePage = () => {
  const { data, isLoading } = useMyCourseSchedulesQuery({});
  const myCourseSchedules = data?.myCourseSchedules;

  const columns = [
    {
      title: "Course name",
      dataIndex: "offeredCourse",
      render: function (data: any) {
        return <>{data.course.title}</>;
      },
    },
    {
      title: "Credit",
      dataIndex: "offeredCourse",
      render: function (data: any) {
        return <>{data.course.credits}</>;
      },
    },
    {
      title: "Section",
      dataIndex: "offeredCourseSection",
      render: function (data: any) {
        return <>{data.title}</>;
      },
    },
    {
      title: "Class Schedules",
      dataIndex: "offeredCourseSection",
      render: function (data: any) {
        return (
          <>
            <ClassSchedule
              data={
                data.offeredCourseClassSchedules as IOfferedCourseSchedule[]
              }
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <BreadCrumb
        items={[
          { label: `student`, link: `/student` },
          { label: `schedule`, link: `/student/courses/schedule` },
        ]}
      />

      <h1 style={{ margin: "10px 0" }}>My course schedules</h1>

      <ReusableTable
        loading={isLoading}
        dataSource={myCourseSchedules}
        columns={columns}
        showPagination={false}
        scroll={{ x: 1000 }}
      />
    </>
  );
};

export default MyCourseSchedulePage;
