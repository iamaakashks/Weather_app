import React from 'react';
import Weather from "./components/Weather.jsx";
export default function App(){
  return (
    <div className="bg-gradient-to-br from-zinc-500 to-zinc-800 w-full h-screen font-['inter'] flex justify-center items-center">
      <Weather />
    </div>
  )
}