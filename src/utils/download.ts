const downloadPDF = (url: string, filename: string): void => {
  const link = document.createElement("a");
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadPDF;
