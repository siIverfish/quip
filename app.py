from flask import Flask, render_template

app = Flask("app")

@app.route("/")
def index():
    return render_template("app.html")

app.run(host="0.0.0.0", debug=True)