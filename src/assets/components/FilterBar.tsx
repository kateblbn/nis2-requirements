import "./FilterBar.css";
import { Select } from "antd";
type FilterBarProps = {
  buOptions: string[];
  selectedBu: string;
  onBuChange: (value: string) => void;
};
export default function FilterBar({
  buOptions,
  selectedBu,
  onBuChange,
}: FilterBarProps) {

  //unique BU

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  return (
    <div className="filter-container">
      <Select
        virtual={false}
        placeholder="Business Unit"
        onChange={onBuChange}
        value={selectedBu}
        options={buOptions.map((e) => {
          return { label: e, value: e };
        })}
        onSearch={onSearch}
      />
    </div>
  );
}
