// DOM Elements
const vocabularySection = document.getElementById('vocabulary-section');
const practiceSection = document.getElementById('practice-section');
const statsSection = document.getElementById('stats-section');

const vocabularyBtn = document.getElementById('vocabulary-btn');
const practiceBtn = document.getElementById('practice-btn');
const statsBtn = document.getElementById('stats-btn');

const searchInput = document.getElementById('search-input');
const typeFilter = document.getElementById('type-filter');
const vocabularyBody = document.getElementById('vocabulary-body');

const practiceStart = document.getElementById('practice-start');
const practiceQuiz = document.getElementById('practice-quiz');
const practiceResults = document.getElementById('practice-results');

const startPracticeBtn = document.getElementById('start-practice');
const showMeaningBtn = document.getElementById('show-meaning');
const correctBtn = document.getElementById('correct-btn');
const incorrectBtn = document.getElementById('incorrect-btn');
const practiceAgainBtn = document.getElementById('practice-again');

const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

const resetProgressBtn = document.getElementById('reset-progress');

const confirmationModal = document.getElementById('confirmation-modal');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');
const modalMessage = document.getElementById('modal-message');

// App State
let words = [...italianWords]; // Copy the array to avoid modifying the original
let filteredWords = [...words];
let quizWords = [];
let currentWordIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let modalCallback = null;

