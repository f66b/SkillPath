import React, { useState, useEffect } from 'react'
import pomodoroCourseData from '../data/pomodoroCourse.json'

const PomodoroMasteryCourse = () => {
  const [currentPart, setCurrentPart] = useState(1)
  const [currentLesson, setCurrentLesson] = useState(1)
  const [completedLessons, setCompletedLessons] = useState({})
  const [partScores, setPartScores] = useState({})
  const [showFinalQuiz, setShowFinalQuiz] = useState(false)
  const [finalQuizAnswers, setFinalQuizAnswers] = useState({})
  const [courseProgress, setCourseProgress] = useState(0)

  // Use the imported course data
  const courseData = pomodoroCourseData

  // Helper functions
  const markLessonComplete = (partId, lessonId) => {
    setCompletedLessons(prev => ({
      ...prev,
      [`${partId}-${lessonId}`]: true
    }))
  }

  const handleFinalQuizAnswer = (partId, questionIndex, selectedAnswer) => {
    setFinalQuizAnswers(prev => ({
      ...prev,
      [`${partId}-${questionIndex}`]: selectedAnswer
    }))
  }

  const calculateFinalQuizScore = (partId) => {
    const partQuiz = courseData[partId].finalQuiz
    let correctAnswers = 0
    
    partQuiz.forEach((question, index) => {
      const userAnswer = finalQuizAnswers[`${partId}-${index}`]
      if (userAnswer === question.correct) {
        correctAnswers++
      }
    })
    
    return Math.round((correctAnswers / partQuiz.length) * 100)
  }

  const submitFinalQuiz = (partId) => {
    const score = calculateFinalQuizScore(partId)
    setPartScores(prev => ({
      ...prev,
      [partId]: score
    }))
    
    if (score >= 60) {
      setCurrentPart(prev => Math.min(prev + 1, Object.keys(courseData).length))
      setCurrentLesson(1)
      setShowFinalQuiz(false)
      setFinalQuizAnswers({})
    }
  }

  const canAccessPart = (partId) => {
    if (partId === 1) return true
    return partScores[partId - 1] >= 60
  }

  const getLessonsToShow = (partId) => {
    const lessons = courseData[partId].lessons
    const completedCount = lessons.filter(lesson => 
      completedLessons[`${partId}-${lesson.id}`]
    ).length
    
    return Math.min(completedCount + 1, lessons.length)
  }

  const nextLesson = (partId) => {
    const lessonsToShow = getLessonsToShow(partId)
    if (currentLesson < lessonsToShow) {
      setCurrentLesson(prev => prev + 1)
    } else if (lessonsToShow === courseData[partId].lessons.length) {
      setShowFinalQuiz(true)
    }
  }

  // Lesson Component
  const LessonComponent = ({ lesson, partId, onComplete }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)

    const handleAnswerSelect = (answerIndex) => {
      setSelectedAnswer(answerIndex)
      setShowResult(true)
      
      setTimeout(() => {
        setShowResult(false)
        setSelectedAnswer(null)
        onComplete()
      }, 2000)
    }

    return (
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Lesson {lesson.id} – "{lesson.title}"
        </h3>
        
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{lesson.content}</p>
        </div>
        
        <div className="border-t pt-6">
          <h4 className="font-medium mb-4 text-gray-900">Quiz:</h4>
          <p className="mb-4 text-gray-700">{lesson.quiz.question}</p>
          
          <div className="space-y-3">
            {lesson.quiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedAnswer === index
                    ? showResult
                      ? index === lesson.quiz.correct
                        ? 'bg-green-100 border-green-300 text-green-800'
                        : 'bg-red-100 border-red-300 text-red-800'
                      : 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {String.fromCharCode(65 + index)}) {option}
                {showResult && index === lesson.quiz.correct && (
                  <span className="ml-2">✅</span>
                )}
                {showResult && selectedAnswer === index && index !== lesson.quiz.correct && (
                  <span className="ml-2">❌</span>
                )}
              </button>
            ))}
          </div>
          
          {showResult && (
            <div className="mt-4 p-3 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">
                {selectedAnswer === lesson.quiz.correct 
                  ? "Correct! Well done!" 
                  : `Incorrect. The correct answer is: ${String.fromCharCode(65 + lesson.quiz.correct)}) ${lesson.quiz.options[lesson.quiz.correct]}`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Final Quiz Component
  const FinalQuizComponent = ({ partId, onSubmit }) => {
    const getAnswers = () => {
      const answers = {}
      courseData[partId].finalQuiz.forEach((_, index) => {
        answers[index] = finalQuizAnswers[`${partId}-${index}`] || null
      })
      return answers
    }

    const handleAnswerChange = (questionIndex, answerIndex) => {
      handleFinalQuizAnswer(partId, questionIndex, answerIndex)
    }

    const submitQuiz = () => {
      onSubmit()
    }

    const answers = getAnswers()
    const allAnswered = Object.values(answers).every(answer => answer !== null)

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-6 text-gray-900">
          Final Quiz – Part {partId}: {courseData[partId].title}
        </h3>
        
        <div className="space-y-6">
          {courseData[partId].finalQuiz.map((question, questionIndex) => (
            <div key={questionIndex} className="border-b pb-4">
              <p className="font-medium mb-3 text-gray-900">
                {questionIndex + 1}. {question.question}
              </p>
              
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={optionIndex}
                      checked={answers[questionIndex] === optionIndex}
                      onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                      className="text-blue-600"
                    />
                    <span className="text-gray-700">
                      {String.fromCharCode(65 + optionIndex)}) {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <button
            onClick={submitQuiz}
            disabled={!allAnswered}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              allAnswered
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Quiz
          </button>
        </div>
      </div>
    )
  }

  // Calculate overall progress
  useEffect(() => {
    let totalLessons = 0
    let completedTotal = 0
    
    Object.keys(courseData).forEach(partId => {
      const part = courseData[partId]
      totalLessons += part.lessons.length
      
      part.lessons.forEach(lesson => {
        if (completedLessons[`${partId}-${lesson.id}`]) {
          completedTotal++
        }
      })
    })
    
    setCourseProgress(Math.round((completedTotal / totalLessons) * 100))
  }, [completedLessons])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pomodoro Mastery Course
          </h1>
          <p className="text-gray-600">
            Master time management and productivity with the proven Pomodoro Technique
          </p>
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2 max-w-md mx-auto">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${courseProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{courseProgress}% Complete</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {Object.keys(courseData).map(partId => (
            <button
              key={partId}
              onClick={() => {
                if (canAccessPart(parseInt(partId))) {
                  setCurrentPart(parseInt(partId))
                  setCurrentLesson(1)
                  setShowFinalQuiz(false)
                }
              }}
              disabled={!canAccessPart(parseInt(partId))}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPart === parseInt(partId)
                  ? 'bg-blue-600 text-white'
                  : canAccessPart(parseInt(partId))
                  ? 'bg-white text-gray-700 hover:bg-gray-50 border'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Part {partId}
              {partScores[partId] && (
                <span className="ml-2 text-xs">
                  ({partScores[partId]}%)
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Current Part Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Part {currentPart}: {courseData[currentPart].title}
          </h2>
          
          {showFinalQuiz ? (
            <FinalQuizComponent 
              partId={currentPart}
              onSubmit={() => submitFinalQuiz(currentPart)}
            />
          ) : (
            <div>
              {courseData[currentPart].lessons
                .slice(0, getLessonsToShow(currentPart))
                .map(lesson => (
                  <LessonComponent
                    key={lesson.id}
                    lesson={lesson}
                    partId={currentPart}
                    onComplete={() => {
                      markLessonComplete(currentPart, lesson.id)
                      if (lesson.id === getLessonsToShow(currentPart)) {
                        nextLesson(currentPart)
                      }
                    }}
                  />
                ))}
              
              {getLessonsToShow(currentPart) < courseData[currentPart].lessons.length && (
                <div className="text-center mt-6">
                  <p className="text-gray-600 mb-4">
                    Complete the current lesson to unlock the next one
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Course Completion */}
        {courseProgress === 100 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              🎉 Congratulations!
            </h3>
            <p className="text-green-700">
              You've completed the Pomodoro Mastery course! You now have the skills to boost your productivity and manage your time effectively.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PomodoroMasteryCourse 