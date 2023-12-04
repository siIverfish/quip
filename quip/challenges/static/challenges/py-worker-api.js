const pyodideWorker = new Worker("/static/challenges/py-worker.js");

const callbacks = {};

function cloneClass(orig) {
  return Object.assign(Object.create(Object.getPrototypeOf(orig)), orig)
}

pyodideWorker.onmessage = (event) => {
  const { id, ...data } = event.data;
  if (id == 1) {
    window.stdout.add(data.text) // TODO: add some newline char
  } else if (id == 2) {
    window.stdouts.push(cloneClass(window.stdout))
    window.stdout.reset()
  } else {
    const onSuccess = callbacks[id];
    delete callbacks[id];
    onSuccess(data);
  }
};

const asyncRun = (() => {
  let id = 5; // identify a Promise
  return (script, context) => {
    // the id could be generated more carefully
    id = (id + 1) % Number.MAX_SAFE_INTEGER;
    return new Promise((onSuccess) => {
      callbacks[id] = onSuccess;
      pyodideWorker.postMessage({
        ...context,
        python: script,
        challenge: window.challenge,
        id,
      });
    });
  };
})();

export { asyncRun };
