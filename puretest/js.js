const { easing, tween } = popmotion;

const sidebarProps = {
  initialPose: 'closed',
  open: {
    x: "0%",
    delayChildren: 300,
    staggerChildren: 50
  },
  closed: {
    delay: 500,
    staggerChildren: 20,
    x: "-100%"
  }
};

const itemProps = {
  initialPose: 'closed',
  open: {
    opacity: 1,
    y: 0,
    transition: (props) => tween({
      ...props,
      duration: 500,
      ease: props.key === 'opacity' ? easing.linear : easing.backOut
    })
  },
  closed: {
    opacity: 0,
    // We're using `i`, but you can pass as many different vars as you wish
    y: ({ i }) => i * 40
  }
};

const sidebar = document.querySelector('.sidepanel')
const items = Array.from(sidebar.querySelectorAll('.item'))

const sidebarPoser = pose(sidebar, sidebarProps)
items.forEach((item, i) => sidebarPoser.addChild(item, {
  ...itemProps,
  transitionProps: { i }
}))

sidebarPoser.set('open')
