"use client";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { FieldValues, UseFormRegister } from "react-hook-form";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
// <T extends FieldValues>
export interface InputHookProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  // register:UseFormRegister<T>
  register: {};
}

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

const InputHook = React.forwardRef<HTMLInputElement, InputHookProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
        <div>
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
          <p className="text-red-400">{props?.error ?? ""}</p>
        </div>
      </div>
    );
  }
);

Label.displayName = LabelPrimitive.Root.displayName;
Input.displayName = "Input";
InputHook.displayName = "InputHook";

export { Input };
export { InputHook };
export { Label };
