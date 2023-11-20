from .challenge import Challenge


class AddOneChallenge(Challenge):
    function_name = "add_one"
    arguments = ["x"]
    cases = [[[1], 2], [[8], 9], [[36], 37], [[67], 68]]
