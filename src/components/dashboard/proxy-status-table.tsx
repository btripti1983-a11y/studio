"use client";

import type { Proxy } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockProxies: Proxy[] = [
  { id: "proxy-1", name: "Netherlands-Proxy-01", status: "active", lastChecked: new Date("2024-07-29T10:00:00Z") },
  { id: "proxy-2", name: "Germany-Proxy-DE-4", status: "active", lastChecked: new Date("2024-07-29T11:00:00Z") },
  { id: "proxy-3", name: "USA-Link-NY-88", status: "inactive", lastChecked: new Date("2024-07-27T09:00:00Z") },
  { id: "proxy-4", name: "UK-Proxy-West-2", status: "active", lastChecked: new Date("2024-07-29T12:00:00Z") },
];

export function ProxyStatusTable() {
  return (
    <Card>
       <CardHeader>
        <CardTitle>Proxy/Link Status</CardTitle>
        <CardDescription>
            Live status of available proxies and links.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Last Checked</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProxies.map((proxy) => (
              <TableRow key={proxy.id}>
                <TableCell className="font-medium">{proxy.name}</TableCell>
                <TableCell>
                  <Badge variant={proxy.status === 'active' ? 'default' : 'destructive'} className={proxy.status === 'active' ? 'bg-green-500 hover:bg-green-500/90 text-primary-foreground' : ''}>
                    {proxy.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{proxy.lastChecked.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
