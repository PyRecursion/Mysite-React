export function handerTime (time) {
    const m = Math.floor(time / 1000 / 60)
    var s = Math.round(Math.round(((time - m * 60 * 1000) / 1000)))
    if (s < 10) {
      s = "0" + s
    }
    return m + ":" + s
  }
  
  export function  handersinger (array) {
    var names = ""
    for (let index = 0; index < array.length; index++) {
  
      const element = array[index];
      if (index === array.length - 1) {
        names += element.name
      } else {
        names = element.name + ' & '
      }
    }
    return names
  }