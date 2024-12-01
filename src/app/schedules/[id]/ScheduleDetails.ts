export type ScheduleDetails = {
    id: string
    groupId: string
    description: string
    frequency: string
    status: string
    retryPolicy: RetryPolicy
    lastExecutionDate: string
    nextExecutionDate: string
    job: Job
    configuration: Configuration
    recentJobRuns: Map<string, JobRun>
}

export type RetryPolicy = {
    strategy: string
    count: number
    interval: string
}

export type Job = {
    id: string
    slug: string
    data: any
}

export type Configuration = {
    transportType: string
    url: string
}

export type JobRun = {
    id: string
    status: string
    reason?: string
    startDate: string
    endDate: string
}