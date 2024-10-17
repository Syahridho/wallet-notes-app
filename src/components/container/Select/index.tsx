import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo() {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={selectedValue || "Hari Ini"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Hari ini</SelectItem>
          <SelectItem value="banana">Minggu lalu</SelectItem>
          <SelectItem value="blueberry">Bulan ini</SelectItem>
          <SelectItem value="grapes">Bulan lalu</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
