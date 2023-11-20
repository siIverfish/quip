
async function initializePyodide() {
    // probably redundant??
    console.log("Loading pyodide");
    let pyodide = await loadPyodide();
    console.log("Done loading.");
    return pyodide;
}
let pyodideReadyPromise = initializePyodide();

async function main(){
    let code = document.getElementById("code").value;
    let results = await testCode(code, functionName, cases);

    let table = buildTable(cases, results);
    let tableContainer = document.getElementById("table-container")
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);

    console.log(results)
}

async function testCode(code, functionName, cases) {
    let pyodide = await pyodideReadyPromise;

    // Loads the python code, defining the function that we want to test
    try {
        pyodide.runPython(code);
    } catch (error) {
        alert(error);
        return
    }
    let pythonFunction = pyodide.globals.get(functionName);
    if (pythonFunction == null) {
        // todo
        alert("Could not find function in code. Should be named", functionName);
    }

    // Results of each case
    return cases.map(element => {
        let args = element[0];
        let intendedResult = element[1];
        
        let actualResult = pythonFunction.apply(null, args);

        // e.g. [4, true]
        return [actualResult, actualResult == intendedResult];
    });
}

function buildTable(cases, results) {
    let table = document.createElement("table");
    table.className = "table border"

    const headerRow = ["Arguments", "Solution", "Result", "Correct"];
    table.appendChild( buildRow(headerRow) );

    cases = results.map((result, i) => {
        return [...cases[i], ...result];
    });
    
    console.log(cases)

    cases.forEach((element) => {
        table.appendChild(
            buildRow(element)
        );
    });

    return table;
}

function buildRow(array) {
    let row = document.createElement("tr");
    array.forEach(e => {
        let entry = document.createElement("th");
        entry.className = "border p-2"
        entry.textContent = e;
        row.appendChild(entry);
    })
    return row;
}