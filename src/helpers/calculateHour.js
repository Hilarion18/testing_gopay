class CalculateHours {
    static calculating(totalSec) {
        let min = Math.floor(totalSec/60).toFixed()
        min = Number(min)
        let sec = (totalSec - (min * 60))
        let result = {
            min: min,
            sec: sec
        }
        return 
    }
}

module.exports = CalculateHours
