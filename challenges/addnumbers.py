from .challenge import Challenge


class AddNumbersChallenge(Challenge):
    function_name = "add_numbers"
    arguments = ["a", "b"]
    cases = [[[2, 3], 5], [[5, 5], 10], [[0, 0], 0], [[1, 3], 4],]
    description = "Create a function named add_numbers that takes two arguments, 'a' and 'b', and returns their sum. e.g. 7, 8 -> 15"
