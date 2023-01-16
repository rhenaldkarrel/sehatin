export type ButtonVariant = 'base' | 'text';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}