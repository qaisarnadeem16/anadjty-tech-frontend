"use client"

import type React from "react"

const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#f0f4ff] to-white" data-reveal>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Join the AnadjyTech Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Get smart gadget updates, tech tips, and your free guide instantly!
          </p>

          <div className="flex justify-center xl:h-[560px] sm:h-[510px] h-[680px] overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://40f84e00.sibforms.com/serve/MUIFALA4XStPablh7_mjN2GyXIqUw5mKWXBfnEfot0K22knB39RfRy6SdExvJaPJgkmwpXxuZJ1VXvNoIIJp3HTxEpDdQg1vc3CSv-p6df4SbB8k-RjZoXOKm86DYlN5e7VkPT6M6sdCeqDMLXiyVCkb5N1Xn81Bb8l_DTEHnTQu8X2nTEYuDc_wENxr0iqy_uuQbQ2HkkEe-C1Z"
              frameBorder="0"
              scrolling="auto"
              allowFullScreen
              className="w-full  rounded-xl border-0 shadow-sm"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Newsletter
