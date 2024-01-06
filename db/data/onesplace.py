from .challenge import Challenge


class OnesPlaceChallenge(Challenge):
    function_name = "get_ones_place"
    arguments = ["x"]
    cases = [[[87], 7], [[92], 2], [[36], 6], [[7], 7]]
    description = "Create a function that returns the ones place of the number it is given. E.g. 62 -> 2."
