const AnalyticsCard = ({ title, value, icon: Icon }) => {
  return (
    <div
      className={`border border-primary rounded-lg py-8 px-2 shadow-lg overflow-hidden relative bg-transparent`}
    >
      <div className="flex justify-between items-center">
        <div className="z-10">
          <p className="text-primary text-sm mb-1 font-bold">{title}</p>
          <p className="text-white text-xl font-semibold">{value}</p>
        </div>
      </div>

      <div className="absolute inset-0">
        <div className="absolute -bottom-4 -right-4 text-primary">
          {Icon && <Icon className="h-30 w-30 opacity-10" />}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
