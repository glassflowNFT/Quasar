import { Duration } from '@quasar-vote/types/contracts/common'

import { secondsToWdhms } from './time'

export const durationIsNonZero = (d: Duration) => {
  if ('height' in d) {
    return d.height !== 0
  }
  return d.time !== 0
}

export const humanReadableDuration = (d: Duration) => {
  if ('height' in d) {
    return `${d.height} blocks`
  }
  return `${secondsToWdhms(d.time)}`
}
