
import { Sidebar } from "@/components/SideBar";
import { SearchBar } from "@/components/SearchBar";
import { PredictionCard } from "@/components/PredictionCard";
import { PollCard } from "@/components/PollCard";
import { CreateForm } from "@/components/CreateForm";
import { useState, useEffect } from "react";
import type { Poll, Prediction, PollOption } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/useMobile";
import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/WalletContext";

const categories = ["All", "Football", "Politics", "Crypto", "Technology"];

const fetchPredictions = async () => {
  const { data, error } = await supabase
    .from('predictions')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  //explicitly defined the type of predictions as {status: string} we can also use predictions: string
  
  return (data || []).map((prediction: { status: string; }) => ({
    ...prediction,
    status: prediction.status as 'active' | 'resolved' | 'cancelled'
  }));
};

interface RawPoll {
  id: number;
  title: string;
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
  end_date: string;
  created_at: string;
  creator: string;
  category: string;
}

const fetchPolls = async () => {
  const { data, error } = await supabase
    .from('polls')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return (data as RawPoll[] || []).map(poll => {
    const pollOptions = poll.options as PollOption[];
    const totalVotes = pollOptions.reduce((sum, option) => sum + option.votes, 0);
    
    return {
      ...poll,
      options: pollOptions,
      totalVotes,
    } as Poll;
  });
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"predictions" | "polls">("predictions");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { selectedWallet } = useWallet();

  const { data: predictions = [], isLoading: predictionsLoading } = useQuery({
    queryKey: ['predictions'],
    queryFn: fetchPredictions,
  });

  const { data: polls = [], isLoading: pollsLoading } = useQuery({
    queryKey: ['polls'],
    queryFn: fetchPolls,
  });

  useEffect(() => {
    // Subscribe to changes on the predictions table
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'predictions'
        },
        () => {
          // Refetch predictions when any change occurs
          queryClient.invalidateQueries({ queryKey: ['predictions'] });
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const filteredPredictions = selectedCategory === "All" 
    ? predictions 
    : predictions.filter((p: { category: string; }) => p.category === selectedCategory);

  const filteredPolls = selectedCategory === "All"
    ? polls
    : polls.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-emerald-dark">
      <Sidebar />
      
      <main className={`transition-all duration-300 p-4 sm:p-6 md:p-8 ${isMobile ? 'ml-0' : 'md:ml-64'}`}>
        <div className="max-w-7xl mx-auto">
          <header className="mb-6 md:mb-8 pt-12 md:pt-0">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome to Predix</h1>
            <p className="text-gray-400">Make predictions and earn rewards</p>
            
            {user && selectedWallet && (
              <div className="mt-2 text-sm text-emerald">
                Connected with wallet: {selectedWallet.wallet_address.substring(0, 6)}...{selectedWallet.wallet_address.substring(selectedWallet.wallet_address.length - 4)}
              </div>
            )}
          </header>

          <div className="mb-6 md:mb-8">
            <SearchBar />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            {/* Mobile filter toggle */}
            {isMobile && (
              <Button 
                onClick={() => setShowFilters(!showFilters)} 
                variant="outline" 
                className="w-full sm:hidden mb-2"
              >
                <Filter className="mr-2 h-4 w-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            )}
            
            {/* Categories */}
            <div className={`flex flex-wrap gap-2 ${isMobile && !showFilters ? 'hidden' : 'block'} w-full sm:w-auto`}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-emerald text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
              <Button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-emerald hover:bg-emerald/90 flex-grow sm:flex-grow-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>

              <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("predictions")}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                    activeTab === "predictions"
                      ? "bg-emerald text-white"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  Predictions
                </button>
                <button
                  onClick={() => setActiveTab("polls")}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
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
            <div className="mb-6 md:mb-8">
              <CreateForm />
            </div>
          )}

          {activeTab === "predictions" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {predictionsLoading ? (
                <p className="text-white">Loading predictions...</p>
              ) : filteredPredictions.length === 0 ? (
                <p className="text-white col-span-full text-center py-8">No predictions found in this category.</p>
              ) : (
                //explicitly defined the type of predictions as {status: string} we can also use predictions: string // string was not defined in the cardprps so i used any.
                filteredPredictions.map((prediction: any) => (
                  <PredictionCard key={prediction.id} {...prediction} />
                ))
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {pollsLoading ? (
                <p className="text-white">Loading polls...</p>
              ) : filteredPolls.length === 0 ? (
                <p className="text-white col-span-full text-center py-8">No polls found in this category.</p>
              ) : (
                filteredPolls.map((poll) => (
                  <PollCard 
                    key={poll.id} 
                    id={poll.id}
                    question={poll.title}
                    options={poll.options}
                    endDate={poll.end_date}
                    totalVotes={poll.totalVotes || 0}
                    category={poll.category}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;