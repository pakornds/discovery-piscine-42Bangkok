var myNodelist = $("#ft_list");
function createToDo(txt) {
    var node = $("<div></div>");
    node.textContent = txt;
    node.addEventListener('click',
        function () {
            if (confirm("Are you sure you want to delete: " + txt)) {
                myNodelist.removeChild(node)
                st();
            }
        })
    return node
}

function popup() {
    let task = prompt("Enter some task...");
    if (task != null) {
        const x = createToDo(task);
        myNodelist.prepend(x);
        st();
    }
}

function st() {
    document.cookie = "Tasks" + "=" + [...myNodelist.$("<div></div>")].map(function (x) {
        return encodeURIComponent(x.textContent)
    }).join()
}

const { Tasks } = document.cookie.split(';').reduce(
    function (acc, pair) {
        const [key, ...vals] = pair.split('=')
        const val = vals.join('=')
        acc[key] = decodeURIComponent(val)
        return acc
    },
    {}
)

Tasks && Tasks.split(",").forEach(function (task) {
    const tx = decodeURIComponent(task)
    const y = createToDo(tx);
    myNodelist.append(y)
})

