import { useState, useEffect } from "react";
// Usage
export function AnimationExample() {
  // Call hook multiple times to get animated values with different start delays
  const animation1 = useAnimation("elastic", 1000, 50); // type of animation and its duration , delay
  const animation2 = useAnimation("elastic", 1000, 150);
  const animation3 = useAnimation("elastic", 1000, 300);
  const animation4 = useAnimation("elastic", 1000, 300);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Ball
        innerStyle={{
          marginTop: animation1 * 500 - 100,
          backgroundColor:'red'
        }}
      />
      <Ball
        innerStyle={{
          marginTop: animation2 * 500 - 0,
        }}
      />
      <Ball
        innerStyle={{
          marginTop: animation3 * 500 - 100,
          backgroundColor:'red'
        }}
      />
        <Ball
        innerStyle={{
          marginTop: animation4 * 500 - 0,
        }}
      />
    </div>
    
  );
}
const Ball = ({ innerStyle }) => (
  <div
    style={{
      width: 100,
      height: 100,
      marginRight: "40px",
      borderRadius: "50px",
      backgroundColor: "#4dd5fa",
      ...innerStyle,
    }}
  />
);
// Hook
function useAnimation(easingName = "elastic", duration = 500, delay = 0) {
  const elapsed = useAnimationTimer(duration, delay);
  const n = Math.min(1, elapsed / duration);
  return easing[easingName](n);
}

const easing = {
  linear: (n) => n,
  elastic: (n) =>
    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: (n) => Math.pow(2, 10 * (n - 1)),
};
function useAnimationTimer(duration = 1000, delay = 0) {
  const [elapsed, setTime] = useState(0);
  useEffect(
    () => {
      let animationFrame, timerStop, start;
      // Function to be executed on each animation frame
      function onFrame() {
        setTime(Date.now() - start);
        loop();
      }
      // Call onFrame() on next animation frame
      function loop() {
        animationFrame = requestAnimationFrame(onFrame);
      }
      function onStart() {
        // Set a timeout to stop things when duration time elapses
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setTime(Date.now() - start);
        }, duration);
        // Start the loop
        start = Date.now();
        loop();
      }
      // Start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);
      // Clean things up
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [duration, delay] // Only re-run effect if duration or delay changes
  );
  return elapsed;
}