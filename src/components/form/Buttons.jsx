
import { Loader } from 'lucide-react';
function Buttons({ isSubmitting, label }) {
  return (
    <button
    disabled= {isSubmitting}
      className="w-full bg-[#2B293D] text-white rounded-md py-2 font-medium hover:bg-opacity-90 transition-colors"
    >
      {
      isSubmitting 
      ? <div className='flex gap-2'>
            <Loader className='animate-spin'/> 
            <p>Loading...</p>
        </div> 
      : <p>{label}</p>
      }
    </button>
  );
}
export default Buttons;