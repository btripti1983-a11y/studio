export interface UserProfile {
  uid: string;
  email: string | null;
  name: string | null;
  balance: number;
}

export interface Task {
  id: string;
  userId: string;
  userEmail: string;
  question: string;
  answer: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  reward: number;
}

export interface Proxy {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  lastChecked: Date;
}

export interface Withdrawal {
  id: string;
  userId: string;
  userEmail: string;
  currency: string;
  walletAddress: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface SiteUser {
  id: string;
  email: string;
  status: 'verified' | 'pending' | 'rejected';
  proxy: string;
  sumsubLink: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'Task Issue' | 'Withdrawal Issue' | 'Account Access' | 'Verification / KYC' | 'Technical Problem' | 'Other';
  status: 'Open' | 'In Review' | 'Awaiting User' | 'Resolved' | 'Closed';
  createdAt: Date;
  updatedAt: Date;
}
