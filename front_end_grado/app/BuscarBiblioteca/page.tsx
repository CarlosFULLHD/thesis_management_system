"use client";
import ReactPlayer from "react-player";
import SearchForm from "./components/SearchForm";
import SearchInfo from "./components/SearchInfo";
import SearchTitle from "./components/SearchTitle";



const BuscarBiblioteca = () => {
  const videoUrl = '/video-tutorial.mp4'; 
  return (
    <>
    
      <SearchTitle/>
      <SearchForm/>
      <video src={videoUrl} autoPlay muted width="1320" height="1240" controls preload="auto">
        Your browser does not support the video tag.
      </video>

      <SearchInfo/>
      </>
    
  );
};

export default BuscarBiblioteca;


