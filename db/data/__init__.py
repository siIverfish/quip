import os
import importlib

from .challenge import Challenge



# programmatically import all challenges from this folder.

IGNORED_FILES = ["__pycache__", "__init__.py", "challenge.py"]

for file_name in os.listdir(os.path.dirname(__file__)):
    if file_name in IGNORED_FILES:
        continue
    else:
        importlib.import_module("." + file_name.removesuffix(".py"), "data")



__all__ = [
    "Challenge",
]
