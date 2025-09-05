'use client';

import { Shield, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
          <p className="text-gray-300">
            We encountered an error while loading your rights information.
          </p>
        </div>

        <div className="glass-card p-4">
          <p className="text-sm text-gray-400 mb-4">Error details:</p>
          <p className="text-sm text-red-400 font-mono bg-black bg-opacity-30 p-2 rounded">
            {error.message}
          </p>
        </div>

        <button
          onClick={reset}
          className="btn-primary flex items-center space-x-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <p className="text-xs text-gray-500">
          If the problem persists, please contact support or try refreshing the page.
        </p>
      </div>
    </div>
  );
}
