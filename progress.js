// progress.js - Handles tracking learning progress separately from word data

// Initialize the progress data structure
let wordProgress = {};

// Load progress from localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('vocaItaliano_progress');
    
    if (savedProgress) {
        wordProgress = JSON.parse(savedProgress);
    }
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('vocaItaliano_progress', JSON.stringify(wordProgress));
}

// Get progress for a specific word
function getWordProgress(wordId) {
    // If the word has no progress record yet, initialize it
    if (!wordProgress[wordId]) {
        wordProgress[wordId] = {
            correct: 0,
            incorrect: 0
        };
    }
    return wordProgress[wordId];
}

// Record a correct answer for a word
function recordCorrect(wordId) {
    const progress = getWordProgress(wordId);
    progress.correct += 1;
    saveProgress();
}

// Record an incorrect answer for a word
function recordIncorrect(wordId) {
    const progress = getWordProgress(wordId);
    progress.incorrect += 1;
    saveProgress();
}

// Reset all progress
function resetAllProgress() {
    wordProgress = {};
    saveProgress();
}

// Get all progress stats for a word
function getStats(wordId) {
    const progress = getWordProgress(wordId);
    const total = progress.correct + progress.incorrect;
    
    return {
        correct: progress.correct,
        incorrect: progress.incorrect,
        total: total,
        masteryRatio: total > 0 ? progress.correct / total : 0
    };
}

// Get words that match specific mastery criteria
function getWordsByMastery(words, criteria) {
    return words.filter(word => {
        const stats = getStats(word.italian);
        
        switch(criteria) {
            case 'mastered':
                return stats.total >= 3 && stats.masteryRatio >= 0.8;
            case 'learning':
                return stats.total >= 3 && stats.masteryRatio >= 0.5 && stats.masteryRatio < 0.8;
            case 'challenging':
                return stats.total >= 3 && stats.masteryRatio < 0.5;
            case 'new':
                return stats.total < 3;
            default:
                return true;
        }
    });
}

// Get challenging words (for practice)
function getChallengingWords(words, limit = 5) {
    const practiced = words.filter(word => {
        const stats = getStats(word.italian);
        return stats.total >= 3 && stats.incorrect > stats.correct;
    });
    
    // Sort by mastery ratio (ascending)
    practiced.sort((a, b) => {
        const statsA = getStats(a.italian);
        const statsB = getStats(b.italian);
        return statsA.masteryRatio - statsB.masteryRatio;
    });
    
    return practiced.slice(0, limit);
}

// Initialize progress on page load
loadProgress();
