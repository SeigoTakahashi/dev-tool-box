// ファイルをダウンロードするユーティリティ関数
export const downloadFile = (
  data: string | null,
  filename: string,
  mimeType: string = "text/plain"
): void => {
  if (!data) return;
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    `data:${mimeType};charset=utf-8,${encodeURIComponent(data)}`
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
