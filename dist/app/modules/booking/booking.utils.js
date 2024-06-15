"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTimeConflict = void 0;
const availability = (booked) => {
    const hours = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23,
    ];
    const bookedSlots = booked.map((s) => {
        return {
            start: Math.ceil(parseInt(s.startTime.split(":")[0])),
            end: Math.ceil(parseInt(s.endTime.split(":")[0])),
        };
    });
    let available = [];
    for (const hour of hours) {
        const isBooked = bookedSlots.some((s) => hour >= s.start && hour < s.end);
        if (!isBooked) {
            available.push(hour);
        }
    }
    let start = available[0];
    let end = available[0];
    let result = [];
    for (let i = 1; i < available.length; i++) {
        if (available[i] === end + 1) {
            end = available[i];
        }
        else {
            result.push({
                startTime: start.toString().padStart(2, "0") + ":00",
                endTime: end.toString().padStart(2, "0") + ":00",
            });
            start = end = available[i];
        }
    }
    result.push({
        startTime: start.toString().padStart(2, "0") + ":00",
        endTime: end.toString().padStart(2, "0") + ":00",
    });
    return result;
};
const hasTimeConflict = (assignedSchedules, newSchedule) => {
    for (const schedule of assignedSchedules) {
        const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
        const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
        const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
        const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);
        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            return true;
        }
    }
    return false;
};
exports.hasTimeConflict = hasTimeConflict;
exports.default = availability;
