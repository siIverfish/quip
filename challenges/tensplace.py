from .challenge import Challenge

class GetTensPlaceChallenge(Challenge):
    function_name = "get_tens_place"
    arguments = ["x"]
    cases = [[[87],8], [[92],9], [[17,4]], [[7],0]]
    description = "Create a function that returns the tens place of the number it is given. E.g. 62 -> 6."
