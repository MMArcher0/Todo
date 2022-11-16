export function timeToSeconds( time : string ){
    const[hour = '0', minutes = '0', seconds = '0'] = time.split(":");

    const hourToSeconds = Number(hour) * 3600;
    const minutesToSeconds = Number(minutes) * 60;

    return (Number(seconds) + minutesToSeconds + hourToSeconds);
}

export function secondsToTime(time: number){
    const hours = String(Math.floor(time / 3600)).padStart(2,'0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2,'0');
    const seconds = String((time % 3600) % 60).padStart(2,'0');

    return `${hours}:${minutes}:${seconds}`;
}