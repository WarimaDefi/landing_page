export interface LoginFormValues {
  email: string;
  password: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  displayName: string;
}

export interface WalletInfo {
  address: string;
  balance: number;
}

export interface Transaction {
  date: string;
  type: 'deposit' | 'withdraw';
  amount: string;
  percentage?: number;
}
