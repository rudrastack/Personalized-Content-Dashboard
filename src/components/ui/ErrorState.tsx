import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'An unexpected network error occurred while synchronizing content.',
  onRetry,
}) => {
  return (
    <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-6 text-center max-w-md mx-auto my-8">
      <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center mb-3">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
        Synchronization Error
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
};
