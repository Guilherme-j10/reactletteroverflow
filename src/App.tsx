import { useEffect, useRef, useState } from "react";
import { ReactLetterOverflow } from ".";

function App() {

  const container_reference = useRef({} as HTMLDivElement);
  const [content, set_content] = useState('');

  //Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy

  useEffect(() => {

    //let presets = 15;

    setInterval(() => {

      set_content(val => val+'5')
      // container_reference.current.style.width = `${presets}%`;

      // if (presets < 100)
      //   presets++;

    }, 100)

  }, []);

  return (
    <div ref={container_reference} style={{
      width: '100%',
      border: 'solid 1px red',
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center'
    }}>
      <ReactLetterOverflow
        content={content}
      >
        {(props) => <p ref={props} style={{ fontSize: '1.3em' }}>
          {content}
        </p>}
      </ReactLetterOverflow>
    </div>
  )
}

export default App;