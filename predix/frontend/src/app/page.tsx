"use client";

import { Sidebar } from "@/components/sidebar/page";
import { SearchBar } from "@/components/searchBar/page";
import { PredictionCard } from "@/components/predictionCard/page";
import { PollCard } from "@/components/PollCard/page";
import { useState } from "react";
import type { Poll, Prediction } from "@/types/index";

const categories = ["All", "Football", "Politics", "Crypto", "Technology"];

const predictions: Prediction[] = [
  {
    id: "1",
    title: "GPT-5 would be released in Q1 2025?",
    image: "public/lovable-uploads/8d874809-8eb1-4fce-b86f-38f8c123cf52.png",
    category: "Technology",
    stakeAmount: 3,
    totalStake: 24,
    daysLeft: 30,
    odds: {
      yes: 0.65,
      no: 0.35
    }
  },
  {
    id: "2",
    title: "Do you Think Kenyan candidate will win the AU election?",
    image: "public/lovable-uploads/8d874809-8eb1-4fce-b86f-38f8c123cf52.png",
    category: "Politics",
    stakeAmount: 3,
    totalStake: 24,
    daysLeft: 30,
    odds: {
      yes: 0.65,
      no: 0.35
    }
  },
  {
    id: "3",
    title: "Bitcoin will be above $120,000 on Feb 14, 2025 12:00 AM",
    image: "public/lovable-uploads/279ebdb0-55a2-4ec3-b142-afa9e7947921.png",
    category: "Crypto",
    stakeAmount: 2,
    totalStake: 10,
    daysLeft: 6,
    odds: {
      yes: 0.75,
      no: 0.25
    }
  },
];

const polls: Poll[] = [
  {
    id: "1",
    question: "Which blockchain will have the highest TVL growth in 2024?",
    options: [
      { id: "1", text: "Ethereum", votes: 1200 },
      { id: "2", text: "Solana", votes: 800 },
      { id: "3", text: "Arbitrum", votes: 500 },
      { id: "4", text: "Polygon", votes: 300 }
    ],
    endDate: "2024-12-31",
    totalVotes: 2800,
    category: "Crypto"
  },
  {
    id: "2",
    question: "Who will win the UEFA Champions League 2024?",
    options: [
      { id: "1", text: "Manchester City", votes: 2000 },
      { id: "2", text: "Real Madrid", votes: 1800 },
      { id: "3", text: "Bayern Munich", votes: 1500 },
      { id: "4", text: "PSG", votes: 1200 }
    ],
    endDate: "2024-06-01",
    totalVotes: 6500,
    category: "Football"
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"predictions" | "polls">("predictions");

  const filteredPredictions = selectedCategory === "All" 
    ? predictions 
    : predictions.filter(p => p.category === selectedCategory);

  const filteredPolls = selectedCategory === "All"
    ? polls
    : polls.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-emerald-dark">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome to Predix</h1>
            <p className="text-gray-400">Make predictions and earn rewards</p>
          </header>

          <div className="mb-8">
            <SearchBar />
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-emerald text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("predictions")}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === "predictions"
                    ? "bg-emerald text-white"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                Predictions
              </button>
              <button
                onClick={() => setActiveTab("polls")}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === "polls"
                    ? "bg-emerald text-white"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                Polls
              </button>
            </div>
          </div>

          {activeTab === "predictions" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPredictions.map((prediction) => (
                <PredictionCard key={prediction.id} {...prediction} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPolls.map((poll) => (
                <PollCard key={poll.id} {...poll} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;