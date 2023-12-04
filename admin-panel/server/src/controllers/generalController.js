const OverallStat =require( "../models/OverallStatmodel.js");
const Transaction =require( "../models/Transactionmodel.js");
const User =require( "../models/Usermodel.js");

/**Get user data */
 const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**Dashborad data */

 const getDashboardStats = async (req, res) => {
  try {
       // hardcoded values
    const currentMonth = "November";
    const currentYear = 2023;
    const currentDay = "2023-11-27";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.findOne({ year: currentYear });

     if (!overallStat) {
       return res.status(404).json({ message: "OverallStat not found" });
     }
   
    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat;

    const thisMonthStats = monthlyData.find(({ month }) => {
      return month === currentMonth;
    });
   
    const todayStats = overallStat.dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = { getDashboardStats, getUser };