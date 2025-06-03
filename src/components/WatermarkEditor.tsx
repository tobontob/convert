import { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';

interface WatermarkItem {
  id: string;
  type: 'text' | 'image';
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  style?: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    opacity?: number;
  };
}

interface WatermarkEditorProps {
  baseImage: string;
  onSave: (watermarkedImage: string) => void;
}

export default function WatermarkEditor({ baseImage, onSave }: WatermarkEditorProps) {
  const [watermarks, setWatermarks] = useState<WatermarkItem[]>([]);
  const [selectedWatermark, setSelectedWatermark] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string | null>(null);
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [opacity, setOpacity] = useState(0.7);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fonts = [
    'Arial',
    'Impact',
    'Verdana',
    'Courier',
    'Comic Sans MS',
    'Times New Roman'
  ];

  // 워터마크 선택 시 스타일 상태 업데이트
  useEffect(() => {
    if (selectedWatermark) {
      const watermark = watermarks.find(w => w.id === selectedWatermark);
      if (watermark && watermark.style) {
        setSelectedFont(watermark.style.fontFamily || 'Arial');
        setFontSize(watermark.style.fontSize || 24);
        setTextColor(watermark.style.color || '#FFFFFF');
        setOpacity(watermark.style.opacity || 0.7);
      }
    }
  }, [selectedWatermark, watermarks]);

  const addTextWatermark = () => {
    const newWatermark: WatermarkItem = {
      id: Date.now().toString(),
      type: 'text',
      content: '텍스트를 입력하세요',
      position: { x: 50, y: 50 },
      size: { width: 200, height: 50 },
      style: {
        fontSize,
        fontFamily: selectedFont,
        color: '#FFFFFF',
        opacity
      }
    };
    setWatermarks([...watermarks, newWatermark]);
    setSelectedWatermark(newWatermark.id);
  };

  const addImageWatermark = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newWatermark: WatermarkItem = {
        id: Date.now().toString(),
        type: 'image',
        content: e.target?.result as string,
        position: { x: 50, y: 50 },
        size: { width: 100, height: 100 },
        style: { opacity }
      };
      setWatermarks([...watermarks, newWatermark]);
      setSelectedWatermark(newWatermark.id);
    };
    reader.readAsDataURL(file);
  };

  const updateWatermark = (id: string, updates: Partial<WatermarkItem>) => {
    setWatermarks(watermarks.map(w => 
      w.id === id ? { ...w, ...updates } : w
    ));
  };

  const handleTextChange = (id: string, newText: string) => {
    updateWatermark(id, { content: newText });
  };

  const handleStyleChange = (id: string, style: Partial<WatermarkItem['style']>) => {
    const watermark = watermarks.find(w => w.id === id);
    if (watermark) {
      updateWatermark(id, {
        style: { ...watermark.style, ...style }
      });
    }
  };

  const handleSave = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 기본 이미지 로드
    const loadBaseImage = () => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          resolve(true);
        };
        img.src = baseImage;
      });
    };

    // 워터마크 이미지 로드
    const loadWatermarkImage = (watermark: WatermarkItem) => {
      return new Promise((resolve) => {
        const watermarkImg = new Image();
        watermarkImg.onload = () => {
          ctx.globalAlpha = watermark.style?.opacity || 1;
          ctx.drawImage(
            watermarkImg,
            watermark.position.x,
            watermark.position.y,
            watermark.size.width,
            watermark.size.height
          );
          resolve(true);
        };
        watermarkImg.src = watermark.content;
      });
    };

    try {
      // 기본 이미지 그리기
      await loadBaseImage();

      // 워터마크 순차적으로 그리기
      for (const watermark of watermarks) {
        if (watermark.type === 'text') {
          // 텍스트 워터마크 그리기
          ctx.font = `${watermark.style?.fontSize}px ${watermark.style?.fontFamily}`;
          ctx.fillStyle = watermark.style?.color || '#FFFFFF';
          ctx.globalAlpha = watermark.style?.opacity || 1;
          ctx.fillText(
            watermark.content,
            watermark.position.x,
            watermark.position.y + (watermark.style?.fontSize || 24)
          );
        } else {
          // 이미지 워터마크 그리기
          await loadWatermarkImage(watermark);
        }
      }

      // 최종 이미지 저장
      onSave(canvas.toDataURL());
    } catch (error) {
      console.error('Error saving watermarked image:', error);
    }
  };

  // 편집 모드 해제 핸들러
  const handleClickOutside = (e: React.MouseEvent) => {
    setEditingText(null);
  };

  return (
    <div 
      className="relative w-full min-h-[500px] bg-gray-100 p-4"
      onClick={handleClickOutside}
    >
      {/* 툴바 */}
      <div 
        className="mb-4 flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <button
          onClick={addTextWatermark}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          텍스트 추가
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && addImageWatermark(e.target.files[0])}
          className="hidden"
          id="imageInput"
        />
        <label
          htmlFor="imageInput"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
        >
          이미지 추가
        </label>

        {selectedWatermark && (
          <>
            <select
              value={selectedFont}
              onChange={(e) => {
                setSelectedFont(e.target.value);
                handleStyleChange(selectedWatermark, { fontFamily: e.target.value });
              }}
              className="px-3 py-2 border rounded"
            >
              {fonts.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setFontSize(newSize);
                handleStyleChange(selectedWatermark, { fontSize: newSize });
              }}
              className="w-20 px-3 py-2 border rounded"
              placeholder="폰트 크기"
            />
            <input
              type="color"
              value={textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
                handleStyleChange(selectedWatermark, { color: e.target.value });
              }}
              className="w-10 h-10 border rounded"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">투명도:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => {
                  const newOpacity = Number(e.target.value);
                  setOpacity(newOpacity);
                  handleStyleChange(selectedWatermark, { opacity: newOpacity });
                }}
                className="w-32"
              />
            </div>
          </>
        )}

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          저장
        </button>
      </div>

      {/* 에디터 영역 */}
      <div 
        className="relative"
        onClick={handleClickOutside}
      >
        <img src={baseImage} alt="base" className="max-w-full" />
        {watermarks.map(watermark => (
          <Rnd
            key={watermark.id}
            position={{ x: watermark.position.x, y: watermark.position.y }}
            size={{ width: watermark.size.width, height: watermark.size.height }}
            onDragStop={(e, d) => {
              updateWatermark(watermark.id, {
                position: { x: d.x, y: d.y }
              });
            }}
            onResize={(e, direction, ref, delta, position) => {
              updateWatermark(watermark.id, {
                size: {
                  width: ref.offsetWidth,
                  height: ref.offsetHeight
                },
                position
              });
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedWatermark(watermark.id);
              if (watermark.type !== 'text' || editingText !== watermark.id) {
                setEditingText(null);
              }
            }}
            className={`group ${selectedWatermark === watermark.id ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-300'}`}
            resizeHandleStyles={{
              topRight: { cursor: 'ne-resize', backgroundColor: '#ffffff', border: '2px solid #3b82f6', borderRadius: '50%', width: '12px', height: '12px', right: '-6px', top: '-6px', zIndex: 10 },
              topLeft: { cursor: 'nw-resize', backgroundColor: '#ffffff', border: '2px solid #3b82f6', borderRadius: '50%', width: '12px', height: '12px', left: '-6px', top: '-6px', zIndex: 10 },
              bottomRight: { cursor: 'se-resize', backgroundColor: '#ffffff', border: '2px solid #3b82f6', borderRadius: '50%', width: '12px', height: '12px', right: '-6px', bottom: '-6px', zIndex: 10 },
              bottomLeft: { cursor: 'sw-resize', backgroundColor: '#ffffff', border: '2px solid #3b82f6', borderRadius: '50%', width: '12px', height: '12px', left: '-6px', bottom: '-6px', zIndex: 10 }
            }}
            resizeHandleClasses={{
              topRight: 'opacity-0 group-hover:opacity-100 transition-opacity',
              topLeft: 'opacity-0 group-hover:opacity-100 transition-opacity',
              bottomRight: 'opacity-0 group-hover:opacity-100 transition-opacity',
              bottomLeft: 'opacity-0 group-hover:opacity-100 transition-opacity'
            }}
            enableResizing={selectedWatermark === watermark.id}
            disableDragging={watermark.type === 'text' && editingText === watermark.id}
          >
            {watermark.type === 'text' ? (
              <div 
                className={`w-full h-full relative ${editingText === watermark.id ? 'cursor-text' : 'cursor-move'}`}
                style={{
                  fontSize: watermark.style?.fontSize,
                  fontFamily: watermark.style?.fontFamily,
                  color: watermark.style?.color,
                  opacity: watermark.style?.opacity,
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setEditingText(watermark.id);
                  setSelectedWatermark(watermark.id);
                }}
              >
                {editingText === watermark.id ? (
                  <textarea
                    value={watermark.content}
                    onChange={(e) => handleTextChange(watermark.id, e.target.value)}
                    className="absolute inset-0 w-full h-full bg-transparent border-none resize-none focus:outline-none p-0 m-0 overflow-hidden selection:bg-blue-200 selection:bg-opacity-50"
                    style={{
                      fontSize: 'inherit',
                      fontFamily: 'inherit',
                      color: 'inherit',
                      opacity: 'inherit',
                      caretColor: watermark.style?.color || 'inherit',
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    autoFocus
                  />
                ) : (
                  <div className="w-full h-full flex items-center">
                    {watermark.content}
                  </div>
                )}
              </div>
            ) : (
              <div 
                className="w-full h-full relative cursor-move"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWatermark(watermark.id);
                  setEditingText(null);
                }}
              >
                <img
                  src={watermark.content}
                  alt="watermark"
                  className="w-full h-full object-contain"
                  style={{ opacity: watermark.style?.opacity }}
                />
              </div>
            )}
          </Rnd>
        ))}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
} 