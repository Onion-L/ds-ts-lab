import {Friend, Colleague } from './myTypes'
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

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]): Colleague {
    const result = cs.sort(
      (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
  }

function addColleague(cs:Colleague[],name:string,department:string,email:string) : Colleague[] {
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
