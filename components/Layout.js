import { useSession, signIn} from "next-auth/react"
import Nav from "@/components/Nav"
import { useState } from "react"
import Logo from "./Logo";
import { useContext } from 'react';
import { ThemeContext } from "./ThemeContext";

export default function Layout({children}) {

  const [showNav,setShowNav] = useState(false);
  const { data: session } = useSession();
  const {colorTheme} = useContext(ThemeContext);
  const [loginBtnText, setLoginBtnText] = useState('Login with Google');

  function loginSetup() {
    setLoginBtnText('processing...')
    signIn('google')
    setLoginBtnText('Login with Google')
  }

  if(!session) {
    return (
      <div className="new-theme-options">
        <section id={colorTheme} className="purple-settings-main shadow">
          <button className="primary-button border text-white" onClick={loginSetup}>{loginBtnText}</button>
        </section>
      </div>
    )
  }  
    
  return (
    <div className={`app ${colorTheme} height-sizing`}>
     <div className="flex md:hidden">
        <button 
          className="ml-2 z-30"
          type="button"
          onClick={() => setShowNav(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div className="flex grow justify-center mr-4 mt-2">
          <Logo />
        </div>
     </div>
      <main className="flex">
        <div className="flex flex-col">
          <Nav show={showNav} />  
        </div>
        <div className="bg-white flex-grow m-2 rounded-md p-4">{children}</div>
      </main>
    </div>
  )

}