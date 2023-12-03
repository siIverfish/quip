
class Challenge(type):
    all_challenges = {}

    def __init_subclass__(cls) -> None:
        assert cls.function_name
        assert cls.arguments
        assert cls.cases
        assert cls.description

        Challenge.all_challenges[cls.function_name] = cls

    @classmethod
    def get(cls, name):
        return cls.all_challenges.get(name)
    
    @classmethod
    def to_dict(cls):
        attributes = [
            "function_name",
            "arguments",
            "cases",
            "description"
        ]
        return {k:getattr(cls, k) for k in attributes}
