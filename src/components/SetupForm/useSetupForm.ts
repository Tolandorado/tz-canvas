import { useState } from "react";
import type { ISetupFormProps } from "./SetupForm";

export const useSetupForm = ({onCreate}: ISetupFormProps) => {
    const [width, setWidth] = useState(24);
    const [height, setHeight] = useState(16);
  
    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const normalizedWidth = Math.max(4, Math.min(200, Number(width) || 0));
      const normalizedHeight = Math.max(4, Math.min(200, Number(height) || 0));
  
      onCreate({ width: normalizedWidth, height: normalizedHeight });
    };

  return { width, height, setWidth, setHeight, handleSubmit };
};