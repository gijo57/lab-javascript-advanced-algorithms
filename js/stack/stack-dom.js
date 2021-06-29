const stackList = document.getElementById('stack-list');
const stackInput = document.getElementById('stack-input');
const container = document.getElementById('container');
const warningTopStack = document.querySelector('#stack-container .warning-top');
const warningBottomStack = document.querySelector(
  '#stack-container .warning-bottom'
);
const addStackBtn = document.getElementById('add-stack');
const takeStackBtn = document.getElementById('take-stack');

const newStack = new Stack();

const clearStackInput = () => {
  stackInput.value = '';
};

const renderListStack = () => {
  stackList.innerHTML = '';
  const stackContents = [];
  const stackItems = newStack.display();
  for (let i = 0; i < newStack.MAX_SIZE; i++) {
    let elem = document.createElement('li');
    elem.setAttribute('id', i);
    elem.className = 'inactive';
    stackContents.push(elem);

    if (stackItems[i] || stackItems[i] === '') {
      stackContents[i].innerText = stackItems[i];
      stackContents[i].className = 'active';
    }
  }

  stackContents.forEach((elem) => stackList.appendChild(elem));
};

renderListStack();

const generateWarningStack = (type) => {
  if (type === 'underflow') {
    warningBottomStack.innerText = 'WARNING! Stack Underflow!';
    warningBottomStack.style.display = 'block';
    setTimeout(() => {
      warningBottomStack.style.display = 'none';
    }, 5000);
  } else if (type === 'overflow') {
    warningTopStack.innerText = 'WARNING! Stack Overflow!';
    warningTopStack.style.display = 'block';
    setTimeout(() => {
      warningTopStack.style.display = 'none';
    }, 5000);
  }
};

const addToStack = () => {
  try {
    newStack.push(stackInput.value);
    renderListStack();
    clearStackInput();
  } catch (error) {
    generateWarningStack('overflow');
  }
};

const removeFromStack = () => {
  try {
    newStack.pop();
    renderListStack();
  } catch (error) {
    generateWarningStack('underflow');
  }
};

addStackBtn.addEventListener('click', addToStack);
takeStackBtn.addEventListener('click', removeFromStack);
