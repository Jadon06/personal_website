import React from 'react'
import './Hobbies.css'

const categories = [
  {
    tag: 'Sports',
    title: 'Team Sports & Outdoors',
    text: 'Basketball, soccer, and softball have been staples growing up. When winter hits, you\'ll find me on the slopes skiing or snowboarding.',
    images: [{ src: '/Softball2024TeamPhoto.JPEG', alt: 'Softball 2024 team photo' }],
  },
  {
    tag: 'Gaming',
    title: 'Video Games',
    text: 'Gaming has become less frequent in recent years, but when I find the time, Warzone and Siege are the go-tos. Tactical, competitive, and always a good time.',
    images: [
      { src: '/COD_WarzoneThumbnail.jpg', alt: 'Call of Duty Warzone' },
      { src: '/R6Thumbnail.jpg', alt: 'Rainbow Six Siege' },
    ],
  },
  {
    tag: 'Entertainment',
    title: 'Shows & Movies',
    text: 'Whether it\'s a gripping series or a motivating film, I enjoy unwinding with good content. Coach Carter and The Boys are personal favourites.',
    images: [
      { src: '/CoachCarterThumbnail.jpg', alt: 'Coach Carter' },
      { src: '/theBoysThumbnail.jpeg', alt: 'The Boys' },
    ],
  },
  {
    tag: 'Social',
    title: 'Friends & New People',
    text: 'Socializing and meeting new people is something I genuinely enjoy. Whether it\'s hanging out with close friends or sparking a conversation with someone new, good company is always the move.',
    images: [{ src: '/Friends.jpg', alt: 'Friends' }],
  },
]

export default function Hobbies({ onScroll }: { onScroll?: React.UIEventHandler<HTMLDivElement> }) {
  return (
    <div className="about-page" onScroll={onScroll}>
      <header className="about-header">
        <h2 className="about-title">About</h2>
        <div className="about-title-rule" />
      </header>

      <div className="about-list">
        {categories.map((cat, i) => (
          <article className={`about-row${i % 2 !== 0 ? ' about-row--flip' : ''}`} key={cat.tag}>
            <div className={`about-row-images${cat.images.length > 1 ? ' about-row-images--multi' : ''}`}>
              {cat.images.map((img) => (
                <img key={img.src} src={img.src} alt={img.alt} className="about-img" />
              ))}
            </div>
            <div className="about-row-text">
              <span className="about-tag">{cat.tag}</span>
              <h3 className="about-row-title">{cat.title}</h3>
              <p className="about-row-desc">{cat.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
