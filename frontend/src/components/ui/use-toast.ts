import { useToast, toast } from "@/hooks/useToast";

export { useToast, toast };
//added the export for the toast props and Action elemennt
export type ToastActionElement = React.ReactNode;

export interface ToastProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
}
