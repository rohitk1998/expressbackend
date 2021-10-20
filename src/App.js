import { useState, useEffect, useRef } from "react";
// Usage
function App() {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  // State for our modal
  const [isModalOpen, setModalOpen] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setModalOpen(false));
  return (
    <div>
      {isModalOpen ? (
        <div
          ref={ref}
          style={{
            border: "1px solid red",
            marginLeft: "20px",
            width: "300px",
            height: "300px",
          }}
        >
          <div>👋 Hey, I'm a modal. Click anywhere outside of me to close.</div>
        </div>
      ) : (
       <>
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
        <hr/>
        <p>Hello this is house full movie to be watched <br/> by evenrypone</p>
       </>
      )}
    </div>
  );
}

// useOutsideClickHook
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default App;


