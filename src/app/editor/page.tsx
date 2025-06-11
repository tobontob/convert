'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { 
  ArrowUpTrayIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowPathIcon,
  ScissorsIcon,
  AdjustmentsHorizontalIcon,
  PhotoIcon,
  ArrowsUpDownIcon,
  ArrowsRightLeftIcon,
  SparklesIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '무료 온라인 이미지 편집기 | 올인원 이미지 에디터 - Image Tools',
  description: '이미지를 무료로 편집하세요. 필터, 효과, 밝기, 대비, 채도 등 다양한 편집 도구를 제공하는 온라인 이미지 편집기입니다.',
  openGraph: {
    title: '무료 온라인 이미지 편집기 | 올인원 이미지 에디터 - Image Tools',
    description: '이미지를 무료로 편집하세요. 필터, 효과, 밝기, 대비, 채도 등 다양한 편집 도구를 제공하는 온라인 이미지 편집기입니다.',
  }
}

type EditMode = 'filter' | 'adjust' | 'transform' | 'crop';

type AdjustmentValues = {
  brightness: number;
  saturation: number;
  hue: number;
  lightness: number;
  sharpen: number;
  blur: number;
  gamma: number;
};

type HistoryState = {
  file: File;
  preview: string;
  adjustments: AdjustmentValues;
  imageSize: { width: number; height: number };
};

