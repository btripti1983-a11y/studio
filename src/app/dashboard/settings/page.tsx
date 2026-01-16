"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/hooks/use-settings";
import { Languages, Globe, Loader2 } from "lucide-react";

const languages = [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
    { value: "es", label: "Spanish" },
    { value: "nl", label: "Dutch" },
];

const timezones = [
    "Etc/GMT+12",
    "Pacific/Midway",
    "Pacific/Honolulu",
    "America/Juneau",
    "America/Los_Angeles",
    "America/Denver",
    "America/Chicago",
    "America/New_York",
    "America/Caracas",
    "America/Halifax",
    "America/Sao_Paulo",
    "Atlantic/Azores",
    "Europe/London",
    "Europe/Paris",
    "Europe/Helsinki",
    "Asia/Kolkata",
    "Asia/Shanghai",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Pacific/Auckland",
];

export default function SettingsPage() {
    const { language, setLanguage, timezone, setTimezone } = useSettings();
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleLanguageChange = (value: string) => {
        setLanguage(value as 'en' | 'hi' | 'es' | 'nl');
    };

    const handleTimezoneChange = (value: string) => {
        setTimezone(value);
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call, although data is saved on change
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
        toast({
            title: "Settings Saved",
            description: "Your language and timezone preferences have been updated.",
        });
    };

    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Language & Timezone</CardTitle>
                    <CardDescription>
                        Manage your language and timezone preferences. Changes are saved automatically.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="language" className="flex items-center gap-2">
                            <Languages className="h-5 w-5" /> Language
                        </Label>
                        <Select value={language} onValueChange={handleLanguageChange}>
                            <SelectTrigger id="language" className="w-full md:w-1/2">
                                <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            <SelectContent>
                                {languages.map((lang) => (
                                    <SelectItem key={lang.value} value={lang.value}>
                                        {lang.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timezone" className="flex items-center gap-2">
                            <Globe className="h-5 w-5" /> Timezone
                        </Label>
                        <Select value={timezone} onValueChange={handleTimezoneChange}>
                            <SelectTrigger id="timezone" className="w-full md:w-1/2">
                                <SelectValue placeholder="Select a timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                {timezones.map((tz) => (
                                    <SelectItem key={tz} value={tz}>
                                        {tz}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardContent>
                     <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSaving ? "Saving..." : "Confirm Settings Saved"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
