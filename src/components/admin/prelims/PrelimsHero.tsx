import Card from 'components/card';

const PrelimsHero = () => {
  return (
    <div
      className="flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px]"
      style={{ 
        background: 'linear-gradient(135deg, #4318FF 0%, #6366F1 50%, #8B5CF6 100%)'
      }}
    >
      <div className="w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Master UPSC Prelims 2025 with Smart Preparation Tools
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
          Comprehensive toolkit designed for effective UPSC Prelims preparation. Practice, analyze, and excel with our curated resources.
        </p>

        <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          <button className="text-black linear rounded-xl bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70">
            Start Preparation
          </button>
          <button className="text-base font-medium text-lightPrimary hover:text-lightPrimary 2xl:ml-2">
            View Syllabus
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrelimsHero;