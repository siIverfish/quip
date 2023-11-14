async function main() {
  const pyodide = await loadPyodide({
    fullStdLib: true,
    homedir: "/pyodide",
    stdout: (msg) => console.log(`Pyodide: ${msg}`),
  });
  console.log("Loaded Pyodide");
}
main(); 