import { useState, useRef } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface CropEditorProps {
  baseImage: string;
  onSave: (croppedImage: string) => void;
}

export default function CropEditor({ baseImage, onSave }: CropEditorProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSave = async () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image || !completedCrop) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    const croppedImage = canvas.toDataURL('image/png', 1.0);
    onSave(croppedImage);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={undefined}
        >
          <img
            ref={imageRef}
            src={baseImage}
            alt="Crop me"
            className="max-w-full"
          />
        </ReactCrop>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          저장
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
} 