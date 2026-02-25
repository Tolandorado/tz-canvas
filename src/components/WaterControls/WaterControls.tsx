import type { Aquarium } from '../../core/Aquarium';
import { useWaterControls } from './useWaterControls';
import styles from './WaterControls.module.scss';

export interface IWaterControlsProps {
  aquarium: Aquarium | null;
  onChange?: () => void;
}

export function WaterControls({ aquarium, onChange }: IWaterControlsProps) {
  const { level, handleChange } = useWaterControls({
    aquarium,
    onChange,
  });

  return (
    <div className={styles.control}>
      <span className={styles.control_span}>Уровень воды: {level}%</span>
      <input
        type="range"
        min={0}
        max={100}
        value={level}
        onChange={(event) => handleChange(Number(event.target.value))}
      />
    </div>
  );
}

