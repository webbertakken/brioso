import { useSpring, config, animated, useSpringRef, useChain } from '@react-spring/web'
import { useComponentSize } from '../../../../core/react/hooks/useComponentSize.tsx'
import styles from './AudioPart.module.scss'
import { useEffect, useState } from 'react'
import { useFirebaseDropProgress } from '../../../../core/firebase/upload/hooks/useFirebaseDropProgress.tsx'
import { FileUpload } from '../../../../core/firebase/upload/hooks/useFirebaseDrop.tsx'

interface Props {
  file: FileUpload
  uploaded: boolean
  displayAs: 'upload' | 'audio'
}

const AudioPart = ({ file, uploaded, displayAs }: Props) => {
  // Todo - clean up 3 separate loading states
  // @ts-ignore
  const { name, style, title = '', artist = '', uploadTask, storageRef } = file
  const { ref, height, width } = useComponentSize<HTMLDivElement>()
  const [isLoaded, setIsLoaded] = useState<boolean>(uploaded)
  const [initialised, setInitialised] = useState<boolean>(false)
  const [loadedAndAnimationReady, setLoadedAndAnimationReady] = useState<boolean>(isLoaded)
  const percentage = useFirebaseDropProgress(uploadTask, storageRef)

  const translateX = width * -0.416_66
  const translateY = height * 0.35
  const loaded = percentage === 100 && loadedAndAnimationReady
  const step = (translateX * -2) / 100
  const x = translateX + step * percentage

  useEffect(() => {
    setIsLoaded(uploaded)
    setLoadedAndAnimationReady(!uploadTask)
  }, [percentage, uploadTask, uploaded])

  useEffect(() => {
    if (!isLoaded) setLoadedAndAnimationReady(uploaded)
  }, [isLoaded, uploadTask, uploaded])

  const thematicIcon = useSpringRef()
  const thematicIconStyle = useSpring({
    ref: thematicIcon,
    config: config.gentle,
    from: {
      transform: `scale(1) translateX(0px) translateY(${translateY}px)`,
    },
    to: {
      transform: loadedAndAnimationReady
        ? `scale(2) translateX(0px) translateY(0px)`
        : `scale(1) translateX(${x}px) translateY(${translateY}px)`,
    },
    onRest: () => {
      if (!initialised) setInitialised(isLoaded)
      setLoadedAndAnimationReady(isLoaded)
    },
  })

  const circle = useSpringRef()
  const circleStyle = useSpring({
    ref: circle,
    config: config.gentle,
    from: {
      opacity: 0,
      backgroundColor: 'transparent',
    },
    to: {
      opacity: 1,
      backgroundColor: loaded ? '#fffbc5' : 'transparent',
    },
  })

  const bar = useSpringRef()
  const barStyle = useSpring({
    ref: bar,
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: loaded ? 0 : 1 },
  })

  const inputs = useSpringRef()
  const inputsStyle = useSpring({
    ref: inputs,
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: loaded ? 1 : 0 },
  })

  const item1 = useSpringRef()
  const item1Style = useSpring({
    ref: item1,
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: loaded ? 1 : 0 },
  })

  const item2 = useSpringRef()
  const item2Style = useSpring({
    ref: item2,
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: loaded ? 1 : 0 },
    onChange: () => setLoadedAndAnimationReady(isLoaded),
    onStart: () => setLoadedAndAnimationReady(isLoaded),
  })

  useChain(
    initialised
      ? loaded
        ? [thematicIcon, bar, circle, inputs, item1, item2]
        : [item2, item1, inputs, bar, thematicIcon, circle]
      : [circle, bar, thematicIcon, item1, item2],
    initialised
      ? loaded
        ? [0, 0, 0.5, 1, 1.5, 2.5]
        : [0, 0.5, 1, 1.5, 2, 2.5]
      : [0, 0, 0, 0, 0, 0],
  )

  return (
    <div ref={ref} className={styles.proto1} style={style}>
      {name} ({displayAs})
      <animated.div className={styles.inputs} style={inputsStyle}>
        <animated.input style={item1Style} placeholder="Song title" defaultValue={title} />
        <animated.input style={item2Style} placeholder="Artist" defaultValue={artist} />
      </animated.div>
      <animated.div className={styles.bar} style={barStyle} />
      <animated.div className={styles.circle} style={circleStyle}>
        <animated.div className={styles.symbol} style={thematicIconStyle}>
          🎶
        </animated.div>
      </animated.div>
    </div>
  )
}

export default AudioPart
