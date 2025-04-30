"use client"

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { selectStyles } from "./styles";

interface OptionType {
  label: string;
  value: string;
  path: string;
  alt: string;
}

interface SelectProps {
  label?: string;
  options: OptionType[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
}

function Select({ label, options, value, onChange, placeholder = "Select an option", className, errorMessage }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const styles = selectStyles({ state: errorMessage ? "error" : "default" });
  const selectedOption = options.find((option) => option.value === value);

  function toggleDropdown(): void {
    setIsOpen((prev) => !prev);
  }

  function handleOptionSelect(selectedValue: string): void {
    onChange(selectedValue);
    setIsOpen(false);
  }

  return (
    <div className={styles.base({ className })}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          className={styles.button()}
          onClick={toggleDropdown}
        >
          <div className={styles.leftIconWrapper()}>
            {selectedOption?.path && (
              <Image src={selectedOption.path} alt={selectedOption.alt} height={24} width={24} />
            )}
            <span>{selectedOption?.label || placeholder}</span>
          </div>
          <div className={styles.iconWrapper()}>
            <ChevronDown size={18} />
          </div>
        </button>

        {isOpen && (
          <div className={styles.optionsWrapper()}>
            {options.map((option) => (
              <div
                key={option.value}
                className={`${styles.option()} ${
                  option.value === value ? styles.selectedOption() : ""
                }`}
                onClick={() => handleOptionSelect(option.value)}
              >
                <div className="flex items-center gap-2">
                  {option.path && (
                    <Image src={option.path} alt={option.alt} height={24} width={24} />
                  )}
                  {option.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {errorMessage && (
          <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  )
}

export default Select;
