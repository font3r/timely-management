'use client'

import { Schedule } from "./Schedule";
import ScheduleRow from "./ScheduleRow";

type ScheduleTableProps = {
    schedules: Schedule[]
}

export function ScheduleTable({ schedules }: ScheduleTableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Job slug</th>
                    <th>Description</th>
                    <th>Frequency</th>
                    <th>Status</th>
                    <th>Last execution date</th>
                    <th>Next execution date</th>
                </tr>
            </thead>
            <tbody>
                { schedules.map(schedule => <ScheduleRow key={schedule.id} schedule={schedule} /> ) }    
            </tbody>
        </table>
    )
}