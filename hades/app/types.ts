export interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
}

export interface Budget {
  id: string;
  date: string;
  amount: number;
}
