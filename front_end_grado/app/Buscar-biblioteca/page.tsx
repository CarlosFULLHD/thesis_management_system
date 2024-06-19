"use client";
import ReactPlayer from "react-player";
import SearchForm from "./components/SearchForm";
import SearchInfo from "./components/SearchInfo";
import SearchTitle from "./components/SearchTitle";



const BuscarBiblioteca = () => {
  const videoUrl = '/video/video-tutorial.mp4'; 
  return (
    <>
    
      <SearchTitle/>
      <SearchForm/>
      <div className="lg:basis-1/2 lg:p-6">
      <video 
        src={videoUrl} 
        autoPlay 
        muted 
        loop
        width="1220" 
        height="1140" 
        controls preload="auto">
        Your browser does not support the video tag.
      </video>
      </div>
      <SearchInfo/>
      </>
    
  );
};

export default BuscarBiblioteca;


