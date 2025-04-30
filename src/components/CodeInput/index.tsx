"use client"

import React, { useState, useRef } from "react";
import { codeInputStyles } from "./styles";

interface CodeInputProps {
  length?: number;
  isLoading?: boolean;
  className?: string;
  onChange?: (code: string) => void;
}

function CodeInput({ length = 6, isLoading = false, className, onChange }: CodeInputProps) {
  const styles = codeInputStyles();
  const [code, setCode] = useState(Array(length).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    const val = e.target.value.toUpperCase();

    const newCode = [...code];
    newCode[index] = val.slice(0, 1);

    setCode(newCode);
    onChange?.(newCode.join(''));

    if (val && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  }


  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number): void {
    if ((e.key === 'Backspace' || e.key === 'Delete') && code[index] === '') {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>): void {
    e.target.select();
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>): void {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('Text').slice(0, length);

    const newCode = pastedData.split('');
    newCode.length = length;

    setCode(newCode.map((char) => char.toUpperCase()));
    onChange?.(newCode.map((c) => c.toUpperCase()).join(''));

    newCode.forEach((char, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx]!.value = char;
      }
    })
  }

  return (
    <div className={styles.base({ className })}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={el => {
            inputRefs.current[index] = el
          }}
          type="text"
          maxLength={1}
          value={code[index]}
          disabled={isLoading}
          onChange={(e) => handleInputChange(e, index)}
          onFocus={handleFocus}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={styles.input()}
          autoFocus={index === 0}
        />
      ))}
    </div>
  )
}

export default CodeInput;
