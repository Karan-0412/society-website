
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { useState } from 'react'
import { CircleChevronDown, CircleChevronUp } from 'lucide-react'



const FAQ = () => {


    const [isOpen, setIsOpen]=useState(false);
    const [ind, setInd] = useState<number>(0);

    const toggleFAQ = (index: number) =>{
        setInd(ind == index ? null : index);
    }


  return (
    <div className='min-h-screen space-y-10'>
      <Header />

        {/* HEADING SECTION */}
        <section className="hero-gradient text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                FAQs
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Having Doubts? Not on our watch.
            </p>
          </div>
        </section>

        {/* Questions */}
        <div className='flex flex-col justify-center items-center mx-20 min-w-screen'>
            <div className='w-[45%] flex flex-col justify-center'>
                <div data-ind="1"
                 className={`cursor-pointer p-5 border-2 border-solid border-slate-300 flex justify-between ${ind == 1 ? "border-b-1": "border-b-2"}`} 
                 onClick={(e) => {
                    toggleFAQ(Number(e.currentTarget.getAttribute("data-ind")))
                    setIsOpen(prev => !prev)}
                    }>
                    How to register? 
                    <CircleChevronDown className={`${ ind == 1 ? "rotate-180" : "rotate-0" } transition-all duration-500 ease-in-out`} />
                </div>
                <p className={`${ind == 1 ? "max-h-40 opacity-100 border border-slate-400 border-solid p-5 text-slate-400":"max-h-0 opacity-0 p-0"} transition-all duration-500 ease-in-out overflow-hidden `}>
                    Do this, this and this.
                </p>
            </div>

            <div className='w-[45%] flex flex-col justify-center'>
                <div data-ind="2"
                 className={`cursor-pointer p-5 border-2 border-solid border-slate-300 flex justify-between ${ind == 2 ? "border-b-1": "border-b-2"}`} 
                 onClick={(e) => {
                    toggleFAQ(Number(e.currentTarget.getAttribute("data-ind")))
                    setIsOpen(prev => !prev)}
                    }>
                    How to register? 
                    {/* {isOpen? <CircleChevronUp /> : <CircleChevronDown />} */}
                    <CircleChevronDown className={`${ind == 2 ? "rotate-180" : "rotate-0" } transition-all duration-500 ease-in-out`} />
                </div>
                <p className={`${ind == 2 ? "max-h-40 opacity-100 border border-slate-400 border-solid p-5 text-slate-400":"max-h-0 opacity-0 p-0"} transition-all duration-500 ease-in-out overflow-hidden `}>
                    Do this, this and this.
                </p>
            </div>

        </div>






      <Footer />
    </div>
  )
}

export default FAQ
