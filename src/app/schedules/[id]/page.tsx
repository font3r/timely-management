import { ScheduleDetails } from "./ScheduleDetails";
import { ScheduleDetailsItem } from "./ScheduleDetailsItem";

export default async function ScheduleDetailsPage({ params }: {
    params: { id: string }
}) {
    const { id } = await params

    let schedule: ScheduleDetails | null = null
    await fetch(`${process.env.baseAddress}/api/v1/schedules/${id}`)
        .then(res => res.json())
        .then((json) => schedule = json)

    if (!schedule) return <div>Loading...</div>;

    return <ScheduleDetailsItem schedule={schedule} />
}