'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

const formSchema = z.object({
    description: z.string(),
    frequency: z.string(),
    scheduleStart: z.string(),
    job: z.object({
        slug: z.string(),
        data: z.any()
    }),
    retryPolicy: z.object({
        strategy: z.string(),
        interval: z.string(),
        count: z.number()
    }),
    configuration: z.object({
        transportType: z.string(),
        url: z.string()
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
    const [hasData, setHasData] = useState(false)
    const [hasRetryPolicy, setHasRetryPolicy] = useState(true)
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
            retryPolicy: undefined,
            configuration: {
                transportType: "",
                url: ""
            }
        },
    })

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
                            name="scheduleStart"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Schedule start</FormLabel>
                                    <FormControl>
                                        <Date />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <Checkbox id="jobData" checked={hasData} onCheckedChange={() => setHasData(!hasData)} />
                            <div className="flex flex-col">
                                <Label htmlFor="jobData">Data</Label>
                                <p className="text-[0.8rem] text-muted-foreground">Data is sent with every schedule run</p>
                            </div>
                        </div>
                        { 
                            !hasData 
                            ? <></>
                            : <FormField
                                control={form.control}
                                disabled={!hasData}
                                name="job.data"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job data</FormLabel>
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

                        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <Checkbox id="jobRetryPolicy" checked={hasRetryPolicy} onCheckedChange={() => setHasRetryPolicy(!hasRetryPolicy)} />
                            <div className="flex flex-col">
                                <Label htmlFor="jobRetryPolicy">Retry policy</Label>
                                <p className="text-[0.8rem] text-muted-foreground">Configures behaviour on job fail</p>
                            </div>
                        </div>
                        { 
                            !hasRetryPolicy
                            ? <></>
                            : <>
                                <FormField
                                    control={form.control}
                                    disabled={!hasRetryPolicy}
                                    name="retryPolicy.strategy"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Strategy</FormLabel>
                                            <FormControl>
                                                <Input placeholder='' {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                constant - constant delay, rg. 100ms 100ms 100ms <br />
                                                linear - linear delay, rg. 100ms 200ms 300ms
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    disabled={!hasRetryPolicy}
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
                                    disabled={!hasRetryPolicy}
                                    name="retryPolicy.count"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Count</FormLabel>
                                            <FormControl>
                                                <Input placeholder='' {...field} />
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

                        <FormField
                            control={form.control}
                            name="configuration.transportType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Transport type</FormLabel>
                                    <FormControl>
                                        <Input placeholder='' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Transport type used for job transfer
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
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
                            )}
                        />

                        <Button type="submit">Save</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}