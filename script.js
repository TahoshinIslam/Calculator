let currentValue = '';
let previousValue = '';
let operation = null;

const modal = document.getElementById("calculatorModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const display = document.getElementById("display");
const backdrop = document.querySelector('[data-close]');

openModalBtn.onclick = () => { modal.setAttribute('aria-hidden','false'); };
closeModalBtn.onclick = () => { modal.setAttribute('aria-hidden','true'); };
backdrop.onclick = () => { modal.setAttribute('aria-hidden','true'); };

function appendNumber(num) {
  if (num === '.' && currentValue.includes('.')) return;
  currentValue = String(currentValue) + String(num);
  display.value = currentValue;
}

function setOperation(op) {
  if (currentValue === '') return;
  if (previousValue !== '') calculate();
  operation = op;
  previousValue = currentValue;
  currentValue = '';
}

function calculate() {
  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);
  if (isNaN(prev) || isNaN(curr)) return;
  let result = 0;
  if (operation === '+') result = prev + curr;
  if (operation === '-') result = prev - curr;
  if (operation === '*') result = prev * curr;
  if (operation === '/') result = curr === 0 ? '∞' : prev / curr;
  currentValue = String(result);
  operation = null;
  previousValue = '';
  display.value = currentValue;
}

function clearDisplay() {
  currentValue = '';
  previousValue = '';
  operation = null;
  display.value = '';
}