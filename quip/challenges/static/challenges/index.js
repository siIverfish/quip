import initEditor, { getCode, setCode } from "./editor.js";
import { asyncRun } from './py-worker-api.js';

initEditor();

class StdOut {
    data = ""
    constructor() {
        this.data = ""
    }
    set text(val) {
        this.data=val
        // TODO: execute DOM changes if live output is ever added
    }
    get text() {
        return this.data
    }
    add(val) {
        this.text = this.data + val
    }
    reset() {
        this.text = ""
    }
}

window.stdout = new StdOut()
window.stdouts = []

function setError(value){
    const tableContainer = document.getElementById("table-container")

    const p = document.createElement("p");
    p.className = "text-danger";
    p.innerText = value;
    
    tableContainer.innerHTML = "";
    tableContainer.appendChild(p);
}

function resetCode(){
    setCode(`def ${window.challenge.function_name}(${window.challenge.function_args.join(", ")}):\n\treturn None`);
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
            window.challenge = JSON.parse(data);
            resetCode();
        });
}

function loadRandomChallenge(){
    return loadChallenge(1 + Math.floor(Math.random() * maximumId));
}
document.querySelector("#random").addEventListener("click", loadRandomChallenge)

async function runPy(){
    window.stdout.reset()
    let code = getCode();
    let results = await testCode(code, window.challenge.function_name, window.challenge.cases);

    let table = buildTable(window.challenge.cases, results);
    let tableContainer = document.getElementById("table-container")
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
}
document.querySelector("#run").addEventListener("click", runPy)

async function testCode(code, functionName, cases) {
    window.stdouts = []
    // Loads the python code, defining the function that we want to test
    try {
        let { results, error } = await asyncRun(code, {})
        if (error) {
            console.error(error)
            setError(error)
            return
        } else if (results) {
            return results
        }
    } catch (error) {
        console.error(error)
        setError(error);
        return
    }
}

function buildTable(cases, results) {
    let table = document.createElement("table");
    table.className = "table border"

    const headerRow = ["Arguments", "Solution", "Result", "Correct", "Output"];
    table.appendChild( buildRow(headerRow) );

    cases = results.map((result, i) => {
        return [...cases[i], ...result, window.stdouts[i].data];
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
