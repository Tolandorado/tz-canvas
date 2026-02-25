import { useState, useEffect } from 'react';
import type { IWaterControlsProps } from './WaterControls';

export const useWaterControls = ({ aquarium, onChange }: IWaterControlsProps) => {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (!aquarium) {
      setLevel(0);
      return;
    }

    setLevel(aquarium.getWaterLevel());
  }, [aquarium]);

  const handleChange = (nextLevel: number) => {
    setLevel(nextLevel);

    if (!aquarium) {
      return;
    }

    aquarium.setWaterLevel(nextLevel);
    onChange?.();
  };

  return {
    level,
    handleChange,
  };
};

