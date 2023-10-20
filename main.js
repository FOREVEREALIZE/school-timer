const END_DATES = {
    infantil: 1718967600000,
    primaria: 1718967600000,
    eso: 1718967600000,
    batxillerat: 1718622000000,
}

const START_DATES = {
    infantil: 1693976400000,
    primaria: 1693976400000,
    eso: 1693976400000,
    batxillerat: 1694494800000,
}
const TITLES = {
    infantil: "Time until Infantil ends:",
    primaria: "Time until Primaria ends:",
    eso: "Time until ESO ends:",
    batxillerat: "Time until Batxillerat ends:",
}

let currentTarget = "batxillerat"
let isDarkMode = false

const title = $('#title')
const selector = $('#selector')
const colorModeButton = $('#colormode-change')

const dayNumber = $('#day-number')
const hourNumber = $('#hour-number')
const minuteNumber = $('#minute-number')
const secondNumber = $('#second-number')
const percentNumber = $('#percent-number')

const dayLabel = $('#day-label')
const hourLabel = $('#hour-label')
const minuteLabel = $('#minute-label')
const secondLabel = $('#second-label')
const percentLabel = $('#percent-label')

const startDateLabel = $('#start-date')
const endDateLabel = $('#end-date')

const calculateTimeLeft = (target) => {
    const days = Math.floor((target - Date.now()) / 1000 / 60 / 60 / 24)
    const hours = Math.floor(((target - Date.now()) / 1000 / 60 / 60) - (days * 24))
    const minutes = Math.floor(((target - Date.now()) / 1000 / 60) - (days * 24 * 60) - (hours * 60))
    const seconds = Math.floor(((target - Date.now()) / 1000) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60))

    return {
        days,
        hours,
        minutes,
        seconds
    }
}

const calculatePercentDone = (start, end, progress) => {
    return Math.floor((progress - start) / (end - start) * 100)
}

const updateTimer = (start_date, end_date) => {
    const times = calculateTimeLeft(end_date)
    const percent = calculatePercentDone(start_date, end_date, Date.now())

    dayNumber.text(times.days)
    hourNumber.text(times.hours)
    minuteNumber.text(times.minutes)
    secondNumber.text(times.seconds)
    percentNumber.text(percent)

    if (times.days == 1) {
        dayLabel.text("Day")
    } else {
        dayLabel.text("Days")
    }

    if (times.hours == 1) {
        hourLabel.text("Hour")
    } else {
        hourLabel.text("Hours")
    }

    if (times.minutes == 1) {
        minuteLabel.text("Minute")
    } else {
        minuteLabel.text("Minutes")
    }

    if (times.seconds == 1) {
        secondLabel.text("Second")
    } else {
        secondLabel.text("Seconds")
    }

    percentLabel.text("% Done")
}

const changeDates = (target) => {
    currentTarget = target
    title.text(TITLES[currentTarget])
    const startDate = new Date().setTime(START_DATES[currentTarget]).toString()
    const endDate = new Date().setTime(END_DATES[currentTarget]).toString()

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    startDateLabel.text(
        days[startDate.getDay()] +
        ", " +
        startDate.getDate() +
        " " +
        months[startDate.getMonth()] +
        ", " +
        startDate.getFullYear()
    )
    endDateLabel.text(
        days[endDate.getDay()] +
        ", " +
        endDate.getDate() +
        " " +
        months[endDate.getMonth()] +
        ", " +
        endDate.getFullYear()
    )
}

const changeColorMode = () => {
    $('body').toggleClass('light dark')
    colorModeButton.html(`<i data-feather="${isDarkMode ? 'moon' : 'sun'}" class="text-black dark:text-white"></i>`)
    isDarkMode = !isDarkMode
    feather.replace()
}

changeDates($('option:selected')[0].value)
updateTimer(START_DATES[currentTarget], END_DATES[currentTarget])
feather.replace()

setInterval(() => {
    updateTimer(START_DATES[currentTarget], END_DATES[currentTarget])
}, 1000)

selector.on('change', () => {
    const selected = $('option:selected')[0].value
    changeDates(selected)
    updateTimer(START_DATES[currentTarget], END_DATES[currentTarget])
})

colorModeButton.on('click', changeColorMode)
