import { Button } from './button';

interface Props {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <p className="text-destructive mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
