import * as XLSX from "xlsx";

export default async function jsonToExcel(data) {
  const ws = XLSX.utils.json_to_sheet(data);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Report");
  const fileName = "Report" + new Date() + ".xlsx";

  XLSX.writeFile(wb, fileName);
}
