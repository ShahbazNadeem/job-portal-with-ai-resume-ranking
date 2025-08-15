import { Icons } from "@/data/Imports";
import Layout from "./_components/layout/Layout";
import Card1 from "./_components/cards/Card1";

export default function Home() {
  return (
    <Layout>
      <section className="">
        <div className="container relative border">
          <div className="min-h-[90vh] md:max-w-[700px] lg:max-w-[980px] mx-auto flex justify-center flex-col">
            <div className="flex justify-center gap-5 md:gap-8 lg:gap-12 xl:gap-14 text-center flex-col">
              <h1 className="spaceGrotesk">One Step Closer To <span>Your Dream Job</span></h1>

              <span className="text-[18px] font-semibold">Let Us Help You Find A Job That Suits You The Best</span>

              <span className="flex justify-center gap-8 items-center">
                <button>Get Started</button>
                <span className="flex gap-2 items-center">
                  <span className="btn-gradient-border">
                    <span className="btn-gradient-border-inner body-color">
                      <Icons.play className="text-[#C79AFB] mx-1" size={20} />
                    </span>
                  </span>
                  <span className="text-[18px] font-semibold">Our Story</span>
                </span>
              </span>

              <span className="spaceGrotesk flex justify-center gap-8">
                <span className="flex flex-col gap-2">
                  <span className="text-[32px] font-bold flex items-center">20M<Icons.plus size={20} /></span>
                  <span className="text-[18px] font-semibold">User</span>
                </span>
                <span className="flex flex-col gap-2">
                  <span className="text-[32px] font-bold flex items-center">500K</span>
                  <span className="text-[18px] font-semibold">Jobs</span>
                </span>
                <span className="flex flex-col gap-2">
                  <span className="text-[32px] font-bold flex items-center">100<Icons.plus size={20} /></span>
                  <span className="text-[18px] font-semibold">Partners</span>
                </span>
              </span>
            </div>

          </div>

          <figure className="hidden lg:block absolute top-[35%] right-0 w-[90px] lg:w-[120px] h-auto"><img src="/images/home/arrow2.png" className="w-full h-auto"/></figure>

          <figure className="absolute bottom-0 w-[150px] md:w-[250px] h-auto"><img src="/images/home/arrow1.png" className="w-full h-auto"/></figure>

          <div className="hidden lg:block max-w-[280px] absolute w-full top-[10%] left-[3%]">
            <Card1 className='border -rotate-45 backdrop-blur-xs' />
          </div>
          <div className="hidden lg:block max-w-[240px] absolute w-full top-[57%] right-0">
            <Card1 className='border rotate-45' />
          </div>
          <div className="max-w-[180px] absolute w-full bottom-[0%] md:bottom-[10%] left-[40%] md:left-[30%] lg:left-[20%]">
            <div className="relative blur-xs">
              <Card1 className="border -rotate-45" />
            </div>
          </div>

        </div>
      </section>
      <section>

      </section>
    </Layout>
  );
}
