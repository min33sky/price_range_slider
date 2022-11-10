import RangeSlider from './components/RangeSlider';

export default function App() {
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-tr from-slate-800 to-slate-700">
      <RangeSlider
        initMin={2500}
        initMax={7500}
        min={0}
        max={10000}
        step={100}
        priceCap={1000}
      />
    </div>
  );
}
