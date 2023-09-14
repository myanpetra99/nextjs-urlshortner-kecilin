"use client";
import { useState } from 'react';

export default function Custom404() {
  const [showDiv, setShowDiv] = useState(false);

  function handeButtonClick(){
    setShowDiv(true);
    setTimeout(() => {
      window.location.href = "/";
    }
    , 2000);
  }
  return (
      <div className="justify-center bg-gradient-to-b from-slate-600 via-gray-500 to-black-500 h-screen flex items-center w-screen">
          <div className="flex flex-col items-center"> {/* Added items-center to center items horizontally in the flex column */}
          <h1 className={`text-sm mb-5`}>Kecilin</h1>
              <h1 className="text-2xl mb-4"> The URL is not found, it may have been expired or doesn't exist 😮‍💨</h1>
              <button onClick={handeButtonClick} className="flex-shrink-0 mx-auto rounded-full bg-black p-5 hover:bg-gradient-to-b from-yellow-600 via-orange-400 to-orange-500">Short New URL</button>
          </div>
          <div className={showDiv ? "slide-up-div show" : "slide-up-div"}>
  We're redirecting you, Good Choice!
</div>
      </div>
      
  );
}
