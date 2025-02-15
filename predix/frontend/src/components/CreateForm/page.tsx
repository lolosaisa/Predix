
import { useState } from "react";
import { Button } from "@/components/ui/button/page";
import { Input } from "@/components/ui/input/page";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { X } from "lucide-react";
const pollSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters"),
  options: z.array(z.string()).min(2, "Add at least 2 options"),
  endDate: z.string(),
  category: z.string(),
});
const predictionSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  stakeAmount: z.number().min(1, "Minimum stake is 1"),
  endDate: z.string(),
  category: z.string(),
});
export const CreateForm = () => {
  const [formType, setFormType] = useState<"poll" | "prediction">("poll");
  const [options, setOptions] = useState<string[]>([""]);
  const pollForm = useForm({
    resolver: zodResolver(pollSchema),
    defaultValues: {
      question: "",
      options: [""],
      endDate: "",
      category: "Technology",
    },
  });
  const predictionForm = useForm({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      title: "",
      stakeAmount: 1,
      endDate: "",
      category: "Technology",
    },
  });
  const addOption = () => {
    setOptions([...options, ""]);
  };
  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };
  const onSubmitPoll = async (data: z.infer<typeof pollSchema>) => {
    console.log("Poll data:", data);
    // TODO: Add Supabase integration here
  };
  const onSubmitPrediction = async (data: z.infer<typeof predictionSchema>) => {
    console.log("Prediction data:", data);
    // TODO: Add Supabase and smart contract integration here
  };
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => setFormType("poll")}
          variant={formType === "poll" ? "default" : "outline"}
          className={formType === "poll" ? "bg-emerald" : ""}
        >
          Create Poll
        </Button>
        <Button
          onClick={() => setFormType("prediction")}
          variant={formType === "prediction" ? "default" : "outline"}
          className={formType === "prediction" ? "bg-emerald" : ""}
        >
          Create Prediction
        </Button>
      </div>
      {formType === "poll" ? (
        <Form {...pollForm}>
          <form onSubmit={pollForm.handleSubmit(onSubmitPoll)} className="space-y-6">
            <FormField
              control={pollForm.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your question" {...field} className="bg-white/5 text-white" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <FormLabel className="text-white">Options</FormLabel>
              {options.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={options[index]}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                    className="bg-white/5 text-white"
                  />
                  {index > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeOption(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </motion.div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addOption}
                className="text-emerald hover:text-emerald hover:bg-emerald/10"
              >
                Add Option
              </Button>
            </div>
            <FormField
              control={pollForm.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="bg-white/5 text-white" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={pollForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full bg-white/5 text-white rounded-md border border-white/10 p-2"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Crypto">Crypto</option>
                      <option value="Politics">Politics</option>
                      <option value="Football">Football</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-emerald hover:bg-emerald/90">
              Create Poll
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...predictionForm}>
          <form onSubmit={predictionForm.handleSubmit(onSubmitPrediction)} className="space-y-6">
            <FormField
              control={predictionForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter prediction title" {...field} className="bg-white/5 text-white" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={predictionForm.control}
              name="stakeAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Stake Amount (LSK)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="bg-white/5 text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={predictionForm.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="bg-white/5 text-white" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={predictionForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full bg-white/5 text-white rounded-md border border-white/10 p-2"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Crypto">Crypto</option>
                      <option value="Politics">Politics</option>
                      <option value="Football">Football</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-emerald hover:bg-emerald/90">
              Create Prediction
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};