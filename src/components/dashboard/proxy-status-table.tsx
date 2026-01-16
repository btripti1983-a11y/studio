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
  { id: "proxy-1", name: "Netherlands-Proxy-01", status: "active", lastChecked: new Date() },
  { id: "proxy-2", name: "Germany-Proxy-DE-4", status: "active", lastChecked: new Date() },
  { id: "proxy-3", name: "USA-Link-NY-88", status: "inactive", lastChecked: new Date(Date.now() - 86400000 * 2) },
  { id: "proxy-4", name: "UK-Proxy-West-2", status: "active", lastChecked: new Date() },
];

export function ProxyStatusTable() {
  return (
    <Card>
       <CardHeader>
        <CardTitle className="font-headline">Proxy/Link Status</CardTitle>
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
                  <Badge variant={proxy.status === 'active' ? 'default' : 'destructive'} className={proxy.status === 'active' ? 'bg-green-600' : ''}>
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
