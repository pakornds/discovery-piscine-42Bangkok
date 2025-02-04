$(document).ready(function () {
  var todoContainer = $("#ft_List");
  var objectCookies = $.cookie();
  let allCookies = Object.entries(objectCookies);
  appendList();

  // console.log(allCookies.length)
  function setCookie(name, content) {
    // name = name.text()
    // console.log(content)
    if (/^\s*$/.test(content) == true) {
      return;
    }
    $.cookie(`${name}`, `${content}`);
    // console.log(allCookies)

    appendList();
  }
  $("#get").click(getCookie);
  function getCookie() {
    var objectCookies = $.cookie();
    let cookiesList = Object.entries(objectCookies);

    // console.log(cookiesList);
    if (cookiesList.length == 0) {
      return [];
    } else {
      return cookiesList;
    }
  }
  $("#create").click(function () {
    let newToDo = prompt("Put TO DO:", "");
    let newToDoSecure = newToDo;
    if (newToDo != "" && newToDo != null) {
      setCookie(`ToDo${newToDo}${getCookie().length + 1}`, newToDo);
      // console.log(newToDo)
    }
  });

  function removeCookie(ownValue) {
    let choice = window.confirm("Really want to remove?");
    if (choice) {
      $.removeCookie(`${ownValue}`);
      // document.cookie = `${ownValue}=; Max-Age=-99999999;`;
      appendList();
      // console.log(ownValue);
    } else {
      return;
    }
  }

  function appendList() {
    todoContainer.html("");
    if (allCookies != "" || getCookie() != "") {
      getCookie().forEach(function (content) {
        const todoContent = content[1];
        const todoName = content[0];
        // console.log(todoContent, todoName)
        createEle(todoContent, todoName);
      });
    } else {
      return;
    }
  }

  function createEle(todoContent, todoName) {
    var $newToDoEle = $("<pre>");
    $newToDoEle.attr({ class: "name", value: `${todoName}` });
    $newToDoEle.text(`:${todoContent}`);
    $newToDoEle.on("click", function () {
      var ownValue = $newToDoEle.attr("value");

      removeCookie(ownValue);
    });

    var $listBox = $("<div>");
    $listBox.attr("class", "listBox");

    $listBox.prepend($newToDoEle);
    todoContainer.prepend($listBox);
  }
});
