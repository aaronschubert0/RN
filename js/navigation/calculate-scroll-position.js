import { Dimensions } from 'react-native'

const calculateScrollPosition = (measurements, index, totalItems) => {
  const [ offsetX, offsetY, width, height, screenX, screenY ] = measurements
  const windowWidth = Dimensions.get('window').width
  const leftSide = screenX
  const rightSide = screenX + width
  if (leftSide < 0) {
    return {
      shouldScroll: true,
      x: (index === 0) ? offsetX : offsetX - 40,
      y: offsetY
    }
  } else if (rightSide > windowWidth) {
    return {
      shouldScroll: true,
      x: (index === totalItems-1)
        ? offsetX - windowWidth + width
        : offsetX - windowWidth + width + 40,
      y: offsetY
    }
  } else {
    return {
      shouldScroll: false
    }
  }
}
export default calculateScrollPosition
