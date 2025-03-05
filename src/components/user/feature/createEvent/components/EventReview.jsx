import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import useAuthStore from '../../../../../store/auth-store';
import Avatar from '../../../../Avatar';

const EventReview = () => {
  const { getValues, watch } = useFormContext();
  const formData = getValues();
  const { user } = useAuthStore();
  const bannerFile = watch('eventBanner')

  useEffect(() => {
    console.log('Form Data', formData)
  }, [formData])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Nearly there! Check everything's correct.</h2>

      <div className="card bg-base-100 shadow-xl rounded-lg overflow-hidden">


        {/* Event Banner */}
        <div>
            <h2 className="text-lg font-semibold mb-4">Review Event Details</h2>
            {bannerFile && (
                <div className="mb-4">
                    <h3 className="font-medium">Event Banner:</h3>
                    <img src={URL.createObjectURL(bannerFile)} alt="Event Banner" className="w-full h-40 object-cover rounded-lg" />
                </div>
            )}
        </div>

        <div className="p-6">


          {/* Event Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{formData.eventTitle || "Event Title"}</h2>



          {/* Date & Time */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="flex items-center gap-2 text-gray-600">
                <span className="badge badge-outline">📅</span> {formData.startDate || "Date"}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <span className="badge badge-outline">⏰</span> {formData.startTime || "Time"}
              </p>
              <a href="#" className="text-blue-500 text-sm">+ Add to Calendar</a>
            </div>



            {/* Ticket Info */}
            <div className="text-right">
              <p className='text-[36]'>Ticket Information</p>
              {formData.tickets && formData.tickets.length > 0 ? (
                formData.tickets.map((ticket, index) => (
                  <p key={index} className="flex items-center gap-2 text-gray-600">
                    <span className="badge badge-outline">🎟️</span> Ticket Type: {ticket.name || "Free Ticket"}
                  </p>
                ))
              ) : (
                <p className="flex items-center gap-2 text-gray-600">
                  <span className="badge badge-outline">🎟️</span> Ticket Type: Free Ticket
                </p>
              )}
            </div>
          </div>



          {/* Location */}
          <div className="mb-4">
            <p className="flex items-center gap-2 text-gray-600">
              <span className="badge badge-outline">📍</span> {formData.eventLocation || "Location"}
            </p>
            <div className="bg-gray-200 h-40 flex items-center justify-center rounded">
              <span className="text-gray-500">Map Placeholder</span>
            </div>
          </div>



          {/* Hosted By */}
          <div className="flex items-center gap-3 mb-4">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-gray-300">
                <Avatar
                  className='w-10 h-10 rounded-full bg-[#2B293D]'

                  imgSrc={user?.profileImage}
                />
              </div>
            </div>
            <p className="text-gray-700 font-medium">{user.username || "Host Name"}</p>
          </div>



          {/* Description */}
          <div className="border-t pt-4 text-gray-600">
            <p>{formData.eventDescription || "Event description goes here."}</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default EventReview;