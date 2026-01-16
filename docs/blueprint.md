# **App Name**: Sumsub Dutch Rewards

## Core Features:

- User Authentication: Secure login using Firebase Authentication with specific demo credentials and custom signup message.
- AI Task Submission: Users answer AI questions and submit them, creating a Firestore record with a 'pending' status.
- Proxy/Link Status Display: Dynamically load and display proxy/link status from Firestore in a table.
- Account Status Overview: Display approved, pending, and rejected tasks in separate cards or tables.
- Balance Display: Show total earned balance, auto-updated from Firestore upon admin action. The LLM tool calculates whether a field, such as balance, needs to be updated
- Crypto Withdrawal System: Users can request BTC withdrawals by providing their wallet address and amount, creating a withdrawal request in Firestore.
- Admin Task Management: Admin interface to view, approve/reject tasks, update proxy/link status, and approve withdrawals.

## Style Guidelines:

- Primary color: Dark navy blue (#1A237E) reflecting the logo's deep blue and trust.
- Background color: Very dark gray (#121212) for a modern, dark theme.
- Accent color: Teal (#009688), echoing the logo's accent color for highlights and interactive elements.
- Headline font: 'Space Grotesk' (sans-serif) for a modern and tech-focused look.
- Body font: 'Inter' (sans-serif) for clear and readable text.
- Use simple, clear icons to represent different task statuses and actions.
- Cards and tables should have a clean, modern design with clear separation of information.
- Subtle animations on data updates and task submissions to provide feedback to the user.