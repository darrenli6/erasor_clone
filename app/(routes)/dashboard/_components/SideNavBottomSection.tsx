import { Button } from "@/components/ui/button";
import { Archive, Flag, Github } from "lucide-react";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

function SideNavButtomSection({ onFileCreate,totalFiles }: any) {
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      path: "",
      icon: Flag,
    },
    {
      id: 2,
      name: "Github",
      path: "",
      icon: Github,
    },
    {
      id: 2,
      name: "Archive",
      path: "",
      icon: Archive,
    },
  ];

  const [fileInput, setFileInput] = useState("");

  return (
    <div>
      {menuList.map((menu, index) => (
        <h2
          key={index}
          className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer"
        >
          <menu.icon className="h-4 w-4" />
          {menu.name}
        </h2>
      ))}

      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="w-full bg-blue-500 text-white mt-4 hover:bg-blue-600 mt-3">
            New File
          </Button>
        </DialogTrigger >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              <Input
                placeholder="Enter File Name"
                className="mt-4"
                value={fileInput}
                onChange={(e) => setFileInput(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="">
            <DialogClose asChild>
              <Button
                type="button"
                onClick={()=>onFileCreate(fileInput)}
                disabled={!(fileInput.length > 0 && fileInput.trim())}
                variant="secondary"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="h-4 w-full bg-gray-200 rounded-md mt-4">
        <div style={{ width: `${(totalFiles/5)*100}%` }} className={`h-4  bg-blue-500 rounded-md`}></div>
      </div> 
      <h2 className="text-[12px]  mt-3">
        <strong>{totalFiles}</strong> out of <strong>5</strong>
      </h2>
      <h2 className="text-sm text-gray-500 mt-2">Upgrade to Pro</h2>
    </div>
  );
}

export default SideNavButtomSection;
