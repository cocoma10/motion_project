"use client";
import React from "react";
import Heading from "./_comps/Heading";
import Heroes from "./_comps/Heroes";
import { useEffect,useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useUser } from "@clerk/nextjs";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
const MarketingPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useUser();
  const handleSend = async (e) => {
    e.preventDefault();
    if (!email || !message) {
      toast.error("Message Failed");
    } else {
      const data = { email, message, user_id: user.id };
      try {
        const respo = await fetch("http://localhost:3000/api/emails", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (respo.ok) {
          console.log("success");
          toast.success("Message sent");
        } else {
          console.log("error!!");
          toast("Message Failed ", {
            style: {
              backgroundColor: "#f44336",
              color: "#fff",
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
      setEmail("");
      setMessage("");
    }
  };
  {
    /*
  if (!user) {
    return (
      <div className="flex min-h-full  flex-col justify-center items-center overflow-hidden">
        <div className="flex flex-col items-center justify-center md:justify-start  gap-y-8 flex-1 px-6 pb-10">
          <Heading />
          <Heroes />
        </div>
      </div>
    ); // or any other loading indicator
  }
 */
  }
  return (
    <div className="justify-center items-center ">
      <div className="items-center justify-center md:justify-start  px-6 pb-10">
        <Heading />
        {/*        <span>Hello {user.fullName}!</span>
         */}
        <p className="font-bold text-[25px] bg-[#9cc9f0] pl-2 rounded-lg mt-20 dark:text-black mx-5 translate-x-5 ">
          Get In Touch :
        </p>
        <div className="flex relative  mt-8 mx-auto ml-[55px]">
          <div className="flex flex-wrap ">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Contact us</CardTitle>
                <CardDescription>
                  Manage your new ideas and notes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSend}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Email</Label>
                      <Input
                        id="name"
                        placeholder="Type your email here."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Message</Label>
                      <Textarea
                        placeholder="Type your message here."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />{" "}
                    </div>
                    <Button type="submit">Send</Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end">
                <p className="text-sm text-muted-foreground ">
                  Your message will be reviewd by the support team.
                </p>
              </CardFooter>
            </Card>
            <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] ml-[120px] ">
              <Image
                src="/logoo.png"
                fill
                className="object-contain dark:hidden"
                alt="Documents"
              />
              <Image
                src="/dark1.png"
                fill
                className="hidden object-contain dark:block"
                alt="Documents"
              />
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors/>
    </div>
  );
};

export default MarketingPage;
