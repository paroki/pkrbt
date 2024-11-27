import * as React from "react";
import type * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "~/common/utils";
import { Label } from "./shadcn/label";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
  // eslint-disable-next-line react/prop-types
>(({ className, ...props }, ref) => {
  return <Label ref={ref} className={className} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  }
>(({ className, children, error, ...props }, ref) => {
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export default function FormAction({ children }: React.PropsWithChildren) {
  return <div className="flex form-row gap-2">{children}</div>;
}
export { FormItem, FormLabel, FormDescription, FormMessage };
