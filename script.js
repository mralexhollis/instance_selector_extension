// This function creates a div element with links and values from local storage
function createDiv() {
  // Get values from local storage
  let values = JSON.parse(localStorage.getItem("values")) || [];

  // Create a div element and set its style and id
  let div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "10px";
  div.style.right = "10px";
  div.style.backgroundColor = "white";
  div.style.border = "1px solid black";
  div.style.padding = "10px";
  div.id = "myDiv";

  // Create a title for the div
  let title = document.createElement("h3");
  title.textContent = "Instance Selector";
  div.appendChild(title);

  // Create a list for the links
  let list = document.createElement("ul");
  list.style.listStyleType = "none";
  list.style.margin = "0";
  list.style.padding = "0";

  // Loop through the values and create list items with click events
  for (let i = 0; i < values.length; i++) {
    let item = document.createElement("li");
    let link = document.createElement("a");
    link.textContent = values[i];
    link.href = "#";
    link.addEventListener("click", function () {
      // Get the input field with id txtInstance
      let input = document.getElementById("txtInstance");
      if (input) {
        // Set the value of the input field to the corresponding value from local storage
        input.value = values[i];
      }
    });
    item.appendChild(link);
    list.appendChild(item);
  }
  div.appendChild(list);

  // Create a button to add a new link and value
  let addButton = document.createElement("button");
  addButton.textContent = "Add";
  addButton.addEventListener("click", function () {
    // Prompt the user to enter a link and a value
    let newValue = prompt("Enter a value:");
    if (newValue) {
      // Add the new link and value to local storage
      values.push(newValue);
      localStorage.setItem("values", JSON.stringify(values));
      // Refresh the div element
      refreshDiv();
    }
  });
  addButton.style.marginTop = "5px";
  div.appendChild(addButton);

  // Create a button to remove a link and value
  let removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    // Prompt the user to enter the index of the link and value to remove
    let index = prompt(
      "Enter the index of the link and value to remove (starting from 0):"
    );
    index = parseInt(index);
    if (!isNaN(index) && index >= 0 && index < values.length) {
      // Remove the link and value from local storage
      values.splice(index, 1);
      localStorage.setItem("values", JSON.stringify(values));
      // Refresh the div element
      refreshDiv();
    }
  });
  removeButton.style.marginTop = "5px";
  div.appendChild(removeButton);

  // Return the div element
  return div;
}

// This function removes the existing div element if any and appends a new one
function refreshDiv() {
  // Get the existing div element with id myDiv
  let oldDiv = document.getElementById("myDiv");
  if (oldDiv) {
    // Remove it from the document body
    document.body.removeChild(oldDiv);
  }

  // Create a new div element with links and values from local storage
  let newDiv = createDiv();
  // Append it to the document body
  document.body.appendChild(newDiv);
}

// This function runs when the extension is loaded or reloaded
function init() {
  // Check if the current site matches a certain condition (for example, contains a certain word in its URL)
  if (true) {
    // Refresh the div element
    refreshDiv();
  }
}

// Run the init function when the extension is loaded or reloaded
init();
console.log("script is installed");
