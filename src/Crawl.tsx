import { useLayoutEffect, useRef } from 'react';
import './Crawl.css';

const crawlText = `In a time of global struggle and economic distress, Jadon is a 20 year old student trying to make his way in the world. Building unique projects to help others, even in the slightest of ways, while also maintaining a 3.00/4 GPA. As social media grips the rest of the world in it's addictive clenches, Jadon seeks sports as his way of escape, breaking ankles on any court he steps on. When Jadon isn't out fighting his way into the corporate world, he's researching, and developing his skills to arm himself against his competition so that he can lead himself into a better future...`;

interface CrawlProps {
  crawlWidth?: string
  duration?: number
  onFirstWordVisible?: () => void
  onBeforeFirstWordVisible?: () => void
}

export default function Crawl({ crawlWidth, duration, onFirstWordVisible, onBeforeFirstWordVisible }: CrawlProps) {
  const innerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!innerRef.current) return

    const elementHeight = innerRef.current.scrollHeight
    const vp = window.innerHeight
    // Animation goes from translateY(100vh) to translateY(-120vh) = 220vh total travel.
    // The first word (top of element) becomes visible at the container bottom when
    // translateY = elementHeight. Travel needed from start (100vh): max(0, vp - elementHeight).
    const travelToFirstWord = Math.max(0, vp - elementHeight)
    const progress = travelToFirstWord / (vp * 2.2)
    const delayMs = (0.5 + progress * (duration ?? 32)) * 1000

    const timers: ReturnType<typeof setTimeout>[] = []
    if (onFirstWordVisible) timers.push(setTimeout(onFirstWordVisible, Math.max(0, delayMs - 4000)))
    if (onBeforeFirstWordVisible) timers.push(setTimeout(onBeforeFirstWordVisible, Math.max(0, delayMs - 5500)))
    return () => timers.forEach(clearTimeout)
  }, [duration, onFirstWordVisible, onBeforeFirstWordVisible])

  return (
    <div className="star-wars-crawl-bg">
      <section className="star-wars-crawl" style={crawlWidth ? { maxWidth: crawlWidth } : {}}>
        <div
          ref={innerRef}
          className="crawl-inner"
          style={duration ? { animationDuration: `${duration}s` } : {}}
        >
          <p>{crawlText}</p>
        </div>
      </section>
    </div>
  );
}
