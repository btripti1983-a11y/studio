"use client";

import { useAuth } from "@/hooks/use-auth";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { 
  Activity, 
  Info, 
  ShieldCheck, 
  LogIn, 
  ClipboardList, 
  BadgeCheck,
  CircleDollarSign,
  Star,
  Bitcoin,
  Clock,
  UserCheck,
} from "lucide-react";

// Data for new sections
const howItWorksSteps = [
    {
        icon: LogIn,
        title: "1. Sign In",
        description: "Log in to access available AI-based tasks.",
    },
    {
        icon: ClipboardList,
        title: "2. Complete Tasks",
        description: "Answer simple AI-related questions.",
    },
    {
        icon: BadgeCheck,
        title: "3. Review Process",
        description: "Submissions are reviewed for quality and accuracy.",
    },
    {
        icon: CircleDollarSign,
        title: "4. Get Paid",
        description: "Approved tasks add rewards to your balance.",
    },
];

const payoutMethods = [
    { name: 'USDT', icon: CircleDollarSign },
    { name: 'BTC', icon: Bitcoin },
    { name: 'TRX', icon: CircleDollarSign },
    { name: 'LTC', icon: CircleDollarSign },
];

const testimonials = [
    {
        name: "Rahul Mehta",
        rating: 5,
        feedback: "Simple tasks and fast approvals. Very smooth experience."
    },
    {
        name: "Ananya Roy",
        rating: 5,
        feedback: "I like how transparent the review process is. Payments are reliable."
    },
    {
        name: "Danish Khan",
        rating: 4,
        feedback: "Clean dashboard and easy withdrawals. Support is responsive."
    }
];

const faqItems = [
    {
        question: "How long does task review take?",
        answer: "Most tasks are reviewed within 24–48 hours."
    },
    {
        question: "Which payout methods are supported?",
        answer: "We currently support USDT, BTC, TRX, and LTC."
    },
    {
        question: "Is there a minimum withdrawal amount?",
        answer: "Yes, minimum withdrawal limits depend on the selected currency and are displayed on the withdrawal page."
    },
    {
        question: "Are my details safe?",
        answer: "Yes. We do not store personal data or passwords. All credentials are shared securely and deleted after delivery."
    }
];

const faceVerificationUsers = [
    { email: "arjun.nova27@gmail.com", id: "1001", required: "No" },
    { email: "misty.cloud88@outlook.com", id: "1002", required: "No" },
    { email: "pixelhawk_91@gmail.com", id: "1003", required: "No" },
    { email: "blueorbit.mail@icloud.com", id: "1004", required: "No" },
    { email: "zenithflow22@outlook.com", id: "1005", required: "No" },
    { email: "silentbyte.dev@gmail.com", id: "1006", required: "No" },
    { email: "lunar_echo5@icloud.com", id: "1007", required: "No" },
    { email: "rapidwave.pro@outlook.com", id: "1008", required: "No" },
    { email: "neonforest.x@gmail.com", id: "1009", required: "No" },
    { email: "frostline.mail@icloud.com", id: "1010", required: "No" },
];


const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-current' : 'text-gray-600'}`} />
    ))}
  </div>
);


export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <h2 className="text-2xl font-semibold tracking-tight text-muted-foreground">
          Welcome, {user?.name || 'User'} 👋
        </h2>
        <p className="text-muted-foreground">
          This is your main control panel. Track your task activity, earnings, and account status in real time.
        </p>
      </div>

      <OverviewCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><UserCheck className="h-6 w-6 text-primary" /> Face Verification Status</CardTitle>
                <CardDescription>Check if face verification is required for users.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User ID</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Face Verification</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {faceVerificationUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-semibold">{user.id}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={user.required === 'Yes' ? 'destructive' : 'default'} className={user.required === 'Yes' ? '' : 'bg-green-500 hover:bg-green-500/90 text-primary-foreground'}>
                                        {user.required === 'Yes' ? 'Required' : 'Not Required'}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="h-6 w-6 text-primary" /> Work Schedule</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg font-semibold">Work can be started from 9:00 AM UTC onwards.</p>
                <p className="text-muted-foreground">Please adhere to the schedule for task availability.</p>
                <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3">
                    <p className="text-sm font-semibold text-amber-800">Important Announcement</p>
                    <p className="text-sm text-amber-700">From 16 Jan 2026 to 30 Jan 2026, work time will be announced.</p>
                </div>
            </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* How It Works Section */}
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {howItWorksSteps.map((step) => (
                    <div key={step.title} className="flex flex-col items-center text-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <step.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>

        {/* Payout Methods Section */}
        <Card>
            <CardHeader>
                <CardTitle>Payout Methods</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {payoutMethods.map((method) => (
                        <div key={method.name} className="flex items-center gap-3 rounded-md bg-muted p-3">
                            <method.icon className="h-6 w-6 text-primary" />
                            <span className="font-semibold">{method.name}</span>
                        </div>
                    ))}
                </div>
                 <p className="mt-4 text-xs text-muted-foreground">Withdrawals are processed after manual review for security.</p>
            </CardContent>
        </Card>

        {/* Security & Privacy Section */}
        <Card className="bg-card flex flex-col justify-center">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-green-500" /> Security & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
                <p>We do not store passwords or personal data.</p>
                <p>All credentials are shared securely and deleted after delivery.</p>
                <p className="font-semibold text-foreground">Your privacy and safety are our top priority.</p>
            </CardContent>
        </Card>
      </div>

       {/* Testimonials Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What Our Users Say</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
                <Card key={index}>
                    <CardHeader>
                        <StarRating rating={testimonial.rating} />
                    </CardHeader>
                    <CardContent>
                        <p className="italic text-muted-foreground">"{testimonial.feedback}"</p>
                        <p className="mt-4 font-semibold text-right">- {testimonial.name}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* FAQ Section */}
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Activity Summary - kept from previous version */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activity Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Users can complete AI-based tasks to earn rewards. Submitted tasks go through a review process. Approved tasks add to your available balance.
              </p>
            </CardContent>
          </Card>

          {/* Navigation Tip */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Navigation Tip</AlertTitle>
            <AlertDescription>
              Use the sidebar to navigate between Dashboard, Tasks, Withdraw, and Users.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
