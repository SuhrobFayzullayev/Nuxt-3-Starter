export async function useDownloadFile(url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.setAttribute("download", "test.pdf");

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
}
