import axios from 'axios';

export default async function post(data: { url: string, slug: string }) {
  console.log(data);
    return await axios.post('https://kecilin.vercel.app/shorten', {
        url: data.url,
        shortcode: data.slug 
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
}
