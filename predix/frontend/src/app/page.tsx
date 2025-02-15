"use client";

import { Sidebar } from "@/components/sidebar/page";
import { SearchBar } from "@/components/searchBar/page";
import { PredictionCard } from "@/components/predictionCard/page";
//import { useState } from "react";
import { PollCard } from "@/components/PollCard";
import { CreateForm } from "@/components/CreateForm";
import { useState } from "react";
import type { Poll, Prediction } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const categories = ["All", "Polls", "Predictions", "Crypto"];

const predictions = [
  {
    title: "GPT-5 would be released in Q1 2025?",
    image: "public/lovable-uploads/8d874809-8eb1-4fce-b86f-38f8c123cf52.png",
    category: "Technology",
    stakeAmount: 3,
    totalStake: 24,
    daysLeft: 30,
  },
  {
    title: "Bitcoin will be above $120,000 on Feb 14, 2025 12:00 AM",
    image: "public/lovable-uploads/279ebdb0-55a2-4ec3-b142-afa9e7947921.png",
    category: "Crypto",
    stakeAmount: 2,
    totalStake: 10,
    daysLeft: 6,
  },
];

const Index = () => {
  //const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"predictions" | "polls">("predictions");
  const [showCreateForm, setShowCreateForm] = useState(false);

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

            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-emerald hover:bg-emerald/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>

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
          </div>

          {showCreateForm && (
            <div className="mb-8">
              <CreateForm />
            </div>
          )}

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
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome to Predix</h1>
            <p className="text-gray-400">Crowd Sourced Wisdom, Turn Your Voice into Victory – Decentralized Polls and Prediction Markets for All.</p>
          </header>

          <div className="mb-8">
            <SearchBar />
          </div>

          <div className="flex gap-2 mb-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((prediction, index) => (
              <PredictionCard key={index} {...prediction} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;