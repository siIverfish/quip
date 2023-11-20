
from flask import Flask, render_template
from challenges import Challenge

print()
print(Challenge.all_challenges)
print()

app = Flask("app")


@app.route("/")
def index():
    return render_template("app.html", challenge=Challenge.get("add_one"))


app.run(host="0.0.0.0", debug=True)
