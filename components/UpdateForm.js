import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import Spinner from './Spinner'
import { ThemeContext } from './ThemeContext'


export default function UpdateForm({
  _id,
  title:existingTitle,
  message:existingMessage,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [message, setMessage] = useState(existingMessage || '');
  const [goToUpdates, setGoToUpdates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {colorTheme} = useContext(ThemeContext);

  async function saveUpdate(ev) {
    ev.preventDefault();
    const data = {
      title,message
    };
    if (_id) {
      //update
      await axios.put('/api/updates', {...data,_id});
    } else {
      //create
      await axios.post('/api/updates', data);
    }
    setGoToUpdates(true);
  }

  if (goToUpdates) {
    router.push('/updates');
  }


  return ( 
    <form onSubmit={saveUpdate} className='new-theme-options'>
      <label className='basic'>Title</label>
      <input 
        type="text" 
        placeholder='Title'
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        className='text-black' 
      />
      {isLoading && (
        <div className='py-2 flex justify-center'>
          <Spinner />
        </div>
      )}

      <label className='basic'>Message</label>
      <textarea 
        placeholder='Message'
        value={message}
        onChange={ev => setMessage(ev.target.value)}
        className='text-black' 
      >
      </textarea>

      <button type='submit' id={colorTheme} className='secondary-button-pages'>Save</button>
    </form>
  )
}