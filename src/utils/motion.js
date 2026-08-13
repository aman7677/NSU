export const motionEase = [0.22, 1, 0.36, 1]
export const revealUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.56, ease: motionEase } },
}
export const maskReveal = {
  hidden: { y: '105%' },
  visible: { y: 0, transition: { duration: 0.76, ease: [0.16, 1, 0.3, 1] } },
}
export const viewportOnce = { once: true, amount: 0.2 }
