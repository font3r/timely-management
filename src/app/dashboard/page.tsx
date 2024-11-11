import { Schedule } from "./Schedule"
import { ScheduleTable } from "./ScheduleTable"

export default async function Dashboard() {
    const schedules: Schedule[] = []

    await fetch('http://localhost:5000/api/v1/schedules')
        .then(res => res.json())
        .then((json) => schedules.push(...json))

    if (!schedules) return <div>Loading...</div>;

    return <ScheduleTable schedules={schedules} />
}