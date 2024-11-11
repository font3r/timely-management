export type ScheduleStatus = "waiting" | "scheduled" | "finished"

export type Schedule = {
    id: string
    description: string
    frequency: string
    status: ScheduleStatus
    lastExecutionDate: Date | null
    nextExecutionDate: Date | null
    jobSlug: string
}

export type RetryPolicyStrategy = "constant"

export type RetryPolicy = {
    count: number
    interval: string
    strategy: RetryPolicyStrategy
}