'use client';
import { ClaimsDataTable } from './data-table';
import { apiCall } from '@/lib/api';
import * as React from 'react';

export default function ClaimsPage() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true);
        const data = await apiCall('/api/claims');
        setData(data);
      } catch (err) {
        console.error('Error fetching claims:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading claims...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
            <p className="text-gray-600 mt-2">Please check your database connection.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Claims</h1>
          <p className="text-muted-foreground">Manage insurance claims and billing</p>
        </div>
      </div>
      <ClaimsDataTable data={data} />
    </div>
  );
}
