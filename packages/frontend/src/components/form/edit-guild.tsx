"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ServerFormSkeleton } from "@/components/skeletons/server-form";
import { SaveIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ServerFormProps } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MotionCard,
  MotionCardContent,
  MotionInput,
  MotionTextarea,
  MotionNumberInput,
  MotionButton,
} from "@/components/motion";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  handleInputChange,
  handleDiscordRoleToggle,
  handleDiscordRolePriceChange,
} from "./form-common";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

function ServerFormEdit({
  formData,
  setFormData,
  roleData,
  setRoleData,
  formErrors,
  onSubmit,
  isLoading,
}: ServerFormProps) {
  const wallet = useWallet();
  const [roleErrors, setRoleErrors] = useState<{ [key: string]: boolean }>({});

  if (isLoading) {
    return <ServerFormSkeleton />;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 flex flex-col">
      {/* Blink Title Field */}
      <MotionCardContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Edit Blink Data ✍️</h2>
        <Separator className="my-4" />
        <Label htmlFor="name">Blink Title</Label>
        <MotionInput
          id="name"
          placeholder="Enter a title for your blink"
          value={formData.name}
          onChange={(e) =>
            handleInputChange("name", e.target.value, setFormData)
          }
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        {formErrors.name && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-destructive text-sm mt-1"
          >
            {formErrors.name}
          </motion.p>
        )}
      </MotionCardContent>

      {/* Blink Image URL Field */}
      <MotionCardContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Label htmlFor="iconUrl">Blink Image URL</Label>
        <MotionInput
          id="iconUrl"
          placeholder="Enter an image URL for your blink"
          value={formData.iconUrl}
          onChange={(e) =>
            handleInputChange("iconUrl", e.target.value, setFormData)
          }
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        {formErrors.iconUrl && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-destructive text-sm mt-1"
          >
            {formErrors.iconUrl}
          </motion.p>
        )}
      </MotionCardContent>

      {/* Blink Description Field */}
      <MotionCardContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Label htmlFor="description">Blink Description</Label>
        <MotionTextarea
          id="description"
          placeholder="Enter blink description"
          value={formData.description}
          onChange={(e) =>
            handleInputChange("description", e.target.value, setFormData)
          }
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        {formErrors.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-destructive text-sm mt-1"
          >
            {formErrors.description}
          </motion.p>
        )}
      </MotionCardContent>

      {/* Roles Section */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <MotionCardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Configure Paid Roles 👤
          </h2>
          <Separator className="my-4" />
          <ScrollArea className="max-h-80">
            {roleData.roles.length > 0 ? (
              roleData.roles.map((role) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col py-4 border-b last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Switch
                        checked={role.enabled}
                        onCheckedChange={() =>
                          handleDiscordRoleToggle(
                            role.id,
                            roleData,
                            setRoleData,
                            setFormData,
                            setRoleErrors
                          )
                        }
                        className="mr-4"
                      />
                      <h3 className="text-lg font-medium">{role.name}</h3>
                    </div>
                    <div className="flex items-center">
                      <MotionNumberInput
                        type="text"
                        placeholder="0"
                        value={role.price || ""}
                        onChange={(e) =>
                          handleDiscordRolePriceChange(
                            role.id,
                            e.target.value,
                            roleData,
                            setRoleData,
                            setFormData
                          )
                        }
                        className="w-32 mr-2 rounded-md"
                        disabled={!role.enabled}
                        whileFocus={{ scale: 1.02 }}
                        step="0.00000001"
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <span className="text-gray-600">SOL</span>
                    </div>
                  </div>
                  {roleErrors[role.id] && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-destructive text-sm mt-1"
                    >
                      The bot is unable to assign this role due to having a
                      lower position on the role list. Drag the Blinkord role
                      above the roles which you want to enable. For a tutorial
                      {" "}
                      <a
                        className="underline"
                        href="https://youtu.be/HBqebvEi8Vk?si=X72ZRggcp4ieq04G&t=10"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        visit this link
                      </a>
                    </motion.p>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">No roles available for this server.</p>
            )}
          </ScrollArea>
        </MotionCardContent>
      </MotionCard>
      <p className="text-sm text-muted-foreground text-center mt-4">
        The wallet you connect will be used to receive payments
      </p>
      {wallet.connected ? (
        <div className="flex justify-center p-4">
          <MotionButton
            type="submit"
            className="w-[40%]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SaveIcon className="mr-2 h-4 w-4" />
            Save
          </MotionButton>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full p-4">
          <WalletMultiButtonDynamic className="mymultibutton text-sm break-keep flex items-center justify-center text-white py-[18px] px-[36px] rounded-[120px]" />
        </div>
      )}
    </form>
  );
}

export default ServerFormEdit;
