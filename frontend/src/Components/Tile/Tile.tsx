import React from "react";

interface Props {
  title: string;
  subtitle: string;
}

export const Tile: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="w-full">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg  xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {title}
              </h5>
              <span className="font-bold text-xl">{subtitle}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
