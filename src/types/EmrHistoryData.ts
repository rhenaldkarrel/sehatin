export default interface EmrHistoryData {
	id: number;
	pasien: string;
	examinationDate: string;
  diagnosa: string;
  obat: string | string[];
  gender: string;
  birthplace: string;
  birthday: string;
  dokter: string;
}
