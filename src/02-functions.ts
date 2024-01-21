import {Friend, Colleague , EmailContact} from './myTypes'
import { friends, colleagues } from './01-basics'

function older(f: Friend) : string {
    f.age += 1
    return `${f.name} is now ${f.age}` 
}

function allOlder(fs:Friend[]) : string[] {
    const result : string[] = []
    fs.map(f => {
        older(f);
        result.push(`${f.name} is now ${f.age}`)    
    });
    return result;
}

// function sortColleagues(
//     colleagues: Colleague[],
//     sorter: (c1: Colleague, c2: Colleague) => number
//   ): EmailContact[] {
//     const sorted = colleagues.sort(sorter); // Colleague[] inferred
//     const result: EmailContact[] = sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
//     return result 
//   }

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]) { // Inferred retun type
  const result = cs.sort(
    (c1, c2) => c1.contact.extension - c2.contact.extension
  );
  return result[cs.length - 1];
}

function addColleague(cs:Colleague[],name:string,department:string,email:string) {
    const highest = highestExtension(cs).contact.extension;
    const colleagueObj = {
        name,
        department,
        contact:{
            email,
            extension:highest + 1
        }
    }
    cs.push(colleagueObj);
    return cs;
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));
console.log(highestExtension(colleagues.current));
console.log(older(friends[0]))
console.log(allOlder(friends));

function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number,
  max? : number
): EmailContact[] {
  let end = colleagues.length;
  if (max !== undefined) {
     end = max < 2 ? 1 : max
  }
  const sorted = colleagues.sort(sorter);
  const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return fullResult.slice(0,end)
}
// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); // NEW

function findFriends(fs:Friend[], filterFun:(friend:Friend)=>boolean) : string[] {
  let result : string[] = [];
  const newFriends = fs.filter(friend=> filterFun(friend));
  newFriends.map(f=>result.push(f.name));
  return result;
}

console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));