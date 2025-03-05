import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

const EventTicketing = () => {
  const { register, control, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tickets'
  });
  const [eventType, setEventType] = useState('');

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Event Type Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">What type of event are you running?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className={`border rounded-lg p-6 flex flex-col items-center cursor-pointer hover:border-primary ${eventType === 'ticketed' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
            onClick={() => setEventType('ticketed')}
          >
            <input 
              type="radio" 
              className="hidden" 
              value="ticketed" 
              {...register('eventType')} 
            />
            <div className="w-12 h-12 mb-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 className="font-medium text-center">Ticketed Event</h3>
            <p className="text-sm text-center text-gray-500">My event requires tickets for entry</p>
          </div>
          
          <div 
            className={`border rounded-lg p-6 flex flex-col items-center cursor-pointer hover:border-primary ${eventType === 'free' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
            onClick={() => setEventType('free')}
          >
            <input 
              type="radio" 
              className="hidden" 
              value="free" 
              {...register('eventType')}
            />
            <div className="w-12 h-12 mb-2 flex items-center justify-center border border-gray-300 rounded-full">
              <span className="text-sm font-medium">FREE</span>
            </div>
            <h3 className="font-medium text-center">Free Event</h3>
            <p className="text-sm text-center text-gray-500">I'm running a free event</p>
          </div>
        </div>
        {errors.eventType && <p className="text-error mt-2">Please select an event type</p>}
      </div>

      {/* Ticket Configuration - Only shown for ticketed events */}
      {eventType === 'ticketed' && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">What tickets are you selling?</h2>
          
          {fields.map((field, index) => (
            <div key={field.id} className="flex mb-4 gap-4 items-start">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Ticket Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Ticket Name e.g. General Admission"
                  className={`input input-bordered w-full ${errors.tickets?.[index]?.name ? 'input-error' : ''}`}
                  {...register(`tickets.${index}.name`, { required: 'Ticket name is required' })}
                />
                {errors.tickets?.[index]?.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.tickets[index].name.message}</span>
                  </label>
                )}
              </div>
              
              <div className="form-control w-32">
                <label className="label">
                  <span className="label-text">Ticket Price</span>
                </label>
                <div className="input-group">
                  <span>฿</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className={`input input-bordered w-full ${errors.tickets?.[index]?.price ? 'input-error' : ''}`}
                    {...register(`tickets.${index}.price`, { 
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be positive' } 
                    })}
                  />
                </div>
                {errors.tickets?.[index]?.price && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.tickets[index].price.message}</span>
                  </label>
                )}
              </div>
              
              {fields.length > 1 && (
                <button 
                  type="button"
                  className="btn btn-square btn-outline btn-error mt-8"
                  onClick={() => remove(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => append({ name: '', price: '' })}
            className="btn btn-outline btn-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Another Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default EventTicketing;