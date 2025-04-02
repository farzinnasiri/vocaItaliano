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
    
    // Load stored progress
    loadProgress();
    
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
        italianCell.textContent = word.italian;
        row.appendChild(italianCell);
        
        const englishCell = document.createElement('td');
        englishCell.textContent = word.english;
        row.appendChild(englishCell);
        
        const typeCell = document.createElement('td');
        typeCell.textContent = capitalizeFirstLetter(word.type);
        row.appendChild(typeCell);
        
        const masteryCell = document.createElement('td');
        const totalAttempts = word.correct + word.incorrect;
        
        if (totalAttempts > 0) {
            const masteryIndicator = document.createElement('div');
            masteryIndicator.className = 'mastery-indicator';
            
            const masteryPercentage = Math.round((word.correct / totalAttempts) * 100);
            
            const masteryFill = document.createElement('div');
            masteryFill.className = 'mastery-fill';
            masteryFill.style.width = `${masteryPercentage}%`;
            
            masteryIndicator.appendChild(masteryFill);
            masteryCell.appendChild(masteryIndicator);
            
            const masteryText = document.createElement('small');
            masteryText.textContent = `${masteryPercentage}% (${word.correct}/${totalAttempts})`;
            masteryCell.appendChild(masteryText);
        } else {
            masteryCell.textContent = 'No attempts';
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
    const searchTerm = searchInput.value.toLowerCase();
    const typeValue = typeFilter.value;
    
    filteredWords = words.filter(word => {
        const matchesSearch = word.italian.toLowerCase().includes(searchTerm) || 
                            word.english.toLowerCase().includes(searchTerm);
        const matchesType = typeValue === 'all' || word.type === typeValue;
        
        return matchesSearch && matchesType;
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
    
    // Select words based on practice focus
    let practicePool = [...words];
    
    if (practiceFocus === 'weak') {
        // Filter for words with more incorrect answers than correct
        practicePool = words.filter(word => {
            const totalAttempts = word.correct + word.incorrect;
            return totalAttempts > 0 && word.incorrect > word.correct;
        });
        
        // If not enough words match the criteria, add some random words
        if (practicePool.length < 20) {
            const randomWords = words
                .filter(word => !practicePool.includes(word))
                .sort(() => 0.5 - Math.random())
                .slice(0, 20 - practicePool.length);
            
            practicePool = [...practicePool, ...randomWords];
        }
    } else if (practiceFocus === 'new') {
        // Filter for words with no or few attempts
        practicePool = words.filter(word => {
            const totalAttempts = word.correct + word.incorrect;
            return totalAttempts < 3;
        });
        
        // If not enough words match the criteria, add some random words
        if (practicePool.length < 20) {
            const randomWords = words
                .filter(word => !practicePool.includes(word))
                .sort(() => 0.5 - Math.random())
                .slice(0, 20 - practicePool.length);
            
            practicePool = [...practicePool, ...randomWords];
        }
    }
    
    // Shuffle and select 20 words
    quizWords = practicePool
        .sort(() => 0.5 - Math.random())
        .slice(0, 20);
    
    currentWordIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    
    showQuizCard();
    loadCurrentWord();
}

function showQuizCard() {
    practiceStart.classList.add('hidden');
    practiceResults.classList.add('hidden');
    practiceQuiz.classList.remove('hidden');
}

function loadCurrentWord() {
    const currentWord = quizWords[currentWordIndex];
    
    document.getElementById('quiz-word').textContent = currentWord.italian;
    document.getElementById('word-type').textContent = currentWord.type;
    document.getElementById('quiz-meaning').textContent = currentWord.english;
    
    document.getElementById('meaning-hidden').classList.remove('hidden');
    document.getElementById('meaning-shown').classList.add('hidden');
    
    // Update progress
    const progressPercentage = ((currentWordIndex + 1) / quizWords.length) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `${currentWordIndex + 1}/${quizWords.length}`;
}

function showMeaning() {
    document.getElementById('meaning-hidden').classList.add('hidden');
    document.getElementById('meaning-shown').classList.remove('hidden');
}

function recordAnswer(isCorrect) {
    const currentWord = quizWords[currentWordIndex];
    
    // Find the word in the original array and update its score
    const wordIndex = words.findIndex(word => word.italian === currentWord.italian);
    
    if (isCorrect) {
        words[wordIndex].correct++;
        correctCount++;
    } else {
        words[wordIndex].incorrect++;
        incorrectCount++;
    }
    
    // Save progress
    saveProgress();
    
    // Move to next word or show results
    currentWordIndex++;
    
    if (currentWordIndex < quizWords.length) {
        loadCurrentWord();
    } else {
        showResults();
    }
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
    // Calculate total words practiced
    const practicedWords = words.filter(word => word.correct + word.incorrect > 0);
    document.getElementById('total-practiced').textContent = practicedWords.length;
    
    // Calculate mastery level
    const totalAttempts = words.reduce((sum, word) => sum + word.correct + word.incorrect, 0);
    const totalCorrect = words.reduce((sum, word) => sum + word.correct, 0);
    let masteryPercentage = 0;
    
    if (totalAttempts > 0) {
        masteryPercentage = Math.round((totalCorrect / totalAttempts) * 100);
    }
    
    document.getElementById('mastery-level').textContent = `${masteryPercentage}%`;
    
    // Find challenging words
    const challengingWordsList = document.getElementById('challenging-words');
    challengingWordsList.innerHTML = '';
    
    const challengingWords = words
        .filter(word => word.correct + word.incorrect >= 3 && word.incorrect > word.correct)
        .sort((a, b) => {
            const aRatio = a.correct / (a.correct + a.incorrect);
            const bRatio = b.correct / (b.correct + b.incorrect);
            return aRatio - bRatio;
        })
        .slice(0, 5);
    
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
    
    // Update mastery breakdown
    const masteredCount = words.filter(word => {
        const total = word.correct + word.incorrect;
        return total >= 3 && (word.correct / total) >= 0.8;
    }).length;
    
    const learningCount = words.filter(word => {
        const total = word.correct + word.incorrect;
        return total >= 3 && (word.correct / total) >= 0.5 && (word.correct / total) < 0.8;
    }).length;
    
    const challengingCount = words.filter(word => {
        const total = word.correct + word.incorrect;
        return total >= 3 && (word.correct / total) < 0.5;
    }).length;
    
    const newCount = words.filter(word => {
        const total = word.correct + word.incorrect;
        return total < 3;
    }).length;
    
    document.getElementById('mastered-count').textContent = masteredCount;
    document.getElementById('learning-count').textContent = learningCount;
    document.getElementById('challenging-count').textContent = challengingCount;
    document.getElementById('new-count').textContent = newCount;
    
    // Update mastery bars width
    const totalWords = words.length;
    document.getElementById('mastered').style.width = `${(masteredCount / totalWords) * 100}%`;
    document.getElementById('learning').style.width = `${(learningCount / totalWords) * 100}%`;
    document.getElementById('challenging').style.width = `${(challengingCount / totalWords) * 100}%`;
    document.getElementById('new').style.width = `${(newCount / totalWords) * 100}%`;
}

// Progress persistence functions
function saveProgress() {
    localStorage.setItem('vocaItaliano', JSON.stringify(words));
}

function loadProgress() {
    const savedProgress = localStorage.getItem('vocaItaliano');
    
    if (savedProgress) {
        const savedWords = JSON.parse(savedProgress);
        
        // Update the words array with saved progress
        words.forEach((word, index) => {
            // Find matching word in saved progress
            const savedWord = savedWords.find(saved => saved.italian === word.italian);
            
            if (savedWord) {
                word.correct = savedWord.correct || 0;
                word.incorrect = savedWord.incorrect || 0;
            }
        });
    }
    
    // Initialize filtered words
    filteredWords = [...words];
}

function confirmResetProgress() {
    modalMessage.textContent = 'This will reset all your learning progress. Are you sure?';
    modalCallback = resetProgress;
    confirmationModal.classList.add('active');
}

function resetProgress() {
    words.forEach(word => {
        word.correct = 0;
        word.incorrect = 0;
    });
    
    saveProgress();
    renderVocabularyList();
    updateStats();
}

// Helper functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', initApp);
