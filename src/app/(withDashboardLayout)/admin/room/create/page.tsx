"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormSelectField, { SelectOptions } from "@/components/forms/FromSelect";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useBuildingsQuery } from "@/redux/api/buildingApi";
import { useAddRoomMutation } from "@/redux/api/roomApi";
import { Button, message } from "antd";

const CreateRoomPage = () => {
  const [addRoom] = useAddRoomMutation();
  const { data } = useBuildingsQuery({
    limit: 100,
    page: 1,
  });
  const buildings = data?.buildings;
  const buildingOptions = buildings?.map((building) => {
    return {
      label: building?.title,
      value: building?.id,
    };
  });

  const onSubmit = async (data: any) => {
    message.loading("Creating...");
    try {
      const res = await addRoom(data).unwrap();
      if (res?.id) {
        message.success("Room created successfully");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  const base = "admin";
  return (
    <div>
      <BreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "room", link: `/${base}/room` },
        ]}
      />
      <h1>Create Room</h1>
      <Form submitHandler={onSubmit}>
        <div style={{ margin: "10px 0px" }}>
          <FormInput name="roomNumber" label="Room No." />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <FormInput name="floor" label="Floor" />
        </div>
        <div>
          <FormSelectField
            size="large"
            name="buildingId"
            options={buildingOptions as SelectOptions[]}
            label="Building"
            placeholder="Select"
          />
        </div>

        <Button type="primary" htmlType="submit" style={{ margin: "10px 0px" }}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateRoomPage;
