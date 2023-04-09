let myRecord = ["ellen", "bennett", "RN", 36]
let employeeRecord = createEmployeeRecord(myRecord)

//#1 passed
function createEmployeeRecord (array) {
    let testEmployee = {}

    array.map(() => {
        testEmployee.firstName = array[0]
        testEmployee.familyName = array[1]
        testEmployee.title = array[2]
        testEmployee.payPerHour = array[3]
        testEmployee.timeInEvents = []
        testEmployee.timeOutEvents = []
    })

    return testEmployee
}

//#2 passed
function createEmployeeRecords (array) {
   return array.map(createEmployeeRecord)
}

//#3 passed
function createTimeInEvent (employeeRecord, dateStamp) {
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11), 10),
        date: dateStamp.slice(0, 10)
    }

    employeeRecord.timeInEvents.push(timeIn)

    return employeeRecord
}

//#4 passed
function createTimeOutEvent (employeeRecord, dateStamp) {
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11), 10),
        date: dateStamp.slice(0, 10)
    }

    employeeRecord.timeOutEvents.push(timeOut)

    return employeeRecord
}

//#5 passed
function hoursWorkedOnDate (employeeRecord, date) {
    let hoursWorked
    let timeIn = []

    employeeRecord.timeInEvents.map((object) => {
        timeIn.push(object.hour)
    })

    let timeOut = []
    
    employeeRecord.timeOutEvents.map((object) => {
        timeOut.push(object.hour)
    })

    let timeInWorked = employeeRecord.timeInEvents.find((event) => {
        return event.date == date
    })

    let timeOutWorked = employeeRecord.timeOutEvents.find((event) => {
        return event.date == date
    })

    hoursWorked = parseInt(((timeOutWorked.hour - timeInWorked.hour) / 100), 10)

    return hoursWorked
}

createTimeInEvent(employeeRecord, "2019-08-05 0900")
createTimeOutEvent(employeeRecord, "2019-08-05 2100")

createTimeInEvent(employeeRecord, "2019-08-06 0900")
createTimeOutEvent(employeeRecord, "2019-08-06 2100")

//#6 passed
function wagesEarnedOnDate (employeeRecord, date) {
    let returnHours = hoursWorkedOnDate(employeeRecord, date)
    let payOwed = parseInt((returnHours * employeeRecord.payPerHour), 10)
    return payOwed
}

wagesEarnedOnDate(employeeRecord, "2019-08-05")

function renderDates (employeeRecord) {
    let datesWorked = []

    if (employeeRecord.firstName + " " + employeeRecord.familyName) {
        employeeRecord.timeInEvents.map((object) => {
            datesWorked.push(object.date)
        })
    }
    return datesWorked
}

function wageTotal (employeeRecord, array) {
    let allWages = []

    for (let num of array) {
        allWages.push(wagesEarnedOnDate(employeeRecord, num))
    }

    return allWages
}

//#7 
function allWagesFor (employeeRecord) {
    let callrenderDates = renderDates(employeeRecord)
    let returnWages = wageTotal(employeeRecord, callrenderDates)
    let reducedReturn = returnWages.reduce((prev, curr) => {
        return prev + curr
    }, 0)

    return reducedReturn

}

function calculatePayroll (employeeRecord) {
    let allWages = employeeRecord.map(allWagesFor)

    let reducedReturn = allWages.reduce((prev, curr) => {
        return prev + curr
    }, 0)

    return reducedReturn
}

console.log(calculatePayroll([employeeRecord]))