export default function Editor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [originalPreview, setOriginalPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [editedUrl, setEditedUrl] = useState<string>('');
  const [editMode, setEditMode] = useState<EditMode>('filter');
  const [cropMode, setCropMode] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [cropData, setCropData] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);
  const [editHistory, setEditHistory] = useState<File | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const [adjustments, setAdjustments] = useState<AdjustmentValues>({
    brightness: 0,
    saturation: 0,
    hue: 0,
    lightness: 0,
    sharpen: 0,
    blur: 0,
    gamma: 0
  });
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const filters = [
    { id: 1, name: '흑백' },
    { id: 2, name: '세피아' },
    { id: 3, name: '선명하게' },
    { id: 4, name: '부드럽게' },
    { id: 5, name: '빈티지' },
    { id: 6, name: '차가운 톤' },
    { id: 7, name: '따뜻한 톤' },
  ];

  const adjustmentOptions = [
    { id: 'brightness', name: '밝기', min: -100, max: 100 },
    { id: 'saturation', name: '채도', min: -100, max: 100 },
    { id: 'hue', name: '색조', min: -180, max: 180 },
    { id: 'lightness', name: '명도', min: -100, max: 100 },
    { id: 'sharpen', name: '선명도', min: 0, max: 20 },
    { id: 'blur', name: '흐림', min: 0, max: 20 },
    { id: 'gamma', name: '감마', min: 0, max: 100 }
  ] as const;

  // 이미지 로드 시 실제 크기 저장
  const handleImageLoad = useCallback(() => {
    if (imageRef.current) {
      const img = imageRef.current;
      const rect = img.getBoundingClientRect();
      
      // 실제 이미지 크기 가져오기
      const naturalWidth = (img as any).naturalWidth;
      const naturalHeight = (img as any).naturalHeight;
      setImageSize({ width: naturalWidth, height: naturalHeight });
      
      // 화면에 표시되는 크기 저장
      setDisplaySize({ width: rect.width, height: rect.height });
    }
  }, []);

  // 이미지 업로드 시 초기화
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      setEditHistory(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreview(imageUrl);
        setOriginalPreview(imageUrl);
        
        // 이미지 크기 초기화
        const img = document.createElement('img');
        img.onload = () => {
          const initialSize = { width: img.naturalWidth, height: img.naturalHeight };
          setImageSize(initialSize);
          
          // 초기 상태를 히스토리에 추가
          const initialState: HistoryState = {
            file: file,
            preview: imageUrl,
            adjustments: {
              brightness: 0,
              saturation: 0,
              hue: 0,
              lightness: 0,
              sharpen: 0,
              blur: 0,
              gamma: 0
            },
            imageSize: initialSize
          };
          setHistory([initialState]);
          setCurrentHistoryIndex(0);
        };
        img.src = imageUrl;
      };
      reader.readAsDataURL(file);
      setEditedUrl('');
      setCropMode(false);
      setAdjustments({
        brightness: 0,
        saturation: 0,
        hue: 0,
        lightness: 0,
        sharpen: 0,
        blur: 0,
        gamma: 0
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: false
  });

  // 조정값 변경 및 이미지 처리
  const handleAdjustment = async (operation: keyof AdjustmentValues, value: number) => {
    if (!file) return;  // 원본 파일이 없으면 리턴

    // 조정값 업데이트
    const newAdjustments = {
      ...adjustments,
      [operation]: value
    };
    setAdjustments(newAdjustments);

    setLoading(true);
    const formData = new FormData();
    
    // 다른 편집이 있으면 현재 편집본을 사용, 없으면 원본 사용
    const sourceFile = editHistory || file;
    formData.append('file', sourceFile);
    formData.append('operation', 'adjustments');
    formData.append('adjustments', JSON.stringify({
      // 현재 조정 중인 값만 전달하고 나머지는 0으로 설정
      brightness: operation === 'brightness' ? value : 0,
      saturation: operation === 'saturation' ? value : 0,
      hue: operation === 'hue' ? value : 0,
      lightness: operation === 'lightness' ? value : 0,
      sharpen: operation === 'sharpen' ? value : 0,
      blur: operation === 'blur' ? value : 0,
      gamma: operation === 'gamma' ? value : 0
    }));

    try {
      const response = await fetch('/api/editor', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('편집 중 오류가 발생했습니다.');

      const blob = await response.blob();
      const editedFile = new File([blob], 'edited.jpg', { type: 'image/jpeg' });
      
      // 조정값이 0이면 이전 편집 상태로 복원
      if (value === 0) {
        if (editHistory) {
          setPreview(URL.createObjectURL(editHistory));
        } else {
          setPreview(originalPreview);
        }
      } else {
        const url = URL.createObjectURL(blob);
        setPreview(url);
      }

      // 현재 조정 중인 값이 0이 아닐 때만 히스토리 업데이트
      if (value !== 0) {
        const newState: HistoryState = {
          file: editedFile,
          preview: URL.createObjectURL(blob),
          adjustments: newAdjustments,
          imageSize: { ...imageSize }
        };
        addToHistory(newState);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('이미지 편집 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleFlip = async (direction: 'horizontal' | 'vertical') => {
    if (!editHistory) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', editHistory);
    formData.append('operation', 'flip');
    formData.append('value', '0');
    formData.append('options', JSON.stringify({
      horizontal: direction === 'horizontal',
      vertical: direction === 'vertical'
    }));

    try {
      const response = await fetch('/api/editor', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('변형 중 오류가 발생했습니다.');

      const blob = await response.blob();
      const editedFile = new File([blob], 'edited.jpg', { type: 'image/jpeg' });
      setEditHistory(editedFile);

      const url = URL.createObjectURL(blob);
      setEditedUrl(url);
      setPreview(url);
      
      updateEditHistory(editedFile, url);
    } catch (error) {
      console.error('Error:', error);
      alert('이미지 변형 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRotate = async (direction: 'left' | 'right') => {
    if (!editHistory) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', editHistory);
    formData.append('operation', 'rotate');
    formData.append('value', direction === 'left' ? '-90' : '90');

    try {
      const response = await fetch('/api/editor', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('이미지 회전 중 오류가 발생했습니다.');
      }

      // 회전된 이미지를 Blob으로 받아서 처리
      const blob = await response.blob();
      const editedFile = new File([blob], 'edited.jpg', { type: 'image/jpeg' });
      setEditHistory(editedFile);

      const url = URL.createObjectURL(blob);
      setEditedUrl(url);
      setPreview(url);

      // 이전 URL 정리
      if (editedUrl && editedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(editedUrl);
      }

      // 히스토리 업데이트
      updateEditHistory(editedFile, url);
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : '이미지 회전 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 자르기 영역 초기화
  const initializeCropArea = useCallback(() => {
    if (imageRef.current) {
      const img = imageRef.current;
      const rect = img.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;
      
      // 초기 크롭 영역을 이미지 중앙에 80% 크기로 설정
      const width = containerWidth * 0.8;
      const height = containerHeight * 0.8;
      const x = (containerWidth - width) / 2;
      const y = (containerHeight - height) / 2;
      
      setDisplaySize({ width: containerWidth, height: containerHeight });
      setCropData({ x, y, width, height });
    }
  }, []);

  // 자르기 모드 시작시 초기화
  useEffect(() => {
    if (cropMode) {
      initializeCropArea();
    }
  }, [cropMode, initializeCropArea]);

  // 자르기 함수 수정
  const handleCrop = async () => {
    if (!cropMode || !editHistory || !imageRef.current) return;
    
    try {
      // 이미지의 실제 크기와 표시 크기 가져오기
      const img = imageRef.current;
      const displayRect = img.getBoundingClientRect();

      // 이미지 로드 및 실제 크기 가져오기
      await new Promise<void>((resolve, reject) => {
        const actualImage = document.createElement('img');
        actualImage.onload = () => {
          // 이미지의 회전 상태를 확인하기 위해 메타데이터를 가져옴
          fetch('/api/editor/metadata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl: preview }),
          })
          .then(response => response.json())
          .then(metadata => {
            const orientation = metadata.orientation || 1;
            const isRotated = orientation >= 5 && orientation <= 8;
            
            // 회전 상태에 따른 실제 크기 계산
            let actualWidth = actualImage.naturalWidth;
            let actualHeight = actualImage.naturalHeight;
            
            if (isRotated) {
              [actualWidth, actualHeight] = [actualHeight, actualWidth];
            }

            // 표시 크기와 실제 크기의 비율 계산
            const scaleX = actualWidth / displayRect.width;
            const scaleY = actualHeight / displayRect.height;

            // 선택한 영역을 실제 이미지 크기 기준으로 변환
            const options = {
              left: Math.round(cropData.x * scaleX),
              top: Math.round(cropData.y * scaleY),
              cropWidth: Math.round(cropData.width * scaleX),
              cropHeight: Math.round(cropData.height * scaleY),
              orientation: orientation
            };

            // 잘라낼 영역이 실제 이미지 범위를 벗어나지 않도록 보정
            options.left = Math.max(0, Math.min(options.left, actualWidth - 1));
            options.top = Math.max(0, Math.min(options.top, actualHeight - 1));
            options.cropWidth = Math.max(1, Math.min(options.cropWidth, actualWidth - options.left));
            options.cropHeight = Math.max(1, Math.min(options.cropHeight, actualHeight - options.top));

            resolve();
            processCrop(options);
          })
          .catch(error => {
            reject(new Error('이미지 메타데이터를 가져오는 중 오류가 발생했습니다.'));
          });
        };
        actualImage.onerror = () => reject(new Error('이미지 로드 중 오류가 발생했습니다.'));
        actualImage.src = preview;
      });
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : '이미지 자르기 중 오류가 발생했습니다.');
      setLoading(false);
      setCropMode(false);
    }
  };

  // 실제 크롭 처리를 수행하는 함수
  const processCrop = async (options: { 
    left: number; 
    top: number; 
    cropWidth: number; 
    cropHeight: number;
    orientation: number;
  }) => {
    if (!editHistory) return;
    
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', editHistory);
      formData.append('operation', 'crop');
      formData.append('options', JSON.stringify(options));

      const response = await fetch('/api/editor', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '이미지 자르기 중 오류가 발생했습니다.');
      }

      const blob = await response.blob();
      const editedFile = new File([blob], 'edited.jpg', { type: 'image/jpeg' });
      setEditHistory(editedFile);

      const url = URL.createObjectURL(blob);
      setEditedUrl(url);
      setPreview(url);
      
      // 새로운 이미지 크기로 업데이트
      await new Promise<void>((resolve, reject) => {
        const newImage = document.createElement('img');
        newImage.onload = () => {
          setImageSize({
            width: newImage.naturalWidth,
            height: newImage.naturalHeight
          });
          updateEditHistory(editedFile, url);
          resolve();
        };
        newImage.onerror = () => reject(new Error('이미지 크기 업데이트 중 오류가 발생했습니다.'));
        newImage.src = url;
      });
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : '이미지 자르기 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      setCropMode(false);
    }
  };

  const handleDownload = () => {
    if (!editedUrl) return;
    
    const link = document.createElement('a');
    link.href = editedUrl;
    link.download = `edited_${file?.name || 'image.jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent, handle?: string) => {
    if (!cropMode || !imageRef.current) return;
    
    e.preventDefault();
    const imageRect = imageRef.current.getBoundingClientRect();
    const cropRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    if (handle) {
      // 크기 조절 핸들을 잡은 경우
      setResizeHandle(handle);
      setDragStartPos({
        x: e.clientX,
        y: e.clientY
      });
    } else {
      // 영역 이동을 위한 드래그 시작
      setDragStartPos({
        x: e.clientX - cropRect.left,
        y: e.clientY - cropRect.top
      });
    }
    setIsDragging(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !cropMode || !imageRef.current) return;

    e.preventDefault();
    const imageRect = imageRef.current.getBoundingClientRect();

    if (resizeHandle) {
      // 크기 조절 로직
      const deltaX = e.clientX - dragStartPos.x;
      const deltaY = e.clientY - dragStartPos.y;
      let newCropData = { ...cropData };

      switch (resizeHandle) {
        case 'nw':
          newCropData = {
            x: Math.min(cropData.x + deltaX, cropData.x + cropData.width - 50),
            y: Math.min(cropData.y + deltaY, cropData.y + cropData.height - 50),
            width: Math.max(50, cropData.width - deltaX),
            height: Math.max(50, cropData.height - deltaY)
          };
          break;
        case 'ne':
          newCropData = {
            x: cropData.x,
            y: Math.min(cropData.y + deltaY, cropData.y + cropData.height - 50),
            width: Math.max(50, cropData.width + deltaX),
            height: Math.max(50, cropData.height - deltaY)
          };
          break;
        case 'sw':
          newCropData = {
            x: Math.min(cropData.x + deltaX, cropData.x + cropData.width - 50),
            y: cropData.y,
            width: Math.max(50, cropData.width - deltaX),
            height: Math.max(50, cropData.height + deltaY)
          };
          break;
        case 'se':
          newCropData = {
            x: cropData.x,
            y: cropData.y,
            width: Math.max(50, cropData.width + deltaX),
            height: Math.max(50, cropData.height + deltaY)
          };
          break;
      }

      // 이미지 범위 제한
      newCropData.x = Math.max(0, Math.min(newCropData.x, imageRect.width - newCropData.width));
      newCropData.y = Math.max(0, Math.min(newCropData.y, imageRect.height - newCropData.height));
      newCropData.width = Math.min(newCropData.width, imageRect.width - newCropData.x);
      newCropData.height = Math.min(newCropData.height, imageRect.height - newCropData.y);

      setCropData(newCropData);
      setDragStartPos({ x: e.clientX, y: e.clientY });
    } else {
      // 영역 이동 로직
      const mouseX = e.clientX - imageRect.left;
      const mouseY = e.clientY - imageRect.top;
      const newX = mouseX - dragStartPos.x;
      const newY = mouseY - dragStartPos.y;

      // 이미지 범위 내로 제한
      const boundedX = Math.max(0, Math.min(newX, imageRect.width - cropData.width));
      const boundedY = Math.max(0, Math.min(newY, imageRect.height - cropData.height));

      setCropData(prev => ({
        ...prev,
        x: boundedX,
        y: boundedY
      }));
    }
  }, [isDragging, cropMode, dragStartPos, cropData, resizeHandle]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    e.preventDefault(); // 기본 동작 방지
    setIsDragging(false);
    setResizeHandle(null);
  }, []);

  // 마우스 이벤트 리스너
  useEffect(() => {
    if (cropMode) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [cropMode, handleMouseMove, handleMouseUp]);

  // 원래대로 돌아가기 함수
  const handleReset = async () => {
    if (!file) return;
    setLoading(true);
    setEditHistory(file);
    setPreview(originalPreview);
    setEditedUrl('');
    setCropMode(false);
    // 조정값 초기화
    const initialAdjustments = {
      brightness: 0,
      saturation: 0,
      hue: 0,
      lightness: 0,
      sharpen: 0,
      blur: 0,
      gamma: 0
    };
    setAdjustments(initialAdjustments);
    
    // 히스토리에 초기 상태 추가
    const initialState: HistoryState = {
      file: file,
      preview: originalPreview,
      adjustments: initialAdjustments,
      imageSize: { ...imageSize }
    };
    setHistory([initialState]);
    setCurrentHistoryIndex(0);
    
    setLoading(false);
  };

  // 화면 크기 변경 시 자르기 영역 조정
  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current && cropMode) {
        const rect = imageRef.current.getBoundingClientRect();
        const newDisplaySize = { width: rect.width, height: rect.height };
        
        // 화면 크기 변경에 따른 자르기 영역 비율 유지
        const scaleX = newDisplaySize.width / displaySize.width;
        const scaleY = newDisplaySize.height / displaySize.height;
        
        setCropData(prev => ({
          x: prev.x * scaleX,
          y: prev.y * scaleY,
          width: prev.width * scaleX,
          height: prev.height * scaleY
        }));
        
        setDisplaySize(newDisplaySize);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cropMode, displaySize.width, displaySize.height]);

  // 필터 적용 함수
  const handleFilter = async (filterId: number) => {
    if (!editHistory) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', editHistory); // 항상 최신 편집본 사용
    formData.append('operation', 'filter');
    formData.append('value', filterId.toString());

    try {
      const response = await fetch('/api/editor', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('편집 중 오류가 발생했습니다.');

      const blob = await response.blob();
      const editedFile = new File([blob], 'edited.jpg', { type: 'image/jpeg' });
      setEditHistory(editedFile);

      const url = URL.createObjectURL(blob);
      setEditedUrl(url);
      setPreview(url);
      
      updateEditHistory(editedFile, url);
    } catch (error) {
      console.error('Error:', error);
      alert('이미지 편집 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 히스토리에 상태 추가
  const addToHistory = useCallback((newState: HistoryState) => {
    setHistory(prev => {
      // 현재 인덱스 이후의 히스토리는 제거
      const newHistory = prev.slice(0, currentHistoryIndex + 1);
      return [...newHistory, newState];
    });
    setCurrentHistoryIndex(prev => prev + 1);
  }, [currentHistoryIndex]);

  // 실행 취소
  const handleUndo = useCallback(() => {
    if (currentHistoryIndex > 0) {
      const previousState = history[currentHistoryIndex - 1];
      setEditHistory(previousState.file);
      setPreview(previousState.preview);
      setAdjustments(previousState.adjustments);
      setImageSize(previousState.imageSize);
      setCurrentHistoryIndex(prev => prev - 1);
    }
  }, [currentHistoryIndex, history]);

  // 다시 실행
  const handleRedo = useCallback(() => {
    if (currentHistoryIndex < history.length - 1) {
      const nextState = history[currentHistoryIndex + 1];
      setEditHistory(nextState.file);
      setPreview(nextState.preview);
      setAdjustments(nextState.adjustments);
      setImageSize(nextState.imageSize);
      setCurrentHistoryIndex(prev => prev + 1);
    }
  }, [currentHistoryIndex, history]);

  // 편집 완료 후 히스토리 업데이트 함수
  const updateEditHistory = useCallback((editedFile: File, previewUrl: string) => {
    const newState: HistoryState = {
      file: editedFile,
      preview: previewUrl,
      adjustments: { ...adjustments },
      imageSize: { ...imageSize }
    };
    addToHistory(newState);
  }, [adjustments, imageSize, addToHistory]);

  // 편집 모드 변경 함수
  const handleEditModeChange = (mode: EditMode) => {
    if (editMode === 'crop' || mode !== 'crop') {
      setCropMode(false);
    }
    setEditMode(mode);
    if (mode === 'crop') {
      setCropMode(true);
      initializeCropArea();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-6xl mx-auto mobile-container">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-3 py-4 sm:p-10 bg-gradient-to-r from-indigo-500 to-purple-500">
            <h1 className="text-xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
              이미지 편집
            </h1>
            <p className="text-sm sm:text-lg text-indigo-50">
              이미지를 자유롭게 편집하세요.
            </p>
          </div>

          <div className="p-2 sm:p-10 space-y-4 sm:space-y-6">
            {!preview ? (
              <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-300 hover:border-pink-500 hover:bg-pink-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center">
                    <ArrowUpTrayIcon className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-sm sm:text-lg font-medium text-gray-700">
                      이미지를 드래그하여 놓거나 클릭하여 선택하세요
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      지원되는 형식: JPEG, PNG, WebP, GIF
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                <div className="lg:flex lg:gap-6">
                  {/* 좌측: 이미지 프리뷰 영역 */}
                  <div className="lg:flex-[3] space-y-4 sm:space-y-6">
                    <div className="relative">
                      {editedUrl && (
                        <div className="absolute top-2 right-2 z-10 flex gap-1 sm:gap-2 bg-black/20 backdrop-blur-sm p-0.5 sm:p-1 rounded-lg">
                          <div className="relative group">
                            <button
                              onClick={handleUndo}
                              disabled={currentHistoryIndex <= 0 || loading}
                              className={`p-1.5 sm:p-2 rounded-lg flex items-center justify-center ${
                                currentHistoryIndex <= 0
                                  ? 'bg-white/20 text-white/40 cursor-not-allowed'
                                  : 'bg-white/20 text-white hover:bg-white/30'
                              }`}
                              aria-label="실행 취소"
                            >
                              <ArrowUturnLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs sm:text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              실행 취소
                            </div>
                          </div>
                          <div className="relative group">
                            <button
                              onClick={handleRedo}
                              disabled={currentHistoryIndex >= history.length - 1 || loading}
                              className={`p-1.5 sm:p-2 rounded-lg flex items-center justify-center ${
                                currentHistoryIndex >= history.length - 1
                                  ? 'bg-white/20 text-white/40 cursor-not-allowed'
                                  : 'bg-white/20 text-white hover:bg-white/30'
                              }`}
                              aria-label="다시 실행"
                            >
                              <ArrowUturnRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs sm:text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              다시 실행
                            </div>
                          </div>
                          <div className="relative group">
                            <button
                              onClick={handleReset}
                              disabled={loading}
                              className="p-1.5 sm:p-2 text-white bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center"
                              aria-label="원래대로"
                            >
                              <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs sm:text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              원래대로
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-gray-50 rounded-xl p-2 sm:p-6">
                        <div className="relative max-w-full overflow-hidden rounded-lg bg-gray-100">
                          <div className="relative aspect-[3/2] w-full">
                            <Image
                              ref={imageRef}
                              src={preview}
                              alt="Preview"
                              fill
                              className="object-contain"
                              onLoad={handleImageLoad}
                              priority
                              unoptimized
                              draggable={false}
                            />
                            {cropMode && (
                              <div 
                                className="absolute inset-0 bg-black bg-opacity-50"
                                style={{ cursor: isDragging ? (resizeHandle ? 'grabbing' : 'move') : 'default' }}
                              >
                                <div
                                  ref={cropAreaRef}
                                  className="absolute select-none"
                                  style={{
                                    left: `${cropData.x}px`,
                                    top: `${cropData.y}px`,
                                    width: `${cropData.width}px`,
                                    height: `${cropData.height}px`,
                                    cursor: isDragging ? 'grabbing' : 'grab',
                                    touchAction: 'none'
                                  }}
                                  onMouseDown={(e) => handleMouseDown(e)}
                                >
                                  <div className="absolute inset-0 border-2 border-white">
                                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                                      {Array.from({ length: 2 }).map((_, i) => (
                                        <div key={`v${i}`} className="absolute top-0 bottom-0 border-l border-white border-opacity-50"
                                             style={{ left: `${((i + 1) * 100) / 3}%` }} />
                                      ))}
                                      {Array.from({ length: 2 }).map((_, i) => (
                                        <div key={`h${i}`} className="absolute left-0 right-0 border-t border-white border-opacity-50"
                                             style={{ top: `${((i + 1) * 100) / 3}%` }} />
                                      ))}
                                    </div>
                                  </div>

                                  {/* 크기 조절 핸들 */}
                                  {['nw', 'ne', 'sw', 'se'].map((handle) => (
                                    <div
                                      key={handle}
                                      className="absolute w-4 h-4 bg-white rounded-full border-2 border-gray-800"
                                      style={{
                                        top: handle.includes('n') ? '-8px' : 'auto',
                                        bottom: handle.includes('s') ? '-8px' : 'auto',
                                        left: handle.includes('w') ? '-8px' : 'auto',
                                        right: handle.includes('e') ? '-8px' : 'auto',
                                        cursor: `${handle}-resize`
                                      }}
                                      onMouseDown={(e) => {
                                        e.stopPropagation();
                                        handleMouseDown(e, handle);
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 우측: 편집 컨트롤 영역 */}
                  <div className="lg:flex-1 space-y-3 sm:space-y-6 mt-3 sm:mt-6 lg:mt-0">
                    <div className="grid grid-cols-4 lg:grid-cols-1 gap-1 sm:gap-4">
                      <button
                        onClick={() => handleEditModeChange('filter')}
                        className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg flex flex-col sm:flex-row items-center gap-1 sm:gap-2 justify-center text-xs sm:text-base ${
                          editMode === 'filter'
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        필터
                      </button>
                      <button
                        onClick={() => handleEditModeChange('adjust')}
                        className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg flex flex-col sm:flex-row items-center gap-1 sm:gap-2 justify-center text-xs sm:text-base ${
                          editMode === 'adjust'
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <AdjustmentsHorizontalIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        조정
                      </button>
                      <button
                        onClick={() => handleEditModeChange('transform')}
                        className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg flex flex-col sm:flex-row items-center gap-1 sm:gap-2 justify-center text-xs sm:text-base ${
                          editMode === 'transform'
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        변형
                      </button>
                      <button
                        onClick={() => handleEditModeChange('crop')}
                        className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg flex flex-col sm:flex-row items-center gap-1 sm:gap-2 justify-center text-xs sm:text-base ${
                          editMode === 'crop'
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <ScissorsIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        자르기
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      {editMode === 'filter' && (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-4">
                          {filters.map((filter) => (
                            <button
                              key={filter.id}
                              onClick={() => handleFilter(filter.id)}
                              disabled={loading}
                              className="px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              {filter.name}
                            </button>
                          ))}
                        </div>
                      )}

                      {editMode === 'adjust' && (
                        <div className="space-y-3 sm:space-y-4">
                          {adjustmentOptions.map((adjustment) => (
                            <div key={adjustment.id}>
                              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                {adjustment.name} ({adjustments[adjustment.id]})
                              </label>
                              <input
                                type="range"
                                min={adjustment.min}
                                max={adjustment.max}
                                value={adjustments[adjustment.id]}
                                onChange={(e) => handleAdjustment(adjustment.id, parseInt(e.target.value))}
                                disabled={loading}
                                className="w-full h-1.5 sm:h-2"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {editMode === 'transform' && (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-4">
                          <button
                            onClick={() => handleFlip('horizontal')}
                            disabled={loading}
                            className="px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 sm:gap-2 justify-center"
                          >
                            <ArrowsRightLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            좌우 반전
                          </button>
                          <button
                            onClick={() => handleFlip('vertical')}
                            disabled={loading}
                            className="px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 sm:gap-2 justify-center"
                          >
                            <ArrowsUpDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            상하 반전
                          </button>
                          <div className="col-span-2 lg:col-span-1 grid grid-cols-2 gap-2 sm:gap-4 mt-2 lg:mt-0">
                            <button
                              onClick={() => handleRotate('left')}
                              disabled={loading}
                              className="relative px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 sm:gap-2 justify-center group"
                            >
                              <span className="relative flex items-center gap-1 sm:gap-2">
                                <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-rotate-90" />
                                <span>왼쪽 회전</span>
                              </span>
                            </button>
                            <button
                              onClick={() => handleRotate('right')}
                              disabled={loading}
                              className="relative px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 sm:gap-2 justify-center group"
                            >
                              <span className="relative flex items-center gap-1 sm:gap-2">
                                <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-90" />
                                <span>오른쪽 회전</span>
                              </span>
                            </button>
                          </div>
                        </div>
                      )}

                      {editMode === 'crop' && (
                        <div className="flex justify-center">
                          <button
                            onClick={handleCrop}
                            disabled={loading || !cropMode}
                            className="w-full px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            자르기 적용
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 다운로드 버튼 영역 */}
                {editedUrl && (
                  <div className="mt-2 sm:mt-4 px-2 sm:px-0">
                    <button
                      onClick={handleDownload}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl text-sm sm:text-base font-medium transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      <ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      편집한 이미지 다운로드
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}