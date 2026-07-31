"use client";

import { Plus } from "@/assets/icons";
import { CtaGhost, CtaIcon, CtaPrimary, CtaSecondary } from "@/components/Buttons/Cta";
import { Card } from "@/components/cards/TripCard";
import { Input } from "@/components/forms/Input";
import { CheckboxInput } from "@/components/forms/inputs/Checkbox";
import { DateTimeInput } from "@/components/forms/inputs/DateInput";
import { FileInput } from "@/components/forms/inputs/FileInput";
import { NumberInput } from "@/components/forms/inputs/NumberInput";
import { StringInput, StringType } from "@/components/forms/inputs/StringInput";
import { TimeInput } from "@/components/forms/inputs/TimeInput";
import { ToggleInput } from "@/components/forms/inputs/Toggle";
import { Label, LabelSize } from "@/components/forms/Label";

// This page is for development purposes only, to display all different UI components in the same page for easy development and testing.
export default function Ui() {
  return <div className="flex flex-col gap-8 w-md m-6">
    <h1 className="display">UI</h1>
    <p className="p">Display all different UI components to help dev see them all in the same page for development purposes.</p>

    <div>
      {/* Buttons */}
      <h2 className="h2 my-8">Buttons</h2>
      <div className="flex flex-col gap-4 max-w-md">
        <CtaPrimary onClick={() => {}}><Plus className="size-6" />Primary Button<Plus className="size-6" /></CtaPrimary>
        <CtaSecondary onClick={() => {}}><Plus className="size-6" />Secondary Button<Plus className="size-6" /></CtaSecondary>
        <CtaGhost onClick={() => {}}>Ghost Button</CtaGhost>
        <CtaIcon onClick={() => {}}><Plus className="size-6" /></CtaIcon>
      </div>

      {/* Input Fields */}
      <h2 className="h2 my-8">Input Fields</h2>
      <div className="flex gap-4 flex-col max-w-md">
        {/* Labels */}
        <Label size={LabelSize.m}>Label M</Label>
        <Label size={LabelSize.s}>Label S</Label>
        <Label size={LabelSize.xs}>Label XS</Label>

        {/* Inputs */}
        <Input 
          label="Input"
          labelWeight={LabelSize.m}
          tooltip="This is an tooltip for the input"
        >
          <StringInput placeholder="String Input" value={""} onChange={() => {}} type={StringType.Text} />
        </Input>
        <Input 
          label="Time Input"
          labelWeight={LabelSize.m}
        >
          <TimeInput placeholder="Time Input" value={null} onChange={() => {}} />
        </Input>
        <Input 
          label="Number Input"
          labelWeight={LabelSize.m}
          message="This is an message for the input"
        >
          <NumberInput placeholder="Number Input" value={0} onChange={() => {}} />
        </Input>
        <Input 
          label="Date Time Input"
          labelWeight={LabelSize.m}
        >
          <DateTimeInput placeholder="Date Time Input" value={null} onChange={() => {}} />
        </Input>
        <FileInput placeholder="File Input" value={null} onChange={() => {}} acceptedTypes={["image/jpeg","image/png"]} />
        <CheckboxInput label="checkbox" checked={false} onChange={() => {}} />
        <ToggleInput checked={false} onClick={() => {}} />
      </div>
      <h2 className="h2 my-8">Items</h2>
      <div className="flex flex-col gap-4 max-w-md">
        
        {/* Cards and List Items */}
        <Card tipId={""}>Card</Card>
      </div>
    </div>
  </div>
}