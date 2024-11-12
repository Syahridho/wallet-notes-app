import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo({ setSelect, select }: any) {
  const handleValueChange = (value) => {
    setSelect(value);
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue defaultValue={select} placeholder={"Hari ini"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="today" defaultChecked>
            Hari ini
          </SelectItem>
          <SelectItem value="this_week">Minggu ini</SelectItem>
          <SelectItem value="this_month">Bulan ini</SelectItem>
          <SelectItem value="last_month">Bulan lalu</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
