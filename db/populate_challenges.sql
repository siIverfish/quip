--Unused file currently, used to generate the fixture

INSERT INTO challenges_challenge (description, function_name, function_args, cases, difficulty) 
VALUES ('Create a function that, given a list ''numbers'', returns the second element in that list.', 'access_index', '["numbers"]', '[[[[1, 2, 3]], 2], [[[6, 2]], 2], [[[9, 9, 9, 9, 9, 0]], 9], [[[17.3, "4"]], "4"]]', 'Easy');

INSERT INTO challenges_challenge (description, function_name, function_args, cases, difficulty) 
VALUES ('Create a function that, given a number ''x'', returns the ''x''th element of the fibonacci sequence.', 'fib', '["x"]', '[[[0], 0], [[2], 1], [[6], 8], [[7], 13]]', 'Easy');

INSERT INTO challenges_challenge (description, function_name, function_args, cases, difficulty) 
VALUES ('Create a function named add_one that takes a single argument, x, and return that number plus one. e.g. 4 -> 5', 'add_one', '["x"]', '[[[1], 2], [[8], 9], [[36], 37], [[67], 68]]', 'Easy');

INSERT INTO challenges_challenge (description, function_name, function_args, cases, difficulty) 
VALUES ('Create a function named add_numbers that takes two arguments, ''a'' and ''b'', and returns their sum. e.g. 7, 8 -> 15', 'add_numbers', '["a", "b"]', '[[[2, 3], 5], [[5, 5], 10], [[0, 0], 0], [[1, 3], 4]]', 'Easy');

INSERT INTO challenges_challenge (description, function_name, function_args, cases, difficulty) 
VALUES ('Create a function that returns the ones place of the number it is given. E.g. 62 -> 2.', 'get_ones_place', '["x"]', '[[[87], 7], [[92], 2], [[36], 6], [[7], 7]]', 'Easy');

INSERT INTO challenges_challenge (description, function_name, function_args, cases, difficulty) 
VALUES ('Create a function that returns the tens place of the number it is given. E.g. 62 -> 6.', 'get_tens_place', '["x"]', '[[[87], 8], [[92], 9], [[36], 3], [[7], 0]]', 'Easy');

