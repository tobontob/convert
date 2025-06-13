import { useState, useRef } from 'react';

interface ResizeEditorProps {
  baseImage: string;
  onSave: (resizedImage: string) => void;
}

export default function ResizeEditor({ baseImage, onSave }: ResizeEditorProps) {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSave = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    await new Promise((resolve) => {
      img.onload = () => {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(true);
      };
      img.src = baseImage;
    });

    const resizedImage = canvas.toDataURL('image/png', 1.0);
    onSave(resizedImage);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">너비:</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-24 px-3 py-2 border rounded"
            placeholder="너비"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">높이:</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-24 px-3 py-2 border rounded"
            placeholder="높이"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="maintainAspectRatio"
            checked={maintainAspectRatio}
            onChange={(e) => setMaintainAspectRatio(e.target.checked)}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="maintainAspectRatio" className="text-sm text-gray-600">
            비율 유지
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          저장
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
} 