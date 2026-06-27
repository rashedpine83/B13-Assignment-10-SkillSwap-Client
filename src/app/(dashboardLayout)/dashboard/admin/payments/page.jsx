import { getAllPayments } from "@/lib/api/payment";
import { DollarSign, TrendingUp, CreditCard, Receipt } from "lucide-react";

const AdminPaymentManagement = async () => {
  const paymentData = await getAllPayments();

  const totalRevenue =
    paymentData?.reduce((sum, item) => sum + Number(item?.price || 0), 0) || 0;

  const averageTransaction =
    paymentData?.length > 0 ? Math.round(totalRevenue / paymentData.length) : 0;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Payment Overview
          </h1>

          <p className="text-slate-500 mt-1">All platform transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="group bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Total Revenue
                </p>

                <h2 className="text-4xl font-bold mt-2 text-slate-800">
                  ${totalRevenue}
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  {paymentData?.length} transactions
                </p>
              </div>

              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center group-hover:rotate-12 transition">
                <DollarSign className="text-purple-600" />
              </div>
            </div>
          </div>

          {/* Average Card */}
          <div className="group bg-gradient-to-br from-cyan-50 to-white border border-cyan-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Average Transaction
                </p>

                <h2 className="text-4xl font-bold mt-2 text-slate-800">
                  ${averageTransaction}
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Per completed payment
                </p>
              </div>

              <div className="w-14 h-14 rounded-xl bg-cyan-100 flex items-center justify-center group-hover:rotate-12 transition">
                <TrendingUp className="text-cyan-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Table Section */}

        <div className="rounded-3xl border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-purple-600 via-cyan-500 to-orange-500 px-6 py-4 text-white flex items-center gap-3">
            <Receipt size={20} />
            <h3 className="font-semibold text-lg">Payment Transactions</h3>
          </div>

          {paymentData?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="text-left px-6 py-4">Task</th>

                    <th className="text-left px-6 py-4">Client</th>

                    <th className="text-left px-6 py-4">Freelancer</th>

                    <th className="text-left px-6 py-4">Amount</th>

                    <th className="text-left px-6 py-4">Status</th>

                    <th className="text-left px-6 py-4">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {paymentData?.map((payment) => (
                    <tr
                      key={payment._id}
                      className="border-b hover:bg-purple-50 transition duration-300"
                    >
                      <td className="px-6 py-5 font-medium text-slate-700">
                        {payment?.taskTitle}
                      </td>

                      <td className="px-6 py-5 text-slate-500">
                        {payment?.clientEmailId}
                      </td>

                      <td className="px-6 py-5 text-slate-500">
                        {payment?.freelancerEmailId}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                          <DollarSign size={16} className="text-orange-500" />$
                          {payment?.price}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            payment?.status === "paid"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-orange-100 text-orange-700 border-orange-200"
                          }`}
                        >
                          {payment?.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-slate-500">
                        {new Date(payment?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="h-[350px] flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <CreditCard size={35} className="text-slate-400" />
              </div>

              <h2 className="text-xl font-bold text-slate-700">
                No payments yet
              </h2>

              <p className="text-slate-400 mt-2">
                Payments will appear here once transactions are processed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentManagement;
