'use client'

import React from "react"
import { ScheduleDetails, JobRun } from "./ScheduleDetails"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LabeledInput } from "@/components/shared/Label"

type ScheduleDetailsProps = {
    schedule: ScheduleDetails
}

export function ScheduleDetailsItem({ schedule }: ScheduleDetailsProps) {
    const thCss = "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
    const tdCss = "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"

    return (
        <Card>
            <CardHeader>
                <CardTitle>Schedule</CardTitle>
                <CardDescription>{schedule.id}</CardDescription>
            </CardHeader>
            
            <CardContent>
                <LabeledInput label="Group id"><p>{schedule.groupId}</p></LabeledInput>
                <LabeledInput label="Description"><p>{schedule.description}</p></LabeledInput>
                <LabeledInput label="Frequency"><p>{schedule.frequency}</p></LabeledInput>
                <LabeledInput label="Status"><p>{schedule.status}</p></LabeledInput>
                <LabeledInput label="Last execution date"><p>{schedule.lastExecutionDate}</p></LabeledInput>
                <LabeledInput label="Next execution date"><p>{schedule.nextExecutionDate}</p></LabeledInput>
                <Separator className="my-4" />
                <div>
                    <div className="text-lg font-semibold">Configuration</div>
                    <LabeledInput label="Transport type"><p>{schedule.configuration.transportType}</p></LabeledInput>
                    <LabeledInput label="Url"><p>{schedule.configuration.url}</p></LabeledInput>
                </div>
                <Separator className="my-4" />
                <div>
                    <div className="text-lg font-semibold">Retry policy</div>
                    {
                        schedule.retryPolicy ? 
                        <>
                            <LabeledInput label="Strategy"><p>{schedule.retryPolicy.strategy}</p></LabeledInput>
                            <LabeledInput label="Count"><p>{schedule.retryPolicy.count}</p></LabeledInput>
                            <LabeledInput label="Interval"><p>{schedule.retryPolicy.interval}</p></LabeledInput>
                        </> : <p className="text-sm text-muted-foreground">(not configured)</p>
                    }
                </div>
                <Separator className="my-4" />
                <div>
                    <div className="text-lg font-semibold">Job</div>
                    <LabeledInput label="Id"><p>{schedule.job.id}</p></LabeledInput>
                    <LabeledInput label="Slug"><p>{schedule.job.slug}</p></LabeledInput>
                    <LabeledInput label="Data">
                        <p>{schedule.job.data === null ? "(empty)" : JSON.stringify(schedule.job.data)}</p>
                    </LabeledInput>
                </div>
                <Separator className="my-4" />
                <div className="text-lg font-semibold">Recent job runs</div>
                <div className="my-6 w-full overflow-y-auto">
                    <table className="w-full">
                    <thead>
                        <tr className="m-0 border-t p-0 even:bg-muted">
                            <th className={thCss}>Status</th>
                            <th className={thCss}>Reason</th>
                            <th className={thCss}>Start date</th>
                            <th className={thCss}>End date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(schedule.recentJobRuns).map(([_, value]) =>
                                Array.from(value as JobRun[]).map((jobRun, _) => 
                                    <tr className="m-0 border-t p-0 even:bg-muted" key={jobRun.id}>
                                        <td className={tdCss}>{jobRun.status}</td>
                                        <td className={tdCss}>{jobRun.reason}</td>
                                        <td className={tdCss}>{jobRun.startDate}</td>
                                        <td className={tdCss}>{jobRun.endDate}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}