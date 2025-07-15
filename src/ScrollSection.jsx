// import { useEffect, useRef, useState } from "react";

// export default function ScrollSection({ children }) {
//   const ref = useRef();
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       setVisible(entry.isIntersecting);
//     });

//     if (ref.current) observer.observe(ref.current);
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className={`transition-all duration-700 transform ${
//         visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//       }`}
//     >
//       {children}
//     </div>
//   );
// }

import { useRef, useEffect, useState } from "react";

const ScrollSection = ({ children }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

export default ScrollSection;