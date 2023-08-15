// Directions: Rewrite the imperative code below as Object-Oriented 

let status = 'active'
let warp = 2
let type = 'Dilithium Crystal'
let status_report = 'Captain, '

if(status === 'active' && warp <= 4) {
    status_report += 'the engines are active and we could be going faster.'
} else if (status === 'active' && warp > 4) {
    status_report += 'the engines are active and we are going ' + warp + '.'
} else if (status === 'down') {
    status_report += 'the engines are down.'
} else {
    status_report += 'the comms are down and we can`t reach engineering.'
}

console.log(status_report)



class StatusReport{
    constructor(rank, warp, type, status){
        this.warp = warp;
        this.type = type;
        this.rank = rank;
        this.status = status
    }

    getReport(){
        let status_report = `${this.rank}, `
        if(this.status === 'active' && this.warp <= 4) {
            status_report += 'the engines are active and we could be going faster.'
        } else if (this.status === 'active' && this.warp > 4) {
            status_report += `the engines are active and we are going ${this.warp}.`
        } else if (this.status === 'down') {
            status_report += 'the engines are down.'
        } else {
            status_report += 'the comms are down and we can`t reach engineering.'
        }

        return status_report


    }

    setRank(rank){
        this.rank = rank;
    }

    setWarps(warp){
        this.warp = warp;
    }

    setType(type){
        this.type = type;
    }

    setStatus(status){
        this.status = status;
    }
}

statusReport = new StatusReport('Captain', 6, 'Dilithium Crystal', 'active')
console.log(statusReport.getReport())