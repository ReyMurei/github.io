import { toast as sonnerToast } from 'sonner';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const toast = ({ title, description }: ToastOptions) => {
    sonnerToast(title, {
      description,
    });
  };

  return { toast };
}

export { sonnerToast as toast };
