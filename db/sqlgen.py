from data import Challenge

# dirty script, used to generate the fixture

sql_output = ""

def escape(string):
    return str(string).replace("'", "''")

for challenge in Challenge.all_challenges.values():
    sql_output += ' '.join(
        f"""\
    INSERT INTO challenges_challenge (description, function_name, function_args, cases, difficulty)
    VALUES ({escape(challenge.description)!r}, {escape(challenge.function_name)!r}, '{challenge.arguments}', '{challenge.cases}', 'Easy');"""
        .split()) \
        + '\n'
        
# sql_output = sql_output.replace("\"", "'")

print(sql_output)