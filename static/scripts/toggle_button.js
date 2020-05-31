var checkBox = document.getElementById("cb");

var theme = window.localStorage.getItem("data-theme");
if (theme) document.documentElement.setAttribute("data-theme", theme);
checkBox.checked = theme == "dark" ? true : false;

checkBox.addEventListener("change", function () {
  if (this.checked) {
    trans()
    document.documentElement.setAttribute("data-theme", "dark");
    window.localStorage.setItem("data-theme", "dark");
  } else {
    trans()
    document.documentElement.setAttribute("data-theme", "light");
    window.localStorage.setItem("data-theme", "light");
  }
})

let trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};

/*var checkbox = document.querySelector('input[name=theme]');


checkbox.addEventListener('change', function () {
    if (this.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}
*/
