import { Loader } from "lucide-react";
import React from "react";

export default function Loading() {
  const arr = [
    "Good things come to those who wait—just a moment more!",
    "Patience is a virtue; awesome things are coming your way.",
    "Loading… Crafting excellence, one moment at a time.",
    "Rome wasn't built in a day, and neither is your job profile.",
  ];
  const random = Math.floor(Math.random() * arr.length);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Loader className="animate-spin w-10 h-10" />
      <div className="text-4xl text-blue-600">{arr[random]}</div>
    </div>
  );
}
