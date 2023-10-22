import { Collapse } from "antd";
const { Panel } = Collapse;

export type ItemProps = {
  key: string;
  label: string;
  children: React.ReactNode | React.ReactElement;
  isTaken?: boolean;
};

type CollapseProps = {
  items: ItemProps[];
  onChange?: (el: string | string[] | "") => void;
  defaultActiveKey?: string | string[];
};

const CollapseComponent = ({
  items,
  onChange,
  defaultActiveKey = ["1"],
}: CollapseProps) => {
  return (
    <Collapse defaultActiveKey={defaultActiveKey} onChange={onChange}>
      {items?.map((item) => {
        return (
          <Panel header={item?.label} key={item?.key}>
            {item?.children}
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default CollapseComponent;
