import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import EventDetails from './components/EventDetails.jsx';
import EventBanner from './components/EventBanner.jsx';
import EventTicketing from './components/EventTicketing.jsx';
import EventReview from './components/EventReview.jsx';
import axios from 'axios';
import useAuthStore from '../../../../store/auth-store.jsx';
import { actionCreateEvent } from '../../../../api/auth.jsx';
import {useNavigate} from "react-router"
import UserEvents from '../../../../pages/user/UserEvents.jsx';


const EventCreationForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const methods = useForm();
    const { user, token } = useAuthStore();
    const navigate = useNavigate();

    console.log(user)
    const steps = [
        { id: 'details', title: 'Info', component: EventDetails },
        { id: 'banner', title: 'Banner', component: EventBanner },
        { id: 'ticketing', title: 'Ticketing', component: EventTicketing },
        { id: 'review', title: 'Review', component: EventReview },
        { id: 'publish', title: 'Publish!!', component: UserEvents},
    ];

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const CurrentStepComponent = steps[currentStep].component;

    // const onSubmit = async (data) => {
    //     if (currentStep === steps.length - 1) {
    //         const formData = new FormData();
    //         formData.append('eventBanner', data.eventBanner);
    //         formData.append('eventTitle', data.eventTitle); // เพิ่มข้อมูลอื่นๆ ตามต้องการ

    //         try {
    //             const response = await axios.post('/api/event', formData, {
    //                 headers: { 'Content-Type': 'multipart/form-data' },
    //             });
    //             console.log('บันทึกสำเร็จ:', response.data);
    //             methods.reset();
    //         } catch (error) {
    //             console.error('เกิดข้อผิดพลาด:', error);
    //         }
    //     } else {
    //         nextStep();
    //     }
    // };


    useEffect(() => {
        console.log('Current auth state:', {
            hasUser: !!user,
            hasToken: !!token
        });
    }, [user, token]);
    // front-end/src/components/feature/createEvent/EventCreationForm.jsx
    
    const onSubmit = async (data) => {
        if (!token) {
            alert('Please login first');
            return;
        }
        // First upload image to cloudinary
        if(currentStep === steps.length - 1){

            const formData = new FormData();
            formData.append('image', data.eventBanner);
            console.log(data)
        

        try {
            // Upload image first
            const uploadResponse = await axios.post('http://localhost:8899/api/images/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // สร้างรูปแบบวันที่และเวลาที่ถูกต้อง
            const formattedDate = `${data.startDate}T${data.startTime}:00`;

            // Then create event with all required fields
            const eventData = {
                userId: user.id,
                eventTitle: data.eventTitle,
                description: data.eventDescription,
                eventDate: formattedDate, // ส่ง format วันที่ที่ถูกต้อง
                location: data.eventLocation,
                latitude: data.latitude || 0, // เพิ่ม latitude
                longitude: data.longitude || 0, // เพิ่ม longitude
                tickets: data.tickets, // ส่ง array ของ tickets
                eventType: data.eventType, // เพิ่ม eventType
                eventBanner: uploadResponse.data.url,
                endTime: data.endTime,
                eventCategories: data.eventCategories, 
                status: 'PENDING',
                isApproved: false
                            };

            console.log('Creating event with data:', eventData);

            // Use actionCreateEvent instead of direct axios call
            const response = await actionCreateEvent(token, eventData);

            if (response.error) {
                console.error('Event creation failed:', response.error);
                alert(response.error);
                return; // ออกจากฟังก์ชันถ้ามี error
            }

            console.log('Event Created:', response.data);
            methods.reset(); // เรียกครั้งเดียวหลังจากสร้าง event สำเร็จ
            alert('Event created successfully!');
            navigate('/user/user-events');

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create event');
        }
    } else {
        nextStep();
    }
    }

    return (
        <FormProvider {...methods}>
            <form 
            onSubmit={methods.handleSubmit(onSubmit)}
            className='text-xs'
            >
                <p className='card-title mb-4 text-[#2B293D] text-2xl font-semibold '>Create a New Event</p>

                {/* แถบความคืบหน้า */}
                <div className="steps steps-horizontal w-full mb-6">
                    {steps.map((step, index) => (
                        <div key={step.id} className={`step ${index <= currentStep ? 'step-primary' : ''}`}>
                            {step.title}
                        </div>
                    ))}
                </div>

                {/* ส่วนของฟอร์มปัจจุบัน */}
                <CurrentStepComponent 
                
                />

                {/* ปุ่มนำทาง */}
                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="btn btn-outline"
                    >
                        Back
                    </button>

                    <button
                        type={currentStep === steps.length - 1 ? "submit" : "button"}
                        onClick={currentStep === steps.length - 1 ? undefined : nextStep}
                        className="btn btn-primary"
                    >
                        {currentStep === steps.length - 1 ? 'Publish Event' : 'Next'}
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default EventCreationForm;