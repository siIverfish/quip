# quip
## Codingbat clone

This is a website aimed at teaching code through short examples. However, quip aims to use modern technology (pyodide, monaco) to provide a smoother experience than the bare-basics approach of codingbat.com. Currently in barely-working-demo phase, will probably use Django eventually.


## Local install

should? work

Go to /static and use npm to install `pyodide` and `monaco-editor`. 
Use pip to install `flask`.
Run `app.py`.

```
cd ./static
npm install pyodide monaco-editor
cd ..
pip install flask
python app.py
```