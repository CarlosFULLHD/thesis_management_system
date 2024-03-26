"use client";
import ReactPlayer from "react-player";
import SearchForm from "./components/SearchForm";
import SearchInfo from "./components/SearchInfo";
import SearchTitle from "./components/SearchTitle";



const BuscarBiblioteca = () => {
  const videoUrl = '/../../public/video-tutorial.mp4';
  return (
    <>
    
      <SearchTitle/>
      <SearchForm/>
      <ReactPlayer
        url = {videoUrl}
        width='40%'
        height='40%'
              />
      <SearchInfo/>
      </>
    
  );
};

export default BuscarBiblioteca;


