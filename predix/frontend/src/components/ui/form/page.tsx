import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {}

export function Form({ className, ...props }: FormProps) {
  return (
    <form className={cn("space-y-4", className)} {...props} />
  );
}

export function FormField({ name, children }: { name: string; children: React.ReactNode }) {
  const { register } = useFormContext();
  return <div {...register(name)}>{children}</div>;
}

export function FormItem({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

export function FormLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium">{children}</label>;
}

export function FormControl({ children }: { children: React.ReactNode }) {
  return <div className="rounded-md border px-3 py-2">{children}</div>;
}
