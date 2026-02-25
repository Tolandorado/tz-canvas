import type { TSize } from '../../types/types';
import { useSetupForm } from './useSetupForm';

export interface ISetupFormProps {
  onCreate: (size: TSize) => void;
};

export function SetupForm({ onCreate }: ISetupFormProps) {
  
const { width, height, setWidth, setHeight, handleSubmit } = useSetupForm({ onCreate });

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-end',
        marginBottom: '1rem',
      }}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <span>Ширина сетки</span>
        <input
          type="number"
          min={4}
          max={200}
          value={width}
          onChange={(event) => setWidth(Number(event.target.value))}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <span>Высота сетки</span>
        <input
          type="number"
          min={4}
          max={200}
          value={height}
          onChange={(event) => setHeight(Number(event.target.value))}
        />
      </label>
      <button type="submit">Создать</button>
    </form>
  );
}

