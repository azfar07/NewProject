// components/Spinner.jsx
export default function Spinner({ height }) {
    return (
      <div
        className="w-full flex items-center justify-center bg-black bg-opacity-20"
        style={{ height }}
      >
        <img
          src="/loading_spinner.gif"
          alt="Loading …"
          className="h-16 w-16 z-10"
        />
      </div>
    );
  }
  