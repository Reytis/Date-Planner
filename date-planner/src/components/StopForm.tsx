import { Button } from "./Button"
import { StringInput, StringType, DateTimeInput, TimeInput, FileInput } from "./Inputs"
import { Label, LabelSize } from "./Label"
import { useEffect, useState } from "react"
import { StopForm } from "@/types/tripform"
import { StopType } from "@/types/trip"
import { minutesToDate } from "@/functions/dateToInt"

export const StopFormComponent = ({
  addStop, 
  ActualStop, // if we are modifying existing data
  id, 
  deleteStop, 
  stop, 
  setStop 
}: { 
  addStop: Function; 
  ActualStop?: StopType; 
  id?: string; 
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

  // assure that if modifiying existing stop it display the value
  useEffect(() => {
    if (ActualStop) {
      setCurrentStop({
        Title: ActualStop.name,
        Address: {
          Street: ActualStop.adress,
          PostalCode: ActualStop.postalCode,
          City: ActualStop.city,
          Country: ActualStop.country
        },
        Price: ActualStop.price,
        Duration: minutesToDate(ActualStop.duration),
        Ticket: null,
        TicketPublicId: null,
        startTime: ActualStop.startTime || new Date(),
      });
    }
  }, [ActualStop]);

  // handle the addition of the stop 
  const handleAddStop = async () => {
    if (id) {
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

  return <div>
    <Label>
      {id ? "Edit Stop" : "Add Stop"}
      {id && deleteStop && <Button onClick={() => deleteStop(id)}>Delete Stop</Button>}
    </Label>
    <div>
      <div>
        <Label size={LabelSize.s} >Name</Label>
        <StringInput
          placeholder="Name"
          value={CurrentStop.Title}
          onChange={(v) => handleChange({ ...CurrentStop, Title: v })}
          type={StringType.Text}
        />
      </div>
      <div>
        <Label size={LabelSize.s} >Start Time</Label>
        <DateTimeInput
          placeholder="Start Time"
          value={CurrentStop.startTime}
          onChange={(v) => handleChange({ ...CurrentStop, startTime: v })}
        />
      </div>
      <div>
        <Label size={LabelSize.s} >Adresse</Label>
        <div>
          <div>
            <Label size={LabelSize.xs}>N*, Street</Label>
            <StringInput
              placeholder="N*, Street"
              value={CurrentStop.Address.Street}
              onChange={(v) => { handleChange({...CurrentStop, Address: {...CurrentStop.Address, Street: v}})}}
              type={StringType.Text}
            />
          </div>
          <div className="flex gap-4">
            <div>
              <Label size={LabelSize.xs}>City</Label>
              <StringInput
                placeholder="City"
                value={CurrentStop.Address.City}
                onChange={(v) => { handleChange({...CurrentStop, Address: {...CurrentStop.Address, City: v}})}}
                type={StringType.Text}
              />
            </div>
            <div>
              <Label size={LabelSize.xs}>Postal Code</Label>
              <StringInput
                placeholder="Postal Code"
                value={CurrentStop.Address.PostalCode}
                onChange={(v) => { handleChange({...CurrentStop, Address: {...CurrentStop.Address, PostalCode: v}})}}
                type={StringType.Text}
              />
            </div>
          </div>
          <div>
            <Label size={LabelSize.xs}>Country</Label>
            <StringInput
              placeholder="Country"
              value={CurrentStop.Address.Country}
              onChange={(v) => { handleChange({...CurrentStop, Address: {...CurrentStop.Address, Country: v}})}}
              type={StringType.Text}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          <Label size={LabelSize.s}>Price</Label>
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
        </div>
        <div>
          <Label size={LabelSize.s}>Duration</Label>
          <TimeInput
            placeholder="Duration"
            value={CurrentStop.Duration}
            onChange={(v) => handleChange({...CurrentStop, Duration: v})}
          />
        </div>
      </div>
      <div>
        <Label size={LabelSize.s}>Ticket</Label>
        {
          ActualStop && ActualStop.ticket && <p>Changing ticket will delete the existing one.</p>
        }
        <FileInput
          placeholder="Ticket"
          value={CurrentStop.Ticket}
          onChange={(v) => handleChange({ ...CurrentStop, Ticket: v })} 
          acceptedTypes={["image/jpeg","image/png","application/pdf"]} 
        />
      </div>
      <Button onClick={handleAddStop}>Save Stop</Button>
    </div>
</div>}