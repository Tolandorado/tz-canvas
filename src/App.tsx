import { useRef, useState } from 'react';
import type { TSize } from './types/types';
import { Aquarium } from './core/Aquarium';
import { SetupForm } from './components/SetupForm/SetupForm';
import { WaterControls } from './components/WaterControls/WaterControls';
import './index.css';

function App() {
  const [gridSize, setGridSize] = useState<TSize | null>(null);
  const aquariumRef = useRef<Aquarium | null>(null);

  const handleCreateGrid = (size: TSize) => {
    aquariumRef.current = new Aquarium(size);
    setGridSize(size);
  };

  const handleWaterChanged = () => {
    // TODO
  };

  return (
    <div className="app">
      <h1 className="app_title">Aquarium Canvas</h1>

      <SetupForm onCreate={handleCreateGrid} />

      {!gridSize && <p>Укажите размеры сетки и нажмите «Создать», чтобы начать.</p>}

      {gridSize && (
        <div className="app_content">
          <p>
            Сетка создана: {gridSize.width} × {gridSize.height}
          </p>

          <WaterControls aquarium={aquariumRef.current} onChange={handleWaterChanged} />

          {/* TODO canvas */}
        </div>
      )}
    </div>
  );
}

export default App;
