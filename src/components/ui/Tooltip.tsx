import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Handle click for mobile
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate horizontal position adjustment
      let xOffset = 0;
      if (rect.right > viewportWidth) {
        xOffset = viewportWidth - rect.right - 8;
      } else if (rect.left < 0) {
        xOffset = -rect.left + 8;
      }

      // Calculate vertical position adjustment
      let yOffset = 0;
      if (rect.bottom > viewportHeight) {
        yOffset = -(rect.height + 40);
      }

      setPosition({ x: xOffset, y: yOffset });
    }
  }, [isVisible]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className="relative inline-block">
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-pointer"
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-10 w-64 p-2 mt-1 -translate-x-1/2 left-1/2 text-sm text-gray-600 bg-white rounded-lg shadow-lg border border-gray-200"
          style={{
            transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}