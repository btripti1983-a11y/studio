"use client";

import { useState } from 'react';
import type { Proxy } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/hooks/use-toast';

const initialMockProxies: Proxy[] = [
  { id: "proxy-1", name: "Netherlands-Proxy-01", status: "active", lastChecked: new Date("2024-07-29T10:00:00Z") },
  { id: "proxy-2", name: "Germany-Proxy-DE-4", status: "active", lastChecked: new Date("2024-07-29T11:00:00Z") },
  { id: "proxy-3", name: "USA-Link-NY-88", status: "inactive", lastChecked: new Date("2024-07-27T09:00:00Z") },
  { id: "proxy-4", name: "UK-Proxy-West-2", status: "active", lastChecked: new Date("2024-07-29T12:00:00Z") },
];

export function ProxiesTable() {
    const [proxies, setProxies] = useState<Proxy[]>(initialMockProxies);
    const { toast } = useToast();

    const handleStatusChange = (proxyId: string, newStatus: boolean) => {
        const status = newStatus ? 'active' : 'inactive';
        setProxies(prev =>
            prev.map(p =>
                p.id === proxyId ? { ...p, status, lastChecked: new Date() } : p
            )
        );
        toast({
            title: "Proxy Status Updated",
            description: `Proxy set to ${status}.`,
        });
    };

    return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Toggle Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proxies.map((proxy) => (
              <TableRow key={proxy.id}>
                <TableCell className="font-medium">{proxy.name}</TableCell>
                <TableCell>
                  <Badge variant={proxy.status === 'active' ? 'default' : 'destructive'} className={proxy.status === 'active' ? 'bg-green-600' : ''}>
                    {proxy.status}
                  </Badge>
                </TableCell>
                <TableCell>{proxy.lastChecked.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                    <Switch
                        checked={proxy.status === 'active'}
                        onCheckedChange={(checked) => handleStatusChange(proxy.id, checked)}
                    />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    );
}
