"use client"

import { dividerStyles } from "./styles";

interface DividerProps {
  text?: string,
  className?: string
}

function Divider({ text = "Or continue with", className }: DividerProps) {
  const styles = dividerStyles()

  return (
    <div className={styles.base({ className })}>
      <div className={styles.line()} />
      <span className={styles.text()}>{text}</span>
      <div className={styles.line()} />
    </div>
  )
}

export default Divider;
