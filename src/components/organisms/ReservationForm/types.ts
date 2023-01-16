export type ReservationFormProps = {
  onChange: React.ChangeEventHandler<any>;
  tanggal: string;
  jam: string;
  dokter: string;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
}