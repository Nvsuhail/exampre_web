'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ViewSyllabusPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to syllabus tracker page
    router.push('/admin/syllabus-tracker');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Redirecting to Syllabus Tracker...</p>
      </div>
    </div>
  );
};

export default ViewSyllabusPage;