import React from 'react';
import CategoriesBar from '../components/CategoriesBar';
import EventList from '../components/EventList';
import { useSearchParams } from 'react-router';

function Events() {
  // ดึง category จาก URL parameters
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <div className="container mx-auto px-4">
      <EventList initialCategory={category} />
    </div>
  )
}

export default Events