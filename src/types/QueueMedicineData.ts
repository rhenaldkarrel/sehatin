export default interface QueueMedicineData {
	id: number;
	name: string;
	medicine: string;
	status: "Selesai" | "Menunggu pembayaran";
}
