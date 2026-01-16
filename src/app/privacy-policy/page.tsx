"use client";
import { useState, useEffect } from 'react';

export default function PrivacyPolicyPage() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto max-w-4xl py-12 px-4">
                <h1 className="text-4xl font-bold mb-6 text-primary">Privacy Policy</h1>
                <p className="text-muted-foreground mb-8">Last Updated: {currentDate}</p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
                        <p>Your privacy is important to us. This Privacy Policy explains how information is collected, used, and protected when you use our website ("Service"). It outlines our practices regarding your data and your rights.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
                        <p>We collect minimal information required to provide our services. This includes:</p>
                        <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                            <li><strong>Login Information:</strong> Information used to create and secure your account.</li>
                            <li><strong>Task Activity:</strong> Data related to the tasks you complete, including submissions and their status (pending, approved, rejected).</li>
                            <li><strong>Withdrawal Requests:</strong> Details required to process your withdrawals, such as wallet addresses and amounts.</li>
                            <li><strong>Support Communications:</strong> Information you provide when you contact our support team.</li>
                        </ul>
                        <p className="mt-4 font-semibold">We do not sell user data or collect unnecessary personal information beyond what is needed for platform operation.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">3. No Password Storage</h2>
                        <p className="font-semibold">We do not store user passwords in plain text. Authentication is handled securely through trusted systems to ensure your account credentials remain protected.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">4. Use of Information</h2>
                        <p>The information we collect is used exclusively for the following purposes:</p>
                        <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                            <li>To provide and maintain platform functionality.</li>
                            <li>To facilitate the review and approval of submitted tasks.</li>
                            <li>To process withdrawal requests accurately and securely.</li>
                            <li>To respond to your inquiries and support tickets.</li>
                            <li>To maintain the security and integrity of our platform and comply with legal obligations.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">5. Data Sharing</h2>
                        <p>We do not sell or rent your personal data to third parties. Your data is shared only under limited circumstances, such as when required for operational purposes (e.g., with payment processors), to comply with legal obligations, or to protect the security of our platform.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">6. Data Retention</h2>
                        <p>We retain your data only for as long as it is necessary to provide the Service and fulfill the purposes outlined in this policy. Sensitive data, such as credentials and verification-related information, are deleted after they are no longer required.</p>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold mb-3">7. Security Measures</h2>
                         <p>We do not store passwords or personal data.</p>
                         <p>All credentials are shared securely and deleted after delivery.</p>
                         <p className="font-semibold">Your privacy and safety are our top priority.</p>
                    </section>

                     <section>
                        <h2 className="text-2xl font-semibold mb-3">8. Cookies & Tracking</h2>
                        <p>We use cookies and similar technologies only for essential purposes, such as session management, maintaining security, and monitoring platform performance. We do not use tracking cookies for advertising.</p>
                    </section>

                     <section>
                        <h2 className="text-2xl font-semibold mb-3">9. User Rights</h2>
                        <p>You have the right to manage your information. You may:</p>
                         <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                            <li>Request access to the data we hold about you.</li>
                            <li>Ask for corrections to any inaccurate or incomplete data.</li>
                            <li>Request the deletion of your data, subject to legal and operational constraints.</li>
                         </ul>
                         <p className="mt-2">For any privacy-related requests, please contact our support team.</p>
                    </section>

                     <section>
                        <h2 className="text-2xl font-semibold mb-3">10. Third-Party Services</h2>
                        <p>Our platform may rely on third-party services for functions like hosting, analytics, or payment processing. These services have their own privacy policies, and we encourage you to review them.</p>
                    </section>

                     <section>
                        <h2 className="text-2xl font-semibold mb-3">11. Policy Updates</h2>
                        <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated revision date. Your continued use of the Service after such changes constitutes your acceptance of the new policy.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">12. Contact Information</h2>
                        <p>For privacy-related questions or concerns, please contact our support team through the support ticket system available in your dashboard.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
