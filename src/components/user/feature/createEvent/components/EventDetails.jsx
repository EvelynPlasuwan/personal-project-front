import React from 'react';
import { useFormContext } from 'react-hook-form';

const EventDetails = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className='m-0 '>
      <div className="max-w-4xl mx-auto">
        {/* Event Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Event Details</h2>

          {/* input event title */}
          <div className="form-details flex gap-2">
            <label className="label">
              <span className="label-text font-medium">Event Title
                <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              {...register("eventTitle", { required: "Please enter your event title" })}
              className="input input-bordered h-6"
              placeholder='Enter your event title'
            />
            {errors.eventTitle && <span className="text-error">{errors.eventTitle.message}</span>}
          </div>

          {/* input event category */}
          <div className="form-category flex gap-2">
            <label className="label">
              <span className="label-text font-medium">Event Category
                <span className="text-error">*</span>
              </span>
            </label>
            <select
              className="h-6 select select-bordered"
              defaultValue=""
              {...register("eventCategories", { required: "Please select your event category" })}
            >
              <option value="" disabled>Select your event category</option>
              <option value="conferences">Conferences</option>
              <option value="workshops">Workshops</option>
              <option value="concerts">Concerts</option>
              <option value="sports">Sports</option>
            </select>
            {errors.eventCategory && <span className="text-error">{errors.eventCategory.message}</span>}
          </div>
        </div>

        {/* Date & Time */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Date & Time</h2>

          {/* Event Type selection */}
          <div className=" flex gap-2">
            <label className="label">
              <span className="label-text font-medium">Event Type <span className="text-error">*</span></span>
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="singleEvent"
                  className="radio radio-primary"
                  {...register("eventType", { required: "Please select event type" })}
                />
                <span>Single Event</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="recurringEvent"
                  className="radio"
                  {...register("eventType", { required: "Please select event type" })}
                />
                <span>Recurring Event</span>
              </label>
            </div>
            {errors.eventType && <span className="text-error">{errors.eventType.message}</span>}
          </div>

          {/* Date and Time inputs */}
          <div className="flex gap-2">

            <div>
              <label className="label">
                <span className="label-text font-medium">Start Date <span className="text-error">*</span></span>
              </label>
              <input
                type="date"
                className="input input-bordered h-10"
                {...register("startDate", { required: "Start date is required" })}
              />
              {errors.startDate && <span className="text-error">{errors.startDate.message}</span>}
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Start Time <span className="text-error">*</span></span>
              </label>
              <input
                type="time"
                className="input input-bordered h-10"
                {...register("startTime", { required: "Start time is required" })}
              />
              {errors.startTime && <span className="text-error">{errors.startTime.message}</span>}
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">End Time</span>
              </label>
              <input
                type="time"
                className="input input-bordered h-10"
                {...register("endTime")}
              />
            </div>
          </div>


          {/* Location */}

          <div>
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="flex gap-2">
              <label className="label">
                <span className="label-text font-medium">Where will your event take place?
                  <span className="text-error">*</span>
                </span>
              </label>
              <select
                className="h-6 select select-bordered"
                defaultValue=""
                {...register("eventLocation", { required: "Please select location" })}
              >
                <option value="" disabled>Please select one</option>
                <option value="bangkok">Bangkok</option>
                <option value="chiangmai">Chiangmai</option>
                <option value="phuket">Phuket</option>
                <option value="pataya">Pataya</option>
              </select>
              {errors.eventLocation && <span className="text-error">{errors.eventLocation.message}</span>}
            </div>
          </div>


          {/* Additional information */}
          <div>

            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            <div className="flex gap-2">
              <label className="label">
                <span className="label-text font-medium">
                  Event Description <span className="text-error">*</span>
                </span>
              </label>

              <textarea
                {...register("eventDescription", {
                  required: "Event description is required"
                })}
                placeholder="Describe what's special about your event & other important details."
                className="textarea textarea-bordered w-full h-32"
              ></textarea>

              {errors.eventDescription &&
                <span className="text-error text-sm mt-1">{errors.eventDescription.message}</span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;