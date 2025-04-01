import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, MapPin, User, Tag } from 'lucide-react';
import { useParams } from 'react-router';
import useAuthStore from '../store/auth-store'; 


function EventDetailPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        console.log('Fetching event with id:', id);  // debug
        const response = await axios.get(`http://localhost:8899/api/events/${id}`);
        console.log('Response:', response.data);  // debug
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);  // debug
        setError('ไม่สามารถโหลดข้อมูลอีเวนต์ได้');
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!event) return <div>Event not found</div>;

  // แปลง timestamp เป็นวันที่ที่อ่านได้
  const eventDate = new Date(event.eventDate);
  const formattedDate = eventDate.toLocaleDateString('th-TH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleTicketClick = (ticket) => {
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleProceedToPayment = () => {
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async () => {
    try {
      // Add your payment confirmation logic here
      const paymentData = {
        eventId: event.id,
        ticketId: selectedTicket.id,
        quantity: quantity,
        totalAmount: selectedTicket.price * quantity,
        userId: user.id
      };

      await axios.post('http://localhost:8899/api/payments', paymentData);
      
      // Close both modals and show success message
      setShowPaymentModal(false);
      setShowModal(false);
      alert('Payment successful!');
    } catch (error) {
      console.error('Payment error:', error);
      alert('ขอโทษด้วยค่ะ ทำระบบ Payment ไม่ทัน  ^ ^" ');
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Event Banner */}
        <div className="relative h-[400px] w-full mb-8">
          <img 
            src={event.eventBanner} 
            alt={event.eventTitle}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Event Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{event.eventTitle}</h1>
            
            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <User className="w-5 h-5" />
              <span>จัดโดย: {event.user}</span>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
              <p className="whitespace-pre-line">{event.description}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Date</h3>
                    <p>{formattedDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Time</h3>
                    <p>Start: {eventDate.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}</p>
                    <p>End: {event.endTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="capitalize">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Category</h3>
                    <p>{event.eventCategories}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-semibold mb-4">Tickets</h2>
              {event.tickets && JSON.parse(event.tickets).length > 0 ? (
                <div className="space-y-4">
                  {JSON.parse(event.tickets).map((ticket, index) => (
                    <div key={index} className="border-b pb-4">
                      <h3 className="font-semibold">{ticket.name}</h3>
                      <p className="text-lg">
                        {ticket.price === "0" || ticket.price === 0 ? 'Free' : `฿${ticket.price}`}
                      </p>
                      <button 
                        className="btn btn-primary w-full mt-2"
                        disabled={event.status !== 'APPROVED'}
                        onClick={() => handleTicketClick(ticket)}
                      >
                        {event.status === 'APPROVED' ? 
                          (ticket.price === "0" || ticket.price === 0 ? 'Register' : 'Buy Ticket') 
                          : 'Event Pending'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='font-semibold text-sky-500'>FREE ENTRY</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Buy Ticket Modal */}
      {showModal && selectedTicket && (
        <div className="modal modal-open">
          <div className="modal-box max-w-[500px]">
            <h3 className="font-bold text-lg mb-4">Buy Ticket</h3>
            
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Event</p>
                <p>{event.eventTitle}</p>
              </div>
              
              <div>
                <p className="font-semibold">Ticket Type</p>
                <p>{selectedTicket.name}</p>
              </div>
              
              <div>
                <p className="font-semibold">Price</p>
                <p>{selectedTicket.price === "0" || selectedTicket.price === 0 ? 
                    'Free' : `฿${selectedTicket.price}`}</p>
              </div>

              <div>
                <p className="font-semibold">Date</p>
                <p>{formattedDate}</p>
              </div>

              <div>
                <label className="font-semibold">Quantity</label>
                <input 
                  type="number" 
                  className="input input-bordered w-full mt-1" 
                  min="1"
                  max="10"
                  defaultValue="1"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-action">
              <button 
                className="btn btn-primary"
                onClick={selectedTicket.price === "0" || selectedTicket.price === 0 ? 
                  handleConfirmPayment : handleProceedToPayment}
              >
                {selectedTicket.price === "0" || selectedTicket.price === 0 ? 
                  'Confirm Registration' : 'Proceed to Payment'}
              </button>
              <button 
                className="btn" 
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-[400px]">
            <h3 className="font-bold text-xl mb-4">Payment QR Code</h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <p className="font-semibold mb-2">Total Amount</p>
                <p className="text-2xl text-primary">฿{selectedTicket.price * quantity}</p>
              </div>
              
              <div className="flex justify-center">
                <img 
                  src="/qrcode2.jpg" // Add your QR code image path here
                  alt="Payment QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>Please scan QR code to proceed with payment</p>
                <p>The ticket will be issued after payment confirmation</p>
              </div>
            </div>

            <div className="modal-action">
              <button 
                className="btn btn-primary"
                onClick={handleConfirmPayment}
              >
                Confirm Payment
              </button>
              <button 
                className="btn" 
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EventDetailPage;