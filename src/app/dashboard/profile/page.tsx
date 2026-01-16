"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Mail, ShieldCheck, Shield } from "lucide-react";

export default function ProfilePage() {
    const user = {
        name: "Subhra Biswas",
        userId: "XXXX XXXX 7859",
        dob: "September 10, 2007",
        email: "btripti1983@gmail.com",
        status: "Verified",
        memberSince: "Jan 15, 2024",
        accountType: "Standard User",
        initials: "SB",
    };

    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <Card>
                <CardHeader>
                    <div className="flex flex-wrap items-start gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarFallback className="text-3xl">{user.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <CardTitle className="text-2xl">{user.name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                            <div className="mt-2 flex items-center gap-2">
                                <Badge className="bg-green-500 hover:bg-green-500/90 text-primary-foreground">
                                    <ShieldCheck className="mr-1 h-4 w-4" />
                                    {user.status}
                                </Badge>
                                <Badge variant="secondary">{user.accountType}</Badge>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <Button variant="outline" disabled>Edit Profile</Button>
                            <Button variant="outline" disabled>Change Password</Button>
                        </div>
                    </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-6">
                        Sensitive information is partially hidden for your security.
                    </p>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                        <div className="flex items-center gap-4">
                            <User className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                <p className="font-semibold">{user.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Shield className="h-6 w-6 text-muted-foreground" />
                             <div>
                                <p className="text-sm font-medium text-muted-foreground">NATION ID</p>
                                <p className="font-semibold">{user.userId}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Calendar className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                                <p className="font-semibold">{user.dob}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4">
                            <Mail className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                                <p className="font-semibold">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Calendar className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                                <p className="font-semibold">{user.memberSince}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
