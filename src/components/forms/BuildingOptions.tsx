import { useBuildingsQuery } from "@/redux/api/buildingApi";
import FormSelectField, { SelectOptions } from "./FromSelect";

const BuildingOptions = () => {
  const { data, isLoading } = useBuildingsQuery({
    limit: 100,
    page: 1,
  });
  const buildings = data?.buildings;
  const buildingsOptions = buildings?.map((building) => {
    return {
      label: building?.title,
      value: building?.id,
    };
  });

  return (
    <FormSelectField
      name="building"
      label="Building"
      options={buildingsOptions as SelectOptions[]}
    />
  );
};

export default BuildingOptions;
