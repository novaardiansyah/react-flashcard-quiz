import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState()

  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height

    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(setMaxHeight, [
    flashcard.question,
    flashcard.answer,
    flashcard.options,
  ])

  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  })

  return (
    <div onClick={() => setFlip(!flip)} style={{ cursor: 'pointer' }}>
      <div
        className={`flashcard text-wrap text-break d-flex justify-content-center align-items-center position-relative text-cl-light bg-cl-dark shadow ${
          flip ? 'flip' : ''
        }`}
        style={{ height }}
      >
        <div className="front position-absolute start-0" ref={frontEl}>
          {flashcard.question}

          <div className="flashcard__options mt-2">
            {flashcard.options.map((option) => {
              return (
                <div className="flashcard__option" key={option}>
                  {option}
                </div>
              )
            })}
          </div>
        </div>

        <div className="back position-absolute" ref={backEl}>
          {flashcard.answer}
        </div>
      </div>
    </div>
  )
}
