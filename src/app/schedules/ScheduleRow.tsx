'use client'

import { CSSProperties } from "react"
import { Schedule, ScheduleStatus } from "./Schedule"
import { redirect, useRouter } from "next/navigation"

type ScheduleRowProps = {
    schedule: Schedule
}

export default function ScheduleRow({ schedule }: ScheduleRowProps) {
    const router = useRouter()

    const trStyle: CSSProperties = { backgroundColor: '#c9c9c9' }
    const tdStyle: CSSProperties = { padding: '1rem 1rem 1rem 1rem' }

    return (
        <tr style={trStyle}>
            <td style={tdStyle} onClick={() => redirect(`/schedules/${schedule.id}`)}>{ schedule.id }</td>
            <td style={tdStyle}>{ schedule.jobSlug }</td>
            <td style={tdStyle}>{ schedule.description }</td>
            <td style={tdStyle}>{ schedule.frequency }</td>
            <td style={{...tdStyle, ...getStatusStyling(schedule.status)}}>{ schedule.status }</td>
            <td style={tdStyle}>{ schedule.lastExecutionDate?.toString() }</td>
            <td style={tdStyle}>{ schedule.nextExecutionDate?.toString() }</td>
        </tr>
    )
}

function getStatusStyling(s: ScheduleStatus): CSSProperties {
    switch (s) {
        case "waiting":
            return { backgroundColor: "grey" }
        case "scheduled":
            return { backgroundColor: "yellow" }
        case "finished":
            return { backgroundColor: "green" }
    }
}
