from flask import Flask, render_template

app = Flask("app")


@app.route("/")
def index():
    return render_template(
        "app.html",
        function_name="add_those_numbers",
        cases=[[[2, 3], 5], [[5, 5], 10], [[0, 0], 0], [[1, 3], 4],]
    )


app.run(host="0.0.0.0", debug=True)
