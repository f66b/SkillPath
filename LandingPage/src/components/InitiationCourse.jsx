import React, { useState, useEffect } from 'react'
import { useWeb3 } from '../context/Web3Context'
import { useProgress } from '../context/ProgressContext'
import initiationCourseData from '../data/initiationCourse.json'

const InitiationCourse = () => {
  console.log('InitiationCourse component rendering')
  const { account } = useWeb3()
  const { 
    getCourseProgress, 
    markLessonComplete, 
    updatePartScore, 
    isLessonCompleted, 
    getPartScore 
  } = useProgress()
  
  const [currentPart, setCurrentPart] = useState(1)
  const [currentLesson, setCurrentLesson] = useState(1)
  const [showFinalQuiz, setShowFinalQuiz] = useState(false)
  const [finalQuizAnswers, setFinalQuizAnswers] = useState({})
  const [courseProgress, setCourseProgress] = useState(0)

  // Use the imported course data
  const courseData = initiationCourseData
  console.log('Course data loaded:', courseData)

  // Load progress when component mounts or account changes
  useEffect(() => {
    if (account) {
      const progress = getCourseProgress('initiation')
      setCourseProgress(progress.courseProgress || 0)
    }
  }, [account, getCourseProgress])

  // Update progress display when progress changes
  useEffect(() => {
    if (account) {
      const progress = getCourseProgress('initiation')
      setCourseProgress(progress.courseProgress || 0)
    }
  }, [account, getCourseProgress])

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
    updatePartScore('initiation', partId, score)
    
    if (score >= 60) {
      // Since this is a single-part course, redirect to dashboard
      setShowFinalQuiz(false)
      // Redirect to dashboard after a short delay to show completion
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
    }
  }

  const canAccessPart = (partId) => {
    return true // All parts accessible in initiation course
  }

  const getLessonsToShow = (partId) => {
    const lessons = courseData[partId].lessons
    const completedCount = lessons.filter(lesson => 
      isLessonCompleted('initiation', partId, lesson.id)
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
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border-2 border-purple-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Lesson {lesson.id} – "{lesson.title}"
        </h3>
        
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed text-lg">{lesson.content}</p>
        </div>
        
        <div className="border-t pt-6">
          <h4 className="font-medium mb-4 text-gray-900">Quick Check:</h4>
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
                      : 'bg-purple-100 border-purple-300 text-purple-800'
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
                  ? "Great job! You're learning well!" 
                  : `No worries! The correct answer is: ${String.fromCharCode(65 + lesson.quiz.correct)}) ${lesson.quiz.options[lesson.quiz.correct]}`
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
      <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-purple-200">
        <h3 className="text-xl font-semibold mb-6 text-gray-900">
          Final Check – Welcome to SkillPath
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
                      className="text-purple-600"
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
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Complete Initiation
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎓</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to SkillPath
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Your initiation into the world of interactive learning
          </p>
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-3 max-w-md mx-auto">
              <div 
                className="bg-purple-600 h-3 rounded-full transition-all duration-300"
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
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentPart === parseInt(partId)
                  ? 'bg-purple-600 text-white'
                  : canAccessPart(parseInt(partId))
                  ? 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-purple-200'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Part {partId}
              {getPartScore('initiation', partId) > 0 && (
                <span className="ml-2 text-xs">
                  ({getPartScore('initiation', partId)}%)
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Current Part Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            {courseData[currentPart].title}
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
                      markLessonComplete('initiation', currentPart, lesson.id)
                      if (lesson.id === getLessonsToShow(currentPart)) {
                        nextLesson(currentPart)
                      }
                    }}
                  />
                ))}
              
              {getLessonsToShow(currentPart) < courseData[currentPart].lessons.length && (
                <div className="text-center mt-6">
                  <p className="text-gray-600 mb-4">
                    Complete the current lesson to continue your journey
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Course Completion */}
        {courseProgress === 100 && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎉</span>
            </div>
            <h3 className="text-2xl font-semibold text-purple-800 mb-4">
              Welcome to SkillPath!
            </h3>
            <p className="text-purple-700 text-lg mb-6">
              You've successfully completed your initiation! You now understand how to navigate the platform, take lessons, and track your progress. You're ready to explore other courses and start your learning journey!
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Explore Courses
              </button>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="bg-white text-purple-600 px-6 py-2 rounded-lg border-2 border-purple-200 hover:bg-purple-50 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InitiationCourse 