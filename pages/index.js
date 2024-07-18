import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { ThemeContext } from "@/components/ThemeContext";
import { useContext } from "react";
import HomeStats from "@/components/HomeStats";

export default function Home() {
  const {data: session} = useSession();
  const {colorTheme} = useContext(ThemeContext);

  
  return (
    <Layout>
      <div className="theme-options">
        <p id={colorTheme}>
          Hello&#44; {session?.user?.name}&#128521;  
        </p>
      </div>
      <HomeStats />
    </Layout>
  )
}
