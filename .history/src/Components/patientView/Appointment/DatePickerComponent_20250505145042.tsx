import React from "react";
import { ReactNode } from "react";

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

export const DatePickerComponent = React.forwardRef<
  HTMLInputElement,
  CustomInputProps
>(({ value, onClick }, ref) => (
  <input
    onClick={onClick}
    ref={ref}
    value={value}
    readOnly
    className="datepicker-custom-input"
  />
));
