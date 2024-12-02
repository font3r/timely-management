import { RetryPolicy } from "../Schedule"

export type CreateSchedule = {
    description: string
    frequency: string | "once"
    scheduleStart: Date | null
    job: CreateScheduleJob
    retryPolicy: RetryPolicy
    configuration: CreateScheduleConfiguration
}

export type CreateScheduleJob = {
    slug: string,
    data: any
}

export type CreateScheduleConfiguration = {
    transportType: "http"
    url: URL
}