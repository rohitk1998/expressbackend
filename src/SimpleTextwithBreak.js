import React , {memo} from "react";

export function SimpleBreakableText() {
    const test = () => {
      let colcount = 1; // column count
      let rowcount = 10; 
      let string = ''
      for (let i = 0; i < rowcount; i++) {
        for (let j = 0; j < colcount; j++) {
          string += `This hook allows you to`;
        }
        string += '<br/>';
      }
      const newstr = `<h3>${string}</h3>`
      console.log(newstr);
      return newstr ;
    };
  
    const poemtext = test();
  
    return <div dangerouslySetInnerHTML={{ __html: poemtext }}></div>;
  }
  
  export default memo(SimpleBreakableText);
  