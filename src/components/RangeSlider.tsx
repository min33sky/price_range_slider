import React, { useEffect, useRef, useState } from 'react';

interface Props {
  initMin: number;
  initMax: number;
  min: number;
  max: number;
  step: number;
  priceCap: number;
}

export default function RangeSlider({
  initMax,
  initMin,
  min,
  max,
  step,
  priceCap,
}: Props) {
  const [minValue, setMinValue] = useState(initMin);
  const [maxValue, setMaxValue] = useState(initMax);
  const progressRef = useRef<HTMLDivElement>(null);

  // Input Handler
  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value <= maxValue - priceCap) {
      setMinValue(value);
    } else {
      setMinValue(maxValue - priceCap);
    }
  };

  // Input Handler
  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= max) {
      setMaxValue(max);
    } else if (value >= minValue + priceCap) {
      setMaxValue(value);
    } else {
      setMaxValue(minValue + priceCap);
    }
  };

  // Range Handler
  const handleMinRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (Number(event.target.value) <= maxValue - priceCap) {
        setMinValue(Number(event.target.value));
      }
    }
  };

  // Range Handler
  const handleMaxRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maxValue - minValue >= priceCap && minValue >= min) {
      if (Number(event.target.value) >= minValue + priceCap) {
        setMaxValue(Number(event.target.value));
      }
    }
  };

  useEffect(() => {
    if (!progressRef.current) return;
    progressRef.current.style.left = (minValue / max) * step + '%';
    progressRef.current.style.right = step - (maxValue / max) * step + '%';
  }, [minValue, maxValue, max, step]);

  return (
    <div className="w-11/12 max-w-sm space-y-4 rounded-lg bg-slate-200 px-6 py-8 shadow-lg">
      <header>
        <h1 className="text-2xl font-bold">가격 범위 슬라이더</h1>
        <p className="py-2 text-sm">원하는 가격 범위를 설정하세요.</p>
      </header>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <label
            htmlFor="min-price"
            className="flex-shrink-0 text-sm font-bold"
          >
            최소
          </label>
          <input
            type="number"
            id="min-price"
            min={min}
            step={step}
            max={max - priceCap}
            value={minValue}
            onChange={handleMinInput}
            className="w-full rounded-lg border border-gray-300 px-2 py-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>

        <div className="mx-4 flex select-none items-center justify-center text-2xl font-bold">
          {' '}
          -{' '}
        </div>

        <div className="flex items-center space-x-2">
          <label
            htmlFor="max-price"
            className="flex-shrink-0 text-sm font-bold"
          >
            최대
          </label>
          <input
            type="number"
            id="max-price"
            min={min + priceCap}
            step={step}
            max={max}
            value={maxValue}
            onChange={handleMaxInput}
            className="w-full rounded-lg border border-gray-300 px-2 py-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>
      </div>

      <div>
        <div
          aria-label="slider"
          className="relative h-1 rounded-full bg-slate-300"
        >
          <div
            aria-label="progress"
            ref={progressRef}
            className="absolute  h-1 rounded-md bg-purple-500"
          ></div>
        </div>

        <div aria-label="range-input" className="relative">
          <input
            aria-label="min-price"
            type="range"
            min={min}
            step={step}
            max={max}
            value={minValue}
            onChange={handleMinRange}
            className="pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
          />
          <input
            aria-label="max-price"
            type="range"
            min={min}
            step={step}
            max={max}
            value={maxValue}
            onChange={handleMaxRange}
            className="pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}
