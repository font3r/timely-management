'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    description: z.string(),
    frequency: z.string().min(1, { 
        message: "Frequency is required"
    }),
    scheduleStart: z.date().optional(),
    job: z.object({
        slug: z.string().min(1, { 
            message: "Job slug is required"
        }),
        data: z.any()
    }),
    retryPolicy: z.object({
        strategy: z.string().min(1, { 
            message: "Strategy is required"
        }),
        interval: z.string().min(1, { 
            message: "Interval is required"
        }),
        count: z.number().min(1, { 
            message: "Count is required"
        })
    }).optional(),
    configuration: z.object({
        transportType: z.string().min(1, { 
            message: "Transport type is required"
        }),
        url: z.string().url({
            message: "Invalid receiver url"
        }),
    })
})

async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(`${process.env.baseAddress}/api/v1/schedules`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    })

    if (response.status != 200) {
        console.log(await response.text())
    }
}

export default function CreateSchedule() {
    const [hasScheduleStart, setHasScheduleStart] = useState(false)
    const [hasData, setHasData] = useState(false)
    const [hasRetryPolicy, setHasRetryPolicy] = useState(false)
    const [transportType, setTransportType] = useState("")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            frequency: "",
            scheduleStart: undefined,
            job: {
                slug: "",
                data: undefined
            },
            retryPolicy: null,
            configuration: {
                transportType: "",
                url: ""
            }
        },
    })

    console.dir(form.getValues().configuration.transportType)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new schedule</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Frequency</FormLabel>
                                    <FormControl>
                                        <Input placeholder="*/10 * * * * *" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Must be a valid cron expression or 'once'
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="job.slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="process-user-notifications" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="configuration.transportType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Transport type</FormLabel>
                                    <Select onValueChange={(val) => { setTransportType(val); field.onChange }} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select transport type" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="http">http</SelectItem>
                                            <SelectItem value="rabbitmq">rabbitmq</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Transport type used for job transfer
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            transportType !== "http"
                            ? <></>
                            : <FormField
                                control={form.control}
                                name="configuration.url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Receiver url</FormLabel>
                                        <FormControl>
                                            <Input placeholder='https://example.com/api/process-job' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            URL that will receive POST request signal to start job
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                        }

                        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <Checkbox id="scheduleStart" checked={hasScheduleStart} onCheckedChange={() => setHasScheduleStart(!hasScheduleStart)} />
                            <div className="flex flex-col">
                                <Label htmlFor="scheduleStart">Schedule start</Label>
                                <p className="text-[0.8rem] text-muted-foreground">Configure a date for schedule start</p>
                                {
                                    !hasScheduleStart
                                    ? <></>
                                    : <FormField
                                        control={form.control}
                                        name="scheduleStart"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                    >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    initialFocus
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                }
                            </div>
                        </div>

                        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <Checkbox id="jobData" checked={hasData} onCheckedChange={() => setHasData(!hasData)} />
                            <div className="flex flex-col">
                                <Label htmlFor="jobData">Data</Label>
                                <p className="text-[0.8rem] text-muted-foreground">Data is sent with every schedule run</p>

                                {
                                    !hasData
                                    ? <></>
                                    : <FormField
                                        control={form.control}
                                        disabled={!hasData}
                                        name="job.data"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder='{ "test": "example" }' {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Job payload in JSON format
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                }
                            </div>
                        </div>

                        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <Checkbox id="jobRetryPolicy" checked={hasRetryPolicy} onCheckedChange={() => setHasRetryPolicy(!hasRetryPolicy)} />
                            <div className="flex flex-col">
                                <Label htmlFor="jobRetryPolicy">Retry policy</Label>
                                <p className="text-[0.8rem] text-muted-foreground">Configures behaviour on job fail</p>
                                {
                                    !hasRetryPolicy
                                    ? <></>
                                    : <>
                                        <FormField
                                            control={form.control}
                                            name="retryPolicy.strategy"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Strategy</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select delay generation strategy" />
                                                        </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="constant">constant</SelectItem>
                                                            <SelectItem value="linear">linear</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormDescription>
                                                        constant - 100ms 100ms 100ms <br />
                                                        linear - 100ms 200ms 300ms
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="retryPolicy.interval"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Interval</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='' {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                    Delay interval
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="retryPolicy.count"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Count</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                    Count of delayed retry attemps
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                }
                            </div>
                        </div>

                        <Button type="submit">Save</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}