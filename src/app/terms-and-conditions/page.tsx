"use client";
import { useState, useEffect } from 'react';

export default function TermsAndConditionsPage() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto max-w-4xl py-12 px-4">
                <h1 className="text-4xl font-bold mb-6 text-primary">Terms & Conditions</h1>
                <p className="text-muted-foreground mb-8">Last Updated: {currentDate}</p>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">1. Platform Nature</h2>
                        <p>This platform provides task-based digital work opportunities. It is not employment, not guaranteed income, and not an investment.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">2. Review & Moderation</h2>
                        <p>All content, tasks, submissions, balances, and withdrawals are subject to moderation.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">3. No Guarantee of Earnings</h2>
                        <p>Earnings depend entirely on:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>Task availability</li>
                            <li>Submission quality</li>
                            <li>Approval decisions</li>
                        </ul>
                        <p className="mt-2">No minimum earnings are guaranteed.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">4. Compliance & Verification</h2>
                        <p>Users may be required to submit identification and qualifications for compliance purposes. Failure to comply may result in account restriction.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">5. Security</h2>
                        <p>We do not store passwords or sensitive personal data beyond what is necessary for platform operation.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">6. Governing Law</h2>
                        <p>These terms shall be governed and interpreted in accordance with applicable laws.</p>
                    </section>

                    <div className="mt-12 border-t pt-8">
                         <h2 className="text-2xl font-semibold mb-2">Privacy & Security Note</h2>
                         <p>We respect user privacy.</p>
                         <p>Credentials are handled securely and deleted when no longer required.</p>
                         <p>No personal data is sold or shared with third parties.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
