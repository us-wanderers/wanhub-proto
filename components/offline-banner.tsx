'use client';

import { useEffect, useState } from 'react';
import { X, WifiOff, AlertTriangle, CheckCircle, FolderSyncIcon as Sync } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useOffline } from '@/hooks/use-offline';

export function OfflineBanner() {
  const { isOnline, isLoading, syncQueueSize, isInitialized, syncData } = useOffline();

  const [dismissed, setDismissed] = useState(false);
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);

  // Reset dismissed state when going offline
  useEffect(() => {
    if (!isOnline) {
      setDismissed(false);
    }
  }, [isOnline]);

  // Show sync success message briefly
  useEffect(() => {
    if (isOnline && syncQueueSize === 0 && !isLoading) {
      setShowSyncSuccess(true);
      const timer = setTimeout(() => setShowSyncSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, syncQueueSize, isLoading]);

  if (!isInitialized || dismissed) {
    return null;
  }

  // Show sync success message
  if (showSyncSuccess && isOnline) {
    return (
      <Alert className='border-green-200 bg-green-50 text-green-800'>
        <CheckCircle className='h-4 w-4' />
        <AlertDescription className='flex items-center justify-between'>
          <span>All data synced successfully!</span>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setShowSyncSuccess(false)}
            className='h-auto p-1 text-green-600 hover:text-green-800'
          >
            <X className='h-3 w-3' />
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Show offline banner
  if (!isOnline) {
    return (
      <Alert className='border-orange-200 bg-orange-50 text-orange-800'>
        <WifiOff className='h-4 w-4' />
        <AlertDescription className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span>You're currently offline. Some features may be limited.</span>
            {syncQueueSize > 0 && (
              <span className='text-xs bg-orange-200 px-2 py-1 rounded'>{syncQueueSize} items pending sync</span>
            )}
          </div>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setDismissed(true)}
            className='h-auto p-1 text-orange-600 hover:text-orange-800'
          >
            <X className='h-3 w-3' />
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Show pending sync banner when online but have items to sync
  if (isOnline && syncQueueSize > 0) {
    return (
      <Alert className='border-blue-200 bg-blue-50 text-blue-800'>
        <AlertTriangle className='h-4 w-4' />
        <AlertDescription className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span>Syncing {syncQueueSize} pending changes...</span>
            {isLoading && <Sync className='h-3 w-3 animate-spin' />}
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='sm'
              onClick={syncData}
              disabled={isLoading}
              className='h-auto px-2 py-1 text-blue-600 hover:text-blue-800'
            >
              {isLoading ? 'Syncing...' : 'Sync Now'}
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setDismissed(true)}
              className='h-auto p-1 text-blue-600 hover:text-blue-800'
            >
              <X className='h-3 w-3' />
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
