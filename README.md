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

### Use with state
If your content is in a state, follow the step below
``` jsx
import { useState } from "react";
import { ReactLetterOverflow } from "reactletteroverflow";

funtion App () {

   const [content, set_content] = useState('');

   return (
      <div style={{
         width: '50%', //here it can be any value
      }}>
         <ReactLetterOverflow
            content={content}
         >
            {(props) => (
               <p ref={props}>
                  {content}
               </p>
            )}
         </ReactLetterOverflow>
      </div>
   );
}

export default App;
```

### API

| Property | Default value | Type | Definition |
| -------- | ------------- | ---- | ------------ |
| enable_title? | true | Boolean | specifies whether, when the content is delimited, whether the entire content should be in the title property |
| delimiter? | ... | String | With this prop you can modify the delimiter that goes at the end of the content, e.g: '...', '...se more' |
| content? | undefined | String | Property used when your content is in a state |

### Future intentions
That it is possible to specify how many lines the content will be delimited in and that the delimiter property can have click events that when triggered make it possible to release all the content for viewing

### License

[MIT](LICENSE)
