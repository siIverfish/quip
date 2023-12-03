importScripts("https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js");

async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide();
  //await self.pyodide.loadPackage(["numpy"]);
}
let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
  // make sure loading is done
  await pyodideReadyPromise;
  // Don't bother yet with this line, suppose our API is built in such a way:
  const { id, python, challenge, ...context } = event.data;
  // The worker copies the context in its own "memory" (an object mapping name to values)
  for (const key of Object.keys(context)) {
    self[key] = context[key];
  }
  // Now is the easy part, the one that is similar to working in the main thread:
  try {
    await self.pyodide.loadPackagesFromImports(python);
    await self.pyodide.runPythonAsync(python);
    pyodide.setStdout({ batched: (msg) => self.postMessage({ id: 1, text: msg }) });
  } catch (error) {
    self.postMessage({ error: error.message, id });
    return
  }
  let { cases, function_name } = challenge;
  let pythonFunction = pyodide.globals.get(function_name);
  if (pythonFunction == null) {
    self.postMessage({ error: "Could not find function in code. Should be named " + function_name, id });
    return
  } else {
    let errs = false
    results = cases.map(element => {
      if (errs) return
      let args = element[0];
      let intendedResult = element[1];
      
      let actualResult;
      try {
        actualResult = pythonFunction.apply(null, args);
      } catch (error) {
        self.postMessage({ error: error.message, id });
        errs=true
        return
      }
      self.postMessage({id: 2})
      // e.g. [4, true]
      return [actualResult, actualResult == intendedResult];
    });
    !errs && self.postMessage({ results, id });
  }
};
