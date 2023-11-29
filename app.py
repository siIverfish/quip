
import json

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
    return render_template(
        "app.html", 
        challenge=challenge, 
        all_challenges=list(Challenge.all_challenges.keys()),
    )

@app.route("/challenges/<name>/json")
def challenges_json_route(name):
    challenge = Challenge.get(name)
    if not challenge:
        abort(404)
    return json.dumps(challenge.to_dict())

@app.route("/prob/<identifier>")
def codingbat_problem(identifier):
    from codingbat import gen_challenge
    return render_template(
        "app.html", 
        challenge=gen_challenge(identifier), 
        all_challenges=list(Challenge.all_challenges.keys()),
    )
# this is a workaround until i figure out why monaco is
# shooting out web requests to nonexistent scripts at root.
# i think the app works fine without this, but shows errors in the js console.
@app.route("/stackframe.js")
def stackframe():
    return send_from_directory('./static/node_modules/stackframe/', 'stackframe.js', 'stackframe.js')

app.run(host="0.0.0.0", debug=True)
