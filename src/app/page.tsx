import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Header";
import Image from "next/image";
import LandingPage from "./pages/home/page";

export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <LandingPage/>
      <Footer/>
    </div>
  );
}
