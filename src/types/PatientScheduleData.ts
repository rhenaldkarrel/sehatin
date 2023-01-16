export default interface PatientScheduleData {
  id: number;
  nama: string;
  idPasien: number;
  jam: string;
  tanggal: string;
  status: "Selesai" | "Dalam antrian" | "Diperiksa" | "Menunggu pembayaran";
}