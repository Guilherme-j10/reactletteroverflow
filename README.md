# ReactLetterOverflow

This lib is intended for people who need text to be delimited based on the size of the parent container whose size is not necessarily passed in pixels but in any type of measurement

### Installation
```
   yarn add reactletteroverflow
```
or
```
   npm install reactletteroverflow
```

### Getting start
basic example of use
``` jsx
import { ReactLetterOverflow } from "reactletteroverflow";

<ReactLetterOverflow>
   {(props) => (
      <p ref={props}>
         Hello word
      </p>
   )}
</ReactLetterOverflow>
```

### Complete example
a complete example of how to use it to get the lib to work completely

**NOTE:** It's worth remembering that for now the lib will limit content in just one line

``` jsx
import { ReactLetterOverflow } from "reactletteroverflow";

funtion App () {

   return (
      <div style={{
         width: '50%', //here it can be any value
      }}>
         <ReactLetterOverflow>
            {(props) => (
               <p ref={props}>
                  Hello word
               </p>
            )}
         </ReactLetterOverflow>
      </div>
   );
}

export default App;
```