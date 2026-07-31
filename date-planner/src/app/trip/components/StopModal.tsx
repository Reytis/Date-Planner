import { CtaPrimary, CtaSecondary } from "@/components/Buttons/Cta"
import { Label, LabelSize } from "@/components/forms/Label"
import { useEffect, useState } from "react"
import { StopForm } from "@/types/tripform"
import { DateTimeInput } from "@/components/forms/inputs/DateInput"
import { FileInput } from "@/components/forms/inputs/FileInput"
import { StringInput, StringType } from "@/components/forms/inputs/StringInput"
import { TimeInput } from "@/components/forms/inputs/TimeInput"
import { Input } from "@/components/forms/Input"
import { CheckboxInput } from "@/components/forms/inputs/Checkbox"

export const StopFormComponent = ({
  addStop, 
  ActualStop, // if we are modifying existing data
  id, 
  deleteStop, 
  stop, 
  setStop 
}: { 
  addStop: (stop: StopForm, id?: number) => void; 
  ActualStop?: StopForm; 
  id?: number; 
  deleteStop?: Function;
  stop?: StopForm;
  setStop?: Function;
}) => {
  const [CurrentStop, setCurrentStop] = useState({
    Title: "",
    Address: {
      Street: "",
      PostalCode: "",
      City: "",
      Country: ""
    },
    Price: 0,
    Duration: null,
    Ticket: null,
    TicketPublicId: null,
    startTime: new Date(),
  } as StopForm); //keep the current state of the form 
  const [Step, setStep] = useState(0); // handel the step of the form, 1 info, 2 adress, 3 duration, 4 ticket
  const steps = [
    "info",
    "address",
    "duration",
    "ticket",
  ];

  // assure that if modifiying existing stop it display the value
  useEffect(() => {
    if (ActualStop && id !== undefined) {
      setCurrentStop({
        Title: ActualStop.Title,
        Address: {
          Street: ActualStop.Address.Street,
          PostalCode: ActualStop.Address.PostalCode,
          City: ActualStop.Address.City,
          Country: ActualStop.Address.Country
        },
        Price: ActualStop.Price,
        Duration: ActualStop.Duration,
        Ticket: null,
        TicketPublicId: null,
        startTime: ActualStop.startTime,
      });
    }
  }, [ActualStop]);

  // handle the addition of the stop 
  const handleAddStop = async () => {
    if (id !== undefined) {
      addStop(CurrentStop, id) // if modifying existing stop
    } else {
      addStop(CurrentStop) // if new stop
    }

    // reset current stop
    setCurrentStop({
      Title: "",
      Address: {
        Street: "",
        PostalCode: "",
        City: "",
        Country: ""
      },
      Price: 0,
      Duration: null,
      Ticket: null,
      TicketPublicId: null,
      startTime: new Date(),
    } as StopForm);
  }

  // handle change of the input here & on parent component
  const handleChange = (v: StopForm) => {
    setCurrentStop(v)
    if (setStop) {
      setStop(v)
    }
  }

  return <div className="flex flex-col p-4 pt-10 w-full h-96">
    {steps[Step] === "info" && <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-1">
        <CheckboxInput checked={false} label={"This is an Hotel stop"} onChange={() => {}} />
        <Input label="Stop Name">
          <StringInput
            placeholder="Name"
            value={CurrentStop.Title}
            onChange={(v) => handleChange({ ...CurrentStop, Title: v })}
            type={StringType.Text}
          />
        </Input>
        <Input label="Start Time" message="Check reserved Stop to prevent auto sort changes">
          <DateTimeInput
            placeholder="Start Time"
            value={CurrentStop.startTime}
            onChange={(v) => handleChange({ ...CurrentStop, startTime: v })}
          />
        </Input>
        <CheckboxInput checked={false} label={"This is a reserved stop"} onChange={() => {}} />
      </div>
      <div className="flex gap-2 mt-2">
        <CtaSecondary onClick={() => setStep(Step + 1)}>Next</CtaSecondary>
      </div>
    </div>}
    {steps[Step] === "address" && <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-1">
        <Label size={LabelSize.s} >Adresse</Label>
        <div className="flex flex-col gap-1">
          <Input label="Street" labelWeight={LabelSize.xs}>
            <StringInput
              placeholder="N*, Street"
              value={CurrentStop.Address.Street}
              onChange={(v) => { handleChange({...CurrentStop, Address: {...CurrentStop.Address, Street: v}})}}
              type={StringType.Text}
            />
          </Input>
          <div className="flex gap-2">
            <Input label="City" labelWeight={LabelSize.xs}>
              <StringInput
                placeholder="City"
                value={CurrentStop.Address.City}
                onChange={(v) => { handleChange({...CurrentStop, Address: {...CurrentStop.Address, City: v}})}}
                type={StringType.Text}
              />
            </Input>
            <Input label="Postal Code" labelWeight={LabelSize.xs}>
              <StringInput
                placeholder="Postal Code"
                value={CurrentStop.Address.PostalCode}
                onChange={(v) => { handleChange({...CurrentStop, Address: {...CurrentStop.Address, PostalCode: v}})}}
                type={StringType.Text}
              />
            </Input>
          </div>
          <Input label="Country" labelWeight={LabelSize.xs}>
            <StringInput
              placeholder="Country"
              value={CurrentStop.Address.Country}
              onChange={(v) => { handleChange({...CurrentStop, Address: {...CurrentStop.Address, Country: v}})}}
              type={StringType.Text}
            />
          </Input>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <CtaSecondary onClick={() => setStep(Step - 1)}>Previous</CtaSecondary>
        <CtaSecondary onClick={() => setStep(Step + 1)}>Next</CtaSecondary>
      </div>
    </div>}
    {steps[Step] === "duration" && <div className="flex flex-col justify-between h-full">
    <div className="flex flex-col gap-1">
        <Input label="Price">
          <StringInput
            placeholder="Price"
            value={CurrentStop.Price.toString()}
            onChange={(v) => {
              const price = parseFloat(v);
              if (!isNaN(price)) {
                handleChange({...CurrentStop, Price: price});
              }
            }}
            type={StringType.Text}
          />
        </Input>
        <Input label="Duration">
          <TimeInput
            placeholder="Duration"
            value={CurrentStop.Duration}
            onChange={(v) => handleChange({...CurrentStop, Duration: v})}
          />
        </Input>
    </div>
      <div className="flex gap-2 mt-2">
        <CtaSecondary onClick={() => setStep(Step - 1)}>Previous</CtaSecondary>
        <CtaSecondary onClick={() => setStep(Step + 1)}>Next</CtaSecondary>
      </div>
    </div>}
    {steps[Step] === "ticket" && <div  className="flex flex-col justify-between h-full">
    <Input label="Ticket" message="Upload a ticket for this stop, if available.">
        {
          ActualStop && ActualStop.Ticket && <p className="small-caption text-foreground-4">Changing ticket will delete the existing one.</p>
        }
        <FileInput
          placeholder="Ticket"
          value={CurrentStop.Ticket}
          onChange={(v) => handleChange({ ...CurrentStop, Ticket: v })} 
          acceptedTypes={["image/jpeg","image/png","application/pdf"]} 
        />
      </Input>
      <div className="flex gap-2 mt-2">
        <CtaSecondary onClick={() => setStep(Step - 1)}>Previous</CtaSecondary>
        <CtaPrimary onClick={handleAddStop}>Save Stop</CtaPrimary>
      </div>
    </div>}
</div>}