import { IOfferedCourseSchedule } from "@/types";
import Link from "next/link";

type ClassScheduleProps = {
  data: IOfferedCourseSchedule[];
};

export default function ClassSchedule({ data }: ClassScheduleProps) {
  return (
    <>
      {data?.map((schedule: IOfferedCourseSchedule, index: number) => {
        return (
          <div
            key={index}
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              marginBottom: "5px",
              padding: "10px",
            }}
          >
            <div>
              <b style={{ textTransform: "capitalize" }}>Faculty name</b>
              <Link
                href={`/student/faculty/${schedule.faculty.id}`}
                style={{ marginLeft: "20px" }}
              >
                {schedule.faculty.firstName} {schedule.faculty.lastName}{" "}
                {schedule.faculty.middleName}
              </Link>
            </div>
            <div>
              <b style={{ textTransform: "capitalize" }}>Day</b>
              <span style={{ marginLeft: "20px" }}>{schedule.dayOfWeek}</span>
            </div>
            <div>
              <b style={{ textTransform: "capitalize" }}>Time</b>
              <span style={{ marginLeft: "20px" }}>
                {schedule.startTime} - {schedule.endTime}
              </span>
            </div>
            <div>
              <b style={{ textTransform: "capitalize" }}>Building</b>
              <span style={{ marginLeft: "20px" }}>
                {schedule.room.building.title}
              </span>
            </div>
            <div>
              <b style={{ textTransform: "capitalize" }}>Room no.</b>
              <span style={{ marginLeft: "20px" }}>
                {schedule.room.roomNumber}
              </span>
            </div>
            <div>
              <b style={{ textTransform: "capitalize" }}>Floor no.</b>
              <span style={{ marginLeft: "20px" }}>{schedule.room.floor}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