// Initialize the app
function initApp() {
    // Hide the modal on startup to prevent it from showing by default
    confirmationModal.classList.remove('active');
    
    // Initialize navigation
    initNavigation();
    
    // Initialize vocabulary list
    renderVocabularyList();
    
    // Initialize search and filter
    initSearchAndFilter();
    
    // Initialize practice mode
    initPracticeMode();
    
    // Initialize stats
    updateStats();
    
    // Reset progress button
    resetProgressBtn.addEventListener('click', confirmResetProgress);
    
    // Modal events
    modalCancel.addEventListener('click', () => {
        confirmationModal.classList.remove('active');
    });
    
    modalConfirm.addEventListener('click', () => {
        if (modalCallback) {
            modalCallback();
        }
        confirmationModal.classList.remove('active');
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Navigation functions
function initNavigation() {
    vocabularyBtn.addEventListener('click', () => {
        setActiveSection(vocabularySection);
        setActiveButton(vocabularyBtn);
    });
    
    practiceBtn.addEventListener('click', () => {
        setActiveSection(practiceSection);
        setActiveButton(practiceBtn);
    });
    
    statsBtn.addEventListener('click', () => {
        setActiveSection(statsSection);
        setActiveButton(statsBtn);
        updateStats();
    });
}

function setActiveSection(section) {
    vocabularySection.classList.remove('active-section');
    practiceSection.classList.remove('active-section');
    statsSection.classList.remove('active-section');
    
    section.classList.add('active-section');
}

function setActiveButton(button) {
    vocabularyBtn.classList.remove('active');
    practiceBtn.classList.remove('active');
    statsBtn.classList.remove('active');
    
    button.classList.add('active');
}

// Vocabulary list functions
function renderVocabularyList() {
    vocabularyBody.innerHTML = '';
    
    filteredWords.forEach(word => {
        const row = document.createElement('tr');
        
        const italianCell = document.createElement('td');
        italianCell.textContent = capitalizeFirstLetter(word.italian);
        row.appendChild(italianCell);
        
        const englishCell = document.createElement('td');
        englishCell.textContent = capitalizeFirstLetter(word.english);
        row.appendChild(englishCell);
        
        const masteryCell = document.createElement('td');
        const stats = getStats(word.italian);
        
        if (stats.total === 0) {
            masteryCell.innerHTML = '<span class="mastery-badge new">New</span>';
        } else if (stats.total >= 3 && stats.masteryRatio >= 0.8) {
            masteryCell.innerHTML = '<span class="mastery-badge mastered">Mastered</span>';
        } else if (stats.total >= 3 && stats.masteryRatio >= 0.5) {
            masteryCell.innerHTML = '<span class="mastery-badge learning">Learning</span>';
        } else {
            masteryCell.innerHTML = '<span class="mastery-badge challenging">Challenging</span>';
        }
        
        row.appendChild(masteryCell);
        
        vocabularyBody.appendChild(row);
    });
}

// Search and filter functions
function initSearchAndFilter() {
    searchInput.addEventListener('input', filterWords);
    typeFilter.addEventListener('change', filterWords);
}

function filterWords() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const typeValue = typeFilter.value;
    
    filteredWords = words.filter(word => {
        const matchesSearch = word.italian.toLowerCase().includes(searchTerm) || 
                             word.english.toLowerCase().includes(searchTerm);
                             
        return matchesSearch;
    });
    
    renderVocabularyList();
}

// Practice mode functions
function initPracticeMode() {
    startPracticeBtn.addEventListener('click', startPractice);
    showMeaningBtn.addEventListener('click', showMeaning);
    correctBtn.addEventListener('click', () => recordAnswer(true));
    incorrectBtn.addEventListener('click', () => recordAnswer(false));
    practiceAgainBtn.addEventListener('click', resetPractice);
}

function startPractice() {
    const practiceFocus = document.getElementById('practice-focus').value;
    
    let wordsPool = [...words];
    
    if (practiceFocus === 'weak') {
        wordsPool = words.filter(word => {
            const stats = getStats(word.italian);
            return stats.total > 0 && stats.incorrect > stats.correct;
        });
        
        if (wordsPool.length < 10) {
            const newWords = getWordsByMastery(words, 'new');
            wordsPool = [...wordsPool, ...newWords];
        }
    } else if (practiceFocus === 'new') {
        wordsPool = getWordsByMastery(words, 'new');
    }
    
    quizWords = wordsPool
        .sort(() => Math.random() - 0.5)
        .slice(0, 20);
    
    if (quizWords.length < 20) {
        const remainingWords = words
            .filter(word => !quizWords.includes(word))
            .sort(() => Math.random() - 0.5)
            .slice(0, 20 - quizWords.length);
        
        quizWords = [...quizWords, ...remainingWords];
    }
    
    currentWordIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    
    document.getElementById('practice-start').classList.add('hidden');
    document.getElementById('practice-quiz').classList.remove('hidden');
    document.getElementById('practice-results').classList.add('hidden');
    
    loadCurrentWord();
    
    updateProgress();
}

function updateProgress() {
    const progressPercentage = (currentWordIndex / quizWords.length) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `${currentWordIndex + 1}/${quizWords.length}`;
}

function loadCurrentWord() {
    // If we reached the end, show results
    if (currentWordIndex >= quizWords.length) {
        showResults();
        return;
    }
    
    const currentWord = quizWords[currentWordIndex];
    
    // Set the word
    document.getElementById('quiz-word').textContent = currentWord.italian;
    
    // Show meaning-hidden and hide meaning-shown
    document.getElementById('meaning-hidden').classList.remove('hidden');
    document.getElementById('meaning-shown').classList.add('hidden');
    
    // Update quiz meaning
    document.getElementById('quiz-meaning').textContent = currentWord.english;
    
    // Hide the word type since it's no longer used
    document.getElementById('word-type').classList.add('hidden');
    
    // Update progress
    updateProgress();
}

function showMeaning() {
    document.getElementById('meaning-hidden').classList.add('hidden');
    document.getElementById('meaning-shown').classList.remove('hidden');
}

function recordAnswer(isCorrect) {
    const currentWord = quizWords[currentWordIndex];
    
    if (isCorrect) {
        correctCount++;
        recordCorrect(currentWord.italian);
    } else {
        incorrectCount++;
        recordIncorrect(currentWord.italian);
    }
    
    currentWordIndex++;
    updateProgress();
    loadCurrentWord();
}

function showResults() {
    practiceQuiz.classList.add('hidden');
    practiceResults.classList.remove('hidden');
    
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('incorrect-count').textContent = incorrectCount;
    
    const resultsList = document.getElementById('results-word-list');
    resultsList.innerHTML = '';
    
    quizWords.forEach((word, index) => {
        const listItem = document.createElement('li');
        
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word-result';
        wordSpan.textContent = `${word.italian} (${word.english})`;
        listItem.appendChild(wordSpan);
        
        const resultSpan = document.createElement('span');
        
        if (index < correctCount) {
            resultSpan.className = 'result-correct';
            resultSpan.textContent = '✓';
        } else {
            resultSpan.className = 'result-incorrect';
            resultSpan.textContent = '✗';
        }
        
        listItem.appendChild(resultSpan);
        resultsList.appendChild(listItem);
    });
    
    updateStats();
}

function resetPractice() {
    practiceResults.classList.add('hidden');
    practiceStart.classList.remove('hidden');
}

// Stats functions
function updateStats() {
    let totalPracticed = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    
    words.forEach(word => {
        const stats = getStats(word.italian);
        if (stats.total > 0) {
            totalPracticed++;
            totalCorrect += stats.correct;
            totalIncorrect += stats.incorrect;
        }
    });
    
    document.getElementById('total-practiced').textContent = totalPracticed;
    
    let masteryPercentage = 0;
    
    if (totalPracticed > 0) {
        const masteredWords = getWordsByMastery(words, 'mastered').length;
        masteryPercentage = Math.round((masteredWords / words.length) * 100);
    }
    
    document.getElementById('mastery-level').textContent = `${masteryPercentage}%`;
    
    const challengingWordsList = document.getElementById('challenging-words');
    challengingWordsList.innerHTML = '';
    
    const challengingWords = getChallengingWords(words, 5);
    
    if (challengingWords.length > 0) {
        challengingWords.forEach(word => {
            const listItem = document.createElement('li');
            listItem.textContent = `${word.italian} (${word.english})`;
            challengingWordsList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = 'Keep practicing to see challenging words';
        challengingWordsList.appendChild(listItem);
    }
    
    const masteredCount = getWordsByMastery(words, 'mastered').length;
    const learningCount = getWordsByMastery(words, 'learning').length;
    const challengingCount = getWordsByMastery(words, 'challenging').length;
    const newCount = getWordsByMastery(words, 'new').length;
    
    document.getElementById('mastered-count').textContent = masteredCount;
    document.getElementById('learning-count').textContent = learningCount;
    document.getElementById('challenging-count').textContent = challengingCount;
    document.getElementById('new-count').textContent = newCount;
    
    const totalWords = words.length;
    document.getElementById('mastered').style.width = `${(masteredCount / totalWords) * 100}%`;
    document.getElementById('learning').style.width = `${(learningCount / totalWords) * 100}%`;
    document.getElementById('challenging').style.width = `${(challengingCount / totalWords) * 100}%`;
    document.getElementById('new').style.width = `${(newCount / totalWords) * 100}%`;
}

// Progress persistence functions
function saveProgress() {
    // This is now handled by the progress.js module
    // No action needed here, as it's called from the progress module
}

function loadProgress() {
    // The progress module already loads progress when the page loads
    // No action needed here
}

function confirmResetProgress() {
    modalMessage.textContent = 'This will reset all your learning progress. Are you sure?';
    modalCallback = resetProgress;
    confirmationModal.classList.add('active');
}

function resetProgress() {
    resetAllProgress(); // Using the function from progress.js
    
    renderVocabularyList();
    updateStats();
}

// Helper functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', initApp);
