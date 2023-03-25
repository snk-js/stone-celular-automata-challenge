import { createTable, fluxTable } from "./view/table.js";
import { cellsMatrix, adjacencyListTo2DArray } from "./utils/transforms.js";
import { input } from "../processData.js";
import { allowedKeys } from './utils/maps.js';
import { initializeState, tick } from './utils/graph.js';
import { validateSwap, updateObserverPosition } from './utils/agent.js';

const div = document.createElement('div');
div.setAttribute("class", "container");

const celular_automata_input_easy =
  `3 0 0 0 0 0 0 0
0 0 0 0 1 0 0 0
0 0 1 0 1 1 0 0
0 1 1 0 0 1 1 0
0 0 1 0 1 1 0 0
0 0 0 0 1 0 0 0
0 0 0 0 0 0 0 4`;

const largeInput = await cellsMatrix(await input);
const initialStateMatrix = largeInput || cellsMatrix(celular_automata_input_easy);
const rowLen = initialStateMatrix.length;
const colLen = initialStateMatrix[0].length;

let agentPos = [0]; // Initial position

// every actions just updates this state
// and not creates a new one in memory
const state = initializeState(initialStateMatrix, agentPos[0], rowLen * colLen);


const onTick = (direction) => {
  if (!direction) return;

  tick(state, rowLen, colLen); // Update the state in-place

  if (validateSwap(direction, agentPos, state)) {
    updateObserverPosition(agentPos[0], agentPos[0] + direction, state);
  }

  fluxTable(state, rowLen, colLen); // Use the updated state
};
document.addEventListener('keydown', (event) => onTick(allowedKeys(event.key, colLen)));

div.appendChild(createTable(state, rowLen, colLen));
document.getElementsByTagName('body')[0].appendChild(div);