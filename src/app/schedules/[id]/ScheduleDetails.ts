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

export type RetryPolicyStrategy = "constant" | "linear"

export type RetryPolicy = {
    count: number
    interval: string
    strategy: RetryPolicyStrategy
}

export type Job = {
    id: string
    slug: string
    data: any | null
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