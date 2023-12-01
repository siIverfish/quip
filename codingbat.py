from bs4 import BeautifulSoup, Tag
import requests
from challenges import Challenge
import datetime
import re

def unstring_case(case):
    if "'" in case:
        return case[1:-1]
    if "[" in case:
        return map(unstring_case, case[1,-1].split(", "))
    if case == "True":
        return True
    if case == "False":
        return False
    return int(case)

def get_cases(id, code):
    regex = r"\w+\((.*)\) → (.*)"
    r = requests.post("https://codingbat.com/run", data={
        "id": id,
        "code": f"{code}\n  return None",
        "cuname": "",
        "owner": "",
        "adate": datetime.datetime.utcnow().strftime("%Y%m%d-%H%M%SZ")
    })
    soup = BeautifulSoup(r.text, "html.parser")
    cases_raw = soup.find_all("tr")
    cases = []
    for x in cases_raw[1:-1]:
        m = re.search(regex, x.td.string)
        args = []
        for y in m.group(1).split(", "):
            args.append(unstring_case(y))
        cases.append([args, unstring_case(m.group(2))])
    return cases

def args(code):
    regex = "\w+\(([\w,\s]+)\)"
    args = re.search(regex, code.strip()).group(1)
    return args.split(",")

def gen_challenge(id) -> Challenge:
    r = requests.get(f"https://codingbat.com/prob/{id}")
    soup = BeautifulSoup(r.text, "html.parser")
    start_code = soup.find("div", {"id": "ace_div"}).string.strip()
    fn = soup.find("span", {"class": "h2"}).string
    desc = soup.find("p", {"class": "max2"}).string
    c = get_cases(id, start_code)
    class CodingbatChallenge(Challenge):
        function_name = fn
        arguments = args(start_code)
        cases = c
        description = desc
    return CodingbatChallenge
