import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const teamMembers = [
    {
        name: "Satraj Bambra",
        title: "Co-Founder & CEO",
        bio: [
            "Managing Partner and CIO at Round13",
            "Successful high-volume crypto trader",
            "Co-Founder & CEO of BlockEQ (acquired by Coinsquare)",
            "Full-stack software engineer",
        ],
        imageId: "satraj-bambra",
    },
    {
        name: "Megha Bambra",
        title: "Co-Founder & CTO",
        bio: [
            "Former VP of Engineering at Grindr (IPO)",
            "CTO at StellarX (DEX)",
            "Co-Founder & CTO of BlockEQ (acquired by Coinsquare)",
            "Full-stack software engineer",
        ],
        imageId: "megha-bambra",
    },
    {
        name: "Rick Marini",
        title: "Co-Founder & COO",
        bio: [
            "Former COO at Grindr (IPO)",
            "Three-time successful founder",
            "55 investments including 13 unicorns",
            "Crypto investor since 2014",
        ],
        imageId: "rick-marini",
    },
    {
        name: "Brent Vegliacich",
        title: "Co-Founder, General Counsel & CFO",
        bio: [
            "Managing member of Selborne Legal Consulting",
            "Former international tax advisor at EY",
            "Private equity, M&A, and VC attorney at Reed Smith",
            "Advisor to multiple crypto-based companies",
        ],
        imageId: "brent-vegliacich",
    },
];

export default function TeamPage() {

    const getImageUrl = (imageId: string) => {
        const image = PlaceHolderImages.find(img => img.id === imageId);
        return image?.imageUrl || "https://picsum.photos/seed/placeholder/400/400";
    }
    
    const getImageHint = (imageId: string) => {
        const image = PlaceHolderImages.find(img => img.id === imageId);
        return image?.imageHint || "portrait";
    }

    return (
        <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Meet Our Team</h1>
                <p className="max-w-4xl text-muted-foreground">
                    The founding team blends technical expertise with entrepreneurial prowess. With decades of experience and multiple successful exits, these seasoned innovators have a proven track record of identifying opportunities and creating value in the technology and digital finance industries.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                {teamMembers.map((member) => (
                    <Card key={member.name} className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                        <div className="p-0">
                            <Image
                                src={getImageUrl(member.imageId)}
                                alt={`Profile picture of ${member.name}`}
                                width={400}
                                height={400}
                                className="h-auto w-full object-cover"
                                data-ai-hint={getImageHint(member.imageId)}
                            />
                        </div>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold">{member.name}</h2>
                            <p className="mb-4 text-primary">{member.title}</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                {member.bio.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-500" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
