const KEY_TASK = "TASKS";
export default class Cards {
  constructor() {
    this.data = JSON.parse(localStorage.getItem(KEY_TASK));
  }

  render() {
    document.querySelectorAll(".cart").forEach((item) => item.remove());
    const status1 = document.querySelector(".colomn-1");
    const status2 = document.querySelector(".colomn-2");
    const status3 = document.querySelector(".colomn-3");

    this.data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("cart");
      div.textContent = item.content;
      div.id = item.id;
      const iconRemove = document.createElement("span");
      iconRemove.classList.add("remove");
      iconRemove.classList.add("lnr");
      iconRemove.classList.add("lnr-cross");
      div.append(iconRemove);
      switch (item.status) {
        case "1":
          status1.append(div);
          break;
        case "2":
          status2.append(div);
          break;
        case "3":
          status3.append(div);
          break;
        default:
          break;
      }
    });
  }

  addTask(content, status) {
    const id = Date.now().toString();
    this.data.push({ id, content, status, img: "" });
    localStorage.setItem(KEY_TASK, JSON.stringify(this.data));
    this.render();
  }

  removeTask(id) {
    this.data = this.data.filter((item) => item.id !== id);
    localStorage.setItem(KEY_TASK, JSON.stringify(this.data));
    this.render();
  }
}
