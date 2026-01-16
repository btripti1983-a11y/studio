export interface UserProfile {
  uid: string;
  email: string | null;
  name: string | null;
  isAdmin?: boolean;
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
  walletAddress: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}
