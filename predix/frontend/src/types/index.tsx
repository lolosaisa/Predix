export interface Poll {
    id: string;
    question: string;
    options: PollOption[];
    endDate: string;
    totalVotes: number;
    category: string;
  }
  
  export interface PollOption {
    id: string;
    text: string;
    votes: number;
  }
  
  export interface Prediction {
    id: string;
    title: string;
    image: string;
    category: string;
    stakeAmount: number;
    totalStake: number;
    daysLeft: number;
    odds: {
      yes: number;
      no: number;
    };
  }