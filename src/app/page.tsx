'use client';
import { useState, useEffect } from "react";
import post from "./api/post";

export default function Home() {
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortenedURL, setShortenedURL] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [array, setArray] = useState<kecilinType[]>([]);
  
  useEffect(() => {
    const storedArray = getArrayFromLocalSrorage('kecilin');
    console.log(storedArray);
    setArray(storedArray);
}, []); // Empty dependency array to run only once

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedURL);
      setTooltipVisible(true);
      setTimeout(() => {
        setTooltipVisible(false);
      }, 2000);  // hide tooltip after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  interface kecilinType {
    id?: number;
    url: string;
    slug: string;
}

  
  const setToArrayLocalStorage = (key: string, value: kecilinType) => {
    if (typeof window !== 'undefined') {
      const current = localStorage.getItem(key);
      if (current) {
        const array = JSON.parse(current);
        value.id = array.length + 1;
        array.push(value);
        localStorage.setItem(key, JSON.stringify(array));
        setArray(array);
      } else {
        value.id = 1;
        const array = [value];
        localStorage.setItem(key, JSON.stringify(array));
        setArray(array);
      }
    }
  };

  const getArrayFromLocalSrorage = (key: string) => {
    if (typeof window !== 'undefined') {
      const current = localStorage.getItem(key);
      if (current) {
        const parsedArray = JSON.parse(current);
        
        // Sort the array by id in descending order
        const sortedArray = parsedArray.sort((a: kecilinType, b: kecilinType) => b.id! - a.id!);
        
        return sortedArray;
      }
    }
    return [];
};


        

    

 const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await post({ url, slug });
      setShortenedURL(response.data);
      setToArrayLocalStorage('kecilin', { url, slug });
      setUrl('');
      setSlug('');
    } catch (error) {
      console.error("Error shortening URL:", error);
      setShortenedURL('Error shortening the URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <h1 className={`text-5xl`}>Kecilin</h1>

      <h2 className={`sm:text-sm md:text-xl text-opacity-50 mb-20`}>
        Short your url right away, no login, expired in 30 days, use your own
        slug!
      </h2>

      <form method="post" onSubmit={handleSubmit}>
        <div className="flex-container justify-between">
          <div className="mb-6 flex-item w-96 mt-6">
            <label className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your URL
            </label>
            <input
              placeholder="https://kecilin.com/"
              required
              value={url}
        onChange={(e) => setUrl(e.target.value)}
              name="url"
              id="large-input"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6 flex-item w-96">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Slug
            </label>
            <input
              disabled={loading}
              required
              placeholder="Kecilin2023 (optional)"
              type="text"
              name="shortcode"
              id="large-input"
              value={slug}
        onChange={(e) => setSlug(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="btn-group w-full justify-items-center mb-6">
            <button className="btn w-full btn-outline btn-primary text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5">
            {loading ? '🔄 Loading...' : 'Shrink It'}
            </button>
          </div>
         
        </div>
        <div 
        className="flex items-center justify-center w-full text-center align-middle justify-items-center"
        onClick={copyToClipboard}
        style={{ position: 'relative' }}
      >
        {shortenedURL && (
           <h2 
           className={`p-2 sm:text-sm md:text-xl text-opacity-50 mb-20 hover:bg-slate-800 w-fit cursor-pointer rounded-md border-2 animate-rotatingColors`}
         >
            {shortenedURL}
         </h2>
        )}


        
        {tooltipVisible && (
          <div 
            style={{ 
              position: 'absolute', 
              top: '-30px', 
              background: '#333', 
              color: '#fff', 
              padding: '5px 10px', 
              borderRadius: '5px',
              fontSize: '0.8rem',
            }}
          >
            URL has been copied!
          </div>
        )}
                 

      </div>
      
      </form>

{array.length > 0 && (
  <div className="flex flex-col items-center justify-center p-4 rounded-s">
    <h2 className="text-2xl mb-4">History</h2>
    <div className="flex flex-col items-center justify-center">
      {array.map((item: kecilinType, index: number) => (
        <div key={index} className="flex flex-col items-center justify-center w-full bg-slate-800 p-2 border-1 border-white mb-2">
          <a className="hover:text-white text-gray-500" target="_blank" rel="noopener noreferrer" href={`http://kecilin.vercel.app/${item.slug}`}>
            <p className="text-l">http://kecilin.vercel.app/{item.slug}</p>
          </a>
        </div>
      ))}
    </div>
  </div>
)}


     
      
    </main>
  );
}
