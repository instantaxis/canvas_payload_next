
'use client';

import React from 'react';

/**
 * @description A simple loading spinner component.
 * @returns {React.ReactElement}
 */
export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};
