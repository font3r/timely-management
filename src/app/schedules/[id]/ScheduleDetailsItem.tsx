'use client'

import React from "react"
import { ScheduleDetails } from "./ScheduleDetails"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type ScheduleDetailsProps = {
    schedule: ScheduleDetails
}

export function ScheduleDetailsItem({ schedule }: ScheduleDetailsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Schedule</CardTitle>
                <CardDescription>{schedule.id}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>GroupId: {schedule.groupId}</p>
                <div>Description: {schedule.description}</div>
                <div>Frequency: {schedule.frequency}</div>
                <div>Status: {schedule.status}</div>

                <div>
                    Retry policy
                    {
                        schedule.retryPolicy ? 
                        <>
                                <div>Strategy {schedule.retryPolicy.strategy}</div>
                                <div>Count {schedule.retryPolicy.count}</div>
                                <div>Interval {schedule.retryPolicy.interval}</div>
                            </> 
                            : <></>
                        }
                </div>

                <div>{schedule.lastExecutionDate}</div>
                <div>{schedule.nextExecutionDate}</div>

                <div>
                    Job
                    <div>Id {schedule.job.id}</div>
                    <div>Slug {schedule.job.slug}</div>
                    <div>Data {JSON.stringify(schedule.job.data)}</div>
                </div>

                <div>
                    Configuration
                    <div>Transport type {schedule.configuration.transportType}</div>
                    <div>Url {schedule.configuration.url}</div>
                </div>
                { 
                    Array.from(schedule.recentJobRuns).map(([key, value]) => 
                        <div>
                            <div>{key}</div>
                            <div>{value.id}</div>
                            <div>{value.status}</div>
                            <div>{value.reason}</div>
                            <div>{value.startDate}</div>
                            <div>{value.endDate}</div>
                        </div>
                    ) 
                }
            </CardContent>
        </Card>
    )
}