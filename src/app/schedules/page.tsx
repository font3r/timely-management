import { Schedule } from "./Schedule"
import { ScheduleTable } from "./ScheduleTable"

export default async function SchedulesPage() {
    const schedules: Schedule[] = []

    await fetch(`${process.env.baseAddress}/api/v1/schedules`)
        .then(res => res.json())
        .then((json) => schedules.push(...json))

    if (!schedules) return <div>Loading...</div>;

    return <ScheduleTable schedules={schedules} />
}