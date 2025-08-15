"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface onSubmitProp {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFormInput = ({ onSubmit }: onSubmitProp) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          required
          className="cursor-pointer"
        />
        <Button className="bg-green-600 hover:bg-green-700 cursor-pointer">
          Upload Your PDF
        </Button>
      </div>
    </form>
  );
};

export default UploadFormInput;
