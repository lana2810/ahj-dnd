/* eslint-disable no-console */
import Cards from "./Cards";
import data from "./data";

const KEY_TASK = "TASKS";
localStorage.setItem(KEY_TASK, JSON.stringify(data));
const cards = new Cards();
cards.render();
const container = document.querySelector(".container");
const btnAddTast = document.querySelectorAll(".add-cart");

function formAddNewTask() {
  const form = document.createElement("form");
  form.classList.add("form-add");
  const textarea = document.createElement("textarea");
  textarea.placeholder = "Enter a title for this card";
  textarea.name = "input-new-task";
  textarea.classList.add("input");
  form.append(textarea);
  const button = document.createElement("button");
  button.classList.add("confirm");
  button.textContent = "Add Card";
  form.append(button);
  const iconRemove = document.createElement("span");
  iconRemove.classList.add("icon-cancel");
  iconRemove.classList.add("lnr");
  iconRemove.classList.add("lnr-cross");
  form.append(iconRemove);
  textarea.focus();
  return form;
}
btnAddTast.forEach((item) => {
  item.addEventListener("click", ({ target }) => {
    item.classList.add("hidden");
    const colomn = target.closest(".section").querySelector(".colomn");
    const form = formAddNewTask();
    colomn.append(form);
  });
});
container.addEventListener("click", (e) => {
  e.preventDefault();
  const { target } = e;
  if (target.classList.contains("remove")) {
    const parent = target.closest(".cart");
    cards.removeTask(parent.id);
  }
  if (target.classList.contains("confirm")) {
    const form = target.closest(".form-add");
    const { value } = form.querySelector(".input");
    const colomnH = target.closest(".colomn");
    let status;
    if (colomnH.classList.contains("colomn-1")) status = 1;
    if (colomnH.classList.contains("colomn-2")) status = 2;
    if (colomnH.classList.contains("colomn-3")) status = 3;
    cards.addTask(value, status.toString());
    form.remove();
    btnAddTast.forEach((item) => item.classList.remove("hidden"));
  }
  if (target.classList.contains("icon-cancel")) {
    const form = target.closest(".form-add");
    form.reset();
    form.remove();
    btnAddTast.forEach((item) => item.classList.remove("hidden"));
  }
});
let actualElement;
let nextElement;
let div;

const onMouseOver = (e) => {
  const { target } = e;
  if (!target.classList.contains("cart")) return;
  actualElement.style.top = e.clientY + "px";
  actualElement.style.left = e.clientX + "px";
  if (!div) {
    div = document.createElement("div");
    div.classList.add("cart");
    div.style.height = actualElement.offsetHeight + "px";
    target.insertAdjacentElement("afterend", div);
  }
};
const onMouseOut = (e) => {
  const { target } = e;
  if (!target.classList.contains("cart")) return;
  div.remove();
  div = undefined;
};
const onMouseUp = (e) => {
  const mouseUpItem = e.target;
  if (!mouseUpItem.classList.contains("cart")) {
    nextElement.insertAdjacentElement("beforebegin", actualElement);
  } else {
    mouseUpItem.insertAdjacentElement("afterend", actualElement);
  }
  div.remove();
  actualElement.classList.remove("dragged");
  actualElement.removeAttribute("style");
  document.documentElement.style.cursor = "auto";
  div = undefined;
  actualElement = undefined;
  nextElement = undefined;
  document.documentElement.removeEventListener("mouseup", onMouseUp);
  document.documentElement.removeEventListener("mouseover", onMouseOver);
  document.documentElement.removeEventListener("mouseout", onMouseOut);
};

container.addEventListener("mousedown", (e) => {
  actualElement = e.target;
  if (!actualElement.classList.contains("cart")) return;
  document.documentElement.style.cursor = "grab";
  nextElement = actualElement.nextElementSibling;
  actualElement.classList.add("dragged");
  actualElement.style.border = "1px solid gray";
  e.preventDefault();
  document.documentElement.addEventListener("mouseup", onMouseUp);
  document.documentElement.addEventListener("mouseover", onMouseOver);
  document.documentElement.addEventListener("mouseout", onMouseOut);
});
