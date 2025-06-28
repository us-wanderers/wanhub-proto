'use client';

import { useState, useEffect } from 'react';
import { offlineManager } from '@/lib/offline-manager';

interface OfflineState {
  isOnline: boolean;
  isLoading: boolean;
  lastSync: Date | null;
  cacheSize: number;
  syncQueueSize: number;
  isInitialized: boolean;
}

export function useOffline() {
  const [state, setState] = useState<OfflineState>({
    isOnline: navigator.onLine,
    isLoading: false,
    lastSync: null,
    cacheSize: 0,
    syncQueueSize: 0,
    isInitialized: false,
  });

  useEffect(() => {
    const initializeOfflineManager = async () => {
      try {
        await offlineManager.init();
        const cacheSize = await offlineManager.getSize();
        const syncQueue = await offlineManager.getSyncQueue();

        setState((prev) => ({
          ...prev,
          isInitialized: true,
          cacheSize,
          syncQueueSize: syncQueue.length,
        }));
      } catch (error) {
        console.error('Failed to initialize offline manager:', error);
      }
    };

    initializeOfflineManager();

    const handleOnline = () => {
      setState((prev) => ({ ...prev, isOnline: true }));
      syncData();
    };

    const handleOffline = () => {
      setState((prev) => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncData = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Process background sync
      await offlineManager.processSync();

      // Update cache info
      const cacheSize = await offlineManager.getSize();
      const syncQueue = await offlineManager.getSyncQueue();

      setState((prev) => ({
        ...prev,
        isLoading: false,
        lastSync: new Date(),
        cacheSize,
        syncQueueSize: syncQueue.length,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      console.error('Sync failed:', error);
    }
  };

  const clearCache = async () => {
    try {
      await offlineManager.clear();
      setState((prev) => ({ ...prev, cacheSize: 0, syncQueueSize: 0 }));
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  const preloadData = async (userType: 'student' | 'teacher' | 'organization') => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      await offlineManager.preloadEssentialData(userType);
      const cacheSize = await offlineManager.getSize();

      setState((prev) => ({
        ...prev,
        isLoading: false,
        cacheSize,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      console.error('Preload failed:', error);
    }
  };

  const addToSyncQueue = async (action: 'create' | 'update' | 'delete', resource: string, data: any) => {
    try {
      await offlineManager.addToSyncQueue({ action, resource, data });
      const syncQueue = await offlineManager.getSyncQueue();
      setState((prev) => ({ ...prev, syncQueueSize: syncQueue.length }));
    } catch (error) {
      console.error('Failed to add to sync queue:', error);
    }
  };

  return {
    ...state,
    syncData,
    clearCache,
    preloadData,
    addToSyncQueue,
  };
}
