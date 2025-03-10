
export interface Poll {
    id: number;
    title: string;
    options: PollOption[];
    end_date: string;
    created_at: string;
    creator: string;
    category: string;
    totalVotes?: number;
  }
  
  export interface PollOption {
    id: string;
    text: string;
    votes: number;
  }
  
  export interface Prediction {
    id: number;
    title: string;
    image_url: string;
    category: string;
    stake_amount: number;
    total_stake: number;
    end_date: string;
    created_at: string;
    creator: string;
    status: 'active' | 'resolved' | 'cancelled';
    yes_votes: number;
    no_votes: number;
    outcome?: boolean;
    resolved_at?: string;
  }
  
  export interface ContractResponse {
    success: boolean;
    error?: string;
    data?: any;
  }