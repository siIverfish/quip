from .challenge import Challenge


class FibonacciChallenge(Challenge):
    function_name = "fib"
    arguments = ["x"]
    cases = [[[0], 0], [[2], 1], [[6], 8], [[7], 13]]
    description = "Create a function that, given a number 'x', returns the 'x'th element of the fibonacci sequence."
