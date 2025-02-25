
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
    <div className="w-full h-[400px] flex justify-center items-center bg-[#2B293D]">
      <img src="/banner.webp" alt="Event Banner" className="w-full h-full object-cover" />
    </div>
  );
}