import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const scrollStops = [0, 0.16, 0.32, 0.48, 0.64, 0.8, 1];

function useBlobMotion(progress, x, y, opacity) {
  return {
    x: useTransform(progress, [0, 0.5, 1], x),
    y: useTransform(progress, [0, 0.5, 1], y),
    opacity: useTransform(progress, [0, 0.5, 1], opacity),
  };
}

const floatTransition = (duration, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut",
});

export default function NeonScrollBackground() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 180,
    damping: prefersReducedMotion ? 100 : 34,
    mass: prefersReducedMotion ? 0.1 : 0.55,
    restDelta: 0.001,
  });

  const baseColor = useTransform(smoothScrollYProgress, scrollStops, [
    "#030305",
    "#09030e",
    "#11040c",
    "#0a0c13",
    "#071010",
    "#080611",
    "#030405",
  ]);
  const auroraOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.3, 0.58, 1],
    [0.36, 0.54, 0.44, 0.34],
  );

  const pink = useBlobMotion(
    smoothScrollYProgress,
    ["-26vw", "5vw", "-12vw"],
    ["-18vh", "9vh", "-8vh"],
    [0.58, 0.42, 0.24],
  );
  const red = useBlobMotion(
    smoothScrollYProgress,
    ["52vw", "24vw", "42vw"],
    ["48vh", "18vh", "60vh"],
    [0.26, 0.58, 0.35],
  );
  const orange = useBlobMotion(
    smoothScrollYProgress,
    ["66vw", "36vw", "76vw"],
    ["-20vh", "18vh", "4vh"],
    [0.42, 0.58, 0.26],
  );
  const yellow = useBlobMotion(
    smoothScrollYProgress,
    ["18vw", "60vw", "30vw"],
    ["62vh", "42vh", "72vh"],
    [0.16, 0.5, 0.34],
  );
  const purple = useBlobMotion(
    smoothScrollYProgress,
    ["72vw", "46vw", "8vw"],
    ["68vh", "54vh", "30vh"],
    [0.36, 0.26, 0.56],
  );
  const cyan = useBlobMotion(
    smoothScrollYProgress,
    ["-12vw", "18vw", "54vw"],
    ["48vh", "66vh", "36vh"],
    [0.18, 0.42, 0.56],
  );
  const green = useBlobMotion(
    smoothScrollYProgress,
    ["36vw", "74vw", "50vw"],
    ["76vh", "68vh", "8vh"],
    [0.12, 0.3, 0.48],
  );

  const blobs = [
    {
      id: "pink",
      color: "#ff168d",
      motion: pink,
      float: { x: [-18, 22], y: [12, -22], scale: [1, 1.08] },
      transition: floatTransition(17),
    },
    {
      id: "red",
      color: "#ff2b26",
      motion: red,
      float: { x: [18, -22], y: [-14, 20], scale: [1.04, 0.96] },
      transition: floatTransition(21, -4),
    },
    {
      id: "orange",
      color: "#ff7a18",
      motion: orange,
      float: { x: [20, -16], y: [12, 28], scale: [1, 1.1] },
      transition: floatTransition(19, -8),
    },
    {
      id: "yellow",
      color: "#f8ff1c",
      motion: yellow,
      float: { x: [-16, 22], y: [24, -16], scale: [0.96, 1.08] },
      transition: floatTransition(23, -3),
    },
    {
      id: "purple",
      color: "#9b4dff",
      motion: purple,
      float: { x: [24, -18], y: [-16, 20], scale: [1.08, 0.94] },
      transition: floatTransition(22, -10),
    },
    {
      id: "cyan",
      color: "#12d9ff",
      motion: cyan,
      float: { x: [-20, 16], y: [16, -20], scale: [0.96, 1.1] },
      transition: floatTransition(20, -6),
    },
    {
      id: "green",
      color: "#67ff5d",
      motion: green,
      float: { x: [14, -24], y: [-18, 16], scale: [1.08, 0.95] },
      transition: floatTransition(24, -12),
    },
  ];

  return (
    <div aria-hidden="true" className="neon-scroll-background">
      <motion.div
        className="neon-scroll-background__base"
        style={{ backgroundColor: prefersReducedMotion ? "#030305" : baseColor }}
      />
      <motion.div
        className="neon-scroll-background__aurora"
        style={{ opacity: prefersReducedMotion ? 0.22 : auroraOpacity }}
      />
      <div className="neon-scroll-background__blobs">
        {blobs.map((blob) => (
          <motion.div
            key={blob.id}
            className="neon-scroll-background__blob-position"
            style={
              prefersReducedMotion
                ? { opacity: 0.22 }
                : {
                    x: blob.motion.x,
                    y: blob.motion.y,
                    opacity: blob.motion.opacity,
                  }
            }
          >
            <motion.div
              className="neon-scroll-background__blob"
              style={{ "--neon-blob-color": blob.color }}
              animate={prefersReducedMotion ? undefined : blob.float}
              transition={prefersReducedMotion ? undefined : blob.transition}
            />
          </motion.div>
        ))}
      </div>
      <div className="neon-scroll-background__vignette" />
    </div>
  );
}
