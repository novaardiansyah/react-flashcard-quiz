import React from 'react'

// components
import Flashcard from './Flashcard'

export default function FlashcardList({ flashcards }) {
  return (
    <div className="flashcard__grid mt-3">
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />
      })}
    </div>
  )
}
