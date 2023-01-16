export const formatRupiah= (angka: number, prefix: string) => {
  const converted = angka.toString();
  const number_string = converted.replace(/[^,\d]/g, '').toString();
  const split = number_string.split(',');
  const  sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if(ribuan){
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined
      ? `${rupiah}, ${split[1]}`
      : rupiah;

  if (!prefix) return '';
  if (!rupiah) return '';

  return `Rp. ${rupiah}`;
}