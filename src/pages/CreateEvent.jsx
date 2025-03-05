import React, { useState } from 'react';
import { Outlet } from 'react-router';
import EventCreationForm from '../components/user/feature/createEvent/EventCreationForm';
// import EventDetails from '../features/create-new-event/banner/components/EventDetails';
// import Buttons from '../components/form/Buttons';
// import ReactDOM from 'react-dom';

function CreateEvent() {
  const [step, setStep] = React.useState(1)
  const [showModal, setShowModal] = useState(false)
  return (
    <div>
    {/* <nav>
      <button onClick={()=>setStep(1)}>Edit</button>
      <button onClick={()=>setStep(2)}>Banner</button>
      <button onClick={()=>setStep(3)}>Ticketing</button>
      <button onClick={()=>setStep(4)}>Review</button>
    </nav>
    {/* { step === 1 && <EventDetails/>} */}
    {/* { step === 2 && <Step2 />} */}
    {/* { step === 3 && <Step3 />} */}
    {/* { step === 4 && <Step4 />}  */}

    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                + Create Event
            </button>

            {/* Modal */}
            {showModal && (
               <div className="modal modal-open">

                    <div className="modal-box max-w-[60%]">
                <EventCreationForm/>
                    </div>

                    <div className="modal-action">
                            <button className="btn" onClick={() => setShowModal(false)}>
                                Close
                            </button>
                        </div>

                    </div>
            )}
            </div>
  )
}


function Step2() {
  return (
    <h1>This is Step 2</h1>
  )
}
function Step3() {
  return (
    <h1>This is Step 3</h1>
  )
}
function Step4() {
  return (
    <h1>This is Step 4</h1>
  )
}

export default CreateEvent;