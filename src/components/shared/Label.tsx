import React, { ReactNode } from "react"

interface LabeledInputProps {
    label: string
    children: ReactNode;
  }

const LabeledInput: React.FC<LabeledInputProps> = ({ label, children }) => (
    <div className="py-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <small className="text-sm font-medium leading-none">{children}</small>
    </div>
)

export { LabeledInput }