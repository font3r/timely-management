'use client'

import { useEffect, useState } from "react";
import { ScheduleTableProps } from "./Schedule";
import { ScheduleTable } from "./ScheduleTable";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const autoRefreshKey = "auto-refresh"

function getPersistedState(): boolean {
  const state = localStorage.getItem(autoRefreshKey);
  return state === "true"
}

function persistState(refresh: boolean) {
  localStorage.setItem(autoRefreshKey, refresh.toString())
}

export function ScheduleView({ schedules }: ScheduleTableProps) {
    console.log("mouting")
    const [refresh, setRefresh] = useState<boolean>(getPersistedState())
    const [seed, setSeed] = useState(Math.random())

    const onAutoRefreshClick = () => {
        setRefresh(!refresh);
        persistState(!refresh)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (refresh) {
                setSeed(Math.random())
            }
        }, 3_000)

        return () => clearInterval(interval);
    }, [seed, refresh])

    return (
        <>
            <div className="w-full">
                <div className="flex py-1 gap-1">
                    <Button variant="outline" onClick={() => redirect("/schedules/create")}>
                        Add schedule
                    </Button>
                    <Button variant={refresh ? "default" : "outline"} onClick={onAutoRefreshClick}>
                        Auto refresh
                    </Button>
                </div>
            </div>
            <ScheduleTable schedules={schedules} key={seed} />
        </>
    )
}