export function download(object: object, fileName: string) {
  const dataString =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(object));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataString);
  downloadAnchorNode.setAttribute("download", fileName + ".json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
