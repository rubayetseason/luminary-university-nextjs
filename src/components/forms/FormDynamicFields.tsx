"use client";

import { Button, Empty } from "antd";
import { useFieldArray, useFormContext } from "react-hook-form";

import { daysOptions } from "@/constants/formOptions";
import FormSelectField from "./FromSelect";
import FormTimePicker from "./FormTimePicker";
import BuildingOptions from "./BuildingOptions";
import RoomOptions from "./RoomOptions";
import FacultyOptions from "./FacultyOptions";
import styles from "./DynamicField.module.css";

const FormDynamicFields = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "classSchedules",
  });

  return (
    <>
      <div>
        {fields.length > 0 ? (
          fields.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  marginBottom: "5px",
                  padding: "20px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                }}
              >
                <div className={styles.parentDiv}>
                  <div>
                    <FormSelectField
                      options={daysOptions}
                      name={`classSchedules.${index}.dayOfWeek`}
                      label="Day of week"
                    />
                  </div>

                  <div>
                    <FormTimePicker
                      name={`classSchedules.${index}.startTime`}
                      label="Start time"
                    />
                  </div>

                  <div>
                    <FormTimePicker
                      name={`classSchedules.${index}.endTime`}
                      label="End time"
                    />
                  </div>

                  <div>
                    <BuildingOptions />
                  </div>
                  <div>
                    <RoomOptions name={`classSchedules.${index}.roomId`} />
                  </div>
                  <div>
                    <FacultyOptions
                      name={`classSchedules.${index}.facultyId`}
                    />
                  </div>
                </div>

                <Button
                  type="primary"
                  onClick={() => remove(index)}
                  danger
                  style={{ margin: "5px 0px" }}
                >
                  Delete
                </Button>
              </div>
            );
          })
        ) : (
          <Empty
            style={{ margin: "5px 0px" }}
            description="No class schedule found"
          />
        )}
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Button type="primary" onClick={() => append(undefined)}>
          Add schedule
        </Button>
      </div>
    </>
  );
};

export default FormDynamicFields;
