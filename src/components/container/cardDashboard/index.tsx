import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  // CardTitle,
} from "@/components/ui/card";

export function CardDashboard(props: any) {
  const { Icons, title, children, transaction } = props;
  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardDescription>
          <div className="flex items-center gap-2">
            <Icons />
            <span className="text-xs">{title}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-lg font-semibold mt-1">{children}</h1>
      </CardContent>
      <CardFooter>
        <h5 className="text-xs underline">{transaction} transaksi hari ini</h5>
      </CardFooter>
    </Card>
  );
}
