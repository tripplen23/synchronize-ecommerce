import React from "react";
import { Spinner } from "@material-tailwind/react";

interface SpinnerComponentProps {
  className?: string;
}

const SpinnerComponent: React.FC<SpinnerComponentProps> = ({ className }) => {
  return (
    <div>
      <Spinner className={className} />
    </div>
  );
};

export default SpinnerComponent;
