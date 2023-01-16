export type SignInProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  emailValue: string;
  passwordValue: string;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
}