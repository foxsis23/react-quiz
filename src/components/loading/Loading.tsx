import React from 'react';

const Loading = () => (
  <div className="text-2xl font-bold mt-[120px] flex gap-[10px] items-center">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Spinner_font_awesome.svg/1200px-Spinner_font_awesome.svg.png"
      alt="spinner"
      className="animate-spin h-6 w-6"
    />
    Loading...
  </div>
);

export default Loading;
