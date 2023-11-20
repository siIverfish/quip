
from flask import Flask, render_template, send_from_directory, abort
from challenges import Challenge


app = Flask("app")


@app.route("/")
def index():
    return render_template("index.html", challenges=Challenge.all_challenges.values())

@app.route("/challenges/<name>")
def challenges_route(name):
    challenge = Challenge.get(name)
    if not challenge:
        abort(404)
    return render_template("app.html", challenge=challenge)

# this is a workaround until i figure out why monaco is
# shooting out web requests to nonexistent scripts at root.
# i think the app works fine without this, but shows errors in the js console.
@app.route("/stackframe.js")
def stackframe():
    return send_from_directory('./static/node_modules/stackframe/', 'stackframe.js', 'stackframe.js')

app.run(host="0.0.0.0", debug=True)
