export async function useDownloadFile(url: string, name: string = "file") {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.setAttribute("download", name);

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
}
