"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { InputText } from "@/components/Inputs";
import { Label, LabelSize } from "@/components/Label";
import { ListItem } from "@/components/ListItem";

export default function Ui() {
  return <div className="flex flex-col gap-8 w-md m-6">
    <h1 className="text-8xl font-bold font-mono">UI</h1>
    <p>Display all different UI components to help dev see them all in the same page for development purposes.</p>

    <div>
      <h2 className="text-4xl">Buttons</h2>
      <div className="flex flex-col gap-4 max-w-md">
        <Button onClick={() => {}}>Button</Button>
      </div>
      <h2 className="text-4xl">Input Fields</h2>
      <div className="flex gap-4 flex-col max-w-md">
        <Label size={LabelSize.m}>Label M</Label>
        <Label size={LabelSize.s}>Label S</Label>
        <Label size={LabelSize.xs}>Label XS</Label>

        <InputText placeholder="Text" type={"text"} value={""} onChange={(value: string) => {}} />
        <InputText placeholder="Email" type={"email"} value={""} onChange={(value: string) => {}} />
        <InputText placeholder="Password" type={"password"} value={""} onChange={(value: string) => {}} />
        <InputText placeholder="Date" type={"date"} value={""} onChange={(value: string) => {}} />
        <InputText placeholder="Hour" type={"time"} value={""} onChange={(value: string) => {}} />
        <InputText placeholder="Price" type={"number"} value={""} onChange={(value: string) => {}} />
        <InputText placeholder="+" type={"file"} value={""} onChange={(value: string) => {}} />
      </div>
      <h2 className="text-4xl">Items</h2>
      <div className="flex flex-col gap-4 max-w-md">
        <Card>Card</Card>
        <ListItem>List Item</ListItem>
      </div>
    </div>
  </div>
}