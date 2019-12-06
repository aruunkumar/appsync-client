let todos = [];
var getRDSToDos = [
    {
      "ID": "100",
      "NAME": "Clean room",
      "DESCRIPTION": "Vaccum room, remove trash",
      "PRIORITY": 3
    },
    {
      "ID": "101",
      "NAME": "Client presentation",
      "DESCRIPTION": "Prepare PPT and reharse",
      "PRIORITY": 2
    },
    {
      "ID": "102",
      "NAME": "Grocery shopping",
      "DESCRIPTION": "Buy bread & meat",
      "PRIORITY": 5
    }
  ]

var getDynamoToDos = [
    {
      "id": "2313100",
      "name": "Clean room",
      "description": "Vaccum room, remove trash",
      "priority": 3
    },
    {
      "id": "344343423423",
      "name": "Client presentation",
      "description": "Prepare PPT and reharse",
      "priority": 2
    }
  ]

getDynamoToDos.forEach(element => {
    todos.push(element);
});
todos.push(getRDSToDos.map(item => {
    return {
        id: item.ID,
        name: item.NAME,
        description: item.DESCRIPTION,
        priority: item.PRIORITY
    }
}));

// getRDSToDos = getRDSToDos.map(item => {
//     return {
//         id: item.ID,
//         name: item.NAME,
//         description: item.DESCRIPTION,
//         priority: item.PRIORITY
//     }
// });

// getRDSToDos.forEach(element => {
//     todos.push(element);
// });
console.log(todos);