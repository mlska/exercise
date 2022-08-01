const tbody = document.querySelector("#table tbody");
const sorter = document.getElementById("sort");
const rows = [].slice.call(tbody.querySelectorAll("tr"));

function initializeTable() {
  for (let row of rows) {
    row.cells[2].innerHTML = convertToISOTime(row.cells[2].innerHTML);
  }
}

function handleSort() {
  let direction = "ascending";

  sorter.firstChild.classList.contains(direction)
    ? (direction = "descending")
    : (direction = "ascending");

  switch (direction) {
    case "descending":
      sorter.firstChild.classList.remove("ascending");
      sorter.firstChild.classList.add(direction);
      rows.sort(function (a, b) {
        return (
          convertToSeconds(b.cells[2].innerHTML) -
          convertToSeconds(a.cells[2].innerHTML)
        );
      });
      break;

    case "ascending":
      sorter.firstChild.classList.add(direction);
      sorter.firstChild.classList.remove("descending");
      rows.sort(function (a, b) {
        return (
          convertToSeconds(a.cells[2].innerHTML) -
          convertToSeconds(b.cells[2].innerHTML)
        );
      });
      break;

    default:
      console.warn("Error in sorting");
  }

  rows.forEach((row) => tbody.appendChild(row));
}

function convertToSeconds(time) {
  let seconds = time.split(":");
  seconds = +seconds[0] * 60 * 60 + +seconds[1] * 60 + +seconds[2];
  return seconds;
}

function convertToISOTime(time) {
  const seconds = parseInt(time);

  const date = new Date(null);
  date.setSeconds(seconds);

  const t = date.toISOString();

  startIndex = t.indexOf("T") + 1;
  endIndex = t.indexOf("Z") - 4;

  const formattedTime = t.slice(startIndex, endIndex);

  return formattedTime;
}

//application

initializeTable();

sorter.addEventListener("click", handleSort);
