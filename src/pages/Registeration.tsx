import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {  } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"


const Registeration = () => {

    const { slug } = useParams();
    const [teamName,setTeamName] = useState("");
    const [leaderName,setLeaderName] = useState("");
    const [leaderUID,setLeaderUID] = useState("");
    const [participants, setParticipants] = useState(1);
    const [members, setMembers] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
    setMembers(Array.from({ length: participants }, () => ({ name: "", uid: "" })));
    }, [participants]);

    const data = {
        eventName: slug,
        teamName, 
        leaderName,
        leaderUID,
        participants,
        members
    }

    const register = async() =>{
        try {
            const res = await axios.post(`http://localhost:5000/registerations/`, data)
            if(!res) {
                console.log("ERROR while storing the registeration");
            }
            else{
              console.log("SUCCESS");
              setTeamName("");
              setLeaderName("");
              setLeaderUID("");
              // setParticipants(1);
              setMembers([{name: "", uid: ""}]);
            }
        } catch (error) {
            console.log("ERROR While making the registeration");
        }
    }

    const handleMemberChange = (index: number, field: string, value: string) => {
        const updated = [...members];
        updated[index][field] = value;
        setMembers(updated);
    };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              { `Regsiter for ${slug}` } 
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Begin your journey with this first step
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="">
              {/* Contact Form */}
              <Card className="shadow-elegant">
                <CardHeader>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teamName">Team Name</Label>
                      <Input id="teamName" placeholder="Team Name" onChange={(e)=>setTeamName(e.currentTarget.value)} value={teamName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leaderName">Team Leader Name</Label>
                      <Input id="leaderName" placeholder="Team Leader Name" onChange={(e)=>setLeaderName(e.currentTarget.value)} value={leaderName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leaderUID">Team Leader UID</Label>
                      <Input id="leaderUID" placeholder="Team Leader UID" onChange={(e)=>setLeaderUID(e.currentTarget.value)} value={leaderUID} />
                    </div>
                    </div>
                    <div className="space-x-5 space-y-2">
                    <Label htmlFor="participants">Number of Members: </Label>
                        <select id="participants" name="participants" className="px-4 py-2 rounded-lg" value={participants} onChange={(e)=> setParticipants(Number(e.currentTarget.value))}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    
                    <div>
                        {Array.from({ length: participants }, (_, i) => (
                        <div className="container grid grid-cols-1 md:grid-cols-2 gap-4" key={i}>
                            <div className="space-y-2">
                                <Label htmlFor={`member${i+1}Name`}>{`Member ${i+1} Name`}</Label>
                                <Input type="text" id={`member${i+1}Name`} value={members[i]?.name || ""} onChange={(e) => handleMemberChange(i, "name", e.target.value)} placeholder="Member Name"  />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`member${i+1}UID`}>{`Member ${i+1} UID`}</Label>
                                <Input type="text" id={`member${i+1}UID`} value={members[i]?.uid || ""} onChange={(e) => handleMemberChange(i, "uid", e.target.value)} placeholder="Member UID"  />
                            </div>
                        </div>
                        ))}
                    </div>

                  <div className="flex space-x-5">
                    <Button className="w-full hero-gradient shadow-glow group" onClick={register}>
                        Register
                    </Button>
                    <Button className="w-full hero-gradient shadow-glow group" onClick={()=>navigate("/faq")}>
                        Having Doubts ?
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Registeration;
