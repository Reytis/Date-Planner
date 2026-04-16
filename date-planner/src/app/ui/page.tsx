"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CheckboxInput, DateTimeInput, FileInput, NumberInput, StringInput, StringType, TimeInput } from "@/components/Inputs";
import { Label, LabelSize } from "@/components/Label";
import { ListItem } from "@/components/ListItem";

// This page is for development purposes only, to display all different UI components in the same page for easy development and testing.
export default function Ui() {
  return <div className="flex flex-col gap-8 w-md m-6">
    <h1 className="text-8xl font-bold font-mono">UI</h1>
    <p>Display all different UI components to help dev see them all in the same page for development purposes.</p>

    <div>
      {/* Buttons */}
      <h2 className="text-4xl">Buttons</h2>
      <div className="flex flex-col gap-4 max-w-md">
        <Button onClick={() => {}}>Button</Button>
      </div>

      {/* Input Fields */}
      <h2 className="text-4xl">Input Fields</h2>
      <div className="flex gap-4 flex-col max-w-md">
        {/* Labels */}
        <Label size={LabelSize.m}>Label M</Label>
        <Label size={LabelSize.s}>Label S</Label>
        <Label size={LabelSize.xs}>Label XS</Label>

        {/* Inputs */}
        <FileInput placeholder="File Input" value={null} onChange={() => {}} acceptedTypes={["image/jpeg","image/png"]} />
        <TimeInput placeholder="Time Input" value={null} onChange={() => {}} />
        <NumberInput placeholder="Number Input" value={0} onChange={() => {}} />
        <StringInput placeholder="String Input" value={""} onChange={() => {}} type={StringType.Text} />
        <CheckboxInput checked={false} onChange={() => {}} />
        <DateTimeInput placeholder="Date Time Input" value={null} onChange={() => {}} />
      </div>
      <h2 className="text-4xl">Items</h2>
      <div className="flex flex-col gap-4 max-w-md">
        
        {/* Cards and List Items */}
        <Card tipId={""}>Card</Card>
        <ListItem tripId={""}>List Item</ListItem>
      </div>
    </div>
  </div>
}