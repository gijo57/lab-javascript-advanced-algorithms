const queueUL = document.querySelector('.list-queue');
const queueInput = document.querySelector('.queue-input');
const warningTopQueue = document.querySelector('#queue-container .warning-top');
const warningBottomQueue = document.querySelector(
  '#queue-container .warning-bottom'
);
const addQueue = document.querySelector('.btn-add-queue');
const dequeue = document.querySelector('.btn-take-dequeue');

const queue = new Queue();

const clearQueueInput = () => {
  queueInput.value = '';
};

const generateListQueue = () => {
  queueUL.innerHTML = '';
  const queueContents = [];
  const queueItems = queue.display();

  for (let i = 0; i < queue.MAX_SIZE; i++) {
    let elem = document.createElement('li');
    elem.setAttribute('id', i);
    elem.className = 'inactive';
    queueContents.push(elem);

    if (queueItems[i] || queueItems[i] === '') {
      queueContents[i].innerText = queueItems[i];
      queueContents[i].className = 'active';
    }
  }

  queueContents.forEach((elem) => queueUL.appendChild(elem));
};

generateListQueue();

const generateWarningQueue = (type) => {
  if (type === 'underflow') {
    console.log('error');
    warningBottomQueue.innerText = 'WARNING! Queue Underflow!';
    warningBottomQueue.style.display = 'block';
    setTimeout(() => {
      warningBottomQueue.style.display = 'none';
    }, 5000);
  } else if (type === 'overflow') {
    warningTopQueue.innerText = 'WARNING! Queue Overflow!';
    warningTopQueue.style.display = 'block';
    setTimeout(() => {
      warningTopQueue.style.display = 'none';
    }, 5000);
  }
};

const addToQueue = () => {
  try {
    queue.enqueue(queueInput.value);
    generateListQueue();
    clearQueueInput();
  } catch (error) {
    generateWarningQueue('overflow');
  }
};

const removeFromQueue = () => {
  try {
    queue.dequeue();
    generateListQueue();
  } catch (error) {
    generateWarningQueue('underflow');
  }
};

addQueue.addEventListener('click', addToQueue);
dequeue.addEventListener('click', removeFromQueue);
