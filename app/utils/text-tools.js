export function caseTitle (str) {
  if(!str) {
    str = this;
  }
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function extendPrototypes () {
  String.prototype.caseTitle = caseTitle;
}