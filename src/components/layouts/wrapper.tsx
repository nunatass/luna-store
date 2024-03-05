import { cn } from '@/lib/utils';
type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};
export const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <main
      className={cn(
        'h-max min-h-screen overflow-x-hidden bg-gray-50',
        className
      )}
    >
      {children}
    </main>
  );
};
