import { useRef, useState, useEffect, useCallback } from 'react';

export function useDragScroll<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    // Only handle primary left click
    if (e.button !== 0 || !containerRef.current) return;
    dragInfo.current.isDown = true;
    dragInfo.current.hasMoved = false;
    dragInfo.current.startX = e.pageX - containerRef.current.offsetLeft;
    dragInfo.current.scrollLeft = containerRef.current.scrollLeft;
    setIsDragging(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragInfo.current.isDown || !containerRef.current) return;
      e.preventDefault();
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - dragInfo.current.startX) * 1.5;
      if (Math.abs(walk) > 4) {
        dragInfo.current.hasMoved = true;
      }
      containerRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;
    };

    const handleMouseUp = () => {
      if (!dragInfo.current.isDown) return;
      dragInfo.current.isDown = false;
      setIsDragging(false);
      // Brief window to prevent click event if moved
      setTimeout(() => {
        dragInfo.current.hasMoved = false;
      }, 80);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (dragInfo.current.hasMoved) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, []);

  return {
    ref: containerRef,
    isDragging,
    dragProps: {
      ref: containerRef,
      onMouseDown,
      onClickCapture,
      className: `cursor-grab active:cursor-grabbing select-none ${isDragging ? 'cursor-grabbing' : ''}`,
    },
  };
}
