
const partyHeader = document.getElementById('party');

export const htmlGenerator = (string, htmlElement) => {
  if (htmlElement.children) {
    Array.from(htmlElement.children).forEach((child) => htmlElement.removeChild(child));
  }
  const pTag = document.createElement("p");  
  pTag.innerHTML = string;
  htmlElement.appendChild(pTag);
};

htmlGenerator('Party Time.', partyHeader);
