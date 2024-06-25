"use client";
import ReactPlayer from "react-player";
import SearchForm from "./components/SearchForm";
import SearchInfo from "./components/SearchInfo";
import SearchTitle from "./components/SearchTitle";

const BuscarBiblioteca = () => {
  const videoUrl = "https://youtu.be/0KHJ_l3ZZYE";
  return (
    <>
      <SearchTitle />
      <SearchForm />
      <div className="lg:basis-1/2 lg:p-6 px-4">
        <div
          className="relative pb-9/16 h-0 overflow-hidden max-w-full"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/0KHJ_l3ZZYE?si=EHtlwEBRzeyoa9NE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <SearchInfo />
    </>
  );
};

export default BuscarBiblioteca;
