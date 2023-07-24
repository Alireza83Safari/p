const FinancialInfos = ({ tax, income, netProfit }) => {
  const DataSection = ({ label, value, color }) => (
    <div className="bg-white-100 dark:bg-black-200 md:py-4 py-2 rounded-xl mt-6 text-center col-span-1 md:mx-5 mx-2">
      <span className="font-bold text-[10px] md:text-xs xl:text-lg">
        {label}
      </span>
      <h1
        className={` lg:text-3xl md:text-2xl font-bold md:my-6 my-3 2xl:text-4xl ${color} `}
      >
        {value.toLocaleString()} $
      </h1>
    </div>
  );

  return (
    <div className="dark:text-white-100 grid grid-cols-3">
      <DataSection
        label="Your Tax This Month"
        value={tax}
        color="text-red-300"
      />

      <DataSection
        label="Your Income This Month"
        value={income}
        color="text-blue-600"
      />

      <DataSection
        label="Your Profit This Month"
        value={netProfit}
        color="text-green-300"
      />
    </div>
  );
};

export default FinancialInfos;
