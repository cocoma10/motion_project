"use client";
import React, { useState, useEffect, useRef } from "react";
import { SquareCheck, Play, RotateCcw, CirclePause } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

const PomodoroTimer = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  const [breakTime, setBreakTime] = useState(300); // 5 minutes in seconds
  const [isBreakActive, setIsBreakActive] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    let breakInterval;
    if (isBreakActive && breakTime > 0) {
      breakInterval = setInterval(() => {
        setBreakTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isBreakActive) {
      clearInterval(breakInterval);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    return () => clearInterval(breakInterval);
  }, [isBreakActive, breakTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      console.error("Audio playback is not supported by the user's browser.");
    }
  };

  const resetTimer = () => {
    setTime(1500);
    setIsActive(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const toggleBreakTimer = () => {
    setIsBreakActive(!isBreakActive);
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      console.error("Audio playback is not supported by the user's browser.");
    }
  };

  const resetBreakTimer = () => {
    setBreakTime(300);
    setIsBreakActive(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mt-4">
      <audio ref={audioRef} src="/effects/going.mp3" />

      <Tabs defaultValue="session" className="w-[350px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="session">Session</TabsTrigger>
          <TabsTrigger value="break">Break</TabsTrigger>
        </TabsList>

        <TabsContent value="session">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex">
                  <SquareCheck size={25} />
                  <div className="ml-1 font-semibold">Focus Pomodoro</div>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex justify-center">
                <div className="rounded-full bg-black text-white text-center w-[180px] h-[180px] flex items-center justify-center">
                  <span className="text-[35px] font-bold">{formatTime(time)}</span>
                </div>
              </div>

              <div className="flex justify-center mt-3">
                <button
                  onClick={toggleTimer}
                  className="bg-black text-white rounded-full p-3 mr-4"
                >
                  {isActive ? <CirclePause size={30} /> : <Play size={30} />}
                </button>
                <button
                  onClick={resetTimer}
                  className="bg-black text-white rounded-full p-3"
                >
                  <RotateCcw size={30} />
                </button>
              </div>
            </CardContent>

            <CardFooter>
              <p className="text-[12px]">
                Believe in your abilities, stay focused, and remember that every bit of effort you put into your studies brings you one step closer to success!
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="break">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex">
                  <SquareCheck size={25} />
                  <div className="ml-1 font-semibold">Break Pomodoro</div>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex justify-center">
                <div className="rounded-full bg-black text-white text-center w-[180px] h-[180px] flex items-center justify-center">
                  <span className="text-[35px] font-bold">{formatTime(breakTime)}</span>
                </div>
              </div>

              <div className="flex justify-center mt-3">
                <button
                  onClick={toggleBreakTimer}
                  className="bg-black text-white rounded-full p-3 mr-4"
                >
                  {isBreakActive ? <CirclePause size={30} /> : <Play size={30} />}
                </button>
                <button
                  onClick={resetBreakTimer}
                  className="bg-black text-white rounded-full p-3"
                >
                  <RotateCcw size={30} />
                </button>
              </div>
            </CardContent>

            <CardFooter>
              <p className="text-[13px]">
                Make changes to your account here. Click save when you're done.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PomodoroTimer;
