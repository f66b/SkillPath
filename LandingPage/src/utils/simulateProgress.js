// Utility to simulate course completion for testing trophy system
import progressService from '../services/progressService';

export const simulateCourseCompletion = (walletAddress, courseType) => {
  console.log(`Simulating completion of ${courseType} course for wallet: ${walletAddress}`);
  
  // Get the total lessons for the course
  const totalLessons = progressService.getTotalLessons(courseType);
  
  // Mark all lessons as completed
  for (let partId = 1; partId <= 5; partId++) {
    for (let lessonId = 1; lessonId <= 10; lessonId++) {
      progressService.markLessonComplete(walletAddress, courseType, partId, lessonId);
    }
  }
  
  // Update part scores to 100%
  for (let partId = 1; partId <= 5; partId++) {
    progressService.updatePartScore(walletAddress, courseType, partId, 100);
  }
  
  // Force the course progress to 100%
  const currentProgress = progressService.getCourseProgress(walletAddress, courseType);
  const updatedProgress = {
    ...currentProgress,
    courseProgress: 100
  };
  
  progressService.updateUserProgress(walletAddress, courseType, updatedProgress);
  
  console.log(`${courseType} course marked as 100% complete!`);
  return true;
};

export const resetCourseProgress = (walletAddress, courseType) => {
  console.log(`Resetting progress for ${courseType} course for wallet: ${walletAddress}`);
  
  const resetProgress = {
    completedLessons: {},
    partScores: {},
    courseProgress: 0,
    lastAccessed: new Date().toISOString()
  };
  
  progressService.updateUserProgress(walletAddress, courseType, resetProgress);
  
  console.log(`${courseType} course progress reset to 0%`);
  return true;
};

export const getCourseStatus = (walletAddress, courseType) => {
  const progress = progressService.getCourseProgress(walletAddress, courseType);
  return {
    courseType,
    progress: progress.courseProgress,
    completedLessons: Object.keys(progress.completedLessons).length,
    totalLessons: progressService.getTotalLessons(courseType),
    isCompleted: progress.courseProgress >= 100
  };
}; 