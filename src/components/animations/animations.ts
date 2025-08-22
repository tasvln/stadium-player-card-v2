export const linkContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2, // add a delay between each element by .2 sec
    },
  },
}
// variant to pass to children of container
export const linkItem = {
  hidden: { y: '100%' },
  show: { y: '0%', transition: { duration: 0.5 } },
}

export const fadeInOut = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
}
