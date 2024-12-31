import { Schedule } from "./Schedule"
import { ScheduleView } from "./ScheduleView";

export default async function SchedulesPage() {
    const initialPage = 1;
    const pageSize = 100; // TODO: Handle server-side pagination
    const schedules: Schedule[] = []

    await fetch(`${process.env.baseAddress}/api/v1/schedules?page=${initialPage}&pageSize=${pageSize}`)
        .then(res => res.json())
        .then((json) => schedules.push(...json))

    if (!schedules) return <div>Loading...</div>;

    return <ScheduleView schedules={schedules} />
}