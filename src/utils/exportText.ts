const exportTxt = (text: string, filename: string) => {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });

  // Create temp element to trigger download
  const dl = document.createElement('a');
  dl.href = URL.createObjectURL(blob);
  dl.download = filename;

  document.body.appendChild(dl);
  dl.click();

  document.body.removeChild(dl);
};

export default exportTxt;