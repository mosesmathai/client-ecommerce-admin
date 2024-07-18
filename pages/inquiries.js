import Layout from "@/components/Layout";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Spinner from '@/components/Spinner';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeContext } from "@/components/ThemeContext";

export default function Inquiries() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {colorTheme} = useContext(ThemeContext);
  const matches = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/messages').then(response => {
      setMessages(response.data);
      setIsLoading(false);
    });
  }, [])

  if (matches) {
    return (
      <Layout>
        <div className="new-theme-options">
          <div className="flex justify-center">
            <h1 className="text-2xl m-0">Inquiries Received</h1>
          </div>
          <h1 className="text-lg text-gray-400 m-0">P.M.O.C: Prefered Mode of Communication</h1>
          
          <table className="basic text-sm" id={colorTheme}>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Full Names</th>
                <th>Phone No</th>     
                <th>P.M.O.C</th> 
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={7}>
                    <div className='py-2 flex justify-center'>
                      <Spinner />
                    </div>
                  </td>
                </tr>
              )} 
              {messages.length > 0 && messages.map(message => (          
                <tr key={message._id}>
                  <td>{(new Date(message.createdAt)).toLocaleString()}</td>
                  <td>
                    {message.fullName}
                  </td>
                  <td>0{message.phone}</td>
                  <td>{message.communication}</td>
                  <td>{message.message}</td>
                </tr> 
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <div className="new-theme-options">
          <div className="flex justify-center">
            <h1 className="text-2xl m-0">Inquiries Received</h1>
          </div>
          <h1 className="text-sm text-gray-400 m-0">P.M.O.C: Prefered Mode of Communication</h1>  
          <div>
            <div>
              {isLoading && (
                <div>
                  <div>
                    <div className='py-2 flex justify-center'>
                      <Spinner />
                    </div>
                  </div>
                </div>
              )} 
              {messages.length > 0 && messages.map(message => (          
                <div id={colorTheme} className="border-2 font-mono pl-2" key={message._id}>
                  <div>{(new Date(message.createdAt)).toLocaleString()}</div>
                  <div>
                    <b>Name&#58;</b> {message.fullName}
                  </div>
                  <div>
                    <b>Contact&#58;</b> 0{message.phone} &#45; {message.communication}
                  </div>
                  <div>
                    <b>Message from Client&#58;</b>
                  </div>
                  <div>{message.message}</div>
                </div> 
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}