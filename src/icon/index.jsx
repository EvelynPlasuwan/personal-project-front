
export const LogoLocation = (props) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#fff"
      {...props}
      className="h-[10px]"
    >
      <path d="M16 1l-1-1L0 6v2l7 1 1 7h2l6-15z" fill="#000" />
    </svg>
  )
}


export const Banner = () => {
  return (
    <div className="w-full h-[400px] flex justify-center items-center bg-[#2B293D] relative">
      <img src="/banner.webp" alt="Event Banner" className="w-full h-full object-cover" />
    </div>
  );
}
export const Ticket = () => {
  return (

      <img src="/tickethead.png" alt="event ticket" className="w-full h-full" />

  );
}

export const CloseButton = () => {
  return (
    <button 
    className="text-gray-400 hover:text-gray-600"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path 
        strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" 
        />
      </svg>
    </button>
  )
}

export const DropdownArrow = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L12 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5z"
        fill="#000"
      />
    </svg>
  )
}

export const Conference = () => (
  <div className="w-24 rounded-full">
    <img src="conference.jpg" alt="Conference" />
  </div>
);

export const Workshop = () => (
  <div className="w-24 rounded-full">
    <img src="workshop.webp" alt="Workshop" />
  </div>
);

export const Concert = () => (
  <div className="w-24 rounded-full">
    <img src="concert.jpg" alt="Concert" />
  </div>
);

export const Sport = () => (
  <div className="w-24 rounded-full">
    <img src="sport.png" alt="Sport" />
  </div>
);
