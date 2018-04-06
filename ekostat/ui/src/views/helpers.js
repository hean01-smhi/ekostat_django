export function saveFile(data, filename) {
  const node = document.createElement('a');
  node.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
  node.download = filename;
  node.dispatchEvent(new MouseEvent('click'));
  node.remove();
}

export function loadFile(callback) {
  const node = document.createElement('input');
  node.type = 'file';
  node.onchange = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => callback(e.target.result)
    reader.readAsText(e.target.files[0]);
  };
  node.click();
  node.remove();
}
