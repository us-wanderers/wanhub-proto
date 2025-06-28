'use client';

import { useState } from 'react';
import { Wifi, WifiOff, Database, FolderSyncIcon as Sync, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useOffline } from '@/hooks/use-offline';
import { cn } from '@/lib/utils';

export function OfflineIndicator() {
  const { isOnline, isLoading, lastSync, cacheSize, syncQueueSize, isInitialized, syncData } = useOffline();

  const [showDetails, setShowDetails] = useState(false);

  if (!isInitialized) {
    return (
      <Badge variant='secondary' className='flex items-center gap-1'>
        <Database className='h-3 w-3 animate-pulse' />
        Initializing...
      </Badge>
    );
  }

  return (
    <div className='flex items-center gap-2'>
      <Badge
        variant={isOnline ? 'default' : 'destructive'}
        className={cn('flex items-center gap-1 cursor-pointer transition-all', showDetails && 'rounded-b-none')}
        onClick={() => setShowDetails(!showDetails)}
      >
        {isOnline ? <Wifi className='h-3 w-3' /> : <WifiOff className='h-3 w-3' />}
        {isOnline ? 'Online' : 'Offline'}
        {syncQueueSize > 0 && (
          <span className='ml-1 bg-orange-500 text-white rounded-full px-1 text-xs'>{syncQueueSize}</span>
        )}
      </Badge>

      {showDetails && (
        <div className='absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg p-3 min-w-64 z-50'>
          <div className='space-y-2 text-sm'>
            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Status:</span>
              <span className={isOnline ? 'text-green-600' : 'text-red-600'}>
                {isOnline ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Cache Size:</span>
              <span>{cacheSize} items</span>
            </div>

            {syncQueueSize > 0 && (
              <div className='flex items-center justify-between'>
                <span className='text-gray-600'>Pending Sync:</span>
                <span className='flex items-center gap-1 text-orange-600'>
                  <AlertCircle className='h-3 w-3' />
                  {syncQueueSize} items
                </span>
              </div>
            )}

            {lastSync && (
              <div className='flex items-center justify-between'>
                <span className='text-gray-600'>Last Sync:</span>
                <span>{lastSync.toLocaleTimeString()}</span>
              </div>
            )}

            <div className='pt-2 border-t'>
              <Button
                size='sm'
                variant='outline'
                onClick={syncData}
                disabled={isLoading || !isOnline}
                className='w-full bg-transparent'
              >
                {isLoading ? (
                  <>
                    <Sync className='h-3 w-3 mr-1 animate-spin' />
                    Syncing...
                  </>
                ) : (
                  <>
                    <Sync className='h-3 w-3 mr-1' />
                    Sync Now
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
