import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

// components
import FlashcardList from '../components/FlashcardList'

export default function Home() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((res) => {
      setCategories(res.data.trivia_categories)
    })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setFlashcards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeStr(questionItem.correct_answer)
            const options = [
              ...questionItem.incorrect_answers.map((a) => decodeStr(a)),
              answer,
            ]

            return {
              id: `${index}${Date.now()}`,
              question: decodeStr(questionItem.question),
              answer,
              options: options.sort(() => Math.random() - 0.5),
            }
          })
        )
      })
  }

  return (
    <>
      <div className="container-fluid bg-cl-dark shadow p-3">
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select id="category" className="form-select" ref={categoryEl}>
                  {categories.map((category) => {
                    return (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className="form-control"
                  ref={amountEl}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                generate
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  )
}

function decodeStr(str) {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = str
  return textArea.value
}
