<p align="center">
<img width="500" alt="horizontal_tagline_black_on_white_by_logaster (1)" src="https://user-images.githubusercontent.com/50145471/89743076-f2566b00-da75-11ea-9b35-bef6b3a45869.png">
</p>



# Typeahead Backend


## Description
Typeahead or autocomplete is a common feature that people come across on websites. For example, when you are searching on Google, you will notice a word populates before you finish typing.

For this task, we'll implement the backend of a simple typeahead system. You will be provided with a list of names and their popularities.

You're asked to write up a typeahead backend system using prefix-tree order by popularity.

For example, if the data provided is {"John": 21, "James": 43, "Joanna": 13, "Ja": 3} and a user queries j, then it returns [{"name": "James": "times": 43}, {"name": "John": "times": 21}, {"name": "Joanna", "times": 13}, {"name": "Ja", "times": 3}]. Note, the search is case-insensitive.

In addition, an exact match would take precedence despite of the popularity. For example, a search keyword ja would return [{"name": "Ja", "times": 3}, {"name": "James", "times": 43}] since Ja has an exact match.

Specification
Configuration
configSource: "env"

```
PORT = 8080

SUGGESTION_NUMBER = 10
```

PORT is where the port of the server and SUGGESTION_NUMBER is the maximum number of objects returned in the result array.

The server has the following endpoints.

### GET /typeahead/?<prefix>

prefix is a string. The results will return an array of objects with names starting with that prefix according to the rules described above.

If there's no match, an empty array is returned.

if prefix is not provided, it will just search an empty string from the backend.

## POST /typeahead/set

This is a post request with content type application/json with data {name: <name>}. What it does is to increment the popularity by 1 in the backend when a name is selected. For example, if James is selected, we increment the popularity from 43 to 44.

If name is not found, let's return status 400.

### Example

```


$ curl http://localhost:3000/typeahead/

[{"name":"Fidela","times":999},{"name":"Gert","times":999},{"name":"Guinna","times":999},{"name":"Jenica","times":999},{"name":"Merle","times":999},{"name":"Adora","times":998},{"name":"Aurea","times":998},{"name":"Ginelle","times":998},{"name":"Merilee","times":998},{"name":"Miof Mela","times":998}]

$ curl http://localhost:3000/typeahead/jo

[{"name":"Jo","times":602},{"name":"Johnna","times":996},{"name":"Joby","times":987},{"name":"Jorie","times":978},{"name":"Josi","times":969},{"name":"Jolyn","times":967},{"name":"Jordain","times":967},{"name":"Joelly","times":963},{"name":"Johannah","times":956},{"name":"Jolie","times":955}]

$ curl http://localhost:3000/typeahead/annabelle

[{"name":"Annabelle","times":534}]

// When we post with an entry name, the popularity goes up by 1
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 202fa126-6e49-4739-92db-663b50720734' \
  -d '{
	   "name": "annabelle"
  }'
{"name":"Annabelle","times":535}
```
