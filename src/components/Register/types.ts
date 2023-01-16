export type RegisterProps = {
  nameValue: string;
  genderValue: string;
  birthplaceValue: string;
  birthdayValue: string;
  phoneValue: number;
  emailValue: string;
  passValue: string;
  secondPassValue: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
}