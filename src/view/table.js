
const getCharacteristic = {
  "1": ["starting-point"],
  "2": ["starting-point", "observer"],
  "3": ["observer"],
  "4": ["target-point"],
  "5": ["target-point", "observer"]
}

export const createTable = (adjacencyList, rowLen, colLen) => {
  const table = document.createElement("table");
  table.setAttribute("class", "table");

  for (let i = 0; i < rowLen; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < colLen; j++) {
      const index = i * colLen + j;

      const [cellState, _, cellCharacteristic] = adjacencyList[index];
      const td = document.createElement("td");
      td.setAttribute("class", "cell");
      td.setAttribute("state", cellState ? "alive" : "dead");

      if (cellCharacteristic) {
        getCharacteristic[cellCharacteristic].map((detail) => {
          return td.classList.add(detail)
        })
      }

      tr.appendChild(td);
    }

    table.appendChild(tr);
  }

  return table;
};


export const fluxTable = (state, rowLen, colLen) => {
  const oldTable = document.getElementsByTagName('table')[0];
  const newTable = createTable(state, rowLen, colLen);
  newTable && oldTable.parentNode.replaceChild(newTable, oldTable);
};
