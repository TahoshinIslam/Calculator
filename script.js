/* script.js */
let currentValue = '';
let previousValue = '';
let operation = null;

const modal = document.getElementById("calculatorModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const display = document.getElementById("display");
const exprEl = document.getElementById("expr");
const backdrop = document.querySelector('[data-close]');
const keysEl = document.getElementById('keys');

openModalBtn.onclick = () => { modal.setAttribute('aria-hidden','false'); };
closeModalBtn.onclick = () => { modal.setAttribute('aria-hidden','true'); };
backdrop.onclick = () => { modal.setAttribute('aria-hidden','true'); };

function renderExpr(){
  exprEl.textContent = previousValue && operation ? `${previousValue} ${operation}` : '\u00A0';
}

function appendNumber(num) {
  if (num === '.' && currentValue.includes('.')) return;
  currentValue = String(currentValue) + String(num);
  display.value = currentValue;
}

function setOperation(op) {
  if (currentValue === '' && previousValue){ operation = op; renderExpr(); return; }
  if (currentValue === '') return;
  if (previousValue !== '') calculate();
  operation = op;
  previousValue = currentValue;
  currentValue = '';
  renderExpr();
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
  renderExpr();
}

function clearDisplay() {
  currentValue = '';
  previousValue = '';
  operation = null;
  display.value = '';
  renderExpr();
}

// Click handling (delegation)
keysEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.key');
  if(!btn) return;
  const k = btn.dataset.k;
  pressVisual(btn);
  routeKey(k);
});

// Keyboard support
window.addEventListener('keydown', (e) => {
  if (modal.getAttribute('aria-hidden') === 'true') return; // only when open
  const map = { 'Enter': '=', '=': '=', 'Backspace': 'DEL', 'Escape': 'ESC' };
  let k = map[e.key] || e.key;
  if (k === 'x' || k === 'X') k = '*';
  if (k === '÷') k = '/';
  if (/^[0-9]$/.test(k) || ['.','+','-','*','/','=','C'].includes(k)) {
    e.preventDefault();
    routeKey(k);
    // find matching button to animate
    const btn = [...document.querySelectorAll('.key')].find(b => b.dataset.k === k || (k==='=' && b.dataset.k==='=') || (k==='C' && b.dataset.k==='C'));
    if (btn) pressVisual(btn);
  } else if (k === 'DEL') {
    e.preventDefault(); backspace();
  } else if (k === 'ESC') {
    modal.setAttribute('aria-hidden','true');
  }
});

function routeKey(k){
  if (k === 'C') return clearDisplay();
  if (k === '=') return calculate();
  if (k === 'DEL') return backspace();
  if (['+','-','*','/'].includes(k)) return setOperation(k);
  if (/^[0-9]$/.test(k) || k === '.') return appendNumber(k);
}

function backspace(){
  if (currentValue.length > 0) {
    currentValue = currentValue.slice(0,-1);
    display.value = currentValue;
  }
}

function pressVisual(btn){
  btn.classList.add('pressed');
  setTimeout(()=>btn.classList.remove('pressed'),120);
}

// initial
renderExpr();
