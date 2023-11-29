from .challenge import Challenge


class JoeChallenge(Challenge):
    function_name = "add_two"
    arguments = ["x"]
    cases = [[[1], 3], [[8], 10], [[36], 38], [[67], 69], [[69], 71]]
    description = "Create a function named add_two that takes a single argument, x, and return that number plus two. e.g. 4 -> 6"
