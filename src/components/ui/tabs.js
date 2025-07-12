// src/components/ui/tabs.js
import * as React from "react"
import { Tabs as TabsPrimitive, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs"

export function Tabs({ defaultValue, children, className }) {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue} className={className}>
      {children}
    </TabsPrimitive.Root>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent
