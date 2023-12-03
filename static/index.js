
async function initializePyodide() {
    // probably redundant??
    console.log("Loading pyodide");
    let pyodide = await loadPyodide();
    console.log("Done loading.");
    return pyodide;
}
let pyodideReadyPromise = initializePyodide();

function getCode(){
    return window.editor.getValue();
}

function setCode(value){
    return window.editor.setValue(value);
}

function setError(value){
    const tableContainer = document.getElementById("table-container")

    const p = document.createElement("p");
    p.className = "text-danger";
    p.innerText = value;
    
    tableContainer.innerHTML = "";
    tableContainer.appendChild(p);
}

function resetCode(){
    setCode("def " + challengeData.function_name + "(" + challengeData.arguments.join(", ") + "):" + "\n" + "\treturn 1");
    document.getElementById("description"    ).innerHTML = challengeData.description;
    document.getElementById("table-container").innerHTML = "Run code to see output";
}

function setPathWithoutReload(newPath){
    window.history.pushState('resetNamejs@index@l16', 'resetTitlejs@index@l16', newPath);
}

function loadChallenge(name) {
    const newPath = "/challenges/" + name
    setPathWithoutReload(newPath)
    const request = new Request(newPath + "/json")

    fetch(request)
        .then((data) => data.blob())
        .then((data) => data.text())
        .then((data) => {
            challengeData = JSON.parse(data);
            resetCode();
        });
}

function loadRandomChallenge(){
    return loadChallenge(allChallenges[Math.floor(allChallenges.length * Math.random())]);
}

async function main(){
    let code = getCode();
    let results = await testCode(code, challengeData.function_name, challengeData.cases);

    let table = buildTable(challengeData.cases, results);
    let tableContainer = document.getElementById("table-container")
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);

    console.log(results);
}

async function testCode(code, functionName, cases) {
    console.log("function name is ", functionName)
    let pyodide = await pyodideReadyPromise;

    // Loads the python code, defining the function that we want to test
    try {
        pyodide.runPython(code);
    } catch (error) {
        setError(error);
        return
    }
    let pythonFunction = pyodide.globals.get(functionName);
    if (pythonFunction == null) {
        // todo
        alert("Could not find function in code. Should be named ", functionName);
    }

    // Results of each case
    return cases.map(element => {
        let args = element[0];
        let intendedResult = element[1];
        
        
        let actualResult;
        try {
            actualResult = pythonFunction.apply(null, args);
        } catch (error) {
            setError(error);
            return
        }

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