import React from 'react';
import AboutUs from './AboutUs';

function Landing() {
  return (
    <>
    <div className="m-[10vmin] pt-[10vmin] flex flex-wrap ">
        <div className="flex flex-wrap gap-[5vmin] w-[80vmin] justify-center grow">
            <div className="p-[5vmin] w-[100%]">
                <p className="font-[ansh] text-2xl text-[#0095DE]">Your trusted partner</p>
                <p className="font-[ansh] text-2xl text-[#0095DE]">in digital healthcare.</p>
            </div>
            
            <div className="w-[80vmin]  rounded-2xl border-2 border-[#0095DE] p-[2vmin]">
                <p className="w-[100%] text-center text-lg">Our Story: Get to know us</p>
                <div className="flex justify-center flex-wrap p-[2vmin] gap-[2vmin] ">
                    <div className="w-[200px] h-[200px] bg-[url('./images/image1.png')] bg-no-repeat bg-contain grow"></div>
                    <p className="w-[300px] grow">Empowering Health, Transforming Lives: Our vision at is to pioneer a healthier future by delivering exceptional medical care with compassion and innovation. We envision a community where every individual receives personalized, state-of-the-art healthcare, fostering well-being and vitality. Together, we strive to be a beacon of health, creating a lasting impact on lives and inspiring a paradigm shift in healthcare excellence.</p>
                </div>
                <a href="#" >
                    <div className="w-[100%] p-[1vmin]  text-center grow rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">Learn more about us</div>
                </a>
            </div>
        </div>
        <div className="grow relative flex flex-wrap justify-center">
            <div className=" absolute top-[10vmin] left-[50%] translate-x-[-60%] z-[-1] w-[43vmin] rounded-tl-[35%] rounded-tr-[35%]
            h-[50vmin] p-[1vmin]  text-center grow rounded-md text-white bg-gradient-to-t from-[#A7E2FF] to-[#0095DE]"></div>
            <div className="w-[100%] absolute top-[30vmin] left-[50%]   translate-x-[-50%] h-[50vmin] bg-[url('./images/bg.png')] bg-no-repeat bg-contain"></div>
            
            <div className="w-[60vmin] h-[60vmin] bg-[url('./images/doc.png')] bg-no-repeat bg-contain"></div>
            <p className="w-[100%] text-[#0095DE] text-center">Your Source for Multiple Solutions</p>
            
        </div>
    </div>
    <AboutUs/>
    </>
  )
}

export default Landing
