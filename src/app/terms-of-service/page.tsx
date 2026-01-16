"use client";
import { useState, useEffect } from 'react';

export default function TermsOfServicePage() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto max-w-4xl py-12 px-4">
                <h1 className="text-4xl font-bold mb-6 text-primary">Terms of Service</h1>
                <p className="text-muted-foreground mb-8">Last Updated: {currentDate}</p>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
                        <p>By accessing or using this platform (“Service”), you agree to be bound by these Terms of Service. If you do not agree, you must not use the Service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">2. Eligibility</h2>
                        <p>You must be at least 18 years old to use this Service.</p>
                        <p>Access is granted only after approval by the platform team.</p>
                        <p>Submitting false or misleading information may result in permanent suspension.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">3. Account Access</h2>
                        <p>Login is required to access the dashboard.</p>
                        <p>Accounts are non-transferable.</p>
                        <p>We reserve the right to suspend or terminate any account without prior notice if misuse or abuse is detected.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">4. Tasks & Submissions</h2>
                        <p>Tasks consist of basic AI-related questions.</p>
                        <p>All submissions are reviewed manually.</p>
                        <p>Approval or rejection is final and at the sole discretion of the platform.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">5. Rewards & Balance</h2>
                        <p>Rewards are credited only for approved tasks.</p>
                        <p>Pending or rejected tasks do not generate rewards.</p>
                        <p>Balance shown on the dashboard is not guaranteed until withdrawal is approved.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">6. Withdrawals</h2>
                        <p>Withdrawals are available via supported cryptocurrencies only.</p>
                        <p>All withdrawals are subject to manual review for security and compliance.</p>
                        <p>We reserve the right to reject withdrawals suspected of fraud or abuse.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">7. Prohibited Activities</h2>
                        <p>You agree NOT to:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>Use bots, scripts, or automation</li>
                            <li>Submit plagiarized or AI-generated spam answers</li>
                            <li>Attempt to manipulate balances or task systems</li>
                            <li>Engage in illegal or unethical activity</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">8. Termination</h2>
                        <p>We may suspend or permanently ban accounts without notice for violations of these terms.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">9. Limitation of Liability</h2>
                        <p>The Service is provided “as is.” We are not responsible for:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>Loss of earnings</li>
                            <li>Delayed payments</li>
                            <li>Technical errors</li>
                            <li>Account suspension</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">10. Changes to Terms</h2>
                        <p>We may update these Terms at any time. Continued use of the Service constitutes acceptance of the updated terms.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
