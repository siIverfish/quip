class Challenge(type):
    all_challenges = {}

    def __init_subclass__(cls) -> None:
        assert cls.function_name
        assert cls.arguments
        assert cls.cases

        Challenge.all_challenges[cls.function_name] = cls

    @classmethod
    def get(cls, name):
        return cls.all_challenges.get(name)
