const baseUrl = "jetbrains://idea/navigate/reference?";

const openFile = (project, path, line) => {
  const url = `${baseUrl}project=${project}&path=${path}:${line}`;
  console.log(url);
  window.open(url, "_blank");
};

const getComments = () => {
  return document.getElementsByClassName("file-comment");
};

const getInfo = (comment) => {
  const fileHeader = comment.getElementsByClassName("file-header")[0];
  const fileHeaderLink = fileHeader.getElementsByTagName("a")[0].getAttribute("href");
  const infoPart = fileHeaderLink.split("#").pop();
  console.log(fileHeaderLink.matchAll(/(?:\/\S+repos\/)([^\/]*)/g).next());
  const repo = fileHeaderLink.matchAll(/(?:\/\S+repos\/)([^\/]*)/g).next().value[1];
  const path = infoPart.split("?")[0];
  let line = infoPart.split("t=").pop() - 1;
  if (isNaN(line)) {
    line = 0;
  }
  return { repo, path, line };
};

const comments = getComments();

for (let i = 0; i < comments.length; i++) {
  const comment = comments[i];
  const info = getInfo(comment);
  // const button = document.createElement("button");
  // button.className = "aui-button aui-button-primary open-in-ide";
  // button.innerHTML = "Open in IDE";
  // button.onclick = () => openFile(info.repo, info.path, info.line);
  comment.getElementsByClassName("atlaskit-icon")[0].addEventListener("click", () => openFile(info.repo, info.path, info.line));
  // comment.getElementsByClassName("file-header")[0].appendChild(button);
}
