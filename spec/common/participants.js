// Retrieve the list of users for a working group as a sentence.
// APIKEY and GROUP can be specified via either enironment variable or argument
// usage:
//   APIKEY=<apikey> GROUP=wg/rch node participants.js
// or
//   node participants.js <apikey> wg/rch
// group defaults to wg/rch


const https = require('https');
const process = require('process');

const APIKEY = process.env.APIKEY || process.argv[2];
const GROUP = process.env.GROUP || process.argv[3] || "wg/rch";


const groupOptions = {
  hostname: 'api.w3.org',
  path: `/groups/${GROUP}?items=50`,
  headers: {
    'Accept': 'application/json'
  }
};

const userOptions = {
  hostname: 'api.w3.org',
  path: `/groups/${GROUP}/users?former=true&items=50`,
  headers: {
    'Accept': 'application/json'
  }
};

if (APIKEY) {
  groupOptions.path += `&apikey=${APIKEY}`
  userOptions.path += `&apikey=${APIKEY}`
}

https.get(groupOptions, (res) => {
  let groupData = '';
  let userData = '';

  res.on('data', (chunk) => {
    groupData += chunk;
  });

  res.on('end', () => {
    const groupName = JSON.parse(groupData).name;

    https.get(userOptions, (res) => {

      res.on('data', (chunk) => {
        userData += chunk;
      });

      res.on('end', () => {
        const users = JSON.parse(userData)._links.users.map(u => u.title);
        const sortedUsers = users.sort();

        if (sortedUsers.length === 1) {
          console.log(`The sole member of the ${groupName} Group was ${sortedUsers[0]}.`);
        } else if (sortedUsers.length === 2) {
          const joinedUsers = sortedUsers.join(' and ');
          console.log(`Members of the ${groupName} Group included ${joinedUsers}.`);
        } else {
          const joinedUsers = sortedUsers.slice(0, -1).join(', ');
          console.log(`Members of the ${groupName} Group included ${joinedUsers}, and ${sortedUsers[sortedUsers.length - 1]}.`);
        }
      });
    }).on('error', (err) => {
      console.error(`Error: ${err.message}`);
    });
  });
}).on('error', (err) => {
  console.error(`Error: ${err.message}`);
});
