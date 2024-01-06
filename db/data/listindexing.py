from .challenge import Challenge


class ListIndexChallenge(Challenge):
    function_name = "access_index"
    arguments = ["numbers"]
    cases = [[[[1, 2, 3]], 2], [[[6, 2]], 2], [[[9, 9, 9, 9, 9, 0]], 9], [[[17.3, "4"]], "4"]]
    description = "Create a function that, given a list 'numbers', returns the second element in that list."
