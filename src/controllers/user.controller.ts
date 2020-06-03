import users from "../database/data-users.json"

interface Db { [key: string]: number; }

const db: Db = users;


 /*
 ***
 GET USERS LIMIT FROM SUGGESTION_NUMBER AND ORDER BY POPULARITY DESC 
 ***
 */

 export async function getAllUser(req, res) {

  console.log('GET == >  AllUsers')

  let entries = Object.entries(db).map(([name, times]) => ({ name, times }));

  entries.sort((a, b) => { return b.times - a.times });

  res.send(JSON.stringify(entries.slice(0, + (process.env.SUGGESTION_NUMBER || 50)))).end();

};

 /*
 ***
 GET USERS FILTERED BY PREFIX , LIMIT FROM SUGGESTION_NUMBER AND ORDER BY POPULARITY DESC 
 ***
 */

export async function findUser(req, res) {

  console.log('GET == >  User with prefix :' + req.params.prefix);

  // Get a particular username
  let user;

  let entries = Object.entries(db).map(([name, times]) => ({ name, times }));

  let filteredEntries = entries
    .filter(({ name, times }) => {
      if (name.toLowerCase() === req.params.prefix.toLowerCase()) {

        user = { name, times };
        return false;
      }

      if (name.toLowerCase().slice(0, req.params.prefix.length) == req.params.prefix.toLowerCase()) {
        return true;

      }
    });

  // Order by popularity
  filteredEntries.sort((a, b) => { return b.times - a.times });

  // Get list with lenth max  = SUGGESTION_NUMBER
  filteredEntries = filteredEntries.slice(0, + (process.env.SUGGESTION_NUMBER || 10));

  // If the  user is found, it is returned first . If not in order of popularity
  if (user) {

    filteredEntries.splice(filteredEntries.length, 1);
    filteredEntries.unshift(user);

  }

  res.status(200).send(JSON.stringify(filteredEntries));

};


 /*
 ***
 INCRESE A PARTICULAR USER POPULARITY
 ***
 */

export async function upUserPopularity(req, res) {

  console.log('POST == >  Increased popularity for the user : ' + req.body.name);

  // In the dataBase all username start with a upperCase and the rest of the name in lowerCase

  const username: string = req.body.name[0].toUpperCase() + (req.body.name.toLowerCase().slice(1, req.body.name.length));

  const popularity: any = db[username];

  if (popularity === undefined || popularity === null) {

    res.status(400).send('User popularity not found for username : ' + username).end();

    return;
  }

  // Increased user popularity
  db[username]++;

  res.send(JSON.stringify({ name: username, times: db[username] }));

};