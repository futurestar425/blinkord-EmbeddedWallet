"use client";

import { useState, useEffect } from "react";
import { BlinkPreview } from "@/components/blink/blink-display";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { MotionInput, MotionButton } from "@/components/motion";
import { Separator } from "@/components/ui/separator";

export default function SuccessPage() {
  const [blinkUrl, setBlinkUrl] = useState("");
  const [serverId, setServerId] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Set the serverId based on the URL path
    const id = window.location.pathname.split('/')?.at(-2);
    if (id) setServerId(id);
  }, []);

  useEffect(() => {
    // Only proceed if serverId is set
    if (!serverId) {
      return;
    }

    setBlinkUrl(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/${serverId}`);
    setCustomUrl(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/${serverId}`);

    const shootConfetti = () => {
      const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["star"],
        colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
      };

      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    };

    shootConfetti();
    const timer = setInterval(shootConfetti, 3000);

    return () => clearInterval(timer);
  }, [serverId]);

  const handleShare = (platform: string) => {
    if (platform === "discord") {
      window.open(
        `https://discord.com/channels/${serverId}`,
        "_blank"
      );
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=Check%20out%20this%20Blink!%20${encodeURIComponent(blinkUrl)}`,
        "_blank"
      );
    }
  };

  const copyCustomUrl = () => {
    navigator.clipboard.writeText(customUrl);
    toast({
      title: "Custom URL Copied!",
      description: "The custom URL has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-navy-900"
        >
          Blink Created Successfully! 🎉
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 text-navy-900">
              Your Blink
            </h2>
            <div className="mb-6 bg-gray-100 p-4 rounded-lg">
              <BlinkPreview
                serverId={serverId}
                code={''}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 text-navy-900">
              Your custom blink URL
            </h2>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <MotionInput
                type="text"
                value={customUrl}
                readOnly
                className="flex-grow mr-4"
                whileFocus={{ scale: 1.05 }}
              />
              <MotionButton
                onClick={copyCustomUrl}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CopyIcon className="mr-2 h-4 w-4" />
                Copy URL
              </MotionButton>
            </div>
            <Separator className="my-4" />

            <h2 className="text-2xl font-semibold mb-4 text-navy-900">
              Share Your Blink
            </h2>
            <p className="mb-6 text-gray-600">
              Share the URL with other people so they can gain access to your Discord's premium roles
            </p>
            <div className="flex flex-col space-y-4">
              <Button
                onClick={() => handleShare("twitter")}
                className="bg-[#1DA1F2] hover:bg-[#0D8BF2] text-white"
              >
                <Image
                  src="/images/twitter.png"
                  alt="Twitter"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Share on Twitter
              </Button>
              <Button
                onClick={() => handleShare("discord")}
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
              >
                <Image
                  src="/images/discord.svg"
                  alt="Discord"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Share on Discord
              </Button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
