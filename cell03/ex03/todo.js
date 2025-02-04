var myNodelist = document.getElementById("ft_list");
//create to do
function createToDo(txt) {
  var node = document.createElement("div"); //create div
  node.textContent = txt; //define text to be text content of node
  node.addEventListener("click", function () {
    //click to do, to delete and store cookies again
    if (confirm("Are you sure you want to delete: " + txt)) {
      myNodelist.removeChild(node);
      st();
    }
  });
  //return current node to txt
  return node;
}

//create prompt and store "to-do" that you type in cookies
function popup() {
  let task = prompt("Enter some task...");
  if (task == null || task === "") {
    location.reload();
  } else if (task != null) {
    const x = createToDo(task);
    myNodelist.prepend(x);
    st();
  }
}

//create cookies
//"Tasks" is the name of cookies
//[...myNodelist.getElementsByTagName("div")] get "to-do" by tag div and uses spread method
//spread means getting stuff from iteration one by one and put it in array
//.map is the function that will send inside stuff for array and run the stuff you want then return it
//.join() get the result cookies and joined it to "Tasks = " using cookies which separated by comma
function st() {
  document.cookie =
    "Tasks" +
    "=" +
    [...myNodelist.getElementsByTagName("div")]
      .map(function (x) {
        return encodeURIComponent(x.textContent);
      })
      .join();
}

//store cookies
// { Tasks } = Destructuring it is waiting for cookies' name Tasks from the right side of code
//reduce is being used to make array become one object
//acc is the first time value which is empty object {}
//pair are from cookies that got split by ; => EX = "1=1; 2=2" => "1=1", "2=2"
//cookies that have "=" get split and the first one become key and the rest become vals
//Those will become array => example = ["1","1"]
const { Tasks } = document.cookie.split(";").reduce(function (acc, pair) {
  const [key, ...vals] = pair.trimStart().split("="); //add trimstart to fix some cookies problemm
  const val = vals.join("="); //just in case if there is any = in the stuff that you input
  acc[key] = decodeURIComponent(val); //assign key and val in object acc => example = {"1":"1","2":"2"}
  return acc; //return assigned acc
}, {});

//use cookies to create "to-do"
//get an array of stuff in tasks and use pass it to function (task)
//forEach is the same as map but it doesn't return anything back
//use task that have been encoded and decode it then use it to create to-do again
//use the result to display it with append because when we save stuffs it is in descending
if (Tasks) {
  Tasks.split(",").forEach(function (task) {
    const tx = decodeURIComponent(task);
    const y = createToDo(tx);
    myNodelist.append(y);
  });
}

//put each item thru function you provided into map and collect the function's return values and create new array from those value
//forEach is like map but it ignore the return value of the function completely and doesn't create or return anything